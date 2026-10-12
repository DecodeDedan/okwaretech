export interface Service {
  id: string;
  title: string;
  summary: string;
  includes: readonly string[];
  proof: string; // slug of a case study that shows this service
}

export const services: readonly Service[] = [
  {
    id: "business-systems",
    title: "Business systems",
    summary:
      "The software a company runs on: orders, invoicing, stock, clients and staff, built around how you already work.",
    includes: ["Offline-first desktop and mobile apps", "Role-based access", "Cloud sync and backups", "Reports the owner can read"],
    proof: "rasko-sweet-scent",
  },
  {
    id: "websites",
    title: "Websites",
    summary:
      "Fast company websites that explain what you sell and turn a visit into a call, a message or an order.",
    includes: ["Design and build", "Product and service pages", "WhatsApp and email enquiries", "Search-ready metadata"],
    proof: "century-mabati",
  },
  {
    id: "apps",
    title: "Mobile and desktop apps",
    summary:
      "One codebase shipped to Android, Windows, macOS and Linux, packaged so it installs and works.",
    includes: ["Tauri and Flutter apps", "Native installers", "Self-updates", "App store releases"],
    proof: "u-download",
  },
  {
    id: "integrations",
    title: "Integrations and automation",
    summary:
      "Connect the tools you already pay for — payments, M-Pesa, CRMs, spreadsheets — so data moves without retyping.",
    includes: ["APIs and webhooks", "Payment integrations", "Workflow automation", "Data migration"],
    proof: "gitok",
  },
  {
    id: "platforms",
    title: "Platforms and blockchain",
    summary:
      "Products where trust has to be verifiable: on-chain records, AI agents and decentralised applications.",
    includes: ["Internet Computer canisters", "Smart contracts", "AI agent systems", "Rust services"],
    proof: "ohms",
  },
];

export interface Step {
  title: string;
  body: string;
}

export const process: readonly Step[] = [
  {
    title: "Understand",
    body: "We sit with the people who will use the system and map how work actually moves today, before anything is designed.",
  },
  {
    title: "Design",
    body: "A clickable design and a fixed scope you can hold us to: what gets built, in what order, and what it costs.",
  },
  {
    title: "Build",
    body: "Working software every week, on your devices, so you see progress and steer it instead of waiting for a reveal.",
  },
  {
    title: "Run",
    body: "We launch, train your team, and stay on to support, fix and extend the system as the business grows.",
  },
];
