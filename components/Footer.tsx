import Link from "next/link";
import { Logo } from "@/components/Logo";
import { emailLink, nav, site } from "@/lib/site";

export const Footer = () => (
  <footer className="mt-32 border-t border-line bg-surface">
    <div className="page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
      <div>
        <Logo />
        <p className="mt-4 max-w-[36ch] text-muted">
          We build the software businesses run on: systems, websites and apps, from {site.location}, since{" "}
          {site.founded}.
        </p>
      </div>
      <nav aria-label="Footer">
        <h2 className="eyebrow">Explore</h2>
        <ul className="mt-4 space-y-2">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <h2 className="eyebrow">Talk to us</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <a href={emailLink()} className="link">
              {site.email}
            </a>
          </li>
          <li>
            <a href={site.socials.github} className="link" rel="noopener noreferrer" target="_blank">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.socials.linkedin} className="link" rel="noopener noreferrer" target="_blank">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="page flex flex-col gap-2 border-t border-line py-6 text-sm text-muted sm:flex-row sm:justify-between">
      <p>
        © {new Date().getFullYear()} {site.legalName}. {site.location}.
      </p>
      <p>
        Co-founded by{" "}
        <a href={site.founder.portfolio} className="link">
          {site.founder.name}
        </a>{" "}
        &amp; {site.cofounder.name}
      </p>
    </div>
  </footer>
);
