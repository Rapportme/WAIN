/**
 * Write public/sitemap.xml from the route tree plus the Thinking slugs.
 *
 *   node scripts/generate-sitemap.mjs        (runs automatically as `prebuild`)
 *
 * Static routes come from every src/app/**\/page.tsx; the dynamic
 * /thinking/[slug]/ route expands to the posts in src/data/blog.ts, whose
 * `date` becomes lastmod. Everything else gets today's date. The canonical
 * host is always https://wearein.in — a fork deploying under a base path still
 * describes the real site.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://wearein.in";
const APP = join(ROOT, "src/app");
const OUT = join(ROOT, "public/sitemap.xml");

const today = new Date().toISOString().slice(0, 10);

/* ---- static routes: every page.tsx that isn't under a [param] segment ---- */
const pages = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name === "page.tsx") pages.push(p);
  }
};
walk(APP);

const staticRoutes = pages
  .map((p) => relative(APP, dirname(p)).split(/[\\/]/).filter(Boolean))
  .filter((segs) => !segs.some((s) => s.startsWith("[")))
  .map((segs) => (segs.length ? `/${segs.join("/")}/` : "/"));

/* ---- blog posts: slug + date pairs out of the generated data file ---- */
const blog = readFileSync(join(ROOT, "src/data/blog.ts"), "utf8");
const posts = [];
const re = /slug:\s*"([^"]+)"[\s\S]*?date:\s*"(\d{4}-\d{2}-\d{2})"/g;
let m;
while ((m = re.exec(blog))) posts.push({ slug: m[1], date: m[2] });

/* ---- priorities: the cover first, then the pages people land on ---- */
const priority = (route) => {
  if (route === "/") return "1.0";
  if (/^\/(diagnosis|contact|growth-partner|before-you-hire-an-agency)\/$/.test(route)) return "0.9";
  if (route.startsWith("/thinking/") && route !== "/thinking/") return "0.6";
  return "0.8";
};

const urls = [
  ...staticRoutes.map((route) => ({ loc: route, lastmod: today })),
  ...posts.map((p) => ({ loc: `/thinking/${p.slug}/`, lastmod: p.date })),
];

// de-dupe (the [slug] page is filtered, but be safe) and keep a stable order
const seen = new Set();
const list = urls.filter((u) => (seen.has(u.loc) ? false : (seen.add(u.loc), true)));
list.sort((a, b) => (a.loc === "/" ? -1 : b.loc === "/" ? 1 : a.loc.localeCompare(b.loc)));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${list
  .map(
    (u) => `  <url>
    <loc>${SITE}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${priority(u.loc)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(OUT, xml);
console.log(`sitemap: ${list.length} urls (${staticRoutes.length} pages, ${posts.length} posts) → ${relative(ROOT, OUT)}`);
