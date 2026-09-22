# NABIL FANNANE — Master Build Plan

> **Creative brief + implementation spec for Claude Code**
> Project: Personal portfolio · Format: static site (HTML / CSS / vanilla JS) · Status: awaiting approval
> Identity reference: `Media/profile.png` (see §5)

---

## PART ONE — CREATIVE BRIEF

### 1. Website Overview

A cinematic, single-page portfolio for **Nabil Fannane**, a front-end / UI engineer. The site is itself the proof: every scroll, transition and breakpoint shows the craft Nabil sells. Visitors should leave thinking *"if this is the portfolio, imagine the product."*

The page is built around **one continuous AI-generated film**, scrubbed by the scroll: a developer at a workstation writes HTML and CSS → the code turns into layouts, type and motion → the camera pulls back to show the finished site running on desktop, tablet and phone. That arc (**Idea → Craft → Shipped**) is the story of the whole website.

| | |
|---|---|
| **Audience** | Hiring managers, engineering leads, founders and agencies looking for a senior front-end partner |
| **Primary goal** | Start a conversation (contact / hire) |
| **Secondary goals** | Show selected work, show engineering depth (performance, accessibility, responsive), show taste |
| **Success signal** | Visitor reaches the final CTA and clicks "Start a project" |

### 2. Core Positioning

**One-liner (improved)**
> I turn ideas into fast, accessible web experiences that feel effortless on every screen.

**Headline system**
- Hero: **"Ideas, engineered to feel effortless."**
- Supporting: *Front-end & UI engineer building fast, accessible, responsive interfaces that people enjoy using, and that businesses can scale.*

**Positioning statement**
For teams that need their product to *feel* as good as it works, Nabil Fannane is the front-end engineer who closes the gap between design and production: pixel-careful interfaces, performance budgets that hold, and accessibility built in from the start rather than patched on later.

**Mission (generated, Q4 skipped)**
> The web should work beautifully for everyone, on every device, on every connection. I build the interfaces that make that true.

**Proof pillars**
1. **Craft**: interfaces that are clean, intuitive and considered down to the last easing curve.
2. **Speed**: fast by default. Performance is a feature you can feel.
3. **Reach**: accessible and responsive, so the experience holds up for every user and every screen.

### 3. Brand Personality

| Is | Is not |
|---|---|
| Calm, confident, precise | Loud, salesy, "rockstar ninja" |
| Premium and cinematic | Flashy for the sake of it |
| Technical, with taste | Cold or jargon-heavy |
| Warm and human (the smile in the photo) | Corporate |

**Voice:** short sentences. Concrete verbs (*build, ship, tune, refine*). Show, don't boast. Every claim is backed by a detail.

**Personality in one line:** *a senior engineer with a director's eye.*

### 4. Visual Direction

**Mood:** a dark studio at night: deep blue-black space, cool electric blue light, cyan highlights like the glow of a monitor, and lots of negative space. Think "Apple product film meets code editor."

**Keywords:** cinematic · premium · creative · minimal · technical · luminous

**Signature motifs**
- **Glowing hairline grid**: faint 1px blueprint grid that appears behind sections, a nod to layout systems.
- **Code-to-design morph**: mono code snippets that resolve into rendered UI.
- **Light leaks**: soft blue→cyan radial gradients drifting behind the type.
- **Film grain**: animated SVG noise at ~5% opacity across the whole page.
- **Device frames**: desktop / tablet / phone silhouettes as the closing visual.

### 5. Higgsfield Seedance 2.0 — Asset Generation

**Identity reference image:** `Media/profile.png`
(Copied from `Portfolio/profile.png`.)

Use this image as the **character / identity reference for every generation** so Nabil stays consistent across all three clips.

**Identity lock (paste into every prompt):**
> The same man as the reference image: short dark curly hair with grey at the temples, full neatly trimmed dark beard with grey flecks, brown eyes, warm confident expression. Wearing a black blazer over a black crew-neck t-shirt. Keep face, hairline, beard shape and wardrobe identical to the reference.

**Global settings**

| Setting | Value |
|---|---|
| Model | Higgsfield **Seedance 2.0** |
| Resolution | **1080p** (1920×1080, 16:9) |
| Clip length | **8–12 s** each (target 10 s) |
| Frame rate | 24 fps |
| Mode | Image-to-video with identity reference |
| Continuity | **One seamless shot.** Clip 2 starts from the last frame of clip 1, and clip 3 starts from the last frame of clip 2 |
| Grade | Deep blue-black shadows (#0B0F14), electric blue key (#3B82F6), cyan rim/accent (#22D3EE), clean whites |
| Negative prompt | no text artifacts, no warped hands, no extra fingers, no face drift, no logos, no brand names, no jump cuts, no camera shake, no lens flare overload |

**Chaining workflow (for the continuous film)**
1. Generate **Clip 1** from `Media/profile.png` + prompt.
2. Export its **final frame** → use it as the start image for **Clip 2** (keep identity reference attached).
3. Export Clip 2's final frame → start image for **Clip 3**.
4. Reject any clip whose first frame does not match the previous last frame. Continuity beats variety.

### 6. Three Cinematic Scenes (one continuous film)

#### SCENE 1: "THE IDEA" (0–10 s) · Hero
> Cinematic night studio. The man from the reference image sits at a sleek minimal workstation: one ultrawide monitor, matte-black desk, soft electric-blue key light from the screen on his face, thin cyan rim light on his shoulders. On screen: clean HTML and CSS being typed in a dark code editor. He types calmly, focused, with a slight confident smile. Camera: slow push-in from a medium shot to a close shot over his shoulder, ending centered on the monitor as the code fills the frame. Shallow depth of field, anamorphic feel, deep blue-black background, subtle haze. Premium, calm, precise. Not a stock "hacker" shot.

**End frame:** monitor filling ~80% of frame, code glowing.

#### SCENE 2: "THE CRAFT" (10–20 s) · Transition through the screen
> Continuing from the monitor close-up: the camera passes *through* the screen into a dark three-dimensional space where the code lifts off and transforms into floating, beautifully crafted interface elements. Layout grids draw themselves in thin blue lines, large typography glides into place, cards and buttons assemble with smooth easing, a responsive layout reflows from wide to narrow, and cyan highlights trace hover states and animations. Everything floats in a blue-black void with soft volumetric light. Camera glides slowly forward through the layers. Elegant, weightless, precise. Like a product film for a design system.

**End frame:** the floating elements lock together into one complete, polished website layout, centered.

#### SCENE 3: "SHIPPED" (20–30 s) · Reveal
> Continuing from the assembled layout: the camera pulls back smoothly and reveals that the website is now running on three real devices arranged on the same matte-black desk: a desktop monitor, a tablet and a phone. The same site is on all three, each perfectly adapted to its screen, with subtle scrolling and animations playing. The man from the reference image leans back in his chair at the edge of frame, satisfied, and gives a small warm smile toward the devices. Soft blue key light, cyan rim, gentle haze, deep shadows. Final frame holds still: three glowing screens, calm confidence. Cinematic, premium, finished.

**End frame:** wide composed shot, clean negative space at the top for the final CTA headline.

#### Deliverables per clip → `/assets`

| File | Purpose |
|---|---|
| `assets/video/film-1080.mp4` | 3 clips joined (≈30 s), H.264, CRF 23, `-movflags +faststart`, **all-keyframe (`-g 1`) for scrubbing** |
| `assets/video/film-720.mp4` | Mobile variant, 1280×720 |
| `assets/frames/desktop/f_0001.webp …` | Image sequence for scroll scrubbing (every 2nd frame ≈ 360 frames, 1600px wide, q≈70) |
| `assets/frames/mobile/f_0001.webp …` | Mobile sequence (≈180 frames, 900px wide) |
| `assets/img/poster-1.webp`, `poster-2.webp`, `poster-3.webp` | Last frame of each scene (posters / reduced-motion fallback) |

**ffmpeg recipes**
```bash
# join clips
ffmpeg -f concat -safe 0 -i clips.txt -c copy film-raw.mp4
# scrub-friendly desktop video
ffmpeg -i film-raw.mp4 -vf scale=1920:-2 -c:v libx264 -crf 23 -g 1 -pix_fmt yuv420p -an -movflags +faststart assets/video/film-1080.mp4
# image sequence (desktop)
ffmpeg -i film-raw.mp4 -vf "fps=12,scale=1600:-2" -c:v libwebp -quality 70 assets/frames/desktop/f_%04d.webp
# image sequence (mobile)
ffmpeg -i film-raw.mp4 -vf "fps=6,scale=900:-2" -c:v libwebp -quality 65 assets/frames/mobile/f_%04d.webp
```

**One-command conversion:** save the clips as `assets/video/clip-1.mp4`, `clip-2.mp4`, `clip-3.mp4` and run `bash make-frames.sh`. It joins the clips and writes the scrub videos, the JPEG frame sequences, the posters and `assets/frames/manifest.json`.

**Until the film exists:** the site ships with a **code-built placeholder scene** (canvas + CSS: animated code typing → UI blocks assembling → three device frames) so the build is complete and looks finished without the video. When the frames land in `/assets/frames/`, add `assets/frames/manifest.json` (`{ "desktop": 360, "mobile": 180, "ext": "webp" }`). `script.js` detects it and swaps to image-sequence scrubbing automatically.

---

## PART TWO — SITE ARCHITECTURE & CONTENT

### 7. Website Structure

```
┌ Preloader (counter 000 → 100, name reveal)
├ Nav (logo mark · Work · About · Contact · "Available" pill)
├ 01 HERO: pinned film scrub, Scene 1, kinetic headline
├ 02 STATS STRIP: animated counters + marquee
├ 03 MISSION: giant word-by-word reveal
├ 04 PILLARS: Craft / Speed / Reach (pinned horizontal)
├ 05 FILM CONTINUES: Scene 2 scrub with overlay captions
├ 06 STORY: portrait + narrative, parallax
├ 07 SERVICES: three offers, expanding rows
├ 08 SELECTED WORK: case-study cards, hover-follow preview
├ 09 FINAL CTA: Scene 3 scrub → huge "Let's build it."
└ Footer: giant wordmark, links, local time, back-to-top
```

### 8. Hero Section

- **Layout:** full-viewport, pinned for ~250vh. Film (Scene 1) scrubs behind a dark gradient vignette.
- **Eyebrow (mono):** `FRONT-END & UI ENGINEER — AVAILABLE FOR PROJECTS`
- **Headline (huge, kinetic, split by line → char):**
  **Ideas,**
  **engineered**
  *to feel effortless.* (italic serif accent, cyan gradient)
- **Sub:** Fast, accessible, responsive interfaces that people enjoy using and that businesses can scale.
- **CTAs:** `Start a project →` (primary, magnetic) · `See the work` (ghost)
- **Scroll cue:** thin animated line + `SCROLL` in mono.
- **Motion:** chars rise from a masked baseline with staggered blur-to-sharp; on scroll the headline scales down and drifts up while the film pushes in.

### 9. Animated Stats Strip

Counters tick up when in view; a slow marquee of skills runs beneath.

| Stat | Label |
|---|---|
| **100** | Lighthouse score targets: performance, a11y, best practices, SEO |
| **< 1s** | Largest Contentful Paint budget on every build |
| **AA** | WCAG 2.2 accessibility as the baseline |
| **1** | Codebase that adapts to every screen size |

> ✏️ *These are standards-based stats (not invented numbers). Swap in real figures such as years of experience, products shipped or users served whenever you have them.*

**Marquee:** `HTML · CSS · JAVASCRIPT · TYPESCRIPT · REACT · GSAP · DESIGN SYSTEMS · ACCESSIBILITY · PERFORMANCE · RESPONSIVE · `

### 10. Mission Section

Giant centered statement, words fade from 15% → 100% opacity as the user scrolls (scrubbed):

> **The web should work beautifully for everyone, on every device, on every connection. I build the interfaces that make that true.**

Key words (*everyone*, *every device*, *true*) light up in the blue→cyan gradient.

### 11. Three Pillars Section

Pinned horizontal scroll on desktop (three full-height panels), stacked on mobile. Each panel has a large index number, a title, copy and a live micro-demo.

| # | Pillar | Copy | Micro-demo |
|---|---|---|---|
| 01 | **Craft** | Interfaces that feel obvious. Clean structure, considered typography and motion that guides rather than decorates. | A button that shows its easing curve on hover |
| 02 | **Speed** | Fast is a feature. Lean code, smart loading and performance budgets that survive real-world devices. | A Lighthouse-style ring filling to 100 |
| 03 | **Reach** | Built for everyone. Semantic, accessible, responsive, so the experience holds up for every user and every screen. | A mini layout reflowing desktop → tablet → phone |

### 12. Story Section

**Title:** *From idea to interface.*

Two-column: portrait (`Media/profile.png`, duotone blue grade, clip-path reveal + parallax) and narrative.

> I've always been drawn to the moment an idea becomes something you can actually use. That's the space I work in.
>
> I've built and shipped scalable, responsive React applications, integrated complex features into large existing codebases, and consistently delivered clean, high-quality user experiences. Along the way I've learned that the best interfaces aren't the loudest ones. They're the ones that feel effortless because someone sweated every detail.
>
> Today I partner with teams and founders who care about how their product *feels*: fast, accessible and polished on every screen.

**Pull-quote:** *"The best interface is the one nobody has to think about."*

### 13. Services Section

Full-width expanding rows (hover/tap reveals detail + a preview image following the cursor).

| # | Service | What you get |
|---|---|---|
| 01 | **Web Experiences** | Marketing sites and landing pages with cinematic motion, built from scratch in clean HTML/CSS/JS or React |
| 02 | **Product UI Engineering** | Scalable React front-ends, component libraries and design systems that integrate cleanly into large codebases |
| 03 | **Performance & Accessibility** | Audits and fixes for Core Web Vitals and WCAG compliance, turning slow or exclusionary interfaces into fast, inclusive ones |

### 14. Featured Work Section

**Title:** *Selected work.* Large cards in an asymmetric grid, image scales inside a mask on hover, cursor becomes a `View` disc.

Five cards: four live projects plus one open slot. Thumbnails are real homepage screenshots in `assets/img/work/` (1440×900 JPEG).

| # | Project | Tag | Line | Link | Thumb |
|---|---|---|---|---|---|
| 01 | **Winerie** | Web experience · Video | Cinematic winery site: full-bleed video storytelling, membership flow and a modernized design system | https://mzabicoder.github.io/winerie/ | `winerie.jpg` |
| 02 | **Miki Steakhouse** | Business site · Hospitality | Fire-lit steakhouse site with reservations, events, menu, wine list and gallery | https://mzabicoder.github.io/mikisteakhouse_business/ | `miki.jpg` |
| 03 | **Big Easy** | React · Fine dining | React single-page restaurant app with menu options, awards, sign-in and table booking | https://mzabicoder.github.io/reactProjec/ | `bigeasy.jpg` |
| 04 | **Le Comptoir** | Restaurant · Responsive | Moody, image-led restaurant site with reservations, menu, private dining and team pages | https://mzabicoder.github.io/ComptoirRestaurant/ | `comptoir.jpg` |
| 05 | **Your Next Project** *(placeholder)* | Coming soon | Open slot, ready for the next build | `#` (`data-todo="project-link"`) | `next.svg` |

Cards open in a new tab (`target="_blank" rel="noopener"`). To add a project, duplicate a `.work-card` in `index.html`, then change the link, title, tags and image.

### 15. Final CTA Section

Scene 3 scrubs (pull-back to three devices). As it settles, the headline assembles in the negative space above the devices:

- **Headline:** **Let's build** *something effortless.*
- **Sub:** Have an idea, a product or a site that needs to feel better? Let's talk.
- **Primary CTA:** `Start a project →` → **`mailto:` contact address (to confirm)**
- **Secondary:** `LinkedIn` · `GitHub` (URLs to confirm)
- Giant email address as a hover-underlined link; click copies to clipboard with a "Copied ✓" toast.

### 16. Footer

- Giant outline wordmark **NABIL FANNANE** that fills on scroll (clip-path).
- Columns: Navigation · Social · Contact.
- Live local time (`Local time — 14:32`) + `Available for new projects` pulsing dot.
- `© 2026 Nabil Fannane. Hand-coded with HTML, CSS & JS.` + back-to-top.

---

## PART THREE — DESIGN SYSTEM

### 17. Complete Visual Style Guide

**Color tokens**

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0B0F14` | Page background |
| `--bg-2` | `#0F151C` | Raised surfaces, cards |
| `--line` | `rgba(248,250,252,.08)` | Hairlines, grid |
| `--text` | `#F8FAFC` | Primary text |
| `--muted` | `#94A3B8` | Secondary text |
| `--primary` | `#3B82F6` | Electric blue: buttons, highlights |
| `--accent` | `#22D3EE` | Cyan: focus, accents, gradients |
| `--grad` | `linear-gradient(100deg,#3B82F6,#22D3EE)` | Headline accents, CTA |
| `--glow` | `0 0 80px rgba(59,130,246,.35)` | Light-leak glow |

Contrast: `--text` on `--bg` ≈ 18:1; `--muted` on `--bg` ≈ 7:1 (AA+).

**Spacing:** 4px base, fluid section padding `clamp(96px, 14vw, 220px)`.
**Radius:** 2px (hairline, technical) and 999px (pills). No soft 16px card radius, which keeps the look sharp and premium.
**Grid:** 12 columns, `clamp(16px, 4vw, 48px)` gutters, max-width 1600px.
**Grain:** SVG `feTurbulence` noise, fixed full-screen, `opacity:.05`, stepped 8fps shift.

### 18. Typography

| Role | Font (Google Fonts) | Style |
|---|---|---|
| Display | **Inter Tight** 600–800 | Huge, tight tracking (-0.04em), line-height 0.9 |
| Accent | **Instrument Serif** Italic | Emotional words inside headlines, gradient fill |
| Body | **Inter** 400/500 | 17–19px, line-height 1.6 |
| Mono | **JetBrains Mono** 400 | Eyebrows, labels, counters, code, all caps, +0.12em tracking |

**Fluid scale**
- Hero: `clamp(3.5rem, 13vw, 14rem)`
- H2: `clamp(2.75rem, 8vw, 8rem)`
- Mission statement: `clamp(2rem, 5vw, 5rem)`
- Body: `clamp(1rem, 1.1vw, 1.1875rem)`
- Mono label: `0.75rem`

### 19. Animation Direction

**Principles:** slow in, confident out. Nothing bounces. Motion shows structure.

| Token | Value |
|---|---|
| Primary ease | `expo.out` / `cubic-bezier(.16,1,.3,1)` |
| Reveal ease | `power4.out` |
| Durations | micro 0.25s · UI 0.6s · reveal 1.2s · cinematic 1.6s |
| Stagger | chars 0.02s · words 0.05s · lines 0.1s |

**Signature moves**
1. **Masked line reveal**: text rises from behind an overflow-hidden line.
2. **Scrubbed opacity paragraph**: mission words light up with scroll.
3. **Pinned horizontal pillars**.
4. **Clip-path image reveals**: `inset(100% 0 0 0)` → `inset(0)`.
5. **Film scrub**: canvas image sequence tied to scroll progress.
6. **Section color wash**: glow gradient shifts position per section.
7. **Preloader → hero**: counter hits 100, overlay splits, headline chars cascade in.

### 20. Interaction Design

- **Custom cursor:** 8px dot + 40px trailing ring (lerped). Grows to a `View` / `Drag` label disc on work cards; hides on touch devices.
- **Magnetic buttons:** CTAs pull toward the cursor (strength 0.35) and spring back.
- **Hover states:** underlines draw left→right; service rows reveal a floating preview that follows the cursor with inertia.
- **Nav:** hides on scroll down, reappears on scroll up; blur-glass background after hero; active section indicator.
- **Copy-email:** click → clipboard + toast.
- **Focus:** visible 2px cyan focus rings on every interactive element (keyboard parity with hover).

### 21. Scroll Behavior

- **Lenis** smooth scroll (`lerp: 0.09`, `wheelMultiplier: 1`), synced to GSAP ticker; ScrollTrigger uses Lenis updates.
- **Film scrub:** three pinned film sections map scroll progress → frame index on a `<canvas>` (`object-fit: cover` drawn manually). Scene ranges: hero = frames 0–33%, film-continues = 33–66%, final CTA = 66–100%.
- Anchor links scroll via `lenis.scrollTo()` with offset for nav.
- Progress bar (2px gradient) at the top of the viewport.

### 22. Mobile Behavior

- Breakpoints: **≤ 640** phone, **641–1024** tablet, **> 1024** desktop.
- Pillars: horizontal pin → vertical stack with per-card reveals.
- Film: lighter mobile frame set (≈180 frames, 900px), shorter pin durations (150vh).
- Cursor and magnetic effects disabled on `(hover: none)`.
- Lenis kept for wheel only; native touch scrolling (`syncTouch: false`).
- Hero type still huge (`13vw`), but line breaks are rebalanced for narrow screens.
- Tap targets ≥ 44px; nav collapses to a full-screen menu with staggered links.

---

## PART FOUR — TECHNICAL IMPLEMENTATION (for Claude Code)

### 23. Technical Implementation

**Stack:** HTML + CSS + vanilla JS only. No frameworks, no build step.

**File structure (project root = `Portfolio/`)**
```
Portfolio/
├── BUILD-PLAN.md
├── index.html
├── style.css
├── script.js
├── Media/
│   └── profile.png            ← Higgsfield identity reference
└── assets/
    ├── img/
    │   ├── portrait.jpg       ← optimized from Media/profile.png
    │   ├── poster-1.webp …    ← film posters
    │   └── work/              ← project thumbnails
    ├── video/
    │   ├── film-1080.mp4
    │   └── film-720.mp4
    ├── frames/
    │   ├── desktop/f_0001.webp …
    │   └── mobile/f_0001.webp …
    └── favicon.svg
```

**CDN (load `defer`, before `script.js`)**
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js" defer></script>
```

**`script.js` modules (in order)**
1. `initLenis()`: Lenis ↔ GSAP ticker ↔ ScrollTrigger sync.
2. `splitText(el)`: tiny custom splitter (lines/words/chars wrapped in masked spans; `aria-label` holds the original text, spans `aria-hidden`).
3. `initPreloader()`: counts real asset loading (first 20 frames + fonts), then plays the intro timeline.
4. `initFilm()`: checks `assets/frames/{desktop|mobile}/f_0001.webp`; if present → image-sequence canvas scrubber (progressive preload: keyframes first, then fill); else → `initPlaceholderFilm()` (canvas-drawn code → UI → devices scene).
5. `initReveals()`: `[data-reveal]` lines/chars, clip-path images, counters.
6. `initMission()`: scrubbed word opacity.
7. `initPillars()`: `matchMedia` horizontal pin (desktop) / stacked (mobile).
8. `initCursor()`, `initMagnetic()`, `initServicesPreview()`: pointer-only.
9. `initNav()`, `initProgress()`, `initClock()`, `initCopyEmail()`.
10. `prefers-reduced-motion`: skip Lenis, pins and scrubs; show posters; simple fades only.

**Performance budget**
- LCP < 1.5s on 4G; CLS 0; JS (own) < 15 KB gzipped.
- Fonts: `preconnect` + `display=swap`, only needed weights.
- Frames: WebP, lazy progressive loading, `createImageBitmap` decode, canvas sized to `devicePixelRatio` (capped at 2).
- Only `transform` / `opacity` / `clip-path` are animated; `will-change` set only while animating.
- Images: `loading="lazy"`, `decoding="async"`, explicit `width`/`height`.
- Video/frames never block first paint; hero shows poster/placeholder immediately.

**Accessibility**
- Semantic landmarks (`header`, `main`, `section[aria-labelledby]`, `footer`), skip link, one `h1`.
- Split text keeps the readable text for screen readers.
- Film canvas is `aria-hidden`; each scene has a visually hidden description.
- Full keyboard support, visible focus, `prefers-reduced-motion` honored.

**SEO / meta**
- Title: `Nabil Fannane — Front-End & UI Engineer`
- Description: *Front-end & UI engineer turning ideas into fast, accessible, responsive web experiences.*
- Open Graph image: `assets/img/og.jpg` (1200×630, poster-3 + wordmark).
- JSON-LD `Person` schema.

**Definition of done**
- [ ] All sections in §7 built and matching copy in §8–§16
- [ ] Works with placeholder film now; swaps to real frames automatically
- [ ] 60fps scroll on a mid-range laptop; no layout shift
- [ ] Responsive at 360 / 768 / 1024 / 1440 / 1920
- [ ] Reduced-motion and keyboard paths verified
- [ ] Lighthouse ≥ 95 across all four categories (without film assets)

### Open items to confirm
1. **CTA destination:** email address (and LinkedIn / GitHub URLs) for "Start a project".
2. ~~Real projects~~: done (4 live projects + 1 open slot).
3. **Real stats**, if any (years, projects shipped), to replace or join the standards-based ones.
