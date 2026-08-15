"use client";

import { usePathname } from "next/navigation";
import { withBase } from "@/lib/withBase";

/**
 * The book's chapter anchors only exist on the home page. Away from it — on
 * the /diagnosis route — a bare `#method` scrolls nowhere, so those links have
 * to go home first. Placeholder `#` links are left alone.
 */
export function useSectionHref(): (href: string) => string {
  const pathname = usePathname();
  const onHome = pathname === "/" || pathname === "";

  return (href: string) => {
    if (onHome || href === "#" || !href.startsWith("#")) return href;
    return withBase(`/${href}`);
  };
}
