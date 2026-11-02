"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/Logo";

// The static mark is the server-rendered fallback and the image for no-JS visitors.
// three.js loads after the page is idle, then the canvas crossfades over the mark.
export const HeroMark = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canUseWebGL = () => {
      try {
        const probe = document.createElement("canvas");
        return Boolean(probe.getContext("webgl2") ?? probe.getContext("webgl"));
      } catch {
        return false;
      }
    };

    const load = () => {
      if (!canUseWebGL()) {
        setFailed(true);
        return;
      }

      import("./scene")
        .then(({ mountScene }) => {
          if (cancelled) return;
          dispose = mountScene(canvas, { reducedMotion, onFirstFrame: () => setReady(true) });
        })
        .catch((error: unknown) => {
          // A failed chunk or renderer keeps the static mark as the complete hero.
          console.warn("[hero] 3D scene unavailable, showing static mark", error);
          setFailed(true);
        });
    };

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(load, { timeout: 1500 })
      : window.setTimeout(load, 300);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      dispose?.();
    };
  }, []);

  return (
    <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:h-full">
      <div
        className={`absolute inset-0 grid place-items-center transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <LogoMark className="h-40 w-40 sm:h-52 sm:w-52" />
      </div>
      {!failed && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 [mask-image:radial-gradient(ellipse_70%_65%_at_50%_45%,#000_55%,transparent_100%)] ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
};
