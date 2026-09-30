import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    // Each file boots its own in-memory Mongo; the first run also downloads
    // the mongod binary.
    testTimeout: 30000,
    hookTimeout: 120000,
    env: {
      NODE_ENV: "test",
      // Point dotenv at a file that does not exist, so tests never load
      // server/.env (the real database).
      DOTENV_CONFIG_PATH: "tests/no-such-dotenv-file",
      // The one admin address the User model will accept (models/User.js).
      ADMIN_EMAIL: "admin@example.com",
      // Retrieval calls OpenAI and Atlas; tests that cover it opt in and mock both.
      RAG_ENABLED: "false",
    },
  },
});
