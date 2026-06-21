"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Custom cursor: an 8px dot that tracks the pointer exactly, plus a 40px
 * ring that follows with a lerp delay. The ring scales up over interactive
 * elements and shows "View" text over elements marked data-cursor="view".
 *
 * Only mounts on devices with a fine pointer (hidden on touch).
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  // 1) Detect a fine pointer and enable (this renders the cursor elements).
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine) setEnabled(true);
  }, []);

  // 2) Once enabled (elements exist), wire up GSAP + listeners.
  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    // Quick setters for performant, GPU-friendly updates.
    const dotX = gsap.quickSetter(dot, "x", "px");
    const dotY = gsap.quickSetter(dot, "y", "px");
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    let visible = false;
    let lastX = -1;
    let lastY = -1;

    const interactiveSel =
      'a, button, [role="button"], input, textarea, [data-cursor]';

    // Single source of truth for the ring's appearance. We diff against the
    // last applied state so we only fire a tween when it actually changes.
    let state: "idle" | "hover" | "view" = "idle";
    const setState = (next: "idle" | "hover" | "view") => {
      if (next === state) return;
      state = next;
      if (next === "view") {
        gsap.to(ring, { scale: 2.6, borderColor: "#4a7bf7", duration: 0.35 });
        gsap.to(label, { autoAlpha: 1, duration: 0.25 });
        gsap.to(dot, { autoAlpha: 0, duration: 0.2 });
      } else if (next === "hover") {
        gsap.to(ring, { scale: 1.8, borderColor: "#4a7bf7", duration: 0.35 });
        gsap.to(label, { autoAlpha: 0, duration: 0.2 });
        gsap.to(dot, { autoAlpha: 1, duration: 0.2 });
      } else {
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(245,245,245,0.6)",
          duration: 0.35,
        });
        gsap.to(label, { autoAlpha: 0, duration: 0.2 });
        gsap.to(dot, { autoAlpha: 1, duration: 0.2 });
      }
    };

    // Re-evaluate what's under the cursor from its current position. Works for
    // both pointer movement AND scrolling (when elements slide under a still
    // cursor), which the old mouseover/mouseout approach missed.
    const evaluate = () => {
      if (lastX < 0) return;
      const el = document.elementFromPoint(lastX, lastY) as HTMLElement | null;
      const target = el?.closest(interactiveSel) as HTMLElement | null;
      if (!target) return setState("idle");
      setState(target.getAttribute("data-cursor") === "view" ? "view" : "hover");
    };

    const onMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      evaluate();
    };

    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", evaluate, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", evaluate);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-fg)] opacity-0 will-change-transform"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border opacity-0 will-change-transform"
        style={{ borderColor: "rgba(245,245,245,0.6)" }}
      >
        <span
          ref={labelRef}
          className="select-none text-[9px] uppercase tracking-widest text-[var(--color-fg)] opacity-0"
        >
          View
        </span>
      </div>
    </>
  );
}
