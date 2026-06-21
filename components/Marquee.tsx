"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const ITEMS = [
  "Web Dev",
  "Mobile Apps",
  "UI/UX",
  "AI Automation",
  "SaaS MVP",
];

/**
 * Full-width infinite ticker. Two identical tracks scroll left at a constant
 * speed; when the first is fully off, the loop seamlessly wraps. Stroke and
 * filled words alternate for rhythm.
 */
export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce || !trackRef.current) return;

    const track = trackRef.current;
    // Track holds 2 copies; animate -50% then reset for a seamless loop.
    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 24,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  const group = (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item, i) => (
        <div key={i} className="flex items-center">
          <span
            className={
              i % 2 === 0
                ? "px-8 font-[family-name:var(--font-heading)] uppercase tracking-tight text-[var(--color-fg)]"
                : "px-8 font-[family-name:var(--font-heading)] uppercase tracking-tight text-transparent"
            }
            style={{
              fontSize: "clamp(2.5rem, 8vw, 7rem)",
              ...(i % 2 === 1
                ? { WebkitTextStroke: "1px var(--color-fg)" }
                : {}),
            }}
          >
            {item}
          </span>
          <span className="text-[var(--color-accent)]" style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}>
            ·
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="overflow-hidden border-y border-[var(--color-line)] py-8 md:py-12">
      <div ref={trackRef} className="flex w-max flex-nowrap will-change-transform">
        {group}
        {group}
      </div>
    </section>
  );
}
