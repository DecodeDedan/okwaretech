import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="page flex min-h-[80svh] flex-col items-start justify-center pt-28">
      <LogoMark className="h-16 w-16" />
      <p className="eyebrow mt-8 tabular">404</p>
      <h1 className="mt-2 text-5xl font-semibold tracking-[-0.04em] md:text-6xl">This page is the missing piece.</h1>
      <p className="mt-4 max-w-[48ch] text-lg text-muted">The address may be old or mistyped. Everything we have built is on the work page.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          Home
        </Link>
        <Link href="/work" className="btn-secondary">
          See our work
        </Link>
      </div>
    </section>
  );
}
