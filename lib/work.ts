// Every project OkwareTech shows. Figures and claims are taken from the founder's
// published portfolio; nothing here is estimated.

export const CATEGORIES = [
  "Business systems",
  "Websites",
  "Products",
  "Platforms",
  "Developer tools",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface CaseStudy {
  slug: string;
  name: string;
  client: string;
  categories: readonly Category[];
  summary: string;
  challenge: string;
  delivered: readonly string[];
  outcome: string;
  metric?: { value: string; label: string };
  stack: readonly string[];
  platforms: string;
  image?: { src: string; alt: string };
  liveUrl?: string;
  repoUrl?: string;
}

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "rasko-sweet-scent",
    name: "Rasko Sweet Scent",
    client: "Rasko Sweet Scent, Molo, Nakuru County",
    categories: ["Business systems", "Websites"],
    summary:
      "One offline-first system that runs a eucalyptus foliage business — clients, orders, invoices, stock and suppliers — plus the public website.",
    challenge:
      "Rasko grows, grades and bunches fresh-cut eucalyptus for florists, decorators and wholesalers. The business ran on notebooks and spreadsheets, on a farm where the connection comes and goes, and the owner could not see the true position of the business without being on site.",
    delivered: [
      "An installable Windows and Android app from a single React and TypeScript codebase in a Tauri 2 shell",
      "Offline-first storage on local SQLite that syncs to Supabase when the connection returns",
      "Role-based access, so staff see only what their role allows",
      "Orders, branded invoices and receipts, client balances, products, stock and suppliers in one place",
      "The public website at raskosweetscent.com, shipped from the same monorepo on a shared design system",
    ],
    outcome:
      "Paper and spreadsheets replaced by one system that keeps working with no signal, and the owner reads the state of the business from a phone.",
    stack: ["Tauri 2", "React", "TypeScript", "SQLite", "Supabase", "Next.js"],
    platforms: "Windows, Android, web",
    image: { src: "/work/rasko.jpg", alt: "The Rasko Sweet Scent website and business app" },
    liveUrl: "https://www.raskosweetscent.com",
  },
  {
    slug: "century-mabati",
    name: "Century Mabati",
    client: "Century Mabati LTD, Nakuru",
    categories: ["Websites"],
    summary:
      "The website for a Nakuru roofing-sheet manufacturer: eight roof profiles shown on the sheet, seven colours, and a quote form that lands in WhatsApp.",
    challenge:
      "Century Mabati rolls tile, box-profile, corrugated and stone-coated roofing on its own machines, cut to the length a roof needs. Buyers compare profiles and colours on their phones before they call, and orders hinge on exact sheet lengths and counts that get lost in calls.",
    delivered: [
      "A product walkthrough of all eight profiles — C-868, C-Wave, C-800, C-840, Corrugated, Box Profile IT-5 and two stone-coated tiles — animated on the sheet as you scroll",
      "A colour selector across the seven colours, with a live sheet-length display",
      "A quote form for product, colour, sheet length, number of sheets and delivery location that opens as a ready WhatsApp message to sales",
      "Factory, past projects and accessories sections, plus click-to-call, directions to the yard and a light, dark and system theme",
    ],
    outcome:
      "Customers arrive at the sales team with the profile, colour, length and quantity already decided, in a WhatsApp message instead of a back-and-forth call.",
    stack: ["Vite", "GSAP", "ScrollTrigger", "Vercel"],
    platforms: "Web",
    image: { src: "/work/century-mabati.jpg", alt: "The Century Mabati website: Build with the best" },
    liveUrl: "https://century-mabati.vercel.app/",
  },
  {
    slug: "ithreem",
    name: "IThreeM",
    client: "OkwareTech product",
    categories: ["Platforms", "Products"],
    summary:
      "A decentralised 2D and 3D game engine on the Internet Computer, with on-chain assets and in-game transactions.",
    challenge:
      "Blockchain games usually keep the game itself on ordinary servers and only the tokens on-chain. IThreeM set out to build and run the games themselves on the Internet Computer.",
    delivered: [
      "Rendering for 2D and 3D games in the browser through WebGL and WebAssembly",
      "Physics simulation and asset management",
      "On-chain assets and in-game transactions in Rust and Motoko canisters",
    ],
    outcome: "An engine where the game, its assets and its economy all live on the same chain.",
    stack: ["Rust", "Motoko", "Internet Computer", "WebGL", "WebAssembly", "three.js"],
    platforms: "Web, Internet Computer",
    image: { src: "/work/ithreem.png", alt: "The IThreeM game engine" },
    liveUrl: "https://ithreem.com",
  },
  {
    slug: "u-download",
    name: "U-Download",
    client: "OkwareTech product",
    categories: ["Products"],
    summary:
      "A desktop media downloader with a Rust and Tauri core that bundles its own tooling, so it installs and works with nothing else on the machine.",
    challenge:
      "Media downloaders usually ask people to install yt-dlp, ffmpeg and friends themselves, which most people cannot do. The goal was one installer that just works on every desktop.",
    delivered: [
      "A Rust and Tauri desktop app that bundles yt-dlp, aria2c and ffmpeg",
      "Multi-connection downloads accelerated with aria2c",
      "MP4 or MP3 output, per-second trimming and live speed and ETA",
      "Native packages for Linux, Windows and macOS",
    ],
    outcome: "Used by more than 1,500 people across Linux, Windows and macOS.",
    metric: { value: "1,500+", label: "users on three operating systems" },
    stack: ["Rust", "Tauri", "React", "TypeScript", "ffmpeg", "aria2c"],
    platforms: "Linux, Windows, macOS",
    image: { src: "/work/udownload.jpg", alt: "The U-Download desktop app" },
    liveUrl: "https://u-download.vercel.app/",
    repoUrl: "https://github.com/okwareddevnest/U-Download",
  },
  {
    slug: "gitok",
    name: "GitOk",
    client: "Open source",
    categories: ["Developer tools"],
    summary:
      "35+ Git commands with safety prompts, an interactive cheatsheet and self-updates, released through an automated pipeline.",
    challenge:
      "Everyday Git is long commands and easy-to-make destructive mistakes. GitOk shortens the common paths and puts a confirmation in front of the dangerous ones.",
    delivered: [
      "35+ aliases and functions, including pushall, unpush and an interactive gitcheatsheet",
      "Confirmation prompts before destructive operations",
      "Self-updates with semantic versioning",
      "A GitHub Actions release pipeline; works on Linux, macOS, WSL and Git Bash, with Fish support",
    ],
    outcome: "Adopted by more than 2,000 developers in over 40 countries.",
    metric: { value: "2,000+", label: "developers in 40+ countries" },
    stack: ["Bash", "Fish", "Git", "GitHub Actions"],
    platforms: "Linux, macOS, Windows (WSL, Git Bash)",
    image: { src: "/work/gitok.jpg", alt: "GitOk running in a terminal" },
    repoUrl: "https://github.com/okwareddevnest/gitok",
  },
  {
    slug: "ohms",
    name: "OHMS 2.0",
    client: "OkwareTech product",
    categories: ["Platforms", "Products"],
    summary:
      "AI agents composed from plain-language goals, running as Internet Computer canisters with verifiable on-chain execution.",
    challenge:
      "Autonomous agents are hard to trust when you cannot see what they did or what they cost. OHMS runs agents where every step is verifiable and the economics are transparent.",
    delivered: [
      "An agent factory that turns plain-language goals into working agents",
      "A coordinator for multi-agent work that can plan, act and report",
      "Model and tool registries, with hosted LLMs reached over secure HTTPS outcalls",
      "Subscription economics, all running as ICP canisters",
    ],
    outcome:
      "2nd place in the WCHL Kenya national and Africa regional rounds, and a pitch at the Global Finale.",
    metric: { value: "2nd", label: "WCHL Africa regional round" },
    stack: ["Rust", "Motoko", "TypeScript", "React 19", "Internet Computer", "WebAssembly"],
    platforms: "Web, Internet Computer",
    image: { src: "/work/ohms.jpg", alt: "The OHMS agent platform" },
    liveUrl: "https://weamn-piaaa-aaaah-arlca-cai.icp0.io/",
    repoUrl: "https://github.com/OHMS-DeAI",
  },
  {
    slug: "rson",
    name: "RSON",
    client: "Open source",
    categories: ["Developer tools"],
    summary:
      "A superset of JSON with comments, structs, enums and optionals. Every JSON file is valid RSON, with parsers for Rust, TypeScript and Python.",
    challenge:
      "JSON configuration cannot carry comments or real types, so teams document it somewhere else and validate it by hand.",
    delivered: [
      "The RSON specification",
      "Parsers for Rust (serde_rson), TypeScript and Python",
      "Schema validation and a command-line tool, published on crates.io",
    ],
    outcome: "A drop-in format: existing JSON keeps working, and new files gain comments and types.",
    stack: ["Rust", "Serde", "TypeScript", "Python"],
    platforms: "Rust, Node.js, Python",
    image: { src: "/work/rson.jpg", alt: "RSON syntax compared with JSON" },
    repoUrl: "https://github.com/RSON-Rust-Serialized-Object-Notation",
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

// The case that follows `slug`, wrapping round, so every case study ends with a next read.
export const nextCaseStudy = (slug: string): CaseStudy => {
  const index = caseStudies.findIndex((c) => c.slug === slug);
  return caseStudies[(index + 1) % caseStudies.length];
};

export const filterByCategory = (category: Category | "All") =>
  category === "All" ? caseStudies : caseStudies.filter((c) => c.categories.includes(category));
