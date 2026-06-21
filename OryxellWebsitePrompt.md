# Claude Code Prompt — Build the Oryxel Website

## Who We Are

Oryxel is a Pakistan-based IT services startup. We offer: Web Development, Mobile App Development, UI/UX Design, AI Automation, and SaaS MVP Development. Our Instagram is @oryxell. The brand identity is dark, modern, and premium. Think "boutique tech studio," not "generic agency."

---

## What I Want Built

A single-page, fully animated, scroll-driven marketing website for Oryxel. This is NOT a template site. It must feel like an Awwwards-nominee-level experience — the kind of site a prospective client lands on and immediately thinks "these people know what they're doing."

**Primary reference sites (study these closely before writing any code):**

1. https://www.tresmarescapital.com/en/ — THIS IS THE #1 REFERENCE. Match the overall feel: smooth scroll hijacking, elegant section transitions, text that animates in with purpose, dark/light contrast, the way content reveals as you scroll. The pacing, the breathing room, the typographic confidence.
2. https://www.ujjwalagarwal.com/ — Clean section-based flow, smooth scroll, tasteful reveals, strong typography hierarchy.
3. https://primora.xyz/ — Dark theme, SVG line animations, professional but not boring, good use of stats/impact numbers.
4. https://spatial-festival.program.studio/ — Creative immersive feel.

---

## Tech Stack (mandatory)

- **Framework:** Next.js 14+ (App Router) with TypeScript
- **Styling:** Tailwind CSS + custom CSS for animations
- **Smooth Scrolling:** Lenis (by Studio Freight) — this is non-negotiable, it's what gives sites that buttery scroll feel
- **Animations:** GSAP (GreenSock) + ScrollTrigger plugin — all scroll-based animations must use this
- **3D Element:** Three.js or React Three Fiber — for ONE signature 3D hero element (see Hero section below)
- **Deployment-ready:** The site should build and run with `npm run dev` and `npm run build` without errors

---

## Design System

### Color Palette
- **Background:** Near-black (#0A0A0A or #050505)
- **Primary Text:** Off-white (#F5F5F5 or #EDEDED)
- **Accent:** ONE subtle accent color — either a muted electric blue (#4A7BF7) or a warm amber/gold (#C9A84C). Pick one, use it sparingly (hover states, small highlights, the CTA button, maybe a thin rule line). The site should be 95% black and white.
- **Secondary Text / Muted:** (#6B6B6B or #888888)
- **Subtle borders/dividers:** (#1A1A1A or #222222)

### Typography
- Use a premium sans-serif font pairing. Suggestions:
  - Headings: "Syne", "Space Grotesk", "Outfit", or "Cabinet Grotesk" — something with geometric character
  - Body: "Inter", "General Sans", or "Satoshi"
- Headings should be LARGE (clamp-based fluid sizing, think 4vw–8vw for hero text) and use either all-uppercase or mixed-case with tight letter-spacing
- Body text should be 16-18px, line-height 1.6-1.7, max-width ~65ch for readability

### General Design Rules
- NO generic stock illustrations or placeholder blob SVGs
- NO gradient meshes or "AI slop" backgrounds
- NO rounded-corner cards with drop shadows (that screams template)
- Generous whitespace — sections should breathe. Minimum 15vh padding between major sections
- Use horizontal rule lines, subtle grid overlays, or dot patterns if you need visual texture
- Cursor: Consider a custom cursor (small dot + trailing circle) — common in award-winning sites
- Page transitions: smooth fade/slide when navigating (if multi-page)

---

## Site Sections (in scroll order)

### 1. PRELOADER / INTRO
- A brief loading animation (1.5-2 seconds): The word "ORYXEL" assembles letter by letter, or a minimal line-draw animation of the logo, then the curtain splits/fades to reveal the hero
- Should feel premium, not loading-screen-ish

### 2. HERO SECTION (full viewport)
- **3D Element:** A slowly rotating, abstract geometric form rendered in Three.js/R3F — think a wireframe icosahedron, a morphing mesh, or particles forming a shape. It should be dark with subtle edge lighting (like the accent color glowing on edges). It reacts subtly to mouse movement (parallax tilt). This is the "wow" moment.
- **Headline:** Large, animated text that reveals word-by-word or line-by-line as the page loads. Something like:
  - "We build digital products that move industries forward."
  - or "Engineering the future, one product at a time."
- **Subheadline:** Smaller, fades in after the headline: "Web · Mobile · AI · Design · SaaS"
- **CTA:** A minimal "Let's Talk" or "Start a Project" button with a hover animation (border draw-in effect or background fill slide)
- **Navigation:** Fixed top nav, transparent initially, becomes a slim dark bar on scroll. Logo left, nav links right (About, Services, Work, Contact). Nav links should have a subtle underline-slide hover animation. Include a hamburger menu for mobile that opens a full-screen overlay with staggered link animations.

### 3. ABOUT / INTRO SECTION
- Short, punchy paragraph about Oryxel (2-3 sentences max in large text)
- Text should animate in line-by-line as it scrolls into view using GSAP ScrollTrigger
- Maybe a horizontal thin line that draws itself across the section as you scroll through it
- Include a small "Founded 2026 · Lahore, Pakistan" detail somewhere subtle

### 4. SERVICES SECTION
- Section title: "What We Do" or "Services" — large, scroll-triggered reveal
- Display the 5 services in a NON-card-grid layout. Options:
  - **Option A (preferred):** Full-width horizontal accordion/list — each service is a row. On hover, the row expands to show a short description and a subtle background visual shifts. Think of the expandable list style you see on high-end agency sites.
  - **Option B:** Vertical scroll-through where each service takes up a significant portion of the viewport and transitions smoothly into the next (like the Tres Mares section transitions)
- Services list:
  1. Web Development — "Performant, scalable web applications built with modern frameworks."
  2. Mobile App Development — "Native and cross-platform apps that users love."
  3. UI/UX Design — "Research-driven design that converts visitors into customers."
  4. AI Automation — "Intelligent systems that streamline operations and cut costs."
  5. SaaS MVP Development — "From concept to launch-ready product in weeks, not months."
- Each service should have a number (01, 02, 03...) and a thin divider line between them

### 5. MARQUEE / TICKER STRIP
- A full-width, infinitely scrolling horizontal marquee between sections
- Contains repeated text like: "WEB DEV · MOBILE APPS · UI/UX · AI AUTOMATION · SAAS MVP ·" in large, outlined/stroke text (transparent fill, white border) mixed with filled text
- Scroll speed should be subtle and constant, not jarring
- This adds visual rhythm and is a signature element of modern award-winning sites

### 6. WORK / PORTFOLIO SECTION
- Section title: "Selected Work" or "Case Studies"
- Since Oryxel is new and may not have case studies yet, design this as a placeholder-ready section:
  - Show 3-4 project slots with placeholder project names and abstract dark images
  - Each project should be a large image/visual with the project name overlaid
  - On hover: image scales slightly, a "View Project →" label appears
  - Scroll-triggered reveal: projects stagger in from below
- Make it easy to swap in real projects later (component-based)

### 7. STATS / IMPACT SECTION
- A horizontal strip or centered block with 3-4 animated counters:
  - "50+" Projects Delivered
  - "20+" Happy Clients  
  - "3" Countries Served
  - "98%" Client Satisfaction
- Numbers should count up from 0 when they scroll into view (GSAP counter animation)
- Use large, bold numbers with small labels beneath

### 8. PROCESS SECTION (optional but nice)
- "How We Work" — show a 4-step process:
  1. Discovery → 2. Design → 3. Develop → 4. Deploy
- Could be a horizontal scroll-within-scroll, or a vertical timeline with connecting lines that draw as you scroll
- Keep it minimal

### 9. TESTIMONIALS (optional)
- A single, large pull-quote from a client (can be placeholder)
- Big quotation marks, italic serif font for contrast, fade-in animation
- Keep it to ONE quote, not a carousel

### 10. CTA / CONTACT SECTION
- "Let's Build Something Together" or "Ready to Start?"
- Large text, centered, with a prominent "Get in Touch" button
- Below: email address, Instagram handle (@oryxell), and maybe a Calendly-style "Book a Call" link
- The background could subtly shift here — maybe the 3D element from the hero reappears in a simplified form, or particles drift across

### 11. FOOTER
- Minimal: Logo, copyright "© 2026 Oryxel", social links (Instagram, LinkedIn, Twitter/X)
- Maybe a "Back to Top" smooth scroll link
- A subtle animation: the word "ORYXEL" in massive, faded text behind the footer content (like a watermark)

---

## Animation Specifications

All animations should use GSAP + ScrollTrigger. Here are the specific behaviors:

1. **Smooth Scroll:** Lenis must be initialized globally. Scroll should feel silky and slightly decelerated (like Tres Mares Capital).

2. **Text Reveals:** Headlines and paragraph text should use a clip-path or translateY reveal — words/lines slide up from behind a mask as they enter the viewport. Use `SplitText` (GSAP plugin) or manually split into `<span>` elements with overflow:hidden wrappers.

3. **Stagger Animations:** When multiple elements appear (like service list items or project cards), they should stagger in with 0.1-0.15s delays between each.

4. **Parallax:** Images and decorative elements should have subtle parallax (move at different speeds relative to scroll). Use ScrollTrigger's `scrub: true` for this.

5. **Section Transitions:** Sections should feel like they "arrive" — use a combination of opacity (0→1) and slight translateY (30px→0) triggered at about 20% viewport entry.

6. **Magnetic Buttons:** The CTA buttons should have a slight "magnetic" pull effect — when the cursor gets close, the button subtly moves toward it.

7. **Page Load Sequence:** After the preloader completes, the hero content should animate in with a choreographed sequence: 3D element fades in → headline reveals word by word → subtext fades in → nav slides down → CTA button pops in.

8. **Custom Cursor:** A small white dot (8px) that follows the mouse exactly, with a larger circle (40px) that follows with slight delay (lerp). On hovering interactive elements, the outer circle scales up. On hovering images, it could show "View" text inside.

---

## Performance Requirements

- Lighthouse score: aim for 90+ on Performance, 100 on Accessibility
- Lazy load all images and the 3D scene
- Use `will-change` and `transform` for GPU-accelerated animations only
- Implement `prefers-reduced-motion` media query — disable heavy animations for users who have this set
- Mobile: All animations should be simplified. The 3D hero should either be a static fallback image or a very simplified version. No custom cursor on touch devices. Hamburger nav with full-screen overlay.
- Images: Use Next.js `<Image>` component with WebP format

---

## File/Folder Structure Expected

```
oryxel-website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── fonts/
├── components/
│   ├── Preloader.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── HeroScene.tsx          (Three.js/R3F 3D element)
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Marquee.tsx
│   ├── Work.tsx
│   ├── Stats.tsx
│   ├── Process.tsx
│   ├── Testimonial.tsx
│   ├── CTA.tsx
│   ├── Footer.tsx
│   ├── CustomCursor.tsx
│   └── SmoothScroll.tsx       (Lenis wrapper)
├── hooks/
│   └── useGSAP.ts
├── lib/
│   └── animations.ts          (reusable GSAP animation presets)
├── public/
│   └── images/
├── tailwind.config.ts
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## Critical "Do NOT" List

- Do NOT use any UI component library (no shadcn, no Material UI, no Chakra)
- Do NOT use Framer Motion — use GSAP exclusively for consistency
- Do NOT create a light/bright theme — this site is dark mode only
- Do NOT use generic Lorem Ipsum — use the actual copy provided above or write contextually appropriate placeholder copy
- Do NOT add a blog section, pricing page, or team section
- Do NOT use CSS `scroll-behavior: smooth` — Lenis handles this
- Do NOT make it look like a typical "agency template" — if you've seen it on ThemeForest, don't do it

---

## Final Check Before You Finish

1. Run `npm run build` — it should complete with zero errors
2. Test smooth scroll on the dev server
3. Verify all GSAP animations trigger correctly on scroll
4. Check mobile responsiveness at 375px, 768px, and 1024px widths
5. Verify the 3D hero element renders and responds to mouse movement
6. Confirm the preloader plays and transitions to the hero
7. Make sure the custom cursor works on desktop and is hidden on mobile
8. Verify all text is readable against the dark background (contrast ratio)

Start building. Do not ask me clarifying questions — make judgment calls where needed and document any assumptions in a README.md. Prioritize the visual experience above all else.