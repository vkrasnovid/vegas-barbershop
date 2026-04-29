# QA Report: Vegas Barbershop Landing Page (TASK-025)

**Date:** 2026-04-29  
**Tester:** QA Engineer (Subagent)  
**Build:** `npm run build` — **PASS** (0 errors, 1.88s)  
**Pages built:** `/`, `/booking`, `/thanks`  
**Total Score:** 33 / 46 (≈ 72%)

---

## 1. Build Verification — ✅ 4/4

| Check | Result | Notes |
|-------|--------|-------|
| `npm run build` completes with 0 errors | ✅ PASS | Build completed in 1.88s |
| `dist/` directory exists | ✅ PASS | Contains index.html, booking/index.html, thanks/index.html |
| `dist/` contains HTML for all routes | ✅ PASS | All 3 routes present |
| No TypeScript compilation errors | ✅ PASS | Build did not produce TS errors |

---

## 2. Code Quality — ⚠️ 2/4

| Check | Result | Notes |
|-------|--------|-------|
| No console.log in production code | ❌ FAIL | **BookingForm.astro line 342:** `console.log('Booking data (no Telegram configured):', data)` |
| All imports resolve correctly | ✅ PASS | No missing import errors during build |
| TypeScript strict mode | ✅ PASS | `astro/tsconfigs/strict` extended in tsconfig.json |
| `astro check` / type checking | ❌ SKIP | `@astrojs/check` not installed — type check not runnable |

---

## 3. Content & Data — ✅ 5/5

| Check | Result | Notes |
|-------|--------|-------|
| All 7 sections present in index.astro | ✅ PASS | Hero, Services, Team, Gallery, Contact, Booking + Header/Footer (7 sections as designed) |
| Content data files complete | ✅ PASS | `services.data.ts` (8 services, 4 categories), `team.data.ts` (4 barbers), `gallery.data.ts` (12 images, 5 categories) |
| Links between pages work (/, /booking, /thanks) | ✅ PASS | All internal navigation links use correct paths |
| Anchor links resolve to section IDs | ✅ PASS | `/#hero`, `/#services`, `/#team`, `/#gallery`, `/#contact`, `/#booking` all match `section id` attributes |
| All 8 services listed | ✅ PASS | All services from spec present with correct prices and durations |

---

## 4. Booking Form Logic — ⚠️ 4/7

| Check | Result | Notes |
|-------|--------|-------|
| Required fields: name, phone, service, date, message | ✅ PASS | All required fields have `required` attribute and labels |
| Validation: required fields | ✅ PASS | Client-side validation checks all required fields on blur and submit |
| Validation: phone format | ✅ PASS | Phone mask (+7 formatting) and digit count validation implemented |
| Error handling and retry logic | ⚠️ PARTIAL | Telegram API retry logic exists in `telegram.ts` (3 attempts, exponential backoff) but is **server-side code never called from the client** — the BookingForm does its own direct client-side Telegram API call without retries |
| Loading and success states | ✅ PASS | Button shows spinner, fields disabled, redirect to `/thanks` on success |
| **CRITICAL: Bot token exposed client-side** | ❌ FAIL | `window.__TELEGRAM_BOT_TOKEN` is read from client-side global — anyone can extract the bot token from the page source |
| **CRITICAL: `escapeHTML` broken in client script** | ❌ FAIL | `BookingForm.astro` calls `escapeHTML(data.name)` **without** `this.` prefix inside a class method → `ReferenceError` at runtime when Telegram is configured and form is submitted |

### Details on EscapeHTML Bug

In `BookingForm.astro`, the `handleSubmit` method constructs a Telegram message using:

```javascript
`👤 Имя: <b>${escapeHTML(data.name)}</b>`,
```

But `escapeHTML` is defined as a **class method** (`escapeHTML(str) { ... }`), not a standalone function. The call without `this.` prefix will throw a `ReferenceError` in strict mode. This code path only executes when Telegram credentials are set (BOT_TOKEN + CHAT_ID), so it appears to work in demo mode but will fail in production.

### Details on Telegram Token Exposure

The form sends Telegram API requests **directly from the browser**:
```javascript
const BOT_TOKEN = (window as any).__TELEGRAM_BOT_TOKEN || '';
const CHAT_ID = (window as any).__TELEGRAM_CHAT_ID || '';
// ...
fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, ...)
```

This means the Telegram bot token must be embedded in the HTML/JS at build time, visible to every visitor. A serverless function proxy (as described in ARCHITECTURE.md §4) should be used instead.

---

## 5. SEO & Meta — ⚠️ 4/6

| Check | Result | Notes |
|-------|--------|-------|
| Title tag present | ✅ PASS | All pages have unique `<title>` |
| Meta description present | ✅ PASS | All pages have unique `<meta name="description">` |
| OG tags present | ✅ PASS | `og:title`, `og:description`, `og:type`, `og:image`, `og:locale`, `twitter:card` all present |
| Schema.org LocalBusiness JSON-LD present | ✅ PASS | Valid structured data with address, hours, phone, email, sameAs |
| Semantic HTML used | ✅ PASS | `<nav>`, `<main>`, `<section>`, `<article>`, `<h1>`-`<h3>`, `<time>`, `<form>` all used correctly |
| Sitemap.xml / robots.txt | ❌ FAIL | Neither `sitemap.xml` nor `robots.txt` generated — `@astrojs/sitemap` not in dependencies |

---

## 6. Accessibility — ⚠️ 4/5

| Check | Result | Notes |
|-------|--------|-------|
| Skip link present | ✅ PASS | `#main-content` skip link implemented |
| ARIA labels on interactive elements | ✅ PASS | Navigation, mobile menu, lightbox, social links all have `aria-label` |
| Focus indicators present | ✅ PASS | `*:focus-visible { outline: 2px solid #C9A84C; ... }` in global.css |
| Form inputs have associated labels | ✅ PASS | All form fields have matching `<label for="...">` |
| Error messages linked to inputs | ⚠️ PARTIAL | Error messages use `data-for` attribute but lack `aria-describedby` or `aria-live` — screen readers won't announce validation errors |

---

## 7. Responsive Design — ✅ 5/5

| Check | Result | Notes |
|-------|--------|-------|
| Mobile breakpoints defined | ✅ PASS | sm:640, md:768, lg:1024, xl:1280 (Tailwind defaults) |
| Hamburger menu for mobile | ✅ PASS | Mobile menu with overlay, close on link click and Escape key |
| Responsive grid layouts | ✅ PASS | Services: 1→2→3 cols, Team: 1→2→3→4 cols, Gallery: 1→2→3 cols (masonry) |
| Viewport meta tag present | ✅ PASS | `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` |
| Mobile font-size 16px on inputs | ✅ PASS | All inputs use `text-[1rem]` (16px) to prevent iOS zoom |

---

## 8. Performance — ⚠️ 5/10

| Check | Result | Notes |
|-------|--------|-------|
| Image alt tags present | ✅ PASS | All `<img>` elements have meaningful `alt` attributes |
| Lazy loading on images | ✅ PASS | Barber photos use `loading="lazy"`, gallery images use `loading="lazy"` |
| Client-side JS minimal | ✅ PASS | Only 1 client JS bundle: 5.29KB (2.18KB gzip) — the BookingForm handler |
| No large unused dependencies | ✅ PASS | Only Astro, Tailwind CSS v4, Vite — no React/Vue/Lucide bundle bloat |
| **Images are SVGs, not WebP** | ❌ FAIL | All images (hero, barber photos, gallery) are **SVG files** — not real photographs. `hero.webp` is actually an SVG renamed (770 bytes). No real image optimization pipeline. |
| **Hero image is placeholder** | ❌ FAIL | Hero background is a flat SVG (535 bytes), not the high-quality barbershop interior photo specified in design |
| **No @astrojs/image** | ❌ FAIL | Image optimization pipeline not implemented |
| **Google Fonts via @import** | ❌ FAIL | Fonts loaded via `@import url(...)` in global.css instead of `<link>` with preload — blocks render |
| **No og-image.jpg** | ❌ FAIL | `/og-image.jpg` referenced in OG tags but file does not exist in `public/` or `dist/` |
| **Lucide not installed** | ❌ FAIL | SVG icons are hand-coded inline — "shower-head" icon is actually an X-cross symbol, not a shower head |

---

## Found Issues Summary

### 🔴 P0 — Critical

| # | File | Issue |
|---|------|-------|
| 1 | `BookingForm.astro:325` | `escapeHTML()` called without `this.` inside class method → `ReferenceError` when Telegram is configured and form submitted. Breaks booking notifications. |
| 2 | `BaseLayout.astro:14` | `/og-image.jpg` referenced in OG meta tags but file doesn't exist anywhere in project |

### 🟠 P1 — High

| # | File | Issue |
|---|------|-------|
| 3 | `BookingForm.astro` | Telegram bot token retrieved from `window.__TELEGRAM_BOT_TOKEN` — exposed client-side. Anyone can steal the bot token. |
| 4 | `global.css` | Google Fonts loaded via `@import` CSS (render-blocking) instead of `<link>` elements — preconnect tags exist in HTML but fonts still block render |
| 5 | `BookingForm.astro:342` | `console.log('Booking data...')` left in production code |
| 6 | — | All "images" are SVG placeholders — no real photographs, no WebP optimization. `hero.webp` is an SVG file. Not production-ready. |

### 🟡 P2 — Medium

| # | File | Issue |
|---|------|-------|
| 7 | `package.json` | `@astrojs/sitemap` not installed — no `sitemap.xml` or `robots.txt` generated |
| 8 | — | No image optimization pipeline (`@astrojs/image` / Sharp not configured) |
| 9 | `.github/workflows/` | Directory exists but is **empty** — no CI/CD pipeline implemented |
| 10 | `BookingForm.astro` | Telegram API called **directly from browser** — no serverless function proxy. Per ARCHITECTURE.md §4, this should be a server endpoint. |
| 11 | `BookingForm.astro` | No rate limiting or CSRF protection on form submission |

### 🟢 P3 — Low

| # | File | Issue |
|---|------|-------|
| 12 | `BaseLayout.astro` | Canonical URL is hardcoded to `/` for all pages — `/booking` and `/thanks` also point to `/` |
| 13 | `BookingForm.astro` | Error messages use `data-for` attribute but no `aria-describedby` linking errors to inputs |
| 14 | `ServiceCard.astro` | `shower-head` icon renders as a generic X-cross symbol, not a shower head (custom inline SVG, not Lucide) |
| 15 | `storeis.md` | File says `src/layouts/Layout.astro` exists but actual file is `src/components/layout/BaseLayout.astro` — stale reference |
| 16 | — | `src/assets/background.svg` and `src/assets/astro.svg` are unused leftover files |

---

## Recommendations

1. **Before deployment (blockers):**
   - Fix `escapeHTML` → `this.escapeHTML()` in BookingForm.astro (line 325-331)
   - Move Telegram API calls to a serverless function (Cloudflare Worker or Astro endpoint) — never expose the bot token client-side
   - Create `/og-image.jpg` in `public/`

2. **Before production launch (high priority):**
   - Replace all SVG placeholder images with real WebP photographs
   - Install `@astrojs/sitemap` and generate `sitemap.xml` + `robots.txt`
   - Remove `console.log` from BookingForm.astro
   - Install `@fontsource/playfair-display` and `@fontsource/inter` for self-hosted fonts (eliminates Google Fonts render-blocking)

3. **Polish items:**
   - Add `aria-describedby` or `aria-live="polite"` to form error messages
   - Add per-page canonical URLs for `/booking` and `/thanks`
   - Implement form CSRF token + rate limiting
   - Clean up unused assets (`src/assets/background.svg`, `src/assets/astro.svg`)
   - Either install Lucide for proper icons or fix inline SVG icons
   - Set up CI/CD pipeline in `.github/workflows/`

---

## Final Verdict

```
STATUS: retry
TEST_RESULTS: PASS 33 / FAIL 13
COVERAGE: ~72%
BLOCKERS: 2 (P0 issues — escapeHTML bug, missing og-image)
```

**Conditional Pass on build integrity.** The project builds clean, has solid architecture, proper mobile-first responsive design, and good accessibility fundamentals. However, there are **critical bugs** in the booking form that would cause runtime failures when the form submits with Telegram configured, and the Telegram bot token security model needs a complete rethink before any production deployment.
