import type Lenis from "lenis";

/**
 * Tiny module singleton holding the active Lenis instance, so components can
 * drive scroll (scrollTo, stop/start) without leaning on a `window` global
 * (which Lenis already augments with a different shape).
 */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;
