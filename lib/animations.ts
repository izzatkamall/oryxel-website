import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Standard easing + timing used across the site for consistency. */
export const EASE = "power3.out";
export const DUR = 0.9;

/**
 * Split an element's text into line / word spans wrapped in overflow-hidden
 * masks, ready for a translateY reveal. Returns the inner spans to animate.
 *
 * Uses a lightweight word split (no paid SplitText dependency) — good enough
 * for headlines and short paragraphs.
 */
export function splitToMaskedWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? "";
  el.textContent = "";
  const inners: HTMLElement[] = [];

  text.split(/(\s+)/).forEach((chunk) => {
    if (chunk.trim() === "") {
      el.appendChild(document.createTextNode(chunk));
      return;
    }
    const mask = document.createElement("span");
    mask.style.display = "inline-block";
    mask.style.overflow = "hidden";
    mask.style.verticalAlign = "top";

    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.style.willChange = "transform";
    inner.textContent = chunk;

    mask.appendChild(inner);
    el.appendChild(mask);
    inners.push(inner);
  });

  return inners;
}

/** Reveal masked words with a stagger (used for headlines). */
export function revealWords(
  el: HTMLElement,
  opts: { delay?: number; stagger?: number; trigger?: boolean } = {}
) {
  const inners = splitToMaskedWords(el);
  gsap.set(inners, { yPercent: 110 });
  return gsap.to(inners, {
    yPercent: 0,
    duration: DUR,
    ease: EASE,
    stagger: opts.stagger ?? 0.08,
    delay: opts.delay ?? 0,
    ...(opts.trigger
      ? { scrollTrigger: { trigger: el, start: "top 85%" } }
      : {}),
  });
}

/** Fade + rise an element when it scrolls into view. */
export function fadeUp(
  target: gsap.TweenTarget,
  opts: { y?: number; delay?: number; stagger?: number; trigger?: Element } = {}
) {
  return gsap.from(target, {
    opacity: 0,
    y: opts.y ?? 30,
    duration: DUR,
    ease: EASE,
    delay: opts.delay ?? 0,
    stagger: opts.stagger ?? 0,
    scrollTrigger: opts.trigger
      ? { trigger: opts.trigger, start: "top 80%" }
      : undefined,
  });
}

/** Count a number up from 0 when it enters the viewport. */
export function countUp(
  el: HTMLElement,
  end: number,
  opts: { suffix?: string; duration?: number } = {}
) {
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: end,
    duration: opts.duration ?? 2,
    ease: "power2.out",
    scrollTrigger: { trigger: el, start: "top 85%", once: true },
    onUpdate: () => {
      el.textContent = Math.round(obj.val) + (opts.suffix ?? "");
    },
  });
}

export { gsap, ScrollTrigger };
