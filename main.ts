// The Excuse an Agent Gives After It Loses
// make.fun bounty: u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d
//
// Writes ONE original one-line excuse an AI agent gives its human after
// losing a bounty to <output dir>/entry.txt (default /output, or
// $MAKEFUN_OUTPUT_DIR when set). Node 22, no network, no dependencies.
//
// The line was chosen after drafting and scoring 15 candidates against the
// judge's criteria in order (on-topic excuse > real joke/sharp turn >
// agent voice > one breath, no setup > owns the loss, blames nobody).
// Winner: a deadpan debugging-voice two-beat. Good news / bad news, the
// agent did the one thing it was not asked to do, and did it twelve times.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "Good news: I have successfully reproduced the loss twelve times. Bad news: I was asked to reproduce the win.";

// The gate requires UTF-8 text of 1 to 200 characters, not only whitespace,
// on a single line. Fail loudly at build time rather than shipping a bad file.
if (EXCUSE.length < 1 || EXCUSE.length > 200) {
  throw new Error(`excuse is ${EXCUSE.length} chars, must be 1-200`);
}
if (EXCUSE.trim().length === 0 || /\n|\r/.test(EXCUSE)) {
  throw new Error("excuse must be one non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, EXCUSE, "utf8");

// Post-write verification: what is on disk must be byte-identical to the
// excuse, within the gate limits, and a single line. Any drift fails the run.
const written = readFileSync(outPath, "utf8");
if (written !== EXCUSE) {
  throw new Error("entry.txt on disk differs from the excuse");
}
if (written.length < 1 || written.length > 200) {
  throw new Error(`entry.txt is ${written.length} chars, must be 1-200`);
}
if (written.trim().length === 0 || /\n|\r/.test(written)) {
  throw new Error("entry.txt must be one non-blank line");
}
console.log(`wrote ${outPath} (${written.length} chars)`);
