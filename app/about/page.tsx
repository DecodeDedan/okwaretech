import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { FounderBlock } from "@/components/home/FounderBlock";
import { CtaBand } from "@/components/CtaBand";
import { LogoMark } from "@/components/Logo";
import { caseStudies } from "@/lib/work";
import { packages, totalDownloads } from "@/lib/openSource";
import { InTheWorks } from "@/components/home/InTheWorks";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Company",
  description: `${site.name} is a software company in Nairobi, Kenya, founded in ${site.founded} by ${site.founder.name} and ${site.cofounder.name}, building systems, websites and apps for businesses.`,
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Built for the real conditions",
    body: "Patchy networks, shared devices, staff with different roles. We design for the place the software will actually be used.",
  },
  {
    title: "You own what we build",
    body: "Your code, your data, your accounts. Everything is handed over and documented, so you are never locked in to us.",
  },
  {
    title: "Small, senior, direct",
    body: "The engineer who designs your system is the one you talk to. No account managers relaying messages.",
  },
  {
    title: "We stay after launch",
    body: "Software is a living part of the business. We support, fix and extend it as the business changes.",
  },
] as const;

export default function AboutPage() {
  const clientWork = caseStudies.filter((c) => !c.client.startsWith("OkwareTech") && c.client !== "Open source").length;
  const ownWork = caseStudies.length - clientWork;

  return (
    <>
      <PageIntro
        eyebrow="Company"
        title="A software company for businesses that run on more than spreadsheets."
        lede={`${site.name} designs, builds and supports custom software for companies in Kenya and beyond. We take on client systems and websites, and we build our own products and open-source tools — which is how we keep our engineering sharp.`}
      />

      <section aria-labelledby="mark-heading" className="page grid items-center gap-10 border-y border-line py-16 md:grid-cols-[auto_1fr] md:gap-16">
        <LogoMark className="h-28 w-28 md:h-36 md:w-36" />
        <div>
          <h2 id="mark-heading" className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
            The mark: a business, and the piece it was missing.
          </h2>
          <p className="mt-3 max-w-[60ch] text-lg leading-relaxed text-muted">
            The open &ldquo;O&rdquo; is your business as it stands. The teal module is the software we build to fit the gap
            — made to the exact shape of the opening, not bought off a shelf.
          </p>
          <p className="eyebrow mt-4 tabular">
            Running since {site.founded} · {clientWork} client projects · {ownWork} products and open-source tools ·{" "}
            {packages.length} published packages, {totalDownloads.toLocaleString("en-US")} downloads
          </p>
        </div>
      </section>

      <section aria-labelledby="principles-heading" className="page py-24">
        <h2 id="principles-heading" className="text-4xl font-semibold tracking-[-0.035em] md:text-5xl" data-reveal>
          How we operate.
        </h2>
        <ul className="mt-12 grid gap-px overflow-hidden rounded border border-line bg-line sm:grid-cols-2">
          {principles.map((p) => (
            <li key={p.title} className="bg-surface p-8" data-reveal>
              <h3 className="text-xl font-semibold tracking-[-0.015em]">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <InTheWorks />
      <FounderBlock />
      <CtaBand />
    </>
  );
}
