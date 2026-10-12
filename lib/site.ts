// Company identity and contact details shared by every page, metadata and the brief form.

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
    role: "Founder & Lead Engineer",
    portfolio: "https://dedan.okwaretech.com",
    linkedin: "https://www.linkedin.com/in/softcysec-dedan-okware/",
  },
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
