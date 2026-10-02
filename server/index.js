// Local development entrypoint. On Vercel the app is served by api/index.js
// as a serverless function instead, so nothing here runs in production.
import app from "./app.js";
import { connectDB } from "./db.js";
import { mailerConfigured } from "./mailer.js";

const PORT = process.env.PORT || 5000;

// Colour only when stdout is a TTY: piping the log to a file or into a process
// manager should not litter it with escape codes.
const ESC = String.fromCharCode(27);
const tty = process.stdout.isTTY;
const c = (code, text) => (tty ? ESC + "[" + code + "m" + text + ESC + "[0m" : text);
const teal = (t) => c("38;5;44", t);
const indigo = (t) => c("38;5;104", t);
const amber = (t) => c("33", t);
const red = (t) => c("31", t);
const dim = (t) => c("2", t);
const bold = (t) => c("1", t);

function line(label, value) {
  console.log(`  ${dim(label.padEnd(11))} ${value}`);
}

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log("");
  console.log(`  ${bold(teal("AXIOMRA"))} ${bold(indigo("API"))}   ${dim("express - esm")}`);
  console.log(`  ${dim("-".repeat(46))}`);
  line("Dashboard", teal(url));
  line("Health", dim(`${url}/api/health`));
  line("Snapshot", dim(`${url}/status.json`));
  line("Env", process.env.NODE_ENV || "development");
  line("Mailer", mailerConfigured() ? teal("configured") : amber("disabled - set RESEND_API_KEY"));
});

connectDB()
  .then(() => {
    line("MongoDB", teal("connected"));
    console.log("");
  })
  .catch((err) => {
    line("MongoDB", red(`failed - ${err.message}`));
    console.log("");
  });
