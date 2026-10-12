// The OkwareTech mark: an "O" opened on one side with a module slotting into it —
// the piece of software a business is missing. Geometry is shared with app/icon.svg,
// public/brand/*.svg and the 3D hero (components/hero/scene.ts); change them together.

export const MARK_PATH = "M42 17V14A8 8 0 0 0 34 6H14A8 8 0 0 0 6 14V34A8 8 0 0 0 14 42H34A8 8 0 0 0 42 34V31";
export const MARK_BLOCK = { x: 27, y: 18.5, size: 11, radius: 2.5 } as const;

export const LogoMark = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={`shrink-0 ${className}`} aria-hidden="true">
    <path d={MARK_PATH} fill="none" className="stroke-ink" strokeWidth="6.5" />
    <rect
      x={MARK_BLOCK.x}
      y={MARK_BLOCK.y}
      width={MARK_BLOCK.size}
      height={MARK_BLOCK.size}
      rx={MARK_BLOCK.radius}
      className="fill-brand"
    />
  </svg>
);

export const Logo = ({ className = "" }: { className?: string }) => (
  <span className={`inline-flex items-center gap-2.5 text-ink ${className}`}>
    <LogoMark />
    <span className="text-[19px] tracking-[-0.03em]">
      <span className="font-semibold">Okware</span>
      <span>Tech</span>
    </span>
  </span>
);
