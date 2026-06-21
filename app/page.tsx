"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { revealWords, fadeUp } from "@/lib/animations";

export default function Home() {
  const scope = useGSAP((_ctx, gsap) => {
    // Headline word reveal on load
    const headline = document.querySelector<HTMLElement>("[data-headline]");
    if (headline) revealWords(headline, { delay: 0.2 });

    // Scroll-triggered reveals for each test block
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      fadeUp(el, { trigger: el, y: 40 });
    });
  }, []);

  return (
    <main ref={scope}>
      {/* Section 1 — headline + cursor targets */}
      <section className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
          Phase 1 — plumbing check
        </p>
        <h1
          data-headline
          className="uppercase"
          style={{ fontSize: "var(--text-hero)" }}
        >
          Scroll down slowly
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <button className="border border-[var(--color-line)] px-7 py-3 text-sm uppercase tracking-widest transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
            Hover me (button)
          </button>
          <a
            href="#"
            className="text-sm uppercase tracking-widest underline-offset-4 hover:text-[var(--color-accent)]"
          >
            Hover me (link)
          </a>
        </div>
        <div
          data-cursor="view"
          className="grid h-40 w-72 place-items-center border border-[var(--color-line)] text-[var(--color-muted)]"
        >
          Hover for &quot;View&quot; cursor
        </div>
      </section>

      {/* Scroll-reveal test blocks */}
      {[1, 2, 3].map((n) => (
        <section
          key={n}
          className="flex min-h-screen items-center justify-center px-6"
        >
          <div data-reveal className="max-w-2xl text-center">
            <span className="text-sm text-[var(--color-accent)]">0{n}</span>
            <h2 style={{ fontSize: "var(--text-section)" }} className="mt-4">
              Reveal block {n}
            </h2>
            <p className="mt-4 text-[var(--color-muted)]">
              This block should fade and rise into view as you scroll to it,
              while the page scrolls with that buttery Lenis deceleration.
            </p>
          </div>
        </section>
      ))}
    </main>
  );
}
