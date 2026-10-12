"use client";

import { useEffect, useState } from "react";

const TIME_ZONE = "Africa/Nairobi";
const WORK_START = 8;
const WORK_END = 18;

const read = () => {
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, hour: "2-digit", minute: "2-digit" }).format(now);
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, hour: "numeric", hourCycle: "h23", weekday: "short" }).formatToParts(now);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const open = !["Sat", "Sun"].includes(weekday) && hour >= WORK_START && hour < WORK_END;
  return { time, open };
};

// Server render shows the city only; the time appears once the client knows it,
// so there is never a hydration mismatch or a wrong clock.
export const NairobiClock = () => {
  const [state, setState] = useState<ReturnType<typeof read> | null>(null);

  useEffect(() => {
    setState(read());
    const id = window.setInterval(() => setState(read()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="inline-flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${state?.open === false ? "bg-muted" : "bg-brand"}`} aria-hidden="true" />
        Nairobi, Kenya
      </span>
      {state && (
        <>
          <span aria-hidden="true">/</span>
          <span className="tabular">
            <time>{state.time}</time> EAT · {state.open ? "in the studio now" : "we reply next working morning"}
          </span>
        </>
      )}
    </p>
  );
};
