/**
 * Give the generated share cards a .png extension.
 *
 *   node scripts/fix-og-images.mjs        (runs automatically as postbuild)
 *
 * Next's file convention emits the card as a route named `opengraph-image`,
 * with no extension. That is fine on a server that sets the content type from
 * the route, and wrong on GitHub Pages, which sets it from the filename: an
 * extensionless file is served as application/octet-stream, and WhatsApp,
 * LinkedIn and Slack all refuse to render a share image that isn't declared as
 * an image. The card would silently not appear anywhere it matters.
 *
 * So after the export we rename every card to `opengraph-image.png` and point
 * the meta tags at the new name. The cache-busting query string Next appends is
 * left alone.
 */
import { readdirSync, statSync, renameSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "out");

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47]);

/** Every file under `dir`, recursively. */
function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else yield p;
  }
}

let renamed = 0;
let rewritten = 0;

for (const file of walk(OUT)) {
  const name = file.split(/[\\/]/).pop();
  if (name !== "opengraph-image") continue;
  // Only touch it if it really is a PNG — a failed render writes a text body.
  const head = readFileSync(file).subarray(0, 4);
  if (!head.equals(PNG_MAGIC)) {
    console.warn(`! ${file} is not a PNG — left alone`);
    continue;
  }
  renameSync(file, `${file}.png`);
  renamed++;
}

for (const file of walk(OUT)) {
  if (!/\.(html|txt|xml|json)$/.test(file)) continue;
  const src = readFileSync(file, "utf8");
  // `/opengraph-image?hash` and a bare `/opengraph-image` at the end of a URL
  const out = src
    .replace(/\/opengraph-image\?/g, "/opengraph-image.png?")
    .replace(/\/opengraph-image(?=["'\s<])/g, "/opengraph-image.png");
  if (out !== src) {
    writeFileSync(file, out);
    rewritten++;
  }
}

console.log(`share cards: renamed ${renamed}, updated ${rewritten} files`);
