"use client";

import { useGSAP } from "@/hooks/useGSAP";

type Project = {
  name: string;
  category: string;
  year: string;
};

const PROJECTS: Project[] = [
  { name: "Helix Finance", category: "SaaS · Web App", year: "2026" },
  { name: "Nomad Health", category: "Mobile · iOS / Android", year: "2026" },
  { name: "Atlas Commerce", category: "Web · E-commerce", year: "2026" },
  { name: "Sentinel AI", category: "AI Automation", year: "2026" },
];

export default function Work() {
  const scope = useGSAP((_ctx, g) => {
    g.from("[data-work-title]", {
      yPercent: 110,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: scope.current, start: "top 75%" },
    });

    g.from("[data-project]", {
      autoAlpha: 0,
      y: 60,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: { trigger: "[data-work-grid]", start: "top 80%" },
    });
  }, []);

  return (
    <section
      id="work"
      ref={scope as React.RefObject<HTMLElement>}
      className="mx-auto max-w-[1600px] px-6 py-[18vh] md:px-10"
    >
      <div className="mb-16 flex items-end justify-between gap-6">
        <div className="overflow-hidden">
          <h2
            data-work-title
            className="inline-block font-[family-name:var(--font-heading)] uppercase tracking-tight"
            style={{ fontSize: "var(--text-section)" }}
          >
            Selected Work
          </h2>
        </div>
        <span className="hidden text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] md:block">
          (Case Studies)
        </span>
      </div>

      <div data-work-grid className="grid gap-6 md:grid-cols-2 md:gap-8">
        {PROJECTS.map((p) => (
          <a
            key={p.name}
            href="#contact"
            data-project
            data-cursor="view"
            className="group block"
          >
            {/* Abstract dark visual (swap for <Image> when real assets exist) */}
            <div className="relative aspect-[4/3] overflow-hidden border border-[var(--color-line)] bg-[var(--color-bg-soft)]">
              <div
                className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:scale-105"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              {/* faint index watermark */}
              <span className="pointer-events-none absolute -bottom-6 -right-2 font-[family-name:var(--font-heading)] text-[10rem] leading-none text-white/[0.03]">
                {p.name.charAt(0)}
              </span>

              {/* hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg)]/40 opacity-0 backdrop-blur-[1px] transition-opacity duration-500 group-hover:opacity-100">
                <span className="flex items-center gap-2 text-sm uppercase tracking-widest text-[var(--color-fg)]">
                  View Project
                  <span className="text-[var(--color-accent)]">→</span>
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h3
                className="font-[family-name:var(--font-heading)] tracking-tight transition-colors duration-300 group-hover:text-[var(--color-accent)]"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
              >
                {p.name}
              </h3>
              <span className="shrink-0 text-xs uppercase tracking-widest text-[var(--color-muted)]">
                {p.year}
              </span>
            </div>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              {p.category}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
