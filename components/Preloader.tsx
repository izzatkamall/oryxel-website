"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";

/**
 * Premium intro: the letters of ORYXEL rise into place, a thin accent line
 * draws across, then the curtain slides up to reveal the hero. Calls
 * onComplete when the curtain has fully lifted.
 *
 * Scroll is locked by the page while this is mounted.
 */
export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const lettersRef = useRef<HTMLDivElement>(null);

  const scope = useGSAP((_ctx, gsap) => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const letters = lettersRef.current?.querySelectorAll("[data-letter]");
    if (!letters) return;

    if (reduce) {
      // Minimal: just fade out quickly.
      gsap.set(letters, { y: 0, opacity: 1 });
      gsap.to(scope.current, {
        autoAlpha: 0,
        duration: 0.4,
        delay: 0.3,
        onComplete,
      });
      return;
    }

    const tl = gsap.timeline({ onComplete });

    tl.set(letters, { yPercent: 110, opacity: 0 })
      .set("[data-line]", { scaleX: 0 })
      .to(letters, {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.07,
      })
      .to(
        "[data-line]",
        { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
        "-=0.3"
      )
      .to({}, { duration: 0.4 }) // hold
      .to(letters, {
        yPercent: -110,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        stagger: 0.04,
      })
      .to(
        scope.current,
        { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
        "-=0.2"
      );
  }, []);

  return (
    <div
      ref={scope as React.RefObject<HTMLDivElement>}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--color-bg)]"
    >
      <div className="flex flex-col items-center">
        <div ref={lettersRef} className="flex overflow-hidden">
          {"ORYXEL".split("").map((ch, i) => (
            <span
              key={i}
              data-letter
              className="inline-block font-[family-name:var(--font-heading)] uppercase leading-none"
              style={{
                fontSize: "clamp(2.5rem, 9vw, 7rem)",
                letterSpacing: "0.05em",
              }}
            >
              {ch}
            </span>
          ))}
        </div>
        <div
          data-line
          className="mt-6 h-px w-40 origin-left bg-[var(--color-accent)]"
        />
      </div>
    </div>
  );
}
