import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { BriefForm } from "@/components/contact/BriefForm";
import { emailLink, formatPhone, site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project with ${site.name}: WhatsApp ${formatPhone(site.whatsapp)} or email ${site.email}.`,
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    label: "Email",
    value: site.email,
    href: emailLink(),
    external: false,
  },
  {
    label: "WhatsApp or call",
    value: formatPhone(site.whatsapp),
    href: whatsappLink("Hello OkwareTech, I'd like to talk about a project."),
    external: true,
  },
  { label: "Studio", value: site.location, href: undefined, external: false },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Start a project."
        lede="Answer five quick questions and we'll turn them into a brief you send on WhatsApp or by email. Nothing is stored on this site."
      />
      <div className="page grid gap-14 pb-12 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
        <BriefForm />
        <aside aria-labelledby="direct-heading" className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="direct-heading" className="eyebrow">
            Or reach us directly
          </h2>
          <dl className="mt-4 divide-y divide-line border-y border-line">
            {channels.map((c) => (
              <div key={c.label} className="py-5">
                <dt className="text-sm text-muted">{c.label}</dt>
                <dd className="mt-1 text-xl font-semibold tracking-[-0.015em] tabular">
                  {c.href ? (
                    <a
                      href={c.href}
                      className="link"
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {c.value}
                    </a>
                  ) : (
                    c.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Working hours are Monday to Friday, 8:00 to 18:00 East Africa Time.
          </p>
        </aside>
      </div>
    </>
  );
}
