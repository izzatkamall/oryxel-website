"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { revealWords } from "@/lib/animations";

export default function Testimonial() {
  const scope = useGSAP((_ctx, g) => {
    const quote = scope.current?.querySelector<HTMLElement>("[data-quote]");
    if (quote) {
      revealWords(quote, { stagger: 0.04, trigger: true });
    }

    g.from("[data-quote-mark]", {
      autoAlpha: 0,
      scale: 0.6,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: scope.current, start: "top 75%" },
    });

    g.from("[data-quote-author]", {
      autoAlpha: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: "[data-quote-author]", start: "top 90%" },
    });
  }, []);

  return (
    <section
      ref={scope as React.RefObject<HTMLElement>}
      className="mx-auto max-w-[1100px] px-6 py-[20vh] text-center md:px-10"
    >
      <span
        data-quote-mark
        aria-hidden
        className="block font-[family-name:var(--font-heading)] leading-none text-[var(--color-accent)]"
        style={{ fontSize: "clamp(5rem, 12vw, 11rem)" }}
      >
        &ldquo;
      </span>

      <blockquote
        data-quote
        className="-mt-8 italic leading-[1.25] tracking-tight"
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: "clamp(1.6rem, 4vw, 3rem)",
        }}
      >
        Oryxel didn&apos;t just build what we asked for — they pushed back,
        sharpened the idea, and shipped something better than we imagined.
      </blockquote>

      <div
        data-quote-author
        className="mt-12 text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]"
      >
        Sarah Lin · Founder, Helix Finance
      </div>
    </section>
  );
}
