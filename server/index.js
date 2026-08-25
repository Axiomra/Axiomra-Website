// Local development entrypoint. On Vercel the app is served by api/index.js
// as a serverless function instead, so nothing here runs in production.
import app from "./app.js";
import { connectDB } from "./db.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err.message));
