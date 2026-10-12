import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseCover } from "@/components/work/CaseCover";
import { CtaBand } from "@/components/CtaBand";
import { caseStudies, getCaseStudy, nextCaseStudy } from "@/lib/work";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export const generateStaticParams = () => caseStudies.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return {
    title: study.name,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: study.image ? { images: [{ url: study.image.src, alt: study.image.alt }] } : undefined,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  const next = nextCaseStudy(study.slug);

  const facts = [
    { term: "Client", value: study.client },
    { term: "Type", value: study.categories.join(", ") },
    { term: "Runs on", value: study.platforms },
  ];

  return (
    <article>
      <header className="page pb-10 pt-36 md:pt-44">
        <nav aria-label="Breadcrumb" className="eyebrow">
          <Link href="/work" className="link">
            Work
          </Link>{" "}
          / {study.name}
        </nav>
        <h1 className="mt-4 text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.045em]">{study.name}</h1>
        <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-muted md:text-xl">{study.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {study.liveUrl && (
            <a href={study.liveUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">
              Visit live site ↗
            </a>
          )}
          {study.repoUrl && (
            <a href={study.repoUrl} className="btn-secondary" target="_blank" rel="noopener noreferrer">
              Source on GitHub ↗
            </a>
          )}
        </div>
      </header>

      <div className="page">
        <CaseCover study={study} priority sizes="(min-width:1240px) 1176px, 100vw" className="aspect-[16/9] border border-line" />
      </div>

      <div className="page grid gap-12 py-20 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <dl className="divide-y divide-line border-y border-line">
            {facts.map((f) => (
              <div key={f.term} className="grid grid-cols-[7rem_1fr] gap-4 py-4">
                <dt className="eyebrow pt-0.5">{f.term}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
            {study.stack.length > 0 && (
              <div className="grid grid-cols-[7rem_1fr] gap-4 py-4">
                <dt className="eyebrow pt-0.5">Built with</dt>
                <dd>
                  <ul className="flex flex-wrap gap-1.5">
                    {study.stack.map((s) => (
                      <li key={s} className="rounded border border-line bg-surface px-2 py-0.5 font-mono text-[13px]">
                        {s}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
          {study.metric && (
            <p className="mt-8">
              <span className="block text-6xl font-semibold tracking-[-0.04em] tabular" data-count>
                {study.metric.value}
              </span>
              <span className="mt-1 block text-muted">{study.metric.label}</span>
            </p>
          )}
        </aside>

        <div className="max-w-[64ch] space-y-14">
          <section data-reveal>
            <h2 className="eyebrow">The problem</h2>
            <p className="mt-3 text-2xl leading-snug tracking-[-0.015em]">{study.challenge}</p>
          </section>
          <section data-reveal>
            <h2 className="eyebrow">What we delivered</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {study.delivered.map((d) => (
                <li key={d} className="flex gap-4 py-4 text-lg">
                  <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-[2px] bg-brand" />
                  {d}
                </li>
              ))}
            </ul>
          </section>
          <section data-reveal>
            <h2 className="eyebrow">The result</h2>
            <p className="mt-3 text-2xl leading-snug tracking-[-0.015em]">{study.outcome}</p>
          </section>
        </div>
      </div>

      <nav aria-label="Next project" className="page pb-24">
        <Link href={`/work/${next.slug}`} className="group grid items-center gap-6 border-y border-line py-10 md:grid-cols-[1fr_320px]">
          <span>
            <span className="eyebrow">Next project</span>
            <span className="mt-2 block text-4xl font-semibold tracking-[-0.035em] transition-colors duration-150 group-hover:text-brand-ink md:text-6xl">
              {next.name} →
            </span>
          </span>
          <CaseCover study={next} sizes="320px" className="hidden aspect-[4/3] border border-line md:block" />
        </Link>
      </nav>

      <CtaBand />
    </article>
  );
}
