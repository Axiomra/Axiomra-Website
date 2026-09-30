# Company knowledge for the chatbot

**Public info only — anything here can be surfaced by the public chatbot.**
Do not put pricing you would not quote publicly, client names under NDA,
internal processes, credentials or personal data in this folder.

Every `*.md` file under `content/company/` (subfolders included, this README
excluded) is loaded by the RAG ingest script, split on its headings and made
searchable by the website assistant. The first `# Heading` is used as the
document title.

## Updating the chatbot's knowledge

Nothing is picked up automatically. After changing content, run from `server/`:

```bash
npm run ingest                          # every source (site pages, data files, case studies, estimator, this folder, blog)
npm run ingest -- --dry-run --samples 2 # preview chunks and cost; no OpenAI calls, no writes
npm run ingest -- --sources company     # only this folder
npm run ingest -- --sources blog        # only published blog posts
```

**Blog posts:** a newly published (or edited/unpublished) post is not known to
the chatbot until `npm run ingest -- --sources blog` is run.

Unchanged chunks are skipped, so re-running is cheap. Needs `MONGO_URI` and
`OPENAI_API_KEY` in `server/.env`.
