# Oryxel — Website

A single-page, scroll-driven, fully animated marketing site for **Oryxel**, a
Pakistan-based technology studio (Web, Mobile, UI/UX, AI Automation, SaaS MVP).
Dark, premium, Awwwards-aimed.

## Tech stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (CSS-based config via `@theme` in `app/globals.css`)
- **GSAP + ScrollTrigger** — all scroll/entrance animations
- **Lenis** — smooth scrolling
- **Three.js + React Three Fiber + drei** — the hero 3D element

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Project structure

```
app/            layout.tsx, page.tsx (orchestrates sections), globals.css
components/      Preloader, Navbar, Hero, HeroScene (3D), About, Services,
                Marquee, Work, Stats, Process, Testimonial, CTA, Footer,
                CustomCursor, SmoothScroll
hooks/          useGSAP (scoped gsap.context)
lib/            animations.ts (reveal/fade/count presets), lenis.ts (instance)
```

## Design system (in `app/globals.css` → `@theme`)

| Token | Value |
| --- | --- |
| bg / bg-soft | `#050505` / `#0a0a0a` |
| fg / muted | `#f5f5f5` / `#888888` |
| line | `#1a1a1a` |
| accent | `#4a7bf7` (electric blue) |

Fonts: **Space Grotesk** (headings), **Inter** (body), loaded via `next/font`.

## Accessibility & performance

- `prefers-reduced-motion` disables Lenis, the preloader timeline, the marquee,
  and swaps the 3D hero for a static shape.
- 3D hero + custom cursor are disabled on touch / coarse-pointer devices; the
  hero shows a static fallback there.
- The 3D scene is lazy-loaded (`next/dynamic`, client-only).

## Assumptions / placeholders to replace before launch

These are stand-ins added during the build — swap them for real content:

- **Email:** `info@oryxel.xyz` ✅ (real)
- **WhatsApp:** `+92 309 4818226` ✅ (real, linked as `wa.me/923094818226`)
- **Instagram:** `@oryxell` ✅ (real)
- **Calendly / "Book a Call":** `calendly.com/oryxel` — placeholder URL
- **LinkedIn / X (footer):** guessed URLs — confirm or replace
- **Testimonial:** "Sarah Lin · Helix Finance" — fictional, to be updated later
- **Work projects:** Helix Finance, Nomad Health, Atlas Commerce, Sentinel AI —
  placeholder names with abstract dot-grid visuals. Each project is a component
  in `components/Work.tsx`; swap the visual `div` for a `next/image` `<Image>`
  when real case-study assets exist.

## Deploy (Vercel)

Push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new),
or run `vercel` with the CLI. No environment variables are required.
