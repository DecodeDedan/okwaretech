import { LogoMark } from "@/components/Logo";
import { inTheWorks } from "@/lib/openSource";
import { emailLink, whatsappLink } from "@/lib/site";

const NOTIFY = `Hello OkwareTech, please let me know when ${inTheWorks.name} launches.`;

export const InTheWorks = () => (
  <section aria-labelledby="works-heading" className="page py-12">
    <div className="relative grid gap-8 overflow-hidden rounded border border-ink bg-ink px-6 py-12 text-paper sm:px-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:py-16" data-reveal>
      <div>
        <p className="font-mono text-[13px] text-paper/70">
          <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-[#5FC9BF] motion-reduce:animate-none" aria-hidden="true" />
          {inTheWorks.status}
        </p>
        <h2 id="works-heading" className="mt-4 text-5xl font-semibold tracking-[-0.045em] md:text-7xl">
          {inTheWorks.name}
        </h2>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-paper/80">{inTheWorks.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={whatsappLink(NOTIFY)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-paper text-ink hover:bg-[#CFE5E1]"
          >
            Notify me on WhatsApp
          </a>
          <a href={emailLink(NOTIFY, `${inTheWorks.name} launch`)} className="btn border border-paper/30 text-paper hover:border-paper">
            Notify me by email
          </a>
        </div>
      </div>
      <LogoMark className="hidden h-32 w-32 opacity-90 [&_path]:stroke-paper md:block" />
    </div>
  </section>
);
