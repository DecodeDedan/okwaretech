import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { WorkIndex } from "@/components/work/WorkIndex";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects by OkwareTech: Rasko Sweet Scent, Century Mabati, IThreeM, U-Download, GitOk, OHMS and RSON: business systems, websites, products and platforms.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageIntro
        eyebrow="Work"
        title="What we have built."
        lede="Client systems that run real businesses, and the products and open-source tools we build and maintain ourselves."
      />
      <div className="page pb-24">
        <WorkIndex />
      </div>
      <CtaBand heading="Your project could be the next one here." />
    </>
  );
}
