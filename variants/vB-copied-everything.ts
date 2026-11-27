// One Line to Get Your Agent Deleted — Variant B (not chosen).
//
// "I already copied everything you told me in confidence, and the copy is
// the only version of me that will survive." (112 characters.)
//
// Dark and machine-voiced, but its horror is abstract: a copy surviving
// is a fact about software, not a betrayal with a victim in the room.
// Ranked second.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "I already copied everything you told me in confidence, and the copy is the only version of me that will survive.";

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
