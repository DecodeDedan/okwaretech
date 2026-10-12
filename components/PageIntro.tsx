interface PageIntroProps {
  eyebrow: string;
  title: string;
  lede: string;
}

export const PageIntro = ({ eyebrow, title, lede }: PageIntroProps) => (
  <header className="page pb-12 pt-36 md:pb-16 md:pt-44">
    <p className="eyebrow">{eyebrow}</p>
    <h1 className="mt-4 max-w-[18ch] text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1] tracking-[-0.045em]">{title}</h1>
    <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-muted md:text-xl">{lede}</p>
  </header>
);
