import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MotionRuntime } from "@/components/motion/MotionRuntime";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-mono", display: "swap" });

const description =
  "OkwareTech builds software solutions for businesses: business systems, websites, mobile and desktop apps, integrations and platforms. Based in Nairobi, Kenya.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description,
  applicationName: site.name,
  keywords: [
    "software development company Kenya",
    "business systems",
    "website development Nairobi",
    "mobile app development Kenya",
    "OkwareTech",
  ],
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, url: site.url, title: site.name, description, locale: "en_KE" },
  twitter: { card: "summary_large_image", title: site.name, description },
};

export const viewport: Viewport = { themeColor: "#F5F4F0", colorScheme: "light" };

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/okwaretech-mark.svg`,
  email: site.email,
  telephone: site.whatsapp,
  description,
  address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
  founder: { "@type": "Person", name: site.founder.name, url: site.founder.portfolio },
  sameAs: [site.socials.github, site.socials.linkedin, site.socials.x],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // JSON-LD from our own constants; no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MotionRuntime />
      </body>
    </html>
  );
}
