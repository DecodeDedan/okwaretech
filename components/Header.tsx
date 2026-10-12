"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { nav } from "@/lib/site";

const HIDE_AFTER = 120;

export const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Hide while reading down, show as soon as the reader scrolls up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setHidden(y > HIDE_AFTER && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-300 ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${scrolled || open ? "border-b border-line bg-paper/95 backdrop-blur-sm" : "border-b border-transparent"}`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <div className="page flex h-[72px] items-center justify-between">
        <Link href="/" aria-label="OkwareTech home" className="rounded">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded px-3 py-2 text-[15px] transition-colors duration-150 hover:text-ink ${
                    isActive(item.href) ? "text-ink" : "text-muted"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn-primary hidden sm:inline-flex">
            Start a project
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="grid h-11 w-11 place-items-center rounded md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span className={`absolute left-0 block h-[2px] w-5 bg-ink transition-transform duration-200 ${open ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 block h-[2px] w-5 bg-ink transition-transform duration-200 ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="page h-[calc(100dvh-72px)] pb-8 pt-4 md:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex min-h-[64px] items-center text-3xl font-semibold tracking-[-0.03em]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn-primary mt-8 w-full">
            Start a project
          </Link>
        </nav>
      )}
    </header>
  );
};
