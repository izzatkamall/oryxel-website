"use client";

import { getLenis } from "@/lib/lenis";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/oryxell" },
  { label: "LinkedIn", href: "https://linkedin.com/company/oryxel" },
  { label: "Twitter / X", href: "https://x.com/oryxell" },
];

export default function Footer() {
  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0 });
  };

  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-line)]">
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 py-16 md:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <a
              href="#top"
              onClick={toTop}
              className="font-[family-name:var(--font-heading)] text-lg uppercase tracking-[0.2em]"
            >
              Oryxel
            </a>
            <p className="mt-4 max-w-xs text-sm text-[var(--color-muted)]">
              Products engineered worth obsessing over. Lahore, Pakistan.
            </p>
          </div>

          <nav className="flex gap-8 md:gap-12">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-sm uppercase tracking-widest"
              >
                {s.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 text-xs uppercase tracking-[0.25em] text-[var(--color-muted)] md:flex-row md:items-center">
          <span>© 2026 Oryxel. All rights reserved.</span>
          <a
            href="#top"
            onClick={toTop}
            className="group flex items-center gap-2 text-[var(--color-fg)]"
          >
            Back to Top
            <span className="transition-transform duration-300 group-hover:-translate-y-1">
              ↑
            </span>
          </a>
        </div>
      </div>

      {/* Massive faded watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none px-2 text-center"
      >
        <span className="block font-[family-name:var(--font-heading)] font-bold uppercase leading-[0.8] tracking-tight text-white/[0.03]"
          style={{ fontSize: "clamp(5rem, 22vw, 22rem)" }}
        >
          Oryxel
        </span>
      </div>
    </footer>
  );
}
