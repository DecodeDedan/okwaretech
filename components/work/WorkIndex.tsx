"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { CaseCover } from "@/components/work/CaseCover";
import { CATEGORIES, filterByCategory, type Category } from "@/lib/work";

type Filter = Category | "All";
const FILTERS: readonly Filter[] = ["All", ...CATEGORIES];

export const WorkIndex = () => {
  const [filter, setFilter] = useState<Filter>("All");
  const reduce = useReducedMotion();
  const studies = filterByCategory(filter);
  const transition = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 380, damping: 36 };

  return (
    <LayoutGroup>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count = filterByCategory(f).length;
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={`relative min-h-[40px] rounded px-4 text-[15px] transition-colors duration-150 ${
                active ? "text-paper" : "border border-line bg-surface text-ink hover:border-ink"
              }`}
            >
              {active && (
                <motion.span layoutId="filter-pill" transition={transition} className="absolute inset-0 rounded bg-ink" aria-hidden="true" />
              )}
              <span className="relative">
                {f} <span className="tabular opacity-70">{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {studies.length} {studies.length === 1 ? "project" : "projects"}
      </p>

      <motion.ul layout={!reduce} className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
        <AnimatePresence initial={false} mode="popLayout">
          {studies.map((study) => (
            <motion.li
              key={study.slug}
              layout={!reduce}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={transition}
            >
              <Link href={`/work/${study.slug}`} className="group block rounded">
                <CaseCover study={study} sizes="(min-width:768px) 600px, 100vw" className="aspect-[4/3] border border-line" />
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-[-0.02em] transition-colors duration-150 group-hover:text-brand-ink">
                      {study.name}
                    </h2>
                    <p className="mt-2 max-w-[48ch] text-muted">{study.summary}</p>
                  </div>
                  <span aria-hidden="true" className="mt-1 text-xl transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </div>
                <p className="eyebrow mt-3">
                  {study.client} · {study.platforms}
                </p>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </LayoutGroup>
  );
};
