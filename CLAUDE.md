@AGENTS.md

# Oryxel Website — Build Progress & Context

> This file is the memory of what we're building so work can resume if we stop mid-way.
> Full brief lives in `OryxellWebsitePrompt.md`.

## What we're building

A single-page, scroll-driven, fully animated marketing site for **Oryxel** — a
Pakistan-based boutique IT services studio (Web, Mobile, UI/UX, AI Automation, SaaS MVP).
Target feel: Awwwards-level. #1 reference: tresmarescapital.com.

## Locked-in decisions (from user, 2026-06-22)

- **Accent color:** muted electric blue `#4A7BF7` (used sparingly).
- **Brand spelling on site:** `Oryxel` (single L). Instagram handle is `@oryxell`.
- **Hero headline:** custom-written → "We engineer digital products worth obsessing over."
- **Working method:** build incrementally; user tests each step before moving on.

## Tech stack (actual installed versions)

- Next.js **16.2.9** (App Router, TS) — note: newer than the "14+" in brief.
- React **19.2.4**
- Tailwind **v4** (CSS-based config via `@theme` in `app/globals.css`, NO tailwind.config.ts)
- GSAP **3.15** (free tier now includes SplitText + ScrollTrigger)
- Lenis **1.3** (package is `lenis`, not the deprecated `@studio-freight/lenis`)
- Three **0.184** + @react-three/fiber **9** + @react-three/drei **10** (R3F v9 = React 19 compatible)

## Design tokens (in app/globals.css @theme)

bg `#050505` · bg-soft `#0a0a0a` · fg `#f5f5f5` · muted `#888` · line `#1a1a1a` · accent `#4a7bf7`
Fonts: headings = Space Grotesk, body = Inter (via next/font/google in layout.tsx).
Fluid type: `--text-hero`, `--text-display`, `--text-section`.

## Build plan / status

Legend: [x] done · [~] in progress · [ ] todo

### Phase 0 — Foundation
- [x] Scaffold Next.js + TS + Tailwind v4
- [x] Install gsap, lenis, three, @react-three/fiber, @react-three/drei
- [x] Design system in globals.css (tokens, fonts, reduced-motion, lenis styles)
- [x] layout.tsx with fonts + metadata
- [x] Minimal hero placeholder page.tsx (foundation check)
- [ ] **USER TEST #1:** `npm run dev` → confirm dark bg, fonts, blue accent render

### Phase 1 — Core plumbing
- [ ] SmoothScroll.tsx (Lenis wrapper + GSAP ScrollTrigger sync)
- [ ] CustomCursor.tsx (dot + lerped circle, hidden on touch)
- [ ] lib/animations.ts (reusable GSAP presets)
- [ ] hooks/useGSAP.ts

### Phase 2 — Sections (scroll order)
- [ ] Preloader (ORYXEL assembles, curtain reveal)
- [ ] Navbar (transparent→slim, mobile fullscreen overlay)
- [ ] Hero + HeroScene (R3F wireframe icosahedron, mouse parallax)
- [ ] About (line-by-line reveal, drawing rule line)
- [ ] Services (expandable full-width list, 01–05)
- [ ] Marquee (infinite ticker, stroke + filled text)
- [ ] Work (3–4 placeholder projects, hover scale + "View Project")
- [ ] Stats (count-up on scroll)
- [ ] Process (4-step, drawing connector line)
- [ ] Testimonial (single pull-quote)
- [ ] CTA / Contact
- [ ] Footer (giant faded ORYXEL watermark, back-to-top)

### Phase 3 — Polish
- [ ] Page-load choreography sequence
- [ ] Mobile simplification + reduced-motion fallbacks
- [ ] `npm run build` zero errors
- [ ] README.md with assumptions
- [ ] Lighthouse pass

## Notes / gotchas

- Tailwind v4: no config file; extend theme inside `@theme {}` in globals.css.
- All R3F / GSAP / Lenis components must be Client Components (`"use client"`).
- Custom cursor uses `cursor-none-desktop` class on <html> (set in layout.tsx).
- Don't use Framer Motion; GSAP only. Don't use native smooth-scroll.
