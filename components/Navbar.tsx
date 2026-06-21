"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getLenis } from "@/lib/lenis";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ start }: { start: boolean }) {
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Slide the nav down once the preloader is done.
  useEffect(() => {
    if (!start || !navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { yPercent: -120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 }
    );
  }, [start]);

  // Slim dark bar on scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animate the mobile overlay + lock scroll while open.
  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      lenis?.stop();
      const links = overlayRef.current?.querySelectorAll("[data-overlay-link]");
      gsap
        .timeline()
        .to(overlayRef.current, {
          autoAlpha: 1,
          duration: 0.4,
          ease: "power2.out",
        })
        .fromTo(
          links ?? [],
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.1"
        );
    } else {
      lenis?.start();
      if (overlayRef.current) {
        gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.3 });
      }
    }
  }, [menuOpen]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = getLenis();
    const target = document.querySelector(href) as HTMLElement | null;
    setMenuOpen(false);
    if (lenis && target) {
      // Lenis is paused while the menu is open — resume before scrolling,
      // otherwise scrollTo is a no-op.
      lenis.start();
      lenis.scrollTo(target, { offset: 0 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed left-0 top-0 z-[1000] w-full transition-[background-color,backdrop-filter,padding] duration-500 ${
          scrolled
            ? "bg-[var(--color-bg)]/80 py-3 backdrop-blur-md"
            : "bg-transparent py-6"
        }`}
        style={{ opacity: 0 }}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-10">
          <a
            href="#top"
            onClick={go("#top")}
            className="font-[family-name:var(--font-heading)] text-lg uppercase tracking-[0.2em]"
          >
            Oryxel
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-10 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={go(l.href)}
                  className="group relative text-sm uppercase tracking-widest text-[var(--color-fg)]"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-8 w-8 flex-col items-end justify-center gap-1.5 md:hidden"
          >
            <span
              className={`block h-px bg-[var(--color-fg)] transition-all duration-300 ${
                menuOpen ? "w-6 translate-y-[3.5px] rotate-45" : "w-6"
              }`}
            />
            <span
              className={`block h-px bg-[var(--color-fg)] transition-all duration-300 ${
                menuOpen ? "w-6 -translate-y-[3.5px] -rotate-45" : "w-4"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Fullscreen mobile overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-2 bg-[var(--color-bg)] opacity-0 md:hidden"
        style={{ visibility: "hidden" }}
      >
        {LINKS.map((l) => (
          <div key={l.href} className="overflow-hidden py-1">
            <a
              data-overlay-link
              href={l.href}
              onClick={go(l.href)}
              className="block font-[family-name:var(--font-heading)] text-4xl uppercase tracking-tight"
            >
              {l.label}
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
