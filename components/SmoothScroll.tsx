"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global Lenis smooth-scroll provider, synced to GSAP's ticker so that
 * ScrollTrigger and Lenis share a single rAF loop (no jitter / double-driving).
 *
 * Respects prefers-reduced-motion: when set, Lenis is skipped and native
 * scrolling is used.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      // Still let ScrollTrigger work with native scroll.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      // ease-out expo — silky, slightly decelerated (Tres Mares feel)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Expose for other components (e.g. nav anchor scrolling, back-to-top).
    (window as Window & { lenis?: Lenis }).lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as Window & { lenis?: Lenis }).lenis;
    };
  }, []);

  return <>{children}</>;
}
