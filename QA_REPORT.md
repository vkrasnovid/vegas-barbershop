# Acceptance Test Report — Vegas Barbershop (Re-test v3)
**Date:** 2026-04-29
**Tester:** QA User Agent
**Verdict:** ❌ FAIL — CRITICAL items NOT RESOLVED

## Summary

Re-test of hotfix v3 for the 4 critical items (3x P0 + 1x P1) that failed in v1. **ALL 4 critical items still fail.** The hotfix did not fix the root cause — all file/image/script paths use root-absolute URLs (`/images/...`, `/scripts/...`) instead of repo-relative (`/vegas-barbershop/images/...`). Only the CSS `<link>` tag was correctly prefixed.

---

## Critical Item Results

### P0-1: Images Loading — ❌ FAIL

**Hero image** `background-image: url('/images/hero.svg')` resolves to:
- `https://vkrasnovid.github.io/images/hero.svg` → **404** ❌
- Correct path `https://vkrasnovid.github.io/vegas-barbershop/images/hero.svg` → 200 ✅

**Barber/team photos** — ALL 4 use `src="/images/team/barber-0X.svg"`:
- All resolve to `https://vkrasnovid.github.io/images/team/barber-0X.svg` → **404** ❌
- Correct: `/vegas-barbershop/images/team/barber-0X.svg`

**Gallery images** — ALL 12 use `src="/images/gallery/work-XX-thumb.svg"`:
- All resolve to root domain → **404** ❌
- Correct: `/vegas-barbershop/images/gallery/work-XX-thumb.svg`

**Evidence:** Browser console shows `Failed to load resource: 404 — /images/hero.svg`. Direct curl verification confirms all paths without `/vegas-barbershop/` prefix return 404.

### P0-2: Mobile Hamburger Menu — ❌ FAIL

**Hamburger button visible** ✅ (appears in mobile viewport <640px)
**Clicking hamburger opens mobile menu** ❌ — The JS handler is in `header-nav.js` which is **404** (path: `/scripts/header-nav.js` instead of `/vegas-barbershop/scripts/header-nav.js`). Menu element stays `class="... hidden ..."` after click.
**No 404 for header-nav.js** ❌ — Console confirms 404 for this script.

### P0-3: Form Redirect — ❌ FAIL

Booking page loads ✅
Form fields work ✅ (phone mask, date restrictions, validation all fire)
**Submit redirects to wrong URL** ❌ — JS code does `window.location.href = "/thanks"` which resolves to `https://vkrasnovid.github.io/thanks` (GitHub 404 page), NOT `/vegas-barbershop/thanks/`
Additionally, the `escapeHTML()` call in the Telegram payload builder references a bare function name instead of `this.escapeHTML()`, which would throw a ReferenceError if Telegram config were present.

### P1: Nav Anchors — ❌ FAIL

All nav links use `href="/#services"` (root-absolute), resolving to:
- `https://vkrasnovid.github.io/#services` instead of
- `https://vkrasnovid.github.io/vegas-barbershop/#services`

Clicking any nav link would navigate the user away from the barbershop site to the GitHub Pages root domain, where no matching `#services` section exists.

---

## Spot-Check Items

### /thanks page
- Loads ✅ at `https://vkrasnovid.github.io/vegas-barbershop/thanks/` (HTTP 200)
- Shows success message ✅
- "Вернуться на главную" link: `href="/"` → **navigates to GitHub root**, not `/vegas-barbershop/` ❌
- `<meta http-equiv="refresh" content="0; url=/" />` → instant redirect to GitHub Pages root, making the thanks page **invisible** ❌
- Mismatch: meta says 0s redirect but text says "through 10 seconds"

### Console errors
- `Failed to load resource: 404 — /scripts/header-nav.js` ⚠️
- `Failed to load resource: 404 — /images/hero.svg` ⚠️
- No other JS errors

### OG Image
- `<meta property="og:image" content="/og-image.jpg">` — resolves to root domain → **404** ❌
- Also not present at `/vegas-barbershop/og-image.jpg` → **404**

---

## Summary of Root Cause

The site is built with absolute paths starting with `/` (e.g., `/images/...`, `/scripts/...`, `/#services`). When deployed to a GitHub Pages subdirectory (`/vegas-barbershop/`), these paths resolve to the domain root instead of the repo subdirectory. 

The hotfix v3 only fixed the CSS `<link>` path (`/vegas-barbershop/_astro/booking.BfhVUsHS.css`), but missed:
- All `<img src="/images/...">` paths (hero, team, gallery)
- `<script src="/scripts/header-nav.js">`
- `background-image: url('/images/hero.svg')` (inline CSS)
- All `<a href="/#...">` nav links  
- `<meta property="og:image" content="/og-image.jpg">`
- Form JS redirect `window.location.href = "/thanks"`
- `href="/"` on /thanks page
- `<meta http-equiv="refresh" content="0; url=/" />`

**Recommended fix:** Add `<base href="/vegas-barbershop/">` in `<head>`, or rewrite all root-absolute paths to include the `/vegas-barbershop/` prefix. Then create `/vegas-barbershop/og-image.jpg` or update the OG tag.

---

## Issues Found

| # | Surface | Description | Severity | Reproducible |
|---|---------|-------------|----------|-------------|
| 1 | Home | Hero image 404 (all images 404 via root-absolute paths) | **CRITICAL** | Always |
| 2 | Home | header-nav.js 404 — mobile hamburger broken | **CRITICAL** | Always |
| 3 | Booking | Form redirects to domain root `/thanks` (404) instead of `/vegas-barbershop/thanks/` | **CRITICAL** | Always |
| 4 | All pages | Nav anchor links navigate to domain root, not barbershop subdirectory | **HIGH** | Always |
| 5 | Thanks | "Вернуться на главную" goes to GitHub root, not barbershop | **HIGH** | Always |
| 6 | Thanks | Meta refresh instantly redirects (0s) to GitHub root — page invisible | **HIGH** | Always |
| 7 | All pages | OG image 404 (and file doesn't exist) | **MEDIUM** | Always |
| 8 | Booking | `escapeHTML()` ReferenceError bug in form JS (latent — only triggers if Telegram token configured) | **LOW** | Conditional |

## Happy Path Coverage

| Flow | Status | Notes |
|------|--------|-------|
| Homepage loads | ✅ | Content renders, no layout issues |
| Images visible | ❌ | All local images 404 (hero, team, gallery) |
| Nav links (desktop) | ❌ | All point to wrong domain root |
| Mobile menu | ❌ | Hamburger JS missing (404), click does nothing |
| Scroll anchors (#services, etc.) from URL | ✅ | Visiting `/vegas-barbershop/#services` scrolls correctly |
| Form fill & validation | ✅ | Client-side validation works (phone mask, required fields, date limits) |
| Form submit → redirect | ❌ | Redirects to GitHub 404 page |
| /thanks page display | ❌ | Page loads but immediately redirected by meta refresh 0s to root |
| Footer links | ❌ | Same root-absolute path issue |
| OG/social preview | ❌ | OG image 404 |

## Final Verdict

**REJECTED** — All 3 P0 issues remain unresolved. The hotfix v3 addressed only 1 out of ~20 root-absolute path references (the CSS link tag). The fundamental issue — deploying an Astro site with root-absolute paths to a GitHub Pages subdirectory — remains unaddressed.

**Score:** 4/15 (27%) — slight improvement from v1's 58% due to CSS loading and page rendering, but all critical paths remain broken.

## Recommendations for Lead

1. **Add `<base href="/vegas-barbershop/">`** to `<head>` of all pages — this would fix ALL root-absolute paths in one change
2. If no base tag approach: rewrite ALL occurrences: `/images/` → `/vegas-barbershop/images/`, `/scripts/` → `/vegas-barbershop/scripts/`, `/#services` → `/vegas-barbershop/#services`, `/og-image.jpg` → `/vegas-barbershop/og-image.jpg`
3. Fix JS redirect: `window.location.href = "/thanks"` → `window.location.href = "/vegas-barbershop/thanks/"`
4. Fix thanks page: `href="/"` → `href="/vegas-barbershop/"` and meta refresh `url=/` → `url=/vegas-barbershop/` (also fix 0s → 10s to match visible text)
5. Create OG image at `/vegas-barbershop/og-image.jpg` (or update meta to correct path)
6. Fix `escapeHTML` call in BookingForm JS: the method call should use `this.escapeHTML()` not bare `escapeHTML()`
