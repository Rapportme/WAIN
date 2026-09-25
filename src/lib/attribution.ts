/* ============================================================================
   Where a visitor came from — kept in their own browser, sent only with a form.

   On the first page someone opens, we note the site that sent them (Google,
   ChatGPT, Instagram, a link in an article…), any utm_ tags on the link, and
   the page they landed on. When they later send the contact form or the
   growth diagnosis, one readable line goes with it, so the lead in the admin
   CRM says how it found us. Nothing is sent anywhere else, no cookie is set,
   and a blocked localStorage simply means the line is left out.
   ========================================================================= */

const KEY = "wain_first_touch";

interface Touch {
  from: string;
  landing: string;
  campaign?: string;
  at: string;
}

const SOURCES: [RegExp, string][] = [
  [/(^|\.)google\./, "Google search"],
  [/(^|\.)bing\.com$/, "Bing search"],
  [/duckduckgo\.com$/, "DuckDuckGo"],
  [/chatgpt\.com$|chat\.openai\.com$/, "ChatGPT"],
  [/perplexity\.ai$/, "Perplexity"],
  [/claude\.ai$/, "Claude"],
  [/gemini\.google\.com$/, "Gemini"],
  [/copilot\.microsoft\.com$/, "Copilot"],
  [/instagram\.com$/, "Instagram"],
  [/facebook\.com$|fb\.me$/, "Facebook"],
  [/linkedin\.com$|lnkd\.in$/, "LinkedIn"],
  [/(^|\.)t\.co$|twitter\.com$|x\.com$/, "X / Twitter"],
  [/youtube\.com$/, "YouTube"],
  [/whatsapp\.com$|wa\.me$/, "WhatsApp"],
  [/justdial\.com$/, "Justdial"],
  [/sortlist\./, "Sortlist"],
];

function sourceName(host: string): string {
  const h = host.replace(/^www\./, "").toLowerCase();
  for (const [re, name] of SOURCES) if (re.test(h)) return name;
  return h;
}

function read(): Touch | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Touch) : null;
  } catch {
    return null;
  }
}

/** Call once per page load. Records the first visit only (and a tagged campaign link whenever one arrives). */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    const utm = ["utm_source", "utm_medium", "utm_campaign"].map((k) => url.searchParams.get(k) || "");
    const existing = read();
    if (existing && !utm[0]) return;
    let from = "Direct (typed, bookmark, or an app like WhatsApp)";
    if (document.referrer) {
      const ref = new URL(document.referrer);
      if (ref.hostname === window.location.hostname) return; // an internal click, not an arrival
      from = sourceName(ref.hostname);
    }
    if (utm[0]) from = utm[1] ? `${utm[0]} (${utm[1]})` : utm[0];
    const touch: Touch = {
      from,
      landing: url.pathname,
      campaign: utm[2] || undefined,
      at: new Date().toISOString().slice(0, 10),
    };
    window.localStorage.setItem(KEY, JSON.stringify(touch));
  } catch {
    /* private mode or blocked storage: nothing to record */
  }
}

/** One readable line for the CRM, e.g. "Google search → landed on /growth-partner/ (2026-09-25); sent from /contact/". */
export function describeAttribution(): string {
  if (typeof window === "undefined") return "";
  const t = read();
  const here = window.location.pathname;
  if (!t) return `Sent from ${here}`;
  return `${t.from}${t.campaign ? `, campaign "${t.campaign}"` : ""} → landed on ${t.landing} (${t.at}); sent from ${here}`;
}
