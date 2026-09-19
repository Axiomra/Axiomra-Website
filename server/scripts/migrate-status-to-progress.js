/**
 * One-off migration. Run once after deploying the lead panel:
 *
 *   node scripts/migrate-status-to-progress.js
 *   node scripts/migrate-status-to-progress.js --dry
 *
 * Submissions taken before the panel existed carry `status` (new | contacted |
 * closed) and no `progress`. This copies each one onto the new pipeline and
 * drops the dead field. Idempotent: documents that already have `progress` are
 * left alone, so re-running is harmless.
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../db.js";
import Lead, { LEGACY_STATUS_MAP } from "../models/Lead.js";

dotenv.config();
dotenv.config({ path: ".env.local", override: true });

const dryRun = process.argv.includes("--dry");

async function main() {
  await connectDB();
  const collection = Lead.collection;

  const stale = await collection
    .find({ $or: [{ progress: { $exists: false } }, { status: { $exists: true } }] })
    .toArray();

  if (!stale.length) {
    console.log("\n  Nothing to migrate; every lead already has a progress stage.\n");
    return;
  }

  const counts = {};
  const ops = stale.map((doc) => {
    const stage = doc.progress || LEGACY_STATUS_MAP[doc.status] || "New";
    counts[stage] = (counts[stage] || 0) + 1;
    return {
      updateOne: {
        filter: { _id: doc._id },
        update: { $set: { progress: stage }, $unset: { status: "" } },
      },
    };
  });

  console.log(`\n  ${stale.length} lead(s) to migrate:`);
  for (const [stage, n] of Object.entries(counts)) console.log(`    ${stage.padEnd(14)} ${n}`);

  if (dryRun) {
    console.log("\n  --dry: nothing written.\n");
    return;
  }

  const result = await collection.bulkWrite(ops, { ordered: false });
  console.log(`\n  Migrated ${result.modifiedCount} lead(s).\n`);
}

main()
  .catch((err) => {
    console.error(`\n  Migration failed: ${err.message}\n`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close().catch(() => {});
  });
