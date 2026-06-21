"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@/hooks/useGSAP";
import { revealWords } from "@/lib/animations";
import gsap from "gsap";

// Lazy-load the 3D scene (client-only, no SSR).
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero({ start }: { start: boolean }) {
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const scope = useGSAP(
    (_ctx, g) => {
      if (!start) return;

      const headline = scope.current?.querySelector<HTMLElement>(
        "[data-hero-headline]"
      );
      const tl = g.timeline();

      // 3D fades in first
      tl.from("[data-hero-scene]", {
        autoAlpha: 0,
        duration: 1.2,
        ease: "power2.out",
      });

      // Headline reveals word by word
      if (headline) {
        tl.add(revealWords(headline, { stagger: 0.09 }), "-=0.8");
      }

      // Subtext + CTA
      tl.from(
        "[data-hero-sub]",
        { autoAlpha: 0, y: 20, duration: 0.7 },
        "-=0.5"
      )
        .from(
          "[data-hero-cta]",
          { autoAlpha: 0, scale: 0.9, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.3"
        )
        .from(
          "[data-hero-scroll]",
          { autoAlpha: 0, y: 10, duration: 0.6 },
          "-=0.2"
        );
    },
    [start]
  );

  // Magnetic CTA effect
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const relX = e.clientX - (r.left + r.width / 2);
      const relY = e.clientY - (r.top + r.height / 2);
      xTo(relX * 0.35);
      yTo(relY * 0.35);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      id="top"
      ref={scope as React.RefObject<HTMLElement>}
      className="relative flex min-h-[100svh] items-start overflow-hidden pt-[15vh] md:items-center md:pt-0"
    >
      {/* 3D scene — lower band on mobile (below the text), right half on desktop */}
      <div
        data-hero-scene
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[45%] md:left-auto md:right-0 md:top-0 md:h-full md:w-[58%]"
      >
        <HeroScene />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <div className="max-w-3xl">
          <h1
            data-hero-headline
            className="font-[family-name:var(--font-heading)]"
            style={{ fontSize: "var(--text-hero)", lineHeight: 0.98 }}
          >
            We engineer digital products worth obsessing over.
          </h1>

          <p
            data-hero-sub
            className="mt-8 text-base tracking-wide text-[var(--color-muted)] md:text-lg"
          >
            Web · Mobile · AI · Design · SaaS
          </p>

          <div data-hero-cta className="mt-10 inline-block">
            <a
              ref={ctaRef}
              href="#contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden border border-[var(--color-line)] px-8 py-4 text-sm uppercase tracking-widest"
            >
              <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-[var(--color-accent)] transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:scale-x-100" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--color-bg)]">
                Start a Project
              </span>
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--color-bg)]">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        data-hero-scroll
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted)] md:flex"
      >
        Scroll
        <span className="h-10 w-px animate-pulse bg-[var(--color-line)]" />
      </div>
    </section>
  );
}
