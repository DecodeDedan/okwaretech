import Image from "next/image";
import { site } from "@/lib/site";

export const FounderBlock = () => (
  <section aria-labelledby="founder-heading" className="page grid items-center gap-10 py-24 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
    <figure className="relative" data-reveal>
      <div className="relative aspect-[555/478] overflow-hidden rounded border border-line bg-brand-soft">
        <Image
          src="/founder.png"
          alt={`${site.founder.name}, founder of ${site.name}`}
          fill
          sizes="(min-width:768px) 40vw, 100vw"
          className="object-cover object-top"
        />
      </div>
      <figcaption className="eyebrow mt-3">
        {site.founder.name} — {site.founder.role}
      </figcaption>
    </figure>
    <div>
      <p className="eyebrow" data-reveal>
        Who builds it
      </p>
      <h2 id="founder-heading" className="mt-3 text-4xl font-semibold tracking-[-0.035em] md:text-5xl" data-reveal>
        Led by an engineer who ships to production.
      </h2>
      <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted" data-reveal>
        <p>
          {site.founder.name} founded {site.name} in {site.founded} to give businesses the kind of engineering
          usually reserved for funded tech companies. He brings five years of shipping
          production software — fintech and payment products, engineering leadership, developer tools and
          blockchain systems — in Rust, TypeScript and Flutter.
        </p>
        <p>
          Every {site.name} project is designed and reviewed by him personally — you talk to the person
          writing the system, not a sales layer.
        </p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3" data-reveal>
        <a href={site.founder.portfolio} className="btn-secondary">
          Founder&rsquo;s portfolio
        </a>
        <a href={site.founder.linkedin} className="btn-secondary" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </div>
  </section>
);
