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
- [x] SmoothScroll.tsx (Lenis wrapper + GSAP ScrollTrigger sync, reduced-motion aware)
- [x] CustomCursor.tsx (dot + lerped ring, "View" mode via data-cursor, hidden on touch)
- [x] lib/animations.ts (revealWords, fadeUp, countUp, splitToMaskedWords presets)
- [x] hooks/useGSAP.ts (scoped gsap.context hook)
- [x] Wired SmoothScroll + CustomCursor into layout.tsx
- [ ] **USER TEST #2:** smooth scroll feel, cursor dot+ring, "View" on box, scroll reveals

### Phase 2 — Sections (scroll order)
- [x] Preloader (ORYXEL letters rise + accent line draw, curtain slide-up)
- [x] Navbar (transparent→slim on scroll, underline-slide hover, mobile fullscreen overlay)
- [x] Hero + HeroScene (R3F wireframe icosahedron + edge-glow + mouse parallax; magnetic CTA; static fallback on touch/reduced-motion)
- [x] Lenis instance shared via lib/lenis.ts singleton (avoids Window type conflict)
- [ ] **USER TEST #3:** preloader plays → curtain reveals hero; nav slides in; 3D spins + tilts to mouse; headline word-reveal; magnetic CTA; nav goes slim on scroll; mobile hamburger overlay
- NOTE: dev server run via background tool (shell `&` dies on shell exit). Run: `npm run dev`.
- [x] About (line-by-line mask reveal, scrub-drawn rule line, founded meta)
- [x] Services (full-width list 01–05, hover wash + expand desc, staggered reveal)
- [x] Marquee (infinite GSAP ticker, alternating filled/stroke text)
- [ ] **USER TEST #4:** About lines rise in + rule draws on scroll; Services rows stagger in, hover expands desc + blue wash; Marquee scrolls infinitely
- NOTE: harmless R3F log "THREE.Clock deprecated" — from library internals, ignore.
- [x] Work (4 placeholder projects, dot-grid abstract visuals, hover scale + "View Project", data-cursor=view, staggered reveal)
- [x] Stats (count-up from 0 on scroll: 50+/20+/3/98%)
- [x] Process (4-step vertical timeline, scrub-drawn accent connector line)
- [ ] **USER TEST #5:** Work projects stagger + hover overlay; Stats count up on entry; Process line draws as you scroll, steps reveal
- [x] Testimonial (single italic-serif pull-quote, big accent quote mark, word reveal)
- [x] CTA / Contact (word-reveal headline, magnetic "Get in Touch", email/IG/Book-a-Call)
- [x] Footer (giant faded ORYXEL watermark, socials, Lenis back-to-top)
- [ ] **USER TEST #6:** Testimonial reveal; CTA magnetic button + links; Footer watermark + back-to-top scrolls smoothly

PLACEHOLDERS to replace later (document in README):
- Email: hello@oryxel.com · Calendly: calendly.com/oryxel · IG: instagram.com/oryxell
- Socials LinkedIn/X are guessed URLs · Testimonial "Sarah Lin, Helix Finance" is fictional
- Work projects (Helix Finance, Nomad Health, Atlas Commerce, Sentinel AI) are placeholders

### Phase 3 — Polish
- [x] Page-load choreography sequence (preloader -> hero timeline)
- [x] Mobile simplification + reduced-motion fallbacks (3D static, cursor off, marquee/lenis off on reduce)
- [x] `npm run build` zero errors (verified)
- [x] README.md with assumptions
- [ ] Lighthouse pass (do after deploy on live URL)
- [ ] Manual mobile QA at 375/768/1024 (recommend before launch)

### Deployment
- Pushed to GitHub: izzatkamall/oryxel-website (private), branch master, commit 4e78987
- Method chosen: GitHub -> Vercel dashboard import (auto-deploy on push)
- No env vars required.

## Notes / gotchas

- Tailwind v4: no config file; extend theme inside `@theme {}` in globals.css.
- All R3F / GSAP / Lenis components must be Client Components (`"use client"`).
- Custom cursor uses `cursor-none-desktop` class on <html> (set in layout.tsx).
- Don't use Framer Motion; GSAP only. Don't use native smooth-scroll.
