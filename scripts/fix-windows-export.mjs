import { readdirSync, renameSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";

if (process.platform === "win32") {
  // Next.js exporta algunos segmentos en subcarpetas en Windows, pero el
  // router solicita nombres planos. https://github.com/vercel/next.js/issues/85374
  const out = resolve("out");
  const entries = readdirSync(out, { recursive: true, withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".txt")) continue;

    const parentParts = relative(out, entry.parentPath).split(sep);
    const segmentStart = parentParts.findIndex((part) => part.startsWith("__next."));
    if (segmentStart === -1) continue;

    const file = join(entry.parentPath, entry.name);
    const segmentRoot = join(out, ...parentParts.slice(0, segmentStart + 1));
    const flatName = [...parentParts.slice(segmentStart), entry.name].join(".");
    renameSync(file, join(dirname(segmentRoot), flatName));
  }
}
