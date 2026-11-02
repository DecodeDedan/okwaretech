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
  "OkwareTech is a software development company serving businesses in Kenya, across Africa and beyond with business systems, websites, mobile and desktop apps, integrations and platforms.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s: ${site.name}` },
  description,
  category: "technology",
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  applicationName: site.name,
  keywords: [
    "software development company Kenya",
    "software development company Africa",
    "software development company worldwide",
    "business systems",
    "website development Kenya",
    "mobile app development Kenya",
    "mobile app development Africa",
    "OkwareTech",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: `${site.name}: ${site.tagline}`,
    description,
    locale: "en_KE",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` }],
  },
  twitter: { card: "summary_large_image", title: site.name, description },
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

export const viewport: Viewport = { themeColor: "#F5F4F0", colorScheme: "light" };

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/okwaretech-mark.svg`,
  email: site.email,
  description,
  address: { "@type": "PostalAddress", addressCountry: "KE" },
  areaServed: ["Kenya", "Africa", "Worldwide"],
  founder: [
    { "@type": "Person", name: site.founder.name, url: site.founder.linkedin },
    { "@type": "Person", name: site.cofounder.name, url: site.cofounder.linkedin },
  ],
  sameAs: [site.socials.github, site.socials.linkedin, site.socials.x],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  description,
  publisher: { "@id": `${site.url}/#organization` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // JSON-LD from our own constants; no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...organization, "@id": `${site.url}/#organization` }) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
        />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MotionRuntime />
      </body>
    </html>
  );
}
