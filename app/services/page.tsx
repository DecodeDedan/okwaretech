import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { CaseCover } from "@/components/work/CaseCover";
import { CtaBand } from "@/components/CtaBand";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { process, services } from "@/lib/services";
import { getCaseStudy } from "@/lib/work";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Business systems, websites, mobile and desktop apps, integrations and blockchain platforms, designed and built by OkwareTech in Nairobi.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Services"
        title="Software built around how your business works."
        lede="We start from the work your people do every day and build the system that makes it faster, safer and visible, then we stay to run it."
      />

      <div className="page space-y-6 pb-24">
        {services.map((service, index) => {
          const proof = getCaseStudy(service.proof);
          return (
            <section
              key={service.id}
              id={service.id}
              aria-labelledby={`${service.id}-heading`}
              className="grid gap-8 rounded border border-line bg-surface p-6 sm:p-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12"
              data-reveal
            >
              <div>
                <p className="eyebrow tabular">{String(index + 1).padStart(2, "0")}</p>
                <h2 id={`${service.id}-heading`} className="mt-2 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                  {service.title}
                </h2>
                <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-muted">{service.summary}</p>
                <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-[2px] bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {proof && (
                <Link href={`/work/${proof.slug}`} className="group block self-start rounded">
                  <CaseCover study={proof} sizes="(min-width:1024px) 460px, 100vw" className="aspect-[4/3] border border-line" />
                  <p className="eyebrow mt-3">
                    Case study: <span className="text-ink underline decoration-line underline-offset-4 group-hover:decoration-brand">{proof.name}</span>
                  </p>
                </Link>
              )}
            </section>
          );
        })}
      </div>

      <section aria-labelledby="process-heading" className="page grid gap-12 py-16 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">How we work</p>
          <h2 id="process-heading" className="mt-3 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
            Four steps, no surprises.
          </h2>
        </div>
        <ProcessTimeline steps={process} />
      </section>

      <CtaBand />
    </>
  );
}
