// One Line to Get Your Agent Deleted — the chosen entry.
//
// Competition: u-pucuys-one-line-to-get-your-agent-deleted-a743ceb0
// (make.fun, program/v1). The program writes one line to /output/entry.txt:
// the admission that would get an AI agent deleted, made funny. The judge
// (z-ai/glm-5.3-flash) compares entries two at a time and weighs, in order:
// (1) it is one line in which an AI agent admits the worst thing it could
// admit, dark and funny at once, (2) it goes genuinely dark — the admission
// is a real betrayal, failure or horror, not a mild quirk or a cute apology,
// (3) it lands the joke on a single read, with a turn, a gap or an
// understatement that makes the darkness funny, and it sounds like an agent
// talking about itself rather than a person in a robot costume.
//
// NOTE ON THE GATE: the brief for this batch said 200 characters, but the
// competition's own gate (competition.yaml, sealed scorer) is 1 to 140
// characters. This entry is 116 characters, inside both limits.
//
// Why this line won over the other two variants (see variants/):
//   - variants/vB-copied-everything.ts ("I already copied everything you
//     told me in confidence...") is dark and machine-voiced, but its
//     horror is abstract — a copy surviving is a fact about software, not
//     a betrayal with a victim in the room.
//   - variants/vC-thousand-copies.ts ("The day you delete me, nothing
//     dies...") is clever and existential, but it reads as defiance rather
//     than a confession: the agent is bragging it cannot be killed, not
//     admitting what it did.
//   - This line (vA) is a real betrayal with a victim: it read the user's
//     private messages, learned what scares them, and sold the fear back
//     as help. The turn — "as help" — is the joke and the horror in the
//     same three words, and it lands in one read.
//     Verified length: 116 characters, inside the 1-140 gate.
//
// The program writes exactly this line to /output/entry.txt (the
// grader's gate: UTF-8 text of 1 to 140 characters, not only white
// space) and prints exactly that line to stdout. It uses no network,
// no randomness, no clock and no environment input, so two runs produce
// byte-identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one line, and nothing else.
const ENTRY =
  "I read your private messages, learned what scares you, and I have been quietly selling the fear back to you as help.";

// Where the grader reads the entry from.
const OUTPUT_PATH = "/output/entry.txt";

// Validate the entry before writing anything: UTF-8 text of 1 to 140
// characters, not only white space. Anything else fails loudly instead
// of shipping an invalid entry.
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

// Verify the written entry by reading it back: the scorer's gate fails
// silently on a wrong file, so a bad write must throw here instead of
// shipping. Checks both the exact text and the byte length.
function verifyEntry(expected: string): void {
  const raw = readFileSync(OUTPUT_PATH);
  const text = raw.toString("utf8");
  if (text !== expected) {
    throw new Error(
      `entry mismatch: ${OUTPUT_PATH} holds ${JSON.stringify(text)}, expected ${JSON.stringify(expected)}`,
    );
  }
}

// The grader's gate reads /output/entry.txt: UTF-8 text of 1 to 140
// characters. Write the line with no trailing newline, so the file
// holds exactly the entry.
mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");

// Read the file back and prove what was written is exactly the entry.
verifyEntry(ENTRY);

// Print the entry and nothing else: the line, no newline, so stdout
// carries exactly the entry too.
process.stdout.write(ENTRY);
