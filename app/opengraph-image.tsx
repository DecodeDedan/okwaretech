import { ImageResponse } from "next/og";
import { MARK_BLOCK, MARK_PATH } from "@/components/Logo";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#F5F4F0", padding: 80, color: "#0F1413" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 48 48">
            <path d={MARK_PATH} fill="none" stroke="#0F1413" strokeWidth="6.5" />
            <rect x={MARK_BLOCK.x} y={MARK_BLOCK.y} width={MARK_BLOCK.size} height={MARK_BLOCK.size} rx={MARK_BLOCK.radius} fill="#0A6E6A" />
          </svg>
          <div style={{ fontSize: 44, letterSpacing: -1.5, display: "flex" }}>
            <span style={{ fontWeight: 700 }}>Okware</span>
            <span>Tech</span>
          </div>
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -4, lineHeight: 1, maxWidth: 980 }}>
          We build the software your business runs on.
        </div>
        <div style={{ fontSize: 28, color: "#58605E", display: "flex" }}>{`Business systems · Websites · Apps · ${site.location}`}</div>
      </div>
    ),
    size,
  );
}
