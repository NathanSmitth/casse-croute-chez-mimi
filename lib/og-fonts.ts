import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Static Fredoka/Figtree (latin, incl. French accents) for next/og — Satori needs woff/ttf.
export async function ogFonts() {
  const dir = join(process.cwd(), "assets/fonts");
  const [f600, f700, fig500] = await Promise.all([
    readFile(join(dir, "Fredoka-600.woff")),
    readFile(join(dir, "Fredoka-700.woff")),
    readFile(join(dir, "Figtree-500.woff")),
  ]);
  return [
    { name: "Fredoka", data: f600, weight: 600 as const, style: "normal" as const },
    { name: "Fredoka", data: f700, weight: 700 as const, style: "normal" as const },
    { name: "Figtree", data: fig500, weight: 500 as const, style: "normal" as const },
  ];
}
