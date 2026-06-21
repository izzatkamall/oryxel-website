"use client";

import { useLayoutEffect, useRef, type DependencyList } from "react";
import gsap from "gsap";

/**
 * Run GSAP animations inside a scoped gsap.context so every tween/ScrollTrigger
 * created in the callback is automatically reverted on unmount (and re-run when
 * deps change). Returns a ref to attach to the scope container.
 *
 * Usage:
 *   const scope = useGSAP((ctx, gsap) => { ... }, []);
 *   return <section ref={scope}> ... </section>;
 */
export function useGSAP(
  callback: (ctx: gsap.Context, g: typeof gsap) => void,
  deps: DependencyList = []
) {
  const scopeRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!scopeRef.current) return;
    const ctx = gsap.context((self) => {
      callback(self, gsap);
    }, scopeRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}

export default useGSAP;
