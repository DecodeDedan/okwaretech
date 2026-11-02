// Company identity and contact details shared by every page, metadata and the brief form.

export interface FounderInfo {
  name: string;
  role: string;
  image: string;
  portfolio?: string;
  linkedin?: string;
  bio: readonly string[];
}

export const site = {
  name: "OkwareTech",
  legalName: "OkwareTech",
  tagline: "Software solutions for businesses",
  url: "https://okwaretech.com",
  email: "info@okwaretech.com",
  whatsapp: "+254704860552",
  location: "Nairobi, Kenya",
  founded: 2024,
  founder: {
    name: "Dedan Okware",
    role: "Co-founder & Lead Engineer",
    portfolio: "https://okwaretech.com",
    linkedin: "https://www.linkedin.com/in/softcysec-dedan-okware/",
    image: "/dedan-okware.jpg",
  },
  cofounder: {
    name: "Judith Karuku",
    role: "Co-founder & Business Strategist",
    image: "/judith-karuku.jpg",
    linkedin: "https://www.linkedin.com/in/judith-karuku-306915270/",
  },
  founders: [
    {
      name: "Dedan Okware",
      role: "Co-founder & Lead Engineer",
      portfolio: "https://okwaretech.com",
      linkedin: "https://www.linkedin.com/in/softcysec-dedan-okware/",
      image: "/dedan-okware.jpg",
      bio: [
        "Dedan Okware is a Kenyan software engineer, systems architect and technical leader who combines deep engineering discipline with technical insight to build reliable, high-performance digital systems.",
        "Skilled in full-stack architecture, systems programming, distributed backends, mobile engineering and offline-first data synchronization, he helps businesses replace manual workflows with resilient digital systems that improve operational speed and data integrity. As co-founder of OkwareTech, he leads technical architecture and engineering execution, delivering robust business software built for real operating conditions.",
      ],
    },
    {
      name: "Judith Karuku",
      role: "Co-founder & Business Strategist",
      image: "/judith-karuku.jpg",
      portfolio: undefined,
      linkedin: "https://www.linkedin.com/in/judith-karuku-306915270/",
      bio: [
        "Judith Karuku is a Kenyan entrepreneur, business strategist and information technology professional who combines technical understanding with business insight to shape practical, human-centred digital solutions.",
        "Skilled in business, strategy, marketing, customer relationships, operations and client training, she helps businesses turn ideas into growth plans and adopt simple digital systems that improve efficiency and customer experience. As co-founder of OkwareTech, she supports African SMEs with offline-first business solutions built for real operating conditions.",
      ],
    },
  ],
  socials: {
    github: "https://github.com/okwareddevnest",
    linkedin: "https://www.linkedin.com/in/softcysec-dedan-okware/",
    x: "https://x.com/okware_o",
  },
} as const;

// "+254704860552" reads as "+254 704 860 552".
export const formatPhone = (phone: string) =>
  phone.replace(/^(\+\d{3})(\d{3})(\d{3})(\d{3})$/, "$1 $2 $3 $4");

const EMAIL_SUBJECT = "Project enquiry via okwaretech.com";

export const emailLink = (body?: string, subject: string = EMAIL_SUBJECT) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ""
  }`;

// wa.me takes the number as digits only, without the leading "+".
export const whatsappLink = (text: string) =>
  `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "Company" },
  { href: "/contact", label: "Contact" },
] as const;
