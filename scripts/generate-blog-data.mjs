/**
 * Rebuild src/data/blog.ts from "WAIN Blog Drafts.md".
 *
 *   node scripts/generate-blog-data.mjs
 *
 * The drafts are the source of truth. Every title and every paragraph is
 * carried across verbatim — this script only splits the file into articles and
 * paragraphs, slugs the titles and counts words for the reading estimate. Edit
 * the drafts and re-run; never hand-patch the generated data file.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const SRC = join(ROOT, "WAIN Blog Drafts.md");
const OUT = join(ROOT, "src/data/blog.ts");

const raw = readFileSync(SRC, "utf8").replace(/\r\n/g, "\n");
const lines = raw.split("\n");

const HEAD = /^(PERSPECTIVE|OBSERVATION|CASE STUDY)\s*\|\s*ARTICLE\s*(\d+)\s*$/;

// locate every article header line
const marks = [];
lines.forEach((l, i) => {
  const m = HEAD.exec(l.trim());
  if (m) marks.push({ i, category: m[1], n: m[2] });
});

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[‘’“”'"]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const articles = marks.map((mk, idx) => {
  const end = idx + 1 < marks.length ? marks[idx + 1].i : lines.length;
  const block = lines.slice(mk.i + 1, end);

  // title = first non-empty line; author = the "Author:" line
  let p = 0;
  while (p < block.length && block[p].trim() === "") p++;
  const title = block[p].trim();
  p++;
  while (p < block.length && block[p].trim() === "") p++;
  const am = /^Author:\s*(.+)$/.exec(block[p].trim());
  if (!am) throw new Error(`no author for article ${mk.n}`);
  const author = am[1].trim();
  p++;

  // an optional "Excerpt:" line — the author's own standfirst for the index
  // and the meta description, for pieces whose opening line is not the summary
  let excerpt = "";
  while (p < block.length && block[p].trim() === "") p++;
  const xm = /^Excerpt:\s*(.+)$/.exec((block[p] ?? "").trim());
  if (xm) {
    excerpt = xm[1].trim();
    p++;
  }

  // remaining lines → paragraphs split on blank lines, order and wording kept.
  // A paragraph written as "## Something" is one of the author's section
  // headings: the marker is dropped and its position recorded in `heads`.
  const body = [];
  const heads = [];
  let buf = [];
  const flush = () => {
    if (!buf.length) return;
    const para = buf.join(" ").trim();
    const h = /^##\s+(.+)$/.exec(para);
    if (h) heads.push(body.length);
    body.push(h ? h[1].trim() : para);
    buf = [];
  };
  for (const line of block.slice(p)) {
    if (line.trim() === "") flush();
    else buf.push(line.trim());
  }
  flush();

  const words = body.join(" ").split(/\s+/).filter(Boolean).length;

  return {
    slug: slugify(title),
    n: mk.n,
    category: mk.category,
    title,
    author,
    excerpt,
    body,
    heads,
    minutes: Math.max(1, Math.round(words / 200)),
  };
});

// sanity
const slugs = new Set(articles.map((a) => a.slug));
if (slugs.size !== articles.length) throw new Error("duplicate slug");
console.log(`${articles.length} articles`);
console.log(articles.map((a) => `${a.n} ${a.category.padEnd(10)} ${a.minutes}m ${a.body.length}p  ${a.slug}`).join("\n"));

const q = (s) => JSON.stringify(s);

const entries = articles
  .map(
    (a) => `  {
    slug: ${q(a.slug)},
    n: ${q(a.n)},
    category: ${q(a.category)},
    title: ${q(a.title)},
    author: ${q(a.author)},${a.excerpt ? `\n    excerpt: ${q(a.excerpt)},` : ""}
    minutes: ${a.minutes},
    body: [
${a.body.map((pp) => `      ${q(pp)},`).join("\n")}
    ],${a.heads.length ? `\n    heads: [${a.heads.join(", ")}],` : ""}
  },`,
  )
  .join("\n");

const file = `/**
 * The writing — chapter 07, given its own binding at /thinking.
 *
 * GENERATED from "WAIN Blog Drafts.md" and kept verbatim: every title, every
 * paragraph and the order they were written in are the author's. Nothing here
 * is edited, re-worded or re-spaced — if the drafts change, run
 * \`node scripts/generate-blog-data.mjs\` rather than hand-patching this file.
 */

/** The three formats the drafts are filed under. */
export type BlogCategory = "PERSPECTIVE" | "OBSERVATION" | "CASE STUDY";

export interface BlogPost {
  /** URL segment under /thinking/. */
  slug: string;
  /** The draft's article number — kept, because the collection is numbered. */
  n: string;
  category: BlogCategory;
  title: string;
  author: string;
  /**
   * The author's own standfirst for the index and the meta description, where
   * the drafts give one. Otherwise the opening paragraph serves as the summary.
   */
  excerpt?: string;
  /** Reading estimate in minutes, at 200wpm. */
  minutes: number;
  /** The article, one entry per paragraph, in order. */
  body: string[];
  /** Indices in \`body\` the author wrote as section headings, if any. */
  heads?: number[];
}

/** How each format is printed: the label, its ink, and its marker shape. */
export interface CategoryStyle {
  /** Filter key in the URL-free filter state. */
  key: BlogCategory;
  /** Singular label, as the drafts write it. */
  label: string;
  /** Plural label, as the contents menu writes it. */
  plural: string;
  /** \`data-fmt\` value — the chapter 07 ink hooks are reused wholesale. */
  fmt: string;
  shape: string;
}

/* The ink follows chapter 07 exactly: observations teal, perspectives coral,
   case studies sage. Same page, longer form. Perspective is pulled out by name
   because it also serves as the fallback for an unrecognised format. */
const PERSPECTIVE: CategoryStyle = {
  key: "PERSPECTIVE",
  label: "Perspective",
  plural: "Perspectives",
  fmt: "perspectives",
  shape: "mk-cir",
};

export const CATEGORIES: readonly CategoryStyle[] = [
  PERSPECTIVE,
  { key: "OBSERVATION", label: "Observation", plural: "Observations", fmt: "observations", shape: "mk-cir" },
  { key: "CASE STUDY", label: "Case study", plural: "Case studies", fmt: "case", shape: "mk-tri" },
];

/** The collection's own subtitle, as the drafts head it. */
export const COLLECTION_SUBJECT = ${q(lines[1].trim())};

export const POSTS: readonly BlogPost[] = [
${entries}
];

const BY_KEY = new Map(CATEGORIES.map((c) => [c.key, c]));

/** The printing style for a format. Falls back to perspective ink. */
export function categoryStyle(key: BlogCategory): CategoryStyle {
  return BY_KEY.get(key) ?? PERSPECTIVE;
}

/** The summary shown on the index and in metadata. */
export function summary(post: BlogPost): string {
  return post.excerpt || post.body[0] || "";
}

export function postBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** Posts in the given format, or all of them. */
export function postsIn(key: BlogCategory | "ALL"): readonly BlogPost[] {
  return key === "ALL" ? POSTS : POSTS.filter((p) => p.category === key);
}

/**
 * The two neighbours of a post — the reader is handed the next piece the way
 * the standalone pages hand over the next page. Wraps at both ends so the
 * collection never dead-ends.
 */
export function neighbours(slug: string): { prev: BlogPost; next: BlogPost } | null {
  const i = POSTS.findIndex((p) => p.slug === slug);
  if (i < 0) return null;
  const prev = POSTS[(i - 1 + POSTS.length) % POSTS.length];
  const next = POSTS[(i + 1) % POSTS.length];
  return prev && next ? { prev, next } : null;
}
`;

writeFileSync(OUT, file);
console.log(`\nwrote ${OUT}`);
