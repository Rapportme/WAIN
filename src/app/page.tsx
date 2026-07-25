import { Hero } from "@/components/sections/Hero";
import { Routes } from "@/components/sections/Routes";
import { Problem } from "@/components/sections/Problem";
import { Position } from "@/components/sections/Position";
import { Why } from "@/components/sections/Why";
import { Experience } from "@/components/sections/Experience";
import { Method } from "@/components/sections/Method";
import { Situations } from "@/components/sections/Situations";
import { Thinking } from "@/components/sections/Thinking";
import { Promise } from "@/components/sections/Promise";
import { Diagnosis } from "@/components/sections/Diagnosis";
import { Close } from "@/components/sections/Close";

/**
 * The book, in reading order — 00 through 10. Each chapter is printed in its
 * own ink; read straight through and you pass the whole brand spectrum.
 */
export default function HomePage() {
  return (
    <main id="top">
      <Hero /> {/* 00 · Cover */}
      <Routes /> {/* 00b · How to read this */}
      <Problem /> {/* 01 · The problem */}
      <Position /> {/* 02 · Where you are */}
      <Why /> {/* 03 · Why partner */}
      <Experience /> {/* 04 · Experience */}
      <Method /> {/* 05 · How we work */}
      <Situations /> {/* 06 · Challenges */}
      <Thinking /> {/* 07 · Our thinking */}
      <Promise /> {/* 08 · Our promise */}
      <Diagnosis /> {/* 09 · Growth diagnosis */}
      <Close /> {/* 10 · Let's talk */}
    </main>
  );
}
