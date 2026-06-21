"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { revealWords } from "@/lib/animations";
import gsap from "gsap";

const EMAIL = "info@oryxel.xyz";
const INSTAGRAM = "https://instagram.com/oryxell";
const CALENDLY = "https://calendly.com/oryxel";
// 0309 4818226 -> international format for wa.me (PK +92, drop leading 0)
const WHATSAPP = "https://wa.me/923094818226";

export default function CTA() {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const scope = useGSAP((_ctx, g) => {
    const headline = scope.current?.querySelector<HTMLElement>("[data-cta-head]");
    if (headline) revealWords(headline, { stagger: 0.06, trigger: true });

    g.from("[data-cta-item]", {
      autoAlpha: 0,
      y: 24,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: { trigger: "[data-cta-foot]", start: "top 85%" },
    });
  }, []);

  // Magnetic button
  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.4);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
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
      id="contact"
      ref={scope as React.RefObject<HTMLElement>}
      className="relative mx-auto flex min-h-[90vh] max-w-[1600px] flex-col items-center justify-center px-6 py-[15vh] text-center md:px-10"
    >
      <p className="mb-8 text-xs uppercase tracking-[0.35em] text-[var(--color-muted)]">
        Let&apos;s Talk
      </p>

      <h2
        data-cta-head
        className="font-[family-name:var(--font-heading)] uppercase leading-[0.95] tracking-tight"
        style={{ fontSize: "var(--text-hero)" }}
      >
        Let&apos;s build something together.
      </h2>

      <div data-cta-foot className="mt-14 flex flex-col items-center gap-12">
        <div data-cta-item className="inline-block">
          <a
            ref={btnRef}
            href={`mailto:${EMAIL}`}
            className="group relative inline-flex items-center gap-3 overflow-hidden border border-[var(--color-line)] px-10 py-5 text-sm uppercase tracking-widest"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-[var(--color-accent)] transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:scale-x-100" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--color-bg)]">
              Get in Touch
            </span>
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--color-bg)]">
              →
            </span>
          </a>
        </div>

        <div className="flex flex-col items-center gap-6 text-sm md:flex-row md:gap-12">
          <a
            data-cta-item
            href={`mailto:${EMAIL}`}
            className="group relative tracking-wide"
          >
            {EMAIL}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            data-cta-item
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative tracking-wide"
          >
            WhatsApp
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            data-cta-item
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative tracking-wide"
          >
            @oryxell
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            data-cta-item
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative tracking-wide"
          >
            Book a Call
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
    </section>
  );
}
