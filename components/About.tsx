"use client";

import { useGSAP } from "@/hooks/useGSAP";

const LINES = [
  "What is Oryxel?",
  "We're the team you call when an idea deserves",
  "to be built properly — not just shipped.",
  "We design, engineer, and obsess over products",
  "across web, mobile, AI, and SaaS.",
];

export default function About() {
  const scope = useGSAP((_ctx, g) => {
    const lines = g.utils.toArray<HTMLElement>("[data-about-line]");

    g.from(lines, {
      yPercent: 110,
      duration: 1,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: { trigger: scope.current, start: "top 70%" },
    });

    // Thin rule draws across as you scroll through the section.
    g.fromTo(
      "[data-about-rule]",
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
        },
      }
    );

    g.from("[data-about-meta]", {
      autoAlpha: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: "[data-about-meta]", start: "top 90%" },
    });
  }, []);

  return (
    <section
      id="about"
      ref={scope as React.RefObject<HTMLElement>}
      className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-[18vh]"
    >
      <div
        data-about-rule
        className="mb-16 h-px w-full origin-left bg-[var(--color-line)]"
      />

      <div className="max-w-5xl">
        {LINES.map((line, i) => (
          <span key={i} className="reveal-mask">
            <span
              data-about-line
              className="inline-block font-[family-name:var(--font-heading)] leading-[1.15] tracking-tight"
              style={{ fontSize: "var(--text-display)" }}
            >
              {line}
            </span>
          </span>
        ))}
      </div>

      <div
        data-about-meta
        className="mt-16 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
        Founded 2026 · Lahore, Pakistan
      </div>
    </section>
  );
}
