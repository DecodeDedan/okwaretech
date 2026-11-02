import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { caseStudies } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/services", "/about", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const cases = caseStudies.map((c) => ({
    url: `${site.url}/work/${c.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.7,
    ...(c.image ? { images: [`${site.url}${c.image.src}`] } : {}),
  }));
  return [...pages, ...cases];
}
