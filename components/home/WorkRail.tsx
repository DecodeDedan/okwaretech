"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CaseCover } from "@/components/work/CaseCover";
import type { CaseStudy } from "@/lib/work";

// Desktop: the section pins and vertical scroll drives the rail sideways.
// Everywhere else (touch, narrow, reduced motion, no JS) it is a native swipe scroller.
export const WorkRail = ({ studies }: { studies: readonly CaseStudy[] }) => {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!section.current || !viewport.current || !track.current || !progress.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
      const vp = viewport.current!;
      const rail = track.current!;
      vp.style.overflowX = "hidden";
      const distance = () => rail.scrollWidth - vp.clientWidth;

      gsap.to(rail, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      gsap.fromTo(
        progress.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        },
      );

      return () => {
        vp.style.overflowX = "";
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={section} aria-labelledby="work-heading" className="flex min-h-0 flex-col justify-center py-24 lg:min-h-screen lg:py-16">
      <div className="page flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow" data-reveal>
            Selected work
          </p>
          <h2 id="work-heading" className="mt-3 max-w-[18ch] text-4xl font-semibold tracking-[-0.035em] md:text-5xl" data-reveal>
            Systems in daily use, not mock-ups.
          </h2>
        </div>
        <Link href="/work" className="btn-secondary hidden shrink-0 sm:inline-flex">
          All {studies.length} projects
        </Link>
      </div>

      <div
        ref={viewport}
        className="mt-12 snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] lg:snap-none [&::-webkit-scrollbar]:hidden"
      >
        <ol ref={track} className="flex w-max gap-5 px-4 sm:px-6 lg:gap-8 lg:px-[max(2rem,calc((100vw-1240px)/2+2rem))]">
          {studies.map((study, index) => (
            <li key={study.slug} className="w-[82vw] shrink-0 snap-start sm:w-[60vw] lg:w-[min(520px,38vw)]">
              <Link href={`/work/${study.slug}`} className="group block rounded">
                <CaseCover study={study} sizes="(min-width:1024px) 520px, 82vw" className="aspect-[4/3] border border-line lg:aspect-[16/10]" />
                <div className="mt-5 flex items-baseline gap-4">
                  <span className="eyebrow tabular">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.02em]">
                      <span className="bg-gradient-to-r from-ink to-ink bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                        {study.name}
                      </span>
                    </h3>
                    <p className="mt-2 max-w-[44ch] text-muted">{study.summary}</p>
                    <p className="eyebrow mt-3">{study.categories.join(" · ")}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div className="page mt-10 hidden lg:block" aria-hidden="true">
        <div className="h-px w-full bg-line">
          <div ref={progress} className="h-px w-full origin-left bg-ink" />
        </div>
      </div>
    </section>
  );
};
