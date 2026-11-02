import Image from "next/image";
import type { CaseStudy } from "@/lib/work";

interface CaseCoverProps {
  study: CaseStudy;
  sizes: string;
  priority?: boolean;
  className?: string;
}

// The project screenshot, or for work without one, a typeset cover. Never a stock photo.
export const CaseCover = ({ study, sizes, priority = false, className = "" }: CaseCoverProps) => (
  <div className={`relative overflow-hidden rounded bg-surface ${className}`}>
    {study.image ? (
      <Image
        src={study.image.src}
        alt={study.image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    ) : (
      <div className="absolute inset-0 flex flex-col justify-between bg-brand-soft p-6 sm:p-8">
        <p className="eyebrow text-brand-ink">{study.platforms}</p>
        <p className="text-4xl font-semibold tracking-[-0.04em] text-brand-ink sm:text-5xl">{study.name}</p>
      </div>
    )}
  </div>
);
