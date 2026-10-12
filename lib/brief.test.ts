import { describe, expect, test } from "vitest";
import { composeBrief, validateBrief, MESSAGE_MAX } from "./brief";
import { caseStudies, filterByCategory, getCaseStudy, nextCaseStudy } from "./work";
import { emailLink, formatPhone, whatsappLink } from "./site";

const valid = {
  name: "Jane Wanjiku",
  company: "Wanjiku Hardware",
  projectType: "Business system",
  budget: "Let's discuss",
  timeline: "Flexible",
  message: "We need stock and invoicing for three shops.",
} as const;

describe("validateBrief", () => {
  test("accepts a complete brief and trims fields", () => {
    const result = validateBrief({ ...valid, name: "  Jane Wanjiku  " });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.brief.name).toBe("Jane Wanjiku");
  });

  test("reports one message per invalid field", () => {
    const result = validateBrief({ ...valid, name: "J", message: "short" });
    expect(result).toEqual({
      ok: false,
      errors: { name: "Tell us your name", message: "Describe the project in at least 20 characters" },
    });
  });

  test("rejects an option that is not in the list", () => {
    const result = validateBrief({ ...valid, budget: "a million dollars" as never });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.budget).toBe("Pick a budget range");
  });

  test("rejects a message over the limit", () => {
    const result = validateBrief({ ...valid, message: "x".repeat(MESSAGE_MAX + 1) });
    expect(result.ok).toBe(false);
  });

  test("company is optional", () => {
    const { company: _omit, ...rest } = valid;
    expect(validateBrief(rest).ok).toBe(true);
  });
});

describe("composeBrief", () => {
  test("includes the company only when given", () => {
    const withCompany = validateBrief(valid);
    const without = validateBrief({ ...valid, company: "" });
    if (!withCompany.ok || !without.ok) throw new Error("fixture should be valid");
    expect(composeBrief(withCompany.brief)).toContain("I'm Jane Wanjiku from Wanjiku Hardware.");
    expect(composeBrief(without.brief)).toContain("I'm Jane Wanjiku.\n");
  });
});

describe("contact links", () => {
  test("whatsapp link uses digits only and encodes the text", () => {
    expect(whatsappLink("a b&c")).toBe("https://wa.me/254704860552?text=a%20b%26c");
  });

  test("email link encodes subject and body", () => {
    expect(emailLink("hi there")).toBe(
      "mailto:info@okwaretech.com?subject=Project%20enquiry%20via%20okwaretech.com&body=hi%20there",
    );
  });

  test("formats a Kenyan number in groups", () => {
    expect(formatPhone("+254704860552")).toBe("+254 704 860 552");
  });
});

describe("work data", () => {
  test("slugs are unique", () => {
    const slugs = caseStudies.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  test("next case study wraps from last to first", () => {
    const last = caseStudies[caseStudies.length - 1];
    expect(nextCaseStudy(last.slug).slug).toBe(caseStudies[0].slug);
  });

  test("unknown slug returns undefined", () => {
    expect(getCaseStudy("nope")).toBeUndefined();
  });

  test("category filter returns only matching cases", () => {
    const sites = filterByCategory("Websites");
    expect(sites.length).toBeGreaterThan(0);
    expect(sites.every((c) => c.categories.includes("Websites"))).toBe(true);
    expect(filterByCategory("All")).toHaveLength(caseStudies.length);
  });
});

describe("open source data", () => {
  test("total downloads is the sum of every crate", async () => {
    const { packages, totalDownloads } = await import("./openSource");
    expect(totalDownloads).toBe(packages.reduce((s, p) => s + p.downloads, 0));
    expect(totalDownloads).toBe(16350);
  });

  test("every open-source project links to an existing case study", async () => {
    const { openSource } = await import("./openSource");
    expect(openSource.every((p) => getCaseStudy(p.caseSlug))).toBe(true);
  });
});
