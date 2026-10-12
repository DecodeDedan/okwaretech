import { z } from "zod";

// The contact page builds a project brief and hands it to WhatsApp or email.
// There is no server: the brief leaves the browser only through the channel the visitor picks.

export const PROJECT_TYPES = [
  "Business system",
  "Website",
  "Mobile or desktop app",
  "Integration or automation",
  "Platform or blockchain",
  "Not sure yet",
] as const;

export const BUDGETS = [
  "Under KES 150,000",
  "KES 150,000 – 500,000",
  "KES 500,000 – 1,500,000",
  "Above KES 1,500,000",
  "Let's discuss",
] as const;

export const TIMELINES = ["As soon as possible", "Within 1–3 months", "3 months or more", "Flexible"] as const;

export const MESSAGE_MAX = 1200;

export const briefSchema = z.object({
  name: z.string().trim().min(2, "Tell us your name").max(80, "Keep your name under 80 characters"),
  company: z.string().trim().max(120, "Keep the company name under 120 characters").optional().default(""),
  projectType: z.enum(PROJECT_TYPES, { errorMap: () => ({ message: "Pick what you need built" }) }),
  budget: z.enum(BUDGETS, { errorMap: () => ({ message: "Pick a budget range" }) }),
  timeline: z.enum(TIMELINES, { errorMap: () => ({ message: "Pick a timeline" }) }),
  message: z
    .string()
    .trim()
    .min(20, "Describe the project in at least 20 characters")
    .max(MESSAGE_MAX, `Keep the description under ${MESSAGE_MAX} characters`),
});

export type Brief = z.infer<typeof briefSchema>;
export type BriefInput = z.input<typeof briefSchema>;
export type BriefErrors = Partial<Record<keyof Brief, string>>;

export type BriefResult = { ok: true; brief: Brief } | { ok: false; errors: BriefErrors };

export const validateBrief = (input: BriefInput): BriefResult => {
  const parsed = briefSchema.safeParse(input);
  if (parsed.success) return { ok: true, brief: parsed.data };

  // First message per field is the one worth showing.
  const errors = parsed.error.issues.reduce<BriefErrors>((acc, issue) => {
    const field = issue.path[0] as keyof Brief;
    return acc[field] ? acc : { ...acc, [field]: issue.message };
  }, {});
  return { ok: false, errors };
};

export const composeBrief = (brief: Brief): string =>
  [
    `Hello OkwareTech, I'm ${brief.name}${brief.company ? ` from ${brief.company}` : ""}.`,
    "",
    `Project: ${brief.projectType}`,
    `Budget: ${brief.budget}`,
    `Timeline: ${brief.timeline}`,
    "",
    brief.message,
  ].join("\n");
