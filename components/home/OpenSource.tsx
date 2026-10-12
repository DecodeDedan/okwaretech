import Link from "next/link";
import { CRATES_PROFILE, DOWNLOADS_READ_ON, openSource, packages, totalDownloads } from "@/lib/openSource";
import { site } from "@/lib/site";

export const OpenSource = () => (
  <section aria-labelledby="oss-heading" className="page py-24">
    <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
      <div>
        <p className="eyebrow" data-reveal>
          Open source and packages
        </p>
        <h2 id="oss-heading" className="mt-3 text-4xl font-semibold tracking-[-0.035em] md:text-5xl" data-reveal>
          We publish what we build.
        </h2>
        <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-muted" data-reveal>
          Developers around the world install our code. It is the same engineering that goes into client systems.
        </p>
        <p className="mt-8" data-reveal>
          <span className="block text-6xl font-semibold tracking-[-0.04em] tabular" data-count>
            {totalDownloads.toLocaleString("en-US")}
          </span>
          <span className="mt-1 block text-muted">
            downloads of our {packages.length} Rust crates on crates.io
          </span>
        </p>
      </div>

      <div className="space-y-12">
        <div data-reveal>
          <h3 className="eyebrow">Published packages</h3>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {packages.map((p) => (
              <li key={p.name}>
                <a
                  href={`https://crates.io/crates/${p.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-1 py-4 sm:grid-cols-[12rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6"
                >
                  <span className="font-mono text-[15px] transition-colors duration-150 group-hover:text-brand-ink">{p.name}</span>
                  <span className="text-muted">{p.summary}</span>
                  <span className="eyebrow tabular sm:text-right">{p.downloads.toLocaleString("en-US")} downloads</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted">
            Counts read on {DOWNLOADS_READ_ON}.{" "}
            <a href={CRATES_PROFILE} target="_blank" rel="noopener noreferrer" className="link text-ink">
              All crates ↗
            </a>
          </p>
        </div>

        <div data-reveal>
          <h3 className="eyebrow">Open-source projects</h3>
          <ul className="mt-3 grid gap-px overflow-hidden rounded border border-line bg-line sm:grid-cols-3">
            {openSource.map((p) => (
              <li key={p.name} className="flex flex-col bg-surface p-6">
                <Link href={`/work/${p.caseSlug}`} className="text-xl font-semibold tracking-[-0.015em] hover:text-brand-ink">
                  {p.name}
                </Link>
                <p className="mt-2 flex-1 text-muted">{p.summary}</p>
                <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="link eyebrow mt-4 self-start text-ink">
                  Source ↗
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted">
            More on{" "}
            <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="link text-ink">
              GitHub ↗
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>
);
