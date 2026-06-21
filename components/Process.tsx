"use client";

import { useGSAP } from "@/hooks/useGSAP";

const STEPS = [
  {
    n: "01",
    title: "Discovery",
    desc: "We dig into your goals, users, and constraints to define what success looks like.",
  },
  {
    n: "02",
    title: "Design",
    desc: "We shape the experience — flows, interface, and a system that scales.",
  },
  {
    n: "03",
    title: "Develop",
    desc: "We engineer it with modern, maintainable code and ship in tight iterations.",
  },
  {
    n: "04",
    title: "Deploy",
    desc: "We launch, measure, and refine — then keep improving after go-live.",
  },
];

export default function Process() {
  const scope = useGSAP((_ctx, g) => {
    g.from("[data-process-title]", {
      yPercent: 110,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: scope.current, start: "top 75%" },
    });

    // Connector line draws downward as you scroll through.
    g.fromTo(
      "[data-process-line]",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-process-list]",
          start: "top 70%",
          end: "bottom 80%",
          scrub: true,
        },
      }
    );

    g.from("[data-step]", {
      autoAlpha: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.18,
      scrollTrigger: { trigger: "[data-process-list]", start: "top 75%" },
    });
  }, []);

  return (
    <section
      ref={scope as React.RefObject<HTMLElement>}
      className="mx-auto max-w-[1600px] px-6 py-[18vh] md:px-10"
    >
      <div className="mb-16 overflow-hidden">
        <h2
          data-process-title
          className="inline-block font-[family-name:var(--font-heading)] uppercase tracking-tight"
          style={{ fontSize: "var(--text-section)" }}
        >
          How We Work
        </h2>
      </div>

      <div data-process-list className="relative max-w-3xl pl-10 md:pl-16">
        {/* Track + drawing line */}
        <div className="absolute left-[3px] top-2 h-[calc(100%-1rem)] w-px bg-[var(--color-line)] md:left-[5px]" />
        <div
          data-process-line
          className="absolute left-[3px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-[var(--color-accent)] md:left-[5px]"
        />

        {STEPS.map((s) => (
          <div key={s.n} data-step className="relative pb-14 last:pb-0">
            {/* node */}
            <span className="absolute -left-10 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--color-accent)] md:-left-16" />
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-[var(--color-muted)]">{s.n}</span>
              <h3
                className="font-[family-name:var(--font-heading)] tracking-tight"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}
              >
                {s.title}
              </h3>
            </div>
            <p className="mt-3 max-w-md text-sm text-[var(--color-muted)] md:text-base">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
