import Link from "next/link";
import { HeroMark } from "@/components/hero/HeroMark";
import { NairobiClock } from "@/components/home/NairobiClock";
import { WorkRail } from "@/components/home/WorkRail";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { FounderBlock } from "@/components/home/FounderBlock";
import { OpenSource } from "@/components/home/OpenSource";
import { InTheWorks } from "@/components/home/InTheWorks";
import { site } from "@/lib/site";
import { CtaBand } from "@/components/CtaBand";
import { caseStudies, getCaseStudy } from "@/lib/work";
import { process, services } from "@/lib/services";

const proof = caseStudies.filter((c) => c.metric);

export default function HomePage() {
  return (
    <>
      <section className="page grid min-h-[100svh] items-center gap-8 pb-12 pt-28 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:pb-16">
        <div>
          <NairobiClock />
          <h1 className="mt-6 text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            We build the software your business runs on.
          </h1>
          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-muted md:text-xl">
            Since {site.founded}, OkwareTech has designed and built business systems, websites and apps for
            companies, offline-first where the network isn&rsquo;t, and supported long after launch.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Start a project
            </Link>
            <Link href="/work" className="btn-secondary">
              See our work
            </Link>
          </div>
          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted" aria-label="Clients and products">
            {caseStudies.map((c) => (
              <li key={c.slug}>
                <Link href={`/work/${c.slug}`} className="transition-colors duration-150 hover:text-ink">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-full min-h-[300px] lg:min-h-[560px]">
          <HeroMark />
        </div>
      </section>

      <section aria-label="Results" className="border-y border-line bg-surface">
        <dl className="page grid divide-line py-4 sm:grid-cols-3 sm:divide-x">
          {proof.map((c) => (
            <div key={c.slug} className="py-8 sm:px-8 sm:first:pl-0" data-reveal>
              <dt className="sr-only">{c.name}</dt>
              <dd>
                <span className="block text-5xl font-semibold tracking-[-0.04em] tabular md:text-6xl" data-count>
                  {c.metric!.value}
                </span>
                <span className="mt-2 block text-muted">
                  {c.metric!.label}:{" "}
                  <Link href={`/work/${c.slug}`} className="link text-ink">
                    {c.name}
                  </Link>
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <WorkRail studies={caseStudies} />

      <section aria-labelledby="services-heading" className="page py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div>
            <p className="eyebrow" data-reveal>
              What we build
            </p>
            <h2 id="services-heading" className="mt-3 text-4xl font-semibold tracking-[-0.035em] md:text-5xl" data-reveal>
              Five things, done properly.
            </h2>
          </div>
          <ol className="border-t border-line">
            {services.map((service, index) => {
              const proofCase = getCaseStudy(service.proof);
              return (
                <li key={service.id} className="border-b border-line" data-reveal>
                  <Link
                    href={`/services#${service.id}`}
                    className="group grid gap-2 py-7 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6"
                  >
                    <span className="eyebrow tabular">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block text-2xl font-semibold tracking-[-0.02em] transition-colors duration-150 group-hover:text-brand-ink md:text-3xl">
                        {service.title}
                      </span>
                      <span className="mt-2 block max-w-[56ch] text-muted">{service.summary}</span>
                    </span>
                    {proofCase && <span className="eyebrow whitespace-nowrap">See {proofCase.name} →</span>}
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section aria-labelledby="process-heading" className="page grid gap-12 py-24 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow" data-reveal>
            How we work
          </p>
          <h2 id="process-heading" className="mt-3 text-4xl font-semibold tracking-[-0.035em] md:text-5xl" data-reveal>
            You see working software every week.
          </h2>
        </div>
        <ProcessTimeline steps={process} />
      </section>

      <OpenSource />

      <InTheWorks />

      <FounderBlock />

      <CtaBand />
    </>
  );
}
