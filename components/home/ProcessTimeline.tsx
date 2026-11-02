"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Step } from "@/lib/services";

// The rule fills as the reader moves through the steps; each step lights as the fill reaches it.
export const ProcessTimeline = ({ steps }: { steps: readonly Step[] }) => {
  const root = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current || !fill.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 60%", scrub: true } },
      );
      gsap.utils.toArray<HTMLElement>("[data-step-dot]").forEach((dot) => {
        gsap.fromTo(
          dot,
          { backgroundColor: "rgb(223 221 214)", scale: 0.7 },
          {
            backgroundColor: "rgb(10 110 106)",
            scale: 1,
            duration: 0.3,
            scrollTrigger: { trigger: dot, start: "top 62%", toggleActions: "play none none reverse" },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative ml-2 border-l border-line pl-10 sm:ml-0 sm:pl-14">
      <div ref={fill} aria-hidden="true" className="absolute -left-px top-0 h-full w-px origin-top bg-brand" />
      <ol>
        {steps.map((step, index) => (
          <li key={step.title} className="relative pb-14 last:pb-0">
            <span
              data-step-dot
              aria-hidden="true"
              className="absolute -left-[46px] top-2 h-3 w-3 rounded-full bg-brand ring-4 ring-paper sm:-left-[62px]"
            />
            <p className="eyebrow tabular">Step {index + 1}</p>
            <h3 className="mt-1 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{step.title}</h3>
            <p className="mt-3 max-w-[52ch] text-lg leading-relaxed text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};
