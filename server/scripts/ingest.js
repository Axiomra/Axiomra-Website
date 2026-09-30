/**
 * Build the chatbot's RAG store: load site content, chunk it, embed it with
 * OpenAI and upsert it into the rag_chunks collection. Run by hand:
 *
 *   npm run ingest                         # every source
 *   npm run ingest -- --dry-run            # chunk and diff only; no OpenAI calls, no writes
 *   npm run ingest -- --sources blog       # re-ingest published blog posts only
 *   npm run ingest -- --dry-run --samples 2  # also print 2 chunks per source type
 *
 * Idempotent: a chunk's _id is sha256(source, chunkIndex, text), so unchanged
 * chunks are skipped and never re-embedded. Chunks of the selected source
 * types that no longer exist are deleted; other source types are untouched.
 *
 * Needs MONGO_URI and OPENAI_API_KEY (from .env / .env.local). Neither is
 * ever logged.
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../db.js";
import BlogPost from "../models/BlogPost.js";
import {
  COLLECTION,
  EMBEDDING_PRICE_PER_M,
  INDEX_DEFINITION,
  INDEX_NAME,
  TEXT_INDEX_DEFINITION,
  TEXT_INDEX_NAME,
} from "../rag/config.js";
import { estimateTokens } from "../rag/chunker.js";
import { MAX_BATCH, embed } from "../rag/embed.js";
import { buildChunks, planChanges } from "../rag/ingestPlan.js";
import { SOURCE_TYPES, loadDocuments } from "../rag/loaders/index.js";

dotenv.config();
dotenv.config({ path: ".env.local", override: true });

const INDEX_WAIT_MS = 5 * 60 * 1000;
const WRITE_BATCH = 100;

function parseArgs(argv) {
  const args = { dryRun: false, sources: SOURCE_TYPES, samples: 0 };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--sources")
      args.sources = argv[(i += 1)]
        ?.split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    else if (a === "--samples") args.samples = Number(argv[(i += 1)]) || 0;
    else throw new Error(`Unknown argument: ${a}`);
  }
  const unknown = (args.sources ?? []).filter((s) => !SOURCE_TYPES.includes(s));
  if (!args.sources?.length || unknown.length) {
    throw new Error(`--sources takes a comma list of: ${SOURCE_TYPES.join(", ")}`);
  }
  return args;
}

const usd = (tokens) => `$${((tokens / 1e6) * EMBEDDING_PRICE_PER_M).toFixed(4)}`;

function printSamples(chunks, perType) {
  const byType = new Map();
  for (const c of chunks) {
    const list = byType.get(c.sourceType) ?? [];
    list.push(c);
    byType.set(c.sourceType, list);
  }
  for (const [type, list] of byType) {
    // Spread the picks over the list instead of taking the first file's chunks.
    const step = Math.max(1, Math.floor(list.length / perType));
    for (let i = 0; i < perType && i * step < list.length; i += 1) {
      const c = list[i * step];
      console.log(
        `\n----- [${type}] ${c.source} #${c.chunkIndex} (~${estimateTokens(c.text)} tokens)`
      );
      console.log(c.text);
    }
  }
}

/** Existing chunks for the selected source types, without their embeddings. */
async function existingChunks(collection, sources) {
  return collection
    .find(
      { sourceType: { $in: sources } },
      { projection: { _id: 1, sourceType: 1, source: 1, chunkIndex: 1 } }
    )
    .toArray();
}

async function writeChunks(collection, pending) {
  let tokens = 0;
  let retries = 0;
  const onRetry = ({ attempt, reason }) => {
    retries += 1;
    console.warn(`  embed retry ${attempt} (${reason})`);
  };
  for (let i = 0; i < pending.length; i += MAX_BATCH) {
    const batch = pending.slice(i, i + MAX_BATCH);
    const { vectors, tokens: used } = await embed(
      batch.map((c) => c.text),
      { onRetry }
    );
    tokens += used;
    const now = new Date();
    for (let j = 0; j < batch.length; j += WRITE_BATCH) {
      await collection.bulkWrite(
        batch.slice(j, j + WRITE_BATCH).map((c, k) => ({
          replaceOne: {
            filter: { _id: c._id },
            replacement: { ...c, embedding: vectors[j + k], updatedAt: now },
            upsert: true,
          },
        })),
        { ordered: false }
      );
    }
    console.log(`  embedded ${Math.min(i + MAX_BATCH, pending.length)}/${pending.length}`);
  }
  return { tokens, retries };
}

// The vector index is required; the text index only enables hybrid retrieval.
const SEARCH_INDEXES = [
  {
    name: INDEX_NAME,
    type: "vectorSearch",
    definition: INDEX_DEFINITION,
    kind: "Atlas Vector Search",
  },
  {
    name: TEXT_INDEX_NAME,
    type: "search",
    definition: TEXT_INDEX_DEFINITION,
    kind: "Atlas Search",
  },
];

function printManualIndexSteps(spec, reason) {
  console.log(`\nCould not create the ${spec.name} index automatically (${reason}).`);
  console.log("Create it in the Atlas UI instead:");
  console.log("  1. Atlas -> your cluster -> Atlas Search -> Create Search Index");
  console.log(`  2. Choose '${spec.kind}' and the JSON Editor`);
  console.log(
    `  3. Database: your app database, collection: ${COLLECTION}, index name: ${spec.name}`
  );
  console.log("  4. Paste this definition and create:");
  console.log(JSON.stringify(spec.definition, null, 2));
  console.log("  5. Wait for status READY.");
}

/** Create a search index if missing and wait until it is queryable. Returns the final status. */
async function ensureIndex(collection, spec) {
  let indexes;
  try {
    indexes = await collection.listSearchIndexes(spec.name).toArray();
  } catch (err) {
    printManualIndexSteps(spec, err.codeName ?? err.message);
    return "manual";
  }
  if (!indexes.length) {
    try {
      await collection.createSearchIndex({
        name: spec.name,
        type: spec.type,
        definition: spec.definition,
      });
      console.log(`Created search index ${spec.name}; waiting for it to be ready...`);
    } catch (err) {
      printManualIndexSteps(spec, err.codeName ?? err.message);
      return "manual";
    }
  }
  const deadline = Date.now() + INDEX_WAIT_MS;
  for (;;) {
    const [index] = await collection.listSearchIndexes(spec.name).toArray();
    if (index?.status === "READY" && index.queryable) return "READY";
    if (index?.status === "FAILED") return "FAILED";
    if (Date.now() > deadline) return index?.status ?? "missing";
    await new Promise((r) => setTimeout(r, 5000));
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const started = Date.now();

  // Load everything before touching the store: a loader failure aborts the
  // run before anything is deleted.
  // A dry run only reads Mongo (blog posts, the diff) and can run without it
  // unless the blog is selected.
  const hasDb = !args.dryRun || args.sources.includes("blog") || Boolean(process.env.MONGO_URI);
  if (hasDb) await connectDB();

  const docs = await loadDocuments({ sources: args.sources, BlogPost });
  const chunks = buildChunks(docs);
  const estTokens = chunks.reduce((n, c) => n + estimateTokens(c.text), 0);

  const collection = hasDb ? mongoose.connection.db.collection(COLLECTION) : null;
  const existing = collection ? await existingChunks(collection, args.sources) : [];
  const plan = planChanges(chunks, existing);
  const pending = [...plan.created, ...plan.updated];
  const pendingTokens = pending.reduce((n, c) => n + estimateTokens(c.text), 0);

  const perType = {};
  for (const c of chunks) perType[c.sourceType] = (perType[c.sourceType] ?? 0) + 1;

  console.log(`Sources: ${args.sources.join(", ")}`);
  console.log(`Documents: ${docs.length}  Chunks: ${chunks.length}  ${JSON.stringify(perType)}`);
  if (!collection) console.log("(no MONGO_URI: diff against the store skipped)");
  console.log(
    `Plan: created ${plan.created.length}, updated ${plan.updated.length}, skipped ${plan.skipped.length}, deleted ${plan.deleted}`
  );
  console.log(
    `Estimated tokens: all chunks ~${estTokens} (${usd(estTokens)}), to embed now ~${pendingTokens} (${usd(pendingTokens)})`
  );

  if (args.dryRun) {
    if (args.samples > 0) printSamples(chunks, args.samples);
    console.log("\nDry run: nothing embedded or written.");
    return;
  }

  const { tokens, retries } = await writeChunks(collection, pending);
  if (plan.remove.length) await collection.deleteMany({ _id: { $in: plan.remove } });

  const statuses = {};
  for (const spec of SEARCH_INDEXES) statuses[spec.name] = await ensureIndex(collection, spec);
  const total = await collection.countDocuments();
  console.log(
    `\nDone in ${((Date.now() - started) / 1000).toFixed(1)}s: created ${plan.created.length}, updated ${plan.updated.length}, ` +
      `skipped ${plan.skipped.length}, deleted ${plan.deleted}. Tokens ${tokens} (${usd(tokens)}), embed retries ${retries}. ` +
      `Collection now holds ${total} chunks. Indexes: ${Object.entries(statuses)
        .map(([name, status]) => `${name} ${status}`)
        .join(", ")}.`
  );
  if (!["READY", "manual"].includes(statuses[INDEX_NAME])) process.exitCode = 1;
}

main()
  .catch((err) => {
    console.error(`Ingest failed: ${err.message}`);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
