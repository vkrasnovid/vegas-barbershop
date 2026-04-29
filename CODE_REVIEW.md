# Code Review: Vegas Barbershop Landing Page (TASK-025)

**Reviewer:** Dream Team Bot  
**Date:** 2026-04-29  
**Branch:** Current (no active branch — static files reviewed from `/opt/vegas-barbershop`)

---

## Overall Verdict: CHANGES_REQUESTED

```
STATUS: changes_requested
VERDICT: Solid component structure and strong visual alignment with the design spec,
         but has critical issues — the booking form does not send data anywhere,
         all "photos" are SVG placeholders, and the base path configuration is
         incorrect for deployment on GitHub Pages.
```

---

## Score Breakdown

| Category | Score | Notes |
|---|---|---|
| **Code Quality** | 7/10 | Good TypeScript types, clean components, but dead boilerplate files present |
| **Architecture** | 5/10 | Missing API endpoint, no sitemap, base path not applied |
| **Security** | 5/10 | Form sends nothing (no CSRF/validation risk but also no functionality); env types defined |
| **Performance** | 6/10 | Lazy loading used, minimal JS, but SVG "photos" instead of WebP, no image optimization |
| **Accessibility** | 7/10 | Good semantic HTML, skip link, ARIA labels present; lightbox focus trapping missing |
| **Design Compliance** | 8/10 | Excellent color palette and typography matching; images and skeleton loaders missing |
| **Error Handling** | 3/10 | Form silently redirects on submit — no network error handling possible since no fetch occurs |
| **Total** | **41/70** | |

---

## CRITICAL Issues

### CRIT-1: Booking form does not submit data [SECURITY][BUG]

**File:** `src/components/booking/BookingForm.astro` (lines 131-148 in `<script>`)

The `handleSubmit()` method immediately redirects to `/thanks` without making any HTTP request:

```typescript
async handleSubmit(e: Event) {
  e.preventDefault();
  if (!this.validateAll()) { /* ... focus first error ... */ return; }
  // ... shows loading state, collects form data ...
  window.location.href = '/thanks';
}
```

There is **no** `fetch()` call or form `action` attribute. The comment says "Telegram notification is handled server-side via a serverless function" but **no serverless/API function exists** in the project — no `pages/api/book.ts`, Cloudflare Functions directory, or any other endpoint.

**Impact:** Form is entirely non-functional. Bookings are never delivered to the barbershop. Users see a "success" page, but no notification is sent.

**Fix:** Implement a serverless endpoint (`src/pages/api/book.ts` using `APIRoute` from Astro) that calls `sendBookingNotification()` from `src/lib/telegram.ts`, and add a `fetch()` call in the client handler to POST to that endpoint.

### CRIT-2: All "photos" are SVG files instead of WebP [BUG][PERFORMANCE]

**Files:** 
- `public/images/hero.svg` — used as hero background
- `public/images/gallery/work-*.svg` (24 files) — all gallery images
- `public/images/team/barber-*.svg` (4 files) — all barber portraits
- `public/images/hero.webp` exists but is not referenced in code

SVG files cannot represent photographic content efficiently — they render as blank/icon placeholders. The design spec explicitly requires WebP for ALL images (hero: 1920×1080, barbers: 600×800, gallery: 1200px wide).

**Fix:** Replace all SVG "photos" with actual WebP photographs. Remove `hero.webp` if unused, or reference it instead of `hero.svg`.

### CRIT-3: Base path misconfiguration breaks all internal links [BUG]

**File:** `astro.config.mjs`
```js
base: '/vegas-barbershop/',
site: 'https://vkrasnovid.github.io',
```

All internal anchor links (`/#services`, `/#team`, `/#gallery`, etc.) do NOT include the base path. When deployed, the correct URLs should be `/vegas-barbershop/#services`, etc.

Additionally, the `booking.astro` and `thanks.astro` pages use `/` for the home link, and the meta refresh in `thanks.astro` uses `url=/` — all will 404 on the deployed site.

**Fix:** Either remove the `base` config (deploy to a custom domain with root path) or prefix all internal links with the base path. In Astro, use `import.meta.env.BASE_URL` or the `Astro.url` helper for dynamic path resolution.

---

## MAJOR Issues

### MAJ-1: Canonical URL and schema point to wrong domain [BUG]

**File:** `src/components/layout/BaseLayout.astro` (line 16), `src/lib/schema.ts` (line 7)

```html
<link rel="canonical" href="https://vegas-barbershop.ru/" />
```

All schema.org data also references `vegas-barbershop.ru`. But the Astro config deploys to `vkrasnovid.github.io/vegas-barbershop/`. The domain `vegas-barbershop.ru` may not yet be registered/configured.

**Fix:** Update canonical URLs to match the actual deployment URL, or ensure DNS is configured before deployment.

### MAJ-2: Dead boilerplate files not removed [STYLE]

**Files still present from Astro template:**
- `src/components/Welcome.astro` — default Astro starter component
- `src/layouts/Layout.astro` — default Astro starter layout (conflicts with `BaseLayout.astro`)
- `src/assets/astro.svg` — unused
- `src/assets/background.svg` — unused
- `tmp_hero.ts` — empty scratch file
- `src/pages/index.astro` overrides the default, but the old template remnants remain

**Impact:** Increases codebase noise, potential confusion about which layout is in use.

### MAJ-3: No server-side validation or API endpoint [ARCHITECTURE][SECURITY]

**Files:** `src/lib/validation.ts` exists but is never imported anywhere, and no API endpoint exists.

The architecture document specifies:
- `pages/api/book.ts` (or serverless function)
- Server-side validation before sending to Telegram
- Rate limiting: max 5 requests/IP/60s

**None of these are implemented.** The `validation.ts` library has thorough validation functions but they are completely unused.

### MAJ-4: Architected dependencies missing from package.json [ARCHITECTURE]

**Missing from `package.json`:**
- `@fontsource/playfair-display` / `@fontsource/inter` (fonts loaded via Google Fonts CDN instead — acceptable but deviates from spec)
- `lucide-astro` (icons inlined as raw SVG — heavier, no tree-shaking)
- `sharp` (no image optimization configured)
- No `@astrojs/image`, `@astrojs/sitemap`, `@astrojs/cloudflare` (or similar adapter)

Google Fonts CDN adds an external dependency and render-blocking risk even with the `media="print"` workaround.

### MAJ-5: Barber names hardcoded in BookingForm instead of imported from data [STYLE]

**File:** `src/components/booking/BookingForm.astro` (lines 72-77)

```astro
<option value="Любой">Любой</option>
<option value="Алексей">Алексей</option>
<option value="Дмитрий">Дмитрий</option>
<option value="Сергей">Сергей</option>
<option value="Елена">Елена</option>
```

These should be imported from `src/components/team/team.data.ts` to maintain a single source of truth. If barbers change, both files need updating.

### MAJ-6: No `<table>` element for business hours [ACCESSIBILITY]

**File:** `src/components/contact/Contact.astro` (lines 82-99)

The design spec explicitly calls for a `<table>` element for hours of operation. The implementation uses `<div>` elements, losing semantic meaning for screen readers and structured data extraction.

### MAJ-7: Gallery filter does not update `aria-selected` [ACCESSIBILITY][BUG]

**File:** `src/components/gallery/Gallery.astro` (lines 106-128, `<script>`)

The filter buttons have `role="tab"` and `aria-selected` attributes initialized correctly, but the JavaScript filter logic only updates CSS classes — it never updates `aria-selected` when a different tab becomes active.

### MAJ-8: Gallery lightbox lacks keyboard focus trapping [ACCESSIBILITY]

**File:** `src/components/gallery/Gallery.astro` (`<script>` class `GalleryLightbox`)

When the lightbox is open:
- Focus is not trapped inside the lightbox
- Tab navigation can reach elements behind the overlay
- No initial focus management when opening

---

## MINOR Issues

### MIN-1: Google Fonts `font-display: swap` not explicitly set

Google Fonts loaded via URL may not apply `font-display: swap` by default unless the `display=swap` parameter is added to the URL:

```
https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,700&family=Inter:wght@300;400;500;600;700&display=swap
```

✅ Already has `&display=swap` — no issue here.

### MIN-2: Scroll indicator bounce animation may affect centering

**File:** `src/components/hero/Hero.astro` (lines 58-60)

The `animate-bounce` animation transforms the element, but the custom `@keyframes bounce` correctly preserves `translateX(-50%)` so centering is maintained. No issue.

### MIN-3: Hardcoded spacing values instead of theme tokens [STYLE]

**File:** Multiple components use values like `rounded-[8px]`, `p-6`, `gap-6` instead of the theme tokens (`--radius-md`, `--space-lg`). Minor consistency issue since Tailwind v4 defaults are still used.

### MIN-4: Meta refresh in thanks.astro redirects immediately [BUG]

**File:** `src/pages/thanks.astro` (line 3)

```
const metaRefresh = '0; url=/';
```

The `0` means redirect after 0 seconds (immediately), not 10 seconds as the design spec requires. Should be `10; url=/vegas-barbershop/` (with base path).

### MIN-5: No sitemap or robots.txt generation [SEO]

No `@astrojs/sitemap` integration configured. No `robots.txt.ts` page file as specified in the architecture. Sitemap is important for SEO, especially for a local business.

### MIN-6: Footer VK icon fill color hardcoded [STYLE]

**File:** `src/components/layout/Footer.astro` — VK icon uses `fill="currentColor"` which is fine, but the Instagram icon uses `stroke="currentColor"`. Slight inconsistency but not a functional issue.

### MIN-7: No `@` path alias working in tsconfig

`tsconfig.json` defines `@/*` → `src/*`, and imports use it (e.g., `import BaseLayout from '@/components/layout/BaseLayout.astro'`). ✅ Works.

### MIN-8: Booking form `showError`/`showSuccess`/`resetButton` methods are defined but never called

**File:** `src/components/booking/BookingForm.astro` — methods `showError()`, `showSuccess()`, and `resetButton()` are implemented but never invoked since the form always redirects on line 148.

---

## What's Good

### Architecture & Structure
- ✅ **Excellent file organization** — components grouped by feature (hero/, services/, team/, etc.) with clear separation of data (`.data.ts`), components (`.astro`), and logic (hooks/, lib/).
- ✅ **TypeScript interfaces** are well-defined (`Service`, `Barber`, `GalleryImage`, `BookingData`) with proper types throughout.
- ✅ **Data files separated from templates** — `services.data.ts`, `team.data.ts`, `gallery.data.ts` provide clean single-source-of-truth.

### Design & Visuals
- ✅ **Tailwind CSS v4 `@theme` tokens** perfectly match the design spec color palette, typography, spacing, and shadows.
- ✅ **Global CSS** includes proper utilities for gold shimmer, section underlines, masonry grid, scroll reveal, custom scrollbar, and reduced motion preferences.
- ✅ **Gold shimmer animation on hero heading** and **section underlines** match spec exactly.
- ✅ **Color usage** follows spec rules (gold sparingly, never for body text).
- ✅ **Dark sections** (hero, services, gallery, booking, footer) use correct `#0D0D0D`/`#1A1A1A` backgrounds.
- ✅ **Light sections** (team, contact) use correct `#FAFAF7`/`#F0EFE8` backgrounds.

### Accessibility
- ✅ **Skip-to-content link** at top of BaseLayout.
- ✅ **Semantic HTML** — `<nav>`, `<section>`, `<article>`, `<main>`, `<h1-h3>` properly used.
- ✅ **ARIA labels** on icons, navigation, lightbox, form fields.
- ✅ **Visible `<label>` elements** for every form input.
- ✅ **`prefers-reduced-motion` media query** disables all animations.
- ✅ **`focus-visible` outline** styled per spec (gold 2px).
- ✅ **`lang="ru"`** correctly set on `<html>` in BaseLayout.

### Performance
- ✅ **Images use `loading="lazy"`** and `decoding="async"`.
- ✅ **Explicit `width`/`height`** on images to prevent CLS.
- ✅ **Google Fonts loaded non-blocking** with `media="print"` swap.
- ✅ **Preconnect hints** for Google Fonts origins.
- ✅ **Minimal client JS** — only the form handler and gallery lightbox.
- ✅ **Smooth scroll** with `scroll-behavior: smooth` and `scroll-padding-top: 80px`.

### Security
- ✅ **Environment variables** defined in `env.d.ts` for `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.
- ✅ **Telegram message format** properly escapes HTML.
- ✅ **Input validation regex** on name field (`^[а-яёА-ЯЁa-zA-Z\s-]+$`).
- ✅ **Retry with exponential backoff** in `telegram.ts`.
- ✅ **No credentials hardcoded** in source code.

### Forms & Validation
- ✅ **Phone mask** appropriately formats `+7 (XXX) XXX-XX-XX`.
- ✅ **Date restrictions** enforce min=today and max=today+30.
- ✅ **Client-side validation** for all required fields with descriptive error messages.
- ✅ **Submit button** disables during submission and shows loading spinner.
- ✅ **Form `novalidate`** to use custom validation instead of browser defaults.

### Additional Positive Notes
- ✅ **Schema.org LocalBusiness** structured data present with correct opening hours.
- ✅ **Open Graph** meta tags for social sharing.
- ✅ **`scroll-margin-top: 80px`** for nav offset (via `scroll-padding-top` on `<html>`).
- ✅ **Safe area padding** for mobile notch (`padding-bottom: max(12px, env(safe-area-inset-bottom))`).
- ✅ **Custom scrollbar** styled to match brand (gold on black).
- ✅ **Native date picker** styled with dark background.
- ✅ **Lucide icon SVGs** match the iconography table in the design spec.

---

## Summary

The project has a **solid foundation** — well-structured component architecture, excellent visual alignment with the design spec, proper TypeScript usage, and good accessibility fundamentals. The Tailwind CSS v4 theme tokens are perfectly configured.

However, **the two critical issues must be resolved before this is deployable:**

1. **The booking form sends no data** — the entire purpose of the site is broken
2. **All "photos" are SVG placeholders** — the site cannot launch without actual photographs

Additionally, the **base path configuration** will cause all internal links to 404 when deployed to GitHub Pages.

The `validation.ts` module is ready to use and well-implemented, and the `telegram.ts` module has proper error handling with retries — but neither is currently connected to anything.

**Recommended priority order for fixes:**
1. Implement API endpoint + connect booking form to it (CRIT-1)
2. Replace placeholder SVGs with real photographs (CRIT-2)
3. Fix base path configuration or deploy to a proper domain (CRIT-3)
4. Clean up unused boilerplate files (MAJ-2)
5. Fix canonical URL to match actual deployment (MAJ-1)
6. Import barber names from data file (MAJ-5)
7. Add `<table>` for hours + `aria-selected` updates + focus trapping (MAJ-6/7/8)

After these fixes, re-review within 2 rounds max as per policy.
