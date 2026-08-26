import type { ReactNode } from "react";

/**
 * Renders copy that marks its own emphasis with `**…**`.
 *
 * The alternative is storing each line as an array of fragments, which turns
 * readable copy into markup in the data file. This keeps the sentence a
 * sentence and does the one substitution the copy actually needs.
 */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((part, i): ReactNode =>
        // odd indices sit between a pair of markers, so they're the emphasis
        i % 2 === 1 ? <b key={i}>{part}</b> : part,
      )}
    </>
  );
}
