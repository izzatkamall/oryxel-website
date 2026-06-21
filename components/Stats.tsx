"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { countUp } from "@/lib/animations";

const STATS = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 20, suffix: "+", label: "Happy Clients" },
  { value: 3, suffix: "", label: "Countries Served" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

export default function Stats() {
  const scope = useGSAP((_ctx, g) => {
    const nums = g.utils.toArray<HTMLElement>("[data-stat-num]");
    nums.forEach((el) => {
      const end = Number(el.dataset.value);
      const suffix = el.dataset.suffix ?? "";
      el.textContent = "0" + suffix;
      countUp(el, end, { suffix });
    });

    g.from("[data-stat]", {
      autoAlpha: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: { trigger: scope.current, start: "top 80%" },
    });
  }, []);

  return (
    <section
      ref={scope as React.RefObject<HTMLElement>}
      className="mx-auto max-w-[1600px] border-y border-[var(--color-line)] px-6 py-[12vh] md:px-10"
    >
      <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} data-stat className="text-center md:text-left">
            <div
              data-stat-num
              data-value={s.value}
              data-suffix={s.suffix}
              className="font-[family-name:var(--font-heading)] leading-none tracking-tight"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              0{s.suffix}
            </div>
            <div className="mt-4 text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
