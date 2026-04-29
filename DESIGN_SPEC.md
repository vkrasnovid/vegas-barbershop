# DESIGN_SPEC.md — Vegas Barbershop

```
DESIGN HANDOFF
from: designer
to: developer-astro
project: Vegas Barbershop Landing Page
screens: 1 (single-page, 7 sections)
components: 22
notes: Mobile-first, Tailwind CSS v4 @theme tokens provided
```

---

## 1. Design System

### 1.1 Brand Identity

**Tone:** Dark, masculine, premium luxury. Think Vegas at night — neon lights on black velvet. A barbershop where whiskey is served and every haircut is an experience.

**Brand keywords:** premium, confident, bold, masculine, warm, exclusive

---

### 1.2 Color Palette

#### Light Mode (default)

| Token | HEX | Usage | Contrast ratio |
|---|---|---|---|
| `--color-brand-black` | `#0D0D0D` | Primary backgrounds (hero, footer, section alts) | — |
| `--color-brand-dark` | `#1A1A1A` | Secondary backgrounds, cards on dark sections | — |
| `--color-brand-surface` | `#1F1F1F` | Card backgrounds, input fields | — |
| `--color-brand-gold` | `#C9A84C` | Primary accent — CTA buttons, highlights, decorative elements | 5.1:1 on black |
| `--color-brand-gold-light` | `#E0C36A` | Gold hover state, glowing effects | — |
| `--color-brand-gold-dark` | `#A88B30` | Gold active/pressed state | — |
| `--color-brand-white` | `#F5F5F0` | Body text on dark backgrounds | 14.2:1 on #0D0D0D |
| `--color-brand-gray` | `#8A8A8A` | Secondary text, captions, placeholders | 6.5:1 on #1A1A1A |
| `--color-brand-gray-light` | `#B0B0B0` | Borders, dividers, disabled state | — |
| `--color-brand-gray-dark` | `#666666` | Muted text | — |
| `--color-bg-primary` | `#FAFAF7` | Page background (light sections) | — |
| `--color-bg-secondary` | `#F0EFE8` | Section alternate backgrounds | — |
| `--color-text-primary` | `#1A1A1A` | Body text on light backgrounds | 16.5:1 on #FAFAF7 |
| `--color-text-secondary` | `#6B6B6B` | Secondary text on light backgrounds | — |
| `--color-error` | `#DC2626` | Form validation errors | 4.7:1 on #1F1F1F |
| `--color-success` | `#059669` | Success messages | 4.8:1 on #1F1F1F |
| `--color-warning` | `#D97706` | Warning badges | — |

#### Dark Mode

| Token | HEX | Usage |
|---|---|---|
| `--color-bg-primary` | `#0D0D0D` | Dark mode page background |
| `--color-bg-secondary` | `#1A1A1A` | Dark mode alternate sections |
| `--color-text-primary` | `#F5F5F0` | Dark mode body text |
| `--color-text-secondary` | `#8A8A8A` | Dark mode secondary text |
| Card backgrounds | `#1F1F1F` | Remains same |

> **Note:** The entire hero, services, team, and footer sections are already dark by design. Dark mode primarily affects the contact/about section and the embedded map/bg.

#### Color Usage Rules

- **Gold (#C9A84C)** is used sparingly — only for primary CTAs, icons, decorative dividers, and hover accents. Never for body text.
- **Black (#0D0D0D)** for immersive backgrounds (hero, footer) to create depth.
- **White text (#F5F5F0)** on all dark backgrounds — never pure white.
- **Gold gradient** for hero heading: `linear-gradient(135deg, #C9A84C, #E0C36A, #C9A84C)` with subtle shimmer animation.
- **Red/green** only for validation states — never for decoration.

---

### 1.3 Typography

#### Font Selection

| Role | Font | Fallback | Weight | Source |
|---|---|---|---|---|
| **Headings (h1-h3)** | **Playfair Display** | Georgia, serif | 600, 700, 900 | Google Fonts |
| **Subheadings / Display** | **Playfair Display** | Georgia, serif | 700 italic | Google Fonts |
| **Body text** | **Inter** | system-ui, sans-serif | 300, 400, 500, 600 | Google Fonts |
| **Navigation / UI labels** | **Inter** | system-ui, sans-serif | 500, 600 | Google Fonts |
| **Prices / Numbers** | **Inter** | system-ui, sans-serif | 600, 700 | Google Fonts |

#### Font Scale

| Level | Size | Line Height | Weight | Letter Spacing | Usage |
|---|---|---|---|---|---|
| **h1** | clamp(2.5rem, 5vw, 4rem) | 1.1 | 900 | -0.02em | Hero headline only |
| **h2** | clamp(1.75rem, 3.5vw, 2.75rem) | 1.2 | 700 | -0.01em | Section titles |
| **h3** | clamp(1.25rem, 2vw, 1.5rem) | 1.3 | 600 | 0 | Card titles, service names |
| **h4** | clamp(1rem, 1.5vw, 1.125rem) | 1.4 | 600 | 0.01em | Subtitles, barber names |
| **body-large** | clamp(1rem, 1.2vw, 1.125rem) | 1.6 | 400 | 0 | Lead paragraphs |
| **body** | clamp(0.875rem, 1vw, 1rem) | 1.6 | 400 | 0 | Default body text |
| **body-small** | clamp(0.75rem, 0.9vw, 0.875rem) | 1.5 | 400 | 0 | Captions, secondary info |
| **label** | 0.75rem | 1.4 | 600 | 0.08em | Form labels, badge text |
| **price** | 1.25rem | 1.2 | 700 | 0 | Price display |
| **caption** | 0.75rem | 1.4 | 400 | 0.02em | Footer info, tiny text |
| **nav-link** | 0.875rem | 1.4 | 500 | 0.05em | Navigation items |

#### Typography Rules

- **h1-h3 use Playfair Display** exclusively. This is the premium, classic typeface.
- **Everything else uses Inter** — clean, modern, highly readable.
- Never use more than 2 font sizes per section.
- Section title (`h2`) should have a gold decorative underline (see components).
- Headings on dark backgrounds get a 0.05rem text-shadow: `0 2px 4px rgba(0,0,0,0.5)` for readability.

---

### 1.4 Spacing System

**Base unit:** 4px

| Token | Value (px) | Usage |
|---|---|---|
| `--space-xs` | 4px | Icons, tight spacing |
| `--space-sm` | 8px | Small gaps, badge padding |
| `--space-md` | 12px | Button padding, card inner gaps |
| `--space-base` | 16px | Standard gap, form field gaps |
| `--space-lg` | 24px | Card padding, section inner padding |
| `--space-xl` | 32px | Between components within a section |
| `--space-2xl` | 48px | Section-to-section gap |
| `--space-3xl` | 64px | Large section padding |
| `--space-4xl` | 80px | Hero section top padding |
| `--space-section` | clamp(4rem, 8vw, 8rem) | Vertical section padding (top & bottom) |

---

### 1.5 Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-none` | 0 | Hero section, full-width elements |
| `--radius-sm` | 4px | Input fields, small UI elements |
| `--radius-md` | 8px | Cards, buttons, modals |
| `--radius-lg` | 12px | Large cards, gallery items |
| `--radius-xl` | 16px | Primary CTA button, hero badge |
| `--radius-pill` | 9999px | Badge chips, avatar rings |

---

### 1.6 Shadow System

| Token | Value | Usage |
|---|---|---|
| `--shadow-none` | `0 0 #0000` | — |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | Subtle card elevation |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.4)` | Raised cards, barber cards |
| `--shadow-lg` | `0 8px 30px rgba(0,0,0,0.5)` | Modals, lightbox overlay |
| `--shadow-glow` | `0 0 20px rgba(201,168,76,0.3)` | Gold glow on CTAs, active state |
| `--shadow-glow-lg` | `0 0 40px rgba(201,168,76,0.2)` | Hero heading gold glow |

---

### 1.7 Iconography

- **Library:** Lucide Icons (tree-shakeable through `astro-icon` or inline SVG)
- **Style:** Stroke-based, 1.5px stroke-width, 24×24 default size
- **Color:** Inherits current text color; gold for decorative accents
- **Icons to use:**
  - Scissors → `scissors` (✂️)
  - Beard → `spray-can` / custom beard SVG
  - Razor → `rail-symbol` (diagonal), or custom
  - Hair dryer → custom or `wind`
  - Clock → `clock`
  - Phone → `phone`
  - Map pin → `map-pin`
  - Instagram → `instagram`
  - VK → use inline VK SVG (not in Lucide)
  - Telegram → `send`
  - Star → `star` (for featured services)
  - Check → `check`
  - Arrow right → `arrow-right`
  - Menu → `menu`
  - Close → `x`
  - Quote → `quote`
  - Calendar → `calendar`
  - User → `user`

---

### 1.8 Tailwind CSS v4 @theme Tokens

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-brand-black: #0D0D0D;
  --color-brand-dark: #1A1A1A;
  --color-brand-surface: #1F1F1F;
  --color-brand-gold: #C9A84C;
  --color-brand-gold-light: #E0C36A;
  --color-brand-gold-dark: #A88B30;
  --color-brand-white: #F5F5F0;
  --color-brand-gray: #8A8A8A;
  --color-brand-gray-light: #B0B0B0;
  --color-brand-gray-dark: #666666;
  --color-bg-primary: #FAFAF7;
  --color-bg-secondary: #F0EFE8;
  --color-error: #DC2626;
  --color-success: #059669;
  --color-warning: #D97706;

  /* Fonts */
  --font-heading: "Playfair Display", Georgia, serif;
  --font-body: "Inter", system-ui, sans-serif;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-base: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 80px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-pill: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.4);
  --shadow-lg: 0 8px 30px rgba(0,0,0,0.5);
  --shadow-glow: 0 0 20px rgba(201,168,76,0.3);
  --shadow-glow-lg: 0 0 40px rgba(201,168,76,0.2);

  /* Breakpoints (Tailwind defaults — sm: 640, md: 768, lg: 1024, xl: 1280) */
}
```

---

## 2. Screen Inventory

### Single-Page Application (index.astro)

| # | Section | Purpose | Entry From | Exit To |
|---|---|---|---|---|
| 1 | **Header / Navigation** | Sticky top bar with logo + nav links | Page load | Any section via anchor |
| 2 | **Hero** | Full-screen welcome with CTA | Page load | ↓ Services (scroll) |
| 3 | **Services & Prices** | Service catalog with pricing | ↓ Services nav / scroll | ↑ Hero / ↓ Team |
| 4 | **Team / Barbers** | Barber profiles | ↓ Team nav / scroll | ↑ Services / ↓ Gallery |
| 5 | **Gallery** | Portfolio of work (masonry) | ↓ Gallery nav / scroll | ↑ Team / ↓ Contact |
| 6 | **About / Location** | Contact info, map, hours | ↓ Contact nav / scroll | ↑ Gallery / ↓ Booking |
| 7 | **Booking Form** | Appointment booking | CTA / ↓ Booking nav | ↑ Contact / /thanks |
| 8 | **Footer** | Social links, copyright, links | End of page | — |

### Additional Pages

| Page | Purpose |
|---|---|
| `/booking` | Standalone booking page (for ad links) |
| `/thanks` | Post-submission thank-you page |

---

## 3. Screen Specifications

### 3.1 Header / Navigation (Header.astro)

**Type:** Sticky top bar (non-transparent, dark background)
**Z-index:** 50 (above all content)

**Layout:**
- Full width, `height: 64px` (mobile) / `72px` (desktop)
- Background: `#0D0D0D` with `backdrop-filter: blur(12px)` and 85% opacity for slight transparency
- Bottom border: `1px solid rgba(201,168,76,0.15)` (subtle gold line)

**Components:**

| Component | Description | States |
|---|---|---|
| **Logo** | Left-aligned. Text: "VEGAS" in Playfair Display 900, 1.25rem, gold color. Subtle letter-spacing 0.1em. No image logo needed — text-only for cleaner look. | Default only |
| **Desktop Nav** | Right-aligned. 5 links: "Услуги", "Команда", "Галерея", "Контакты", "Записаться" | Default (brand-white), Hover (gold underline animation) |
| **Mobile Hamburger** | Right-aligned, visible < md. Lucide `menu` icon, 24px, brand-white | Tap → opens mobile menu |
| **Mobile Menu** | Full-screen overlay, brand-black bg. Links stacked vertically, 2rem font size, center-aligned. Close button (X icon) top-right. Smooth fade-in animation. | Open / Closed |
| **CTA Button** | In nav (desktop only, rightmost). "Записаться" — gold filled button, pill shape. Links to `/#booking` | Default (#C9A84C bg, #0D0D0D text), Hover (#E0C36A bg) |

**Behavior:**
- Sticky: `position: sticky; top: 0`
- On scroll → add subtle shadow at bottom
- Mobile: hamburger on left (optional: on right), menu slides in from right with overlay

---

### 3.2 Hero Section (Hero.astro)

**Type:** Full-screen hero with parallax background
**Height:** `100vh` (mobile) / `100vh` (desktop)
**Background:** Dark overlay over image

**Layout:**
- Full-bleed background image
- Dark gradient overlay: `linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 100%)`
- Content centered horizontally and vertically
- Bottom gold gradient divider (1.5px thin line separating from next section)

**Components:**

| Component | Description | States |
|---|---|---|
| **Hero Badge** | Top of content area. Small pill badge: `background: rgba(201,168,76,0.15); border: 1px solid rgba(201,168,76,0.3); color: gold;` Text: "Барбершоп в Энгельсе" | Static |
| **Hero Headline (h1)** | "VEGAS" — large, gold gradient text (see typography). Playfair Display 900, clamp(2.5rem, 5vw, 4rem). Text-shadow: `0 2px 20px rgba(201,168,76,0.3)`. Subtle shimmer animation (keyframes: gold highlight sweeps across text over 4s). | Static |
| **Hero Subtitle** | Below headline. "Искусство мужского стиля" — Inter 300, 1.25rem, brand-white, letter-spacing 0.05em, opacity 0.9 | Static |
| **Hero Description** | Below subtitle. Max-width 480px, centered. "Стрижки, бритьё и уход за бородой. Только для мужчин, только с характером." — Inter 400, 1rem, brand-gray | Static |
| **Primary CTA** | Large pill button. "Записаться" — gold filled, 16px font, 600 weight, padding 16px 40px. Lucide `scissors` icon left of text. Smooth hover scale(1.02). | Default (gold bg, black text), Hover (gold-light bg, glow shadow), Active (gold-dark bg), Focus (ring-2 ring-gold) |
| **Secondary CTA** | Below primary. Ghost button: "Услуги и цены" — gold text, gold border 1px, transparent bg. Padding 12px 32px. Smooth transition. | Default (gold border + text, transparent bg), Hover (gold bg, black text) |
| **Scroll Indicator** | Bottom center of hero. Small animated down-chevron (or "↓" text). Brand-gray, pulsing opacity animation. Click → smooth scroll to `/#services` | Pulse animation |

**Background Image:**
- High-quality barbershop interior photo — warm lighting, leather chairs, classic barber poles, mirrors
- WebP format, 1920×1080
- Placeholder: tiny blurred WebP (20px width) for LQIP
- Parallax: `transform: translateY(calc(-1 * var(--scroll-offset) * 0.3))` via IntersectionObserver
- On mobile: reduce parallax to 0.1 factor (prevents jank)

---

### 3.3 Services & Prices Section (Services.astro)

**Type:** Content section with card grid
**Background:** `#0D0D0D` to `#1A1A1A` gradient (top to bottom)
**Padding:** `clamp(4rem, 8vw, 8rem)` top and bottom

**Layout:**
- Section title: centered
- Subtitle: centered, max-width 600px
- 3-column grid (desktop) → 2 columns (tablet) → 1 column (mobile)
- Gap: 24px between cards
- Each card full-width in its column

**Components:**

| Component | Description | States |
|---|---|---|
| **Section Title (h2)** | "Услуги и цены" — Playfair Display 700, gold, with decorative gold underline (2px wide, 60px long, centered) | Static |
| **Section Subtitle** | "Классические стрижки, бритьё опасной бритвой и премиальный уход" — Inter 400, 1rem, brand-gray | Static |
| **Service Card** | Dark card (`#1F1F1F` bg, `#1A1A1A` border 1px, radius-md). Padding: 24px. Contents: icon (Lucide, gold, 32px) top-left, service name (h3, brand-white), description (body-small, brand-gray), price row (left: price in gold "1500 ₽", right: duration in gray "30 мин"), hit badge optional | Default (as described), Hover (border changes to gold 1px, shadow-md) |
| **Hit Badge** | Optional. Top-right corner of card. Small pill: orange-red bg (#DC2626) with "🔥 Хит" text (label, white). Absolutely positioned. | Static |
| **Divider** | Between service card groups (haircuts / beard / shave / additional). Thin gold line with section label | Static |

**Service Data (example):**

| Service | Price | Duration | Hit? |
|---|---|---|---|
| Мужская стрижка | 1 500 ₽ | 40 мин | ✔ |
| Стрижка машинкой | 1 000 ₽ | 20 мин | |
| Стрижка + бритьё головы | 2 000 ₽ | 60 мин | |
| Моделирование бороды | 800 ₽ | 20 мин | ✔ |
| Бритьё опасной бритвой | 1 500 ₽ | 40 мин | |
| Королевское бритьё | 2 500 ₽ | 60 мин | |
| Камуфляж седины | 1 500 ₽ | 30 мин | |
| Укладка | 500 ₽ | 10 мин | |

**Note:** All prices include a ₽ sign. Duration format: "N мин". Use `<time>` element for duration semantic value.

---

### 3.4 Team / Barbers Section (Team.astro)

**Type:** Content section with cards
**Background:** `#FAFAF7` (warm off-white)
**Padding:** `clamp(4rem, 8vw, 8rem)` top and bottom

**Layout:**
- Section title centered (dark text on light bg)
- Grid: 4 columns (xl) → 3 columns (lg) → 2 columns (md) → 1 column (sm)
- Gap: 24px
- Cards have slight vertical offset (staggered) for visual interest

**Components:**

| Component | Description | States |
|---|---|---|
| **Section Title (h2)** | "Наши барберы" — Playfair Display 700, text-primary color, gold underline | Static |
| **Section Subtitle** | "Мастера своего дела с опытом от 5 лет" — Inter 400, 1rem, text-secondary | Static |
| **Barber Card** | White bg (#FFFFFF), radius-lg, shadow-sm, padding 0 (image flush top). Image: 600×800 WebP, object-fit: cover. Bottom content padding: 24px. | Default (no shadow), Hover (shadow-md, slight translateY(-4px) lift, gold border 1px) |
| **Barber Photo** | Top of card, 100% width, 280px height (mobile: 320px). Aspect-ratio: 3/4. Border-radius: lg top corners. WebP format. | Default, Lazy-loaded via IntersectionObserver |
| **Barber Name** | "Алексей" — h4, Playfair Display 600, text-primary | Static |
| **Barber Specialty** | "Мастер мужских стрижек" — body-small, brand-gray | Static |
| **Barber Experience** | "Опыт: 7 лет" — label, brand-gold, letter-spacing 0.05em | Static |
| **Social Icons** | Row of subtle social icons (Instagram, VK). Brand-gray, 18px. Hover → brand-gold | Default, Hover (gold) |

**Behavior:**
- Loading: skeleton cards (animated pulse, gray bg) while images load
- Scroll animation: cards fade in + translateY(20px) via IntersectionObserver, staggered by 100ms each

---

### 3.5 Gallery Section (Gallery.astro)

**Type:** Interactive masonry gallery
**Background:** `#0D0D0D`
**Padding:** `clamp(4rem, 8vw, 8rem)` top and bottom

**Layout:**
- Section title centered on dark bg
- Filter tabs row (centered, horizontal)
- Masonry grid below

**Components:**

| Component | Description | States |
|---|---|---|
| **Section Title (h2)** | "Наши работы" — Playfair Display 700, gold, gold underline | Static |
| **Filter Tabs** | Row of pill buttons: "Все", "Стрижки", "Борода", "Бритьё". Inter 500, 0.875rem. Default: dark bg (#1F1F1F), white text. Active: gold bg, black text. Hover: gold border. Gap: 8px. | Default / Active / Hover |
| **Gallery Grid** | CSS masonry: `columns: 3` (xl), `columns: 2` (md), `columns: 1` (sm). `column-gap: 16px`. Children: `break-inside: avoid; margin-bottom: 16px`. Each item is a card. | — |
| **Gallery Item** | Image inside rounded card (radius-lg). Overflow hidden. Image: object-fit cover, 100% width. Aspect-ratio varies (4:3, 3:2, 1:1, 16:9 — mixed for masonry effect). | Default (as-is), Hover (overlay with subtle zoom scale(1.03), gold border 1px) |
| **Gallery Overlay** | On hover: `background: rgba(0,0,0,0.4)`, with magnifying glass icon (🔍) centered, brand-white, opacity 0→1 transition | Hidden by default, visible on hover |
| **Lightbox** | Full-screen overlay, black bg 95% opacity. Image centered, max-width 90vw, max-height 90vh. Close button (X icon, top-right, white). Arrow navigation (← →) on sides, white, semi-transparent bg. Swipe support on mobile. Keyboard nav (Esc → close, ← → arrows). | Open / Closed |
| **Lightbox Counter** | Bottom-center: "3 / 12" — Inter 400, 0.875rem, white, opacity 0.8 | Static |

**Behavior:**
- Filter: transition `all 0.3s ease` — items fade out, grid reflows, items fade in
- Lightbox: `client:visible` loaded island. Images are prefetched when visible.
- Swipe gestures: touchstart → touchmove → touchend for mobile navigation

---

### 3.6 About / Contact Section (Contact.astro)

**Type:** Split layout section
**Background:** `#FAFAF7` to `#F0EFE8` gradient
**Padding:** `clamp(4rem, 8vw, 8rem)` top and bottom

**Layout:**
- 2-column grid (desktop: 1fr 1fr, gap 48px) → stacked 1 column (mobile)
- Left column: contact info
- Right column: map

**Components:**

| Component | Description | States |
|---|---|---|
| **Section Title (h2)** | "Контакты" — Playfair Display 700, text-primary, gold underline, left-aligned | Static |
| **Address Block** | Icon (map-pin, gold, 20px) + text. "г. Энгельс, ул. Московская, д. 15" — Inter 400, 1rem. Clickable → opens Yandex Maps. | Clickable (cursor pointer) |
| **Phone Block** | Icon (phone, gold, 20px) + tel link. "+7 (8453) 56-78-90" — Inter 500, 1.125rem, text-primary. `href="tel:+78453567890"` | Default, Hover (gold color), Click (dials) |
| **Email Block** | Icon (mail, gold, 20px) + mailto link. "info@vegas-barbershop.ru" — Inter 400. `href="mailto:info@vegas-barbershop.ru"` | Default, Hover (gold) |
| **Hours Table** | 2-column layout. Days on left (body, brand-gray), times on right (body, text-primary). | — |
| | Пн–Пт: 09:00 – 20:00 | |
| | Сб: 09:00 – 19:00 | |
| | Вс: 10:00 – 18:00 | |
| **Social Row** | Row of social link icons (Instagram, VK, Telegram). Brand-gray, 24px. `href` links. | Default, Hover (gold) |
| **Map Embed** | Responsive iframe (Yandex Maps). Full height (min 300px), width 100%, radius-lg border. No API key needed — use `<iframe>` embed from Yandex Maps constructor with a pinned marker. Dark theme if available. | Loading (skeleton placeholder), Loaded |

**Map Implementation:**
```html
<iframe 
  src="https://yandex.ru/map-widget/v1/?ll=46.0,51.5&z=16&pt=46.0,51.5,pm2dol&l=map&theme=dark" 
  width="100%" 
  height="400" 
  style="border:0;" 
  allowfullscreen 
  loading="lazy"
  title="VEGAS Барбершоп на карте">
</iframe>
```

---

### 3.7 Booking Form Section (Booking.astro & BookingForm.astro)

**Type:** Form section with strong visual focus
**Background:** `#0D0D0D` to `#1A1A1A` gradient
**Padding:** `clamp(4rem, 8vw, 8rem)` top and bottom

**Layout:**
- Section title centered
- Form card centered, max-width: 520px
- Clean dark card (`#1F1F1F` bg) with padding: 32px

**Components:**

| Component | Description | States |
|---|---|---|
| **Section Title (h2)** | "Запись онлайн" — Playfair Display 700, gold, gold underline | Static |
| **Section Subtitle** | "Заполните форму, и мы подтвердим запись в Telegram в течение часа" — Inter 400, 0.875rem, brand-gray, centered | Static |
| **Form Card** | Surface bg, radius-lg, padding 32px. Soft border: 1px rgba(201,168,76,0.1). | Default |
| **Input: Name** | Label: "Ваше имя" (label style, gold). Input: dark bg (#0D0D0D), brand-white text, brand-gray border 1px, radius-sm. Padding: 12px 16px. Placeholder: "Иван". Full width. | Default, Focus (gold border, glow shadow), Error (red border + red error text below), Valid (green border when validation passes) |
| **Input: Phone** | Label: "Телефон" (gold). Input with mask: `+7 (___) ___-__-__`. Same styling as Name. Placeholder: "+7 (927) 123-45-67". Pattern: 11 digits. | Same states as Name |
| **Select: Service** | Label: "Услуга" (gold). Custom styled select (not native — uses custom dropdown with chevron icon). Options: list all services from services.data.ts (service name + price). First option: "Выберите услугу" (disabled). | Default, Focus, Error |
| **Select: Barber** | Label: "Барбер" (gold). Custom select. Options: "Любой" (default), then each barber name. | Default, Focus |
| **Input: Date** | Label: "Дата" (gold). Native date input styled dark. Min: today. Max: today+30. Styled with dark bg. | Default, Focus, Error (past date or >30 days) |
| **Select: Time** | Label: "Время" (gold). Custom select. Options: 09:00 – 20:00 in 30-min increments. Filter out booked times? (Optional — show all, confirm later via Telegram). | Default, Focus |
| **Textarea: Message** | Label: "Комментарий (необязательно)" (gold, gray text for "необязательно"). Rows: 3. Same styling as inputs. Placeholder: "Пожелания по стрижке..." | Default, Focus |
| **Submit Button** | Full width, gold filled, brand-black text. "Записаться" — Inter 600, 1rem. Padding: 16px 24px. Radius: pill. Icon: `calendar` Lucide left of text. | Default, Hover (gold-light + glow shadow), Active (gold-dark), Loading (spinner replaces text, button disabled — opacity 0.7), Disabled (form invalid) |
| **Form Status** | Below submit button. Success: green text "✓ Запись отправлена! Мы свяжемся с вами." Error: red text "✗ Ошибка отправки. Попробуйте ещё раз." | Success / Error / Network Error |
| **Privacy Note** | Tiny text below form: "Нажимая «Записаться», вы соглашаетесь с обработкой персональных данных" — Inter 400, 0.75rem, brand-gray-dark, centered | Static |

**Form Validation Rules:**

| Field | Required | Rules |
|---|---|---|
| Name | ✔ | 2–50 chars, no digits, no special chars except hyphen and space |
| Phone | ✔ | Must be 11 digits after +7, valid Russian phone format |
| Service | ✔ | Must select from list (not empty/placeholder) |
| Barber | ✗ (defaults to "Любой") | Optional |
| Date | ✔ | Must be today or later, max 30 days ahead |
| Time | ✔ | Must be between 09:00 and 20:00, in 30-min steps |
| Message | ✗ | Max 200 chars |

**Form Submission Behavior:**
1. Client-side validation on submit click
2. If invalid → first error field gets focus, error message shown below field
3. If valid → button shows loading spinner, fields become `disabled`
4. POST to `/api/book` JSON: `{ name, phone, service, barber, date, time, message }`
5. On success → redirect to `/thanks` (or show thank-you modal)
6. On error → show error status, re-enable form
7. Network timeout after 10 seconds → show error, offer retry

---

### 3.8 Footer (Footer.astro)

**Type:** Full-width dark footer
**Background:** `#0D0D0D`
**Padding:** 48px top, 24px bottom

**Layout:**
- 3-column grid (desktop) → stacked (mobile)
- Top border: 1px solid rgba(201,168,76,0.15)

**Components:**

| Column | Contents |
|---|---|
| **Brand** | "VEGAS" logo (Playfair Display 900, 1.5rem, gold). Tagline: "Искусство мужского стиля" — brand-gray, 0.875rem. |
| **Quick Links** | Small title "Навигация" in brand-gray, label style. Links: Услуги, Команда, Галерея, Контакты, Записаться. All anchor links. Inter 400, 0.875rem, brand-white. Hover → gold. |
| **Contacts** | Small title "Контакты" in brand-gray, label style. Phone, address, social icons. All Inter 400, 0.875rem, brand-white. |

**Bottom Bar:**
- Above: thin gold separator line
- "© 2024 VEGAS Барбершоп. Все права защищены." — Inter 400, 0.75rem, brand-gray-dark, centered
- "Сайт разработан Dream Team" — Inter 400, 0.7rem, brand-gray-dark, centered (optional: link to agency)

---

### 3.9 Thank You Page (/thanks)

**Type:** Simple standalone page
**Background:** `#0D0D0D`

**Layout:**
- Centered content, min-height 100vh
- Large gold checkmark icon (Lucide `check-circle`, 64px)
- "Спасибо за запись!" — Playfair Display 700, 2.5rem, gold
- "Мы свяжемся с вами для подтверждения в ближайшее время." — Inter 400, 1rem, brand-gray
- "Вернуться на главную" — gold link (Inter 500, 0.875rem)
- Auto-redirect to `/` after 10 seconds (meta refresh)

---

### 3.10 Standalone Booking Page (/booking)

**Type:** Dedicated booking page (same as section 3.7, but as a standalone page)
**Background:** `#0D0D0D`
**Layout:** Same form, centered, with minimal header and no other sections
**Purpose:** For use in ads, social media links, and QR codes

**Components:**
- Mini header (just logo + close/home link)
- Full booking form (same as 3.7)
- Footer (same as 3.8)

---

## 4. User Flows

### 4.1 Primary Flow: Booking a Haircut

```
1. User lands on Hero
   ├─ Sees full-screen hero with headline "VEGAS"
   ├─ Reads subtitle "Искусство мужского стиля"
   └─ Clicks "Записаться" → smooth scroll to #booking

2. User scrolls down through sections
   ├─ Sees Services → picks a service (mentally or returns later)
   ├─ Sees Team → decides which barber
   ├─ Sees Gallery → confirms quality of work
   └─ Scrolled to #booking

3. User fills booking form
   ├─ Enters name (2-50 chars validation)
   ├─ Enters phone (+7 mask input)
   ├─ Selects service from dropdown
   ├─ Selects barber ("Любой" or specific)
   ├─ Picks date (calendar picker, min today, max +30 days)
   ├─ Picks time (30-min slots, 09:00-20:00)
   ├─ Adds optional comment
   └─ Clicks "Записаться"

4. Form submission
   ├─ Client-side validation passes
   ├─ Button shows loading spinner
   ├─ API call to /api/book
   ├─ Telegram message sent to admin
   └─ Redirect to /thanks

5. Thank You page
   ├─ User sees success confirmation
   ├─ "Вернуться на главную" link
   └─ Auto-redirects after 10s
```

**Decision Points:**
- If user is on mobile and clicks nav "Записаться" → smooth scroll to form
- If user clicks nav link from hero → smooth scroll to that section
- If form has validation error → field with error gets focus + red border + error message
- If API fails → show error message in form, keep all data, enable retry

### 4.2 Social Media Flow

```
1. User clicks ad on Instagram/VK → links to /booking
2. Standalone booking page loads (minimal header)
3. User fills form (same as above)
4. Same submission flow
```

### 4.3 Navigation Flow

```
Desktop: Sticky nav always visible
├─ Logo → scroll to top (#hero)
├─ "Услуги" → scroll to #services
├─ "Команда" → scroll to #team
├─ "Галерея" → scroll to #gallery
├─ "Контакты" → scroll to #contact
└─ "Записаться" (CTA button) → scroll to #booking

Mobile: Hamburger menu
├─ Opens full-screen overlay
├─ Same links, stacked vertically, large font
└─ Close button or tap link to close
```

---

## 5. Interaction Patterns

### 5.1 Scroll Animations

| Element | Animation | Trigger | Duration | Easing |
|---|---|---|---|---|
| Section titles (h2) | Fade in + translateY(20px) → 0 | IntersectionObserver (0.2 threshold) | 0.6s | cubic-bezier(0.16, 1, 0.3, 1) |
| Service cards | Fade in + translateY(30px), staggered 100ms | IntersectionObserver | 0.5s each | ease-out |
| Barber cards | Fade in + translateY(20px), staggered 100ms | IntersectionObserver | 0.5s each | ease-out |
| Gallery items | Scale(0.95) → 1, fade in | IntersectionObserver | 0.4s | ease-out |
| Form card | Fade in + translateY(20px) | IntersectionObserver | 0.6s | ease-out |
| Hero content | Fade in (opacity 0→1, no translate) | On page load (100ms delay) | 1s | ease-out |

### 5.2 Hover & Interactive States

| Element | Hover Effect | Duration |
|---|---|---|
| Navigation links | Gold bottom underline (underline slide-in from left) | 0.2s |
| Service cards | Border gold, slight shadow lift | 0.3s |
| Barber cards | TranslateY(-4px), shadow-md, gold border | 0.3s |
| Gallery items | Overlay with zoom scale(1.03) | 0.3s |
| Primary CTA | Scale(1.02), shadow-glow | 0.2s |
| Secondary CTA | Gold bg on hover (fill from left) | 0.3s |
| Input fields | Gold border on focus, subtle glow | 0.2s |

### 5.3 Transitions & Gestures

| Interaction | Pattern | Details |
|---|---|---|
| Section scroll | Smooth (CSS `scroll-behavior: smooth` on html) | `scroll-margin-top: 80px` on each section for nav offset |
| Mobile menu | Slide from right, 0.3s, ease-out | Overlay with backdrop blur |
| Lightbox open | Fade in, scale(0.95)→1, 0.3s | Keyboard trap inside lightbox |
| Lightbox close | Fade out, 0.2s | Esc key or close button |
| Lightbox prev/next | Slide animation (current slides out, next slides in) | 0.3s, ease-out |
| Gallery filter | Fade out + reflow + fade in | 0.4s total |
| Hamburger → X | Rotate icon morph (menu → x) | 0.3s |
| Skeleton loaders | Pulse animation (opacity 0.4→0.8→0.4) | 1.5s loop |

### 5.4 Loading States

| Component | Loading State |
|---|---|
| Hero background | LQIP blur placeholder until full image loads |
| Barber photos | Skeleton card (gray pulse rect 280px tall) |
| Gallery images | LQIP (20px blur thumbnail) → swap to full quality on viewport entry |
| Map embed | Skeleton placeholder (gray rect with map-pin icon centered) |
| Form submission | Button shows spinner, fields disabled, no double-submit |
| Font loading | `font-display: swap` in @font-face — text shows with fallback font immediately |

### 5.5 Empty States

| Component | Empty State |
|---|---|
| Gallery (no images) | "Фотографии скоро появятся" — centered, ghost text, camera icon |
| Team (no barbers) | "Наша команда формируется" — centered, ghost text |
| Services (no data) | "Прайс-лист скоро будет обновлён" — centered |

---

## 6. Responsive Design

### 6.1 Breakpoint Behavior

| Breakpoint | Width | Key Changes |
|---|---|---|
| **Default (mobile)** | < 640px | Single column layout. Hamburger nav. Full-width cards. Smaller headings. Stack contact/map. Single column gallery. Smaller hero text. |
| **sm** | ≥ 640px | Hero text slightly larger. Services → 2 columns. Gallery → 2 columns. |
| **md** | ≥ 768px | Navigation links visible (no hamburger). Barber grid → 2 columns. Form padding increases. Section padding increases. |
| **lg** | ≥ 1024px | Hero reaches full typography scale. Services → 3 columns. Barber grid → 3 columns. Gallery → 3 columns. Contact → 2 columns side-by-side. |
| **xl** | ≥ 1280px | Maximum widths enforced (max-w-7xl or 1280px containers). Barber grid → 4 columns. Generous whitespace. |

### 6.2 Mobile-Specific Considerations

- **Hero CTA:** Full-width buttons on mobile, easier to tap (min 44px height)
- **Nav hamburger:** Tap target at least 48×48px
- **Form inputs:** `font-size: 16px` minimum (prevents iOS zoom on focus)
- **Gallery:** Swipe gestures for lightbox. Single column masonry.
- **Booking form:** Full-width inputs, comfortable tap targets.
- **Phone links:** `tel:` protocol on mobile for click-to-call
- **Touch feedback:** Active state on all interactive elements (opacity 0.8)

### 6.3 Container Max-Widths

| Content Type | Max Width |
|---|---|
| Section content | 1280px (standard) |
| Form | 520px |
| Hero text | 800px |
| Section subtitle | 600px |
| Services grid container | 1280px |
| Gallery grid container | 1400px (slightly wider for masonry) |

---

## 7. Accessibility

### 7.1 WCAG 2.1 AA Compliance

| Requirement | Implementation |
|---|---|
| **Color contrast** | All text/background combos ≥ 4.5:1 (verified in palette section) |
| **Touch targets** | All interactive elements ≥ 44×44px |
| **Keyboard navigation** | Tab through all interactive elements. Visible focus ring (gold `outline: 2px solid #C9A84C; outline-offset: 2px`) |
| **ARIA labels** | All icons, navigation, form fields, lightbox |
| **Form labels** | Visible `<label>` elements for every input (not just placeholders) |
| **Skip to content** | Hidden skip link at very top: "Перейти к содержанию" |
| **Reduced motion** | `@media (prefers-reduced-motion: reduce)` — disable all animations, disable parallax |
| **Semantic HTML** | Proper `<nav>`, `<section>`, `<article>`, `<h1-h3>`, `<form>`, `<table>` for hours |
| **Image alt text** | All `<img>` have meaningful `alt` attributes. Decorative images get `alt=""` |

### 7.2 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .hero-parallax {
    transform: none !important;
  }
}
```

---

## 8. Performance Targets

| Metric | Target |
|---|---|
| **LCP** (Largest Contentful Paint) | < 1.5s |
| **FCP** (First Contentful Paint) | < 0.8s |
| **TBT** (Total Blocking Time) | < 50ms |
| **CLS** (Cumulative Layout Shift) | < 0.05 |
| **SI** (Speed Index) | < 1.5s |
| **PageSpeed Score** | ≥ 95 (mobile) / ≥ 98 (desktop) |
| **Total JS bundle** | < 15KB (gzipped) |
| **Total page weight** | < 500KB (first load, including hero image) |

---

## 9. Implementation Checklist

### Load Order Priority

1. **Critical CSS** — inline in `<head>` for above-the-fold content (tailwind critical)
2. **Preload hero image** — `<link rel="preload" as="image" href="/images/hero.webp">`
3. **Preconnect to Google Fonts** — `<link rel="preconnect" href="https://fonts.googleapis.com">` and `https://fonts.gstatic.com`
4. **Async analytics** — Yandex.Metrica loaded async after Onload
5. **Deferred JS** — Gallery lightbox, form handler, scroll animations loaded via `client:visible`

### Required Dependencies

```json
{
  "dependencies": {
    "astro": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "@astrojs/tailwind": "^6.0.0",
    "lucide-astro": "^1.0.0",
    "@fontsource/playfair-display": "^5.0.0",
    "@fontsource/inter": "^5.0.0"
  },
  "devDependencies": {
    "@astrojs/image": "^1.0.0",
    "sharp": "^0.33.0"
  }
}
```

---

## 10. Visual References & Mood Board

### Aesthetic Direction

| Element | Description |
|---|---|
| **Color feelings** | Gold on black — luxury, exclusivity, nightlife. Like a VIP lounge, not a cheap haircut. |
| **Lighting** | Warm, dim, cozy. Spotlights on barber chairs. Think amber glow, not fluorescent white. |
| **Textures** | Leather, dark wood, brass, marble, velvet — implied through colors and gradients. |
| **Imagery** | Close-up shots of haircuts in progress, scissor details, beard grooming, customer enjoying the experience. |
| **Typography** | Playfair Display = classic barbershop sign. Inter = clean modern contrast. |
| **Vibe** | "A place where men feel at home." Not fancy, not cheap — premium but approachable. |

### Photography Guidelines

- **Hero**: Wide shot of barbershop interior — leather chairs, mirrors, warm amber lighting, classic barber pole visible. No clients needed (just the space).
- **Barber portraits**: 3/4 body shot, barbers in aprons, holding tools, confident posture. Dark background. Warm lighting from one side (Rembrandt style).
- **Gallery work**: Before/after comparisons where possible. Close-ups of fades, beard lines, razor work. Well-lit, on plain background.
- **Color grade**: Warm tones (+15 warmth, +10 contrast, shadows slightly crushed) — consistent across all photos.

---

*End of DESIGN_SPEC.md — Vegas Barbershop Landing Page*
