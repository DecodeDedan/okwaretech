import Image from "next/image";
import { site } from "@/lib/site";

export const FounderBlock = () => (
  <section aria-labelledby="founders-heading" className="page py-24">
    <div className="max-w-[65ch]">
      <p className="eyebrow" data-reveal>
        Leadership
      </p>
      <h2 id="founders-heading" className="mt-3 text-4xl font-semibold tracking-[-0.035em] md:text-5xl" data-reveal>
        Technical depth paired with business strategy.
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-muted" data-reveal>
        {site.name} was built to give growing businesses dependable software and practical digital strategy,
        free of disconnected account managers or off-the-shelf guesswork. You work directly with the co-founders shaping
        your technology and growth.
      </p>
    </div>

    <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
      {site.founders.map((person) => (
        <article
          key={person.name}
          className="flex flex-col justify-between rounded border border-line bg-surface p-6 sm:p-8"
          data-reveal
        >
          <div>
            <figure className="relative">
              <div className="relative aspect-[555/478] overflow-hidden rounded border border-line bg-brand-soft">
                <Image
                  src={person.image}
                  alt={`${person.name}, ${person.role} at ${site.name}`}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="eyebrow mt-3">
                {person.name} · {person.role}
              </figcaption>
            </figure>
            <div className="mt-6">
              <h3 className="text-2xl font-semibold tracking-[-0.025em] md:text-3xl">
                {person.name}
              </h3>
              <p className="eyebrow mt-1 text-brand-ink font-medium">
                {person.role}
              </p>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-muted">
                {person.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {person.linkedin && (
            <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
              <a
                href={person.linkedin}
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${person.name} on LinkedIn`}
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V8.99h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45h3.57V8.99H3.56v11.46Z"
                  />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          )}
        </article>
      ))}
    </div>
  </section>
);
