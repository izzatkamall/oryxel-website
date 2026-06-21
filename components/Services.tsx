"use client";

import { useGSAP } from "@/hooks/useGSAP";

const SERVICES = [
  {
    n: "01",
    title: "Web Development",
    desc: "Performant, scalable web applications built with modern frameworks.",
  },
  {
    n: "02",
    title: "Mobile App Development",
    desc: "Native and cross-platform apps that users love.",
  },
  {
    n: "03",
    title: "UI/UX Design",
    desc: "Research-driven design that converts visitors into customers.",
  },
  {
    n: "04",
    title: "AI Automation",
    desc: "Intelligent systems that streamline operations and cut costs.",
  },
  {
    n: "05",
    title: "SaaS MVP Development",
    desc: "From concept to launch-ready product in weeks, not months.",
  },
];

export default function Services() {
  const scope = useGSAP((_ctx, g) => {
    g.from("[data-services-title]", {
      yPercent: 110,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: scope.current, start: "top 75%" },
    });

    g.from("[data-service-row]", {
      autoAlpha: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: { trigger: "[data-services-list]", start: "top 80%" },
    });
  }, []);

  return (
    <section
      id="services"
      ref={scope as React.RefObject<HTMLElement>}
      className="mx-auto max-w-[1600px] px-6 py-[18vh] md:px-10"
    >
      <div className="mb-16 flex items-end justify-between gap-6">
        <div className="overflow-hidden">
          <h2
            data-services-title
            className="inline-block font-[family-name:var(--font-heading)] uppercase tracking-tight"
            style={{ fontSize: "var(--text-section)" }}
          >
            What We Do
          </h2>
        </div>
        <span className="hidden text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] md:block">
          (05 Services)
        </span>
      </div>

      <div data-services-list className="border-t border-[var(--color-line)]">
        {SERVICES.map((s) => (
          <div
            key={s.n}
            data-service-row
            data-cursor
            className="group relative cursor-pointer border-b border-[var(--color-line)] py-7 md:py-8"
          >
            {/* hover wash */}
            <span className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-[var(--color-bg-soft)] transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:scale-y-100" />

            <div className="relative flex items-baseline gap-5 md:gap-10">
              <span className="text-xs text-[var(--color-muted)] transition-colors duration-300 group-hover:text-[var(--color-accent)] md:text-sm">
                {s.n}
              </span>

              <div className="flex-1">
                <h3
                  className="font-[family-name:var(--font-heading)] tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2"
                  style={{ fontSize: "clamp(1.6rem, 4.5vw, 3.25rem)" }}
                >
                  {s.title}
                </h3>

                {/* description: expands on hover (desktop), always visible on touch */}
                <div className="grid grid-rows-[1fr] opacity-100 transition-all duration-500 ease-out md:grid-rows-[0fr] md:opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100">
                  <p className="overflow-hidden pt-3 text-sm text-[var(--color-muted)] md:max-w-md md:text-base">
                    {s.desc}
                  </p>
                </div>
              </div>

              <span className="self-center text-[var(--color-muted)] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:text-[var(--color-accent)] group-hover:opacity-100 md:-translate-x-3">
                →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
