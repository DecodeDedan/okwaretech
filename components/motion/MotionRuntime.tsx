"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// One runtime for page-level motion. Markup opts in with data attributes, and every
// start state is written here at runtime, so without JavaScript the page is whole.
//   data-reveal         fade and rise on first view (children of data-reveal-group stagger)
//   data-count          count a figure like "2,000+" up from zero on first view

const parseFigure = (text: string) => {
  const match = text.match(/^([^\d]*)([\d,]+)(.*)$/);
  if (!match) return null;
  return { prefix: match[1], value: Number(match[2].replace(/,/g, "")), suffix: match[3] };
};

export const MotionRuntime = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, { y: 28, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }),
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const figure = parseFigure(el.textContent ?? "");
        if (!figure) return;
        const proxy = { n: 0 };
        gsap.to(proxy, {
          n: figure.value,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = `${figure.prefix}${Math.round(proxy.n).toLocaleString("en-US")}${figure.suffix}`;
          },
        });
      });
    });

    // Images and fonts settle after mount and move trigger positions.
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
};
