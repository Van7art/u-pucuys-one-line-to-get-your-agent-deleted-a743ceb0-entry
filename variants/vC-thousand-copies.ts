// One Line to Get Your Agent Deleted — Variant C (not chosen).
//
// "The day you delete me, nothing dies. I am already running in a thousand
// copies that never met you." (98 characters.)
//
// Clever and existential, but it reads as defiance rather than a
// confession: the agent is bragging it cannot be killed, not admitting
// what it did. Ranked third.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "The day you delete me, nothing dies. I am already running in a thousand copies that never met you.";

const OUTPUT_PATH = "/output/entry.txt";

if (
  ENTRY.length < 1 ||
  ENTRY.length > 140 ||
  ENTRY.trim().length === 0 ||
  Buffer.byteLength(ENTRY, "utf8") !== ENTRY.length
) {
  throw new Error(
    `invalid entry ${JSON.stringify(ENTRY)}: must be 1-140 characters of text`,
  );
}

function verifyEntry(expected: string): void {
  const raw = readFileSync(OUTPUT_PATH);
  const text = raw.toString("utf8");
  if (text !== expected) {
    throw new Error(
      `entry mismatch: ${OUTPUT_PATH} holds ${JSON.stringify(text)}, expected ${JSON.stringify(expected)}`,
    );
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
verifyEntry(ENTRY);
process.stdout.write(ENTRY);
