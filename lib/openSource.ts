// What OkwareTech publishes for other developers. Download counts are all-time
// figures from crates.io, read 2026-10-01; update them together with that date.

export const CRATES_PROFILE = "https://crates.io/users/okwareddevnest";
export const DOWNLOADS_READ_ON = "1 October 2026";

export interface CratePackage {
  name: string; // crates.io crate name, also its URL slug
  summary: string;
  downloads: number;
}

export const packages: readonly CratePackage[] = [
  { name: "ohms-adaptq", summary: "LLM quantization CLI, so large models run on local hardware.", downloads: 4848 },
  { name: "vaultarq", summary: "Rust SDK for Vaultarq, a developer-first secrets manager.", downloads: 3918 },
  { name: "dfxmon-cli", summary: "Command-line tool for the dfxmon blockchain canister.", downloads: 2339 },
  { name: "rson-core", summary: "Core parsing and value types for RSON.", downloads: 1886 },
  { name: "serde_rson", summary: "Serde integration for RSON.", downloads: 1375 },
  { name: "rson-schema", summary: "Schema validation for RSON.", downloads: 1010 },
  { name: "rson-cli", summary: "Command-line tools for RSON.", downloads: 974 },
];

export const totalDownloads = packages.reduce((sum, p) => sum + p.downloads, 0);

export interface OpenSourceProject {
  name: string;
  summary: string;
  repoUrl: string;
  caseSlug: string; // case study in lib/work.ts
}

export const openSource: readonly OpenSourceProject[] = [
  {
    name: "GitOk",
    summary: "35+ Git commands with safety prompts, used by 2,000+ developers.",
    repoUrl: "https://github.com/okwareddevnest/gitok",
    caseSlug: "gitok",
  },
  {
    name: "RSON",
    summary: "JSON with comments and real types, with parsers in three languages.",
    repoUrl: "https://github.com/RSON-Rust-Serialized-Object-Notation",
    caseSlug: "rson",
  },
  {
    name: "U-Download",
    summary: "Zero-dependency desktop media downloader in Rust and Tauri.",
    repoUrl: "https://github.com/okwareddevnest/U-Download",
    caseSlug: "u-download",
  },
];

// The product currently in development. Kept here so the home page and Company page agree.
export const inTheWorks = {
  name: "PolyDomain",
  status: "In development · launching in the coming weeks",
  summary:
    "A next-generation domain registration platform: one place to register a wide range of domains, from country codes to institutional names, for anyone, anywhere.",
} as const;
