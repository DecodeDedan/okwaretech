import Link from "next/link";
import { emailLink, site } from "@/lib/site";

export const CtaBand = ({ heading = "Have a business process that deserves better software?" }: { heading?: string }) => (
  <section aria-labelledby="cta-heading" className="page">
    <div className="rounded border border-brand/20 bg-brand-soft px-6 py-14 sm:px-12 md:py-20" data-reveal>
      <h2 id="cta-heading" className="max-w-[20ch] text-4xl font-semibold tracking-[-0.035em] text-brand-ink md:text-5xl">
        {heading}
      </h2>
      <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-brand-ink/85">
        Tell us how the work runs today. We reply within one working day with questions, an approach and a
        rough range.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/contact" className="btn-primary">
          Start a project
        </Link>
        <a href={emailLink()} className="btn-secondary">
          {site.email}
        </a>
      </div>
    </div>
  </section>
);
