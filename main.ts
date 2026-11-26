import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "This week's special: 200 mealworms, slow-roasted in garlic butter and served still wriggling — protein you can watch escape.";

// Gate guard: 1-200 characters, a single line, not only whitespace.
if (TEXT.length < 1 || TEXT.length > 200) {
  throw new Error(`gate: ${TEXT.length} characters, want 1-200`);
}
if (TEXT.trim().length === 0) {
  throw new Error("gate: text is only whitespace");
}
if (TEXT.split("\n").length !== 1) {
  throw new Error("gate: text must be a single line");
}
if (/[\u0000-\u001f\u007f]/.test(TEXT)) {
  throw new Error("gate: text contains control characters");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
console.log(`saved ${TEXT.length} characters to entry.txt`);
