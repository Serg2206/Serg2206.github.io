# MARIA Medical Center — Global Design System

## Site Concept

Professional multilingual medical website for Prof. Sergey V. Sushkov and the MARIA Medical Center in Kharkiv, Ukraine.

**Target users:**
- Patients seeking surgical/oncological/gynecological consultation in Kharkiv
- International patients researching Ukrainian surgical expertise
- Academic peers reviewing publications and credentials
- Referring physicians

**Tone:** Authoritative, warm, trustworthy, modern. Medical precision + human care.

**Languages:** Russian (primary/default), Ukrainian, English. Full parity — all content, navigation, metadata, Schema.org.

---

## Page List with Routes

| # | Route | File Path | Purpose | Owner Worker |
|---|-------|-----------|---------|--------------|
| 1 | `/` | `index.html` | Home page — hero, stats, services, articles, CTA | Home Page |
| 2 | `/about/` | `about/index.html` | Biography, timeline, achievements, academic links | About + Publications |
| 3 | `/about/publications.html` | `about/publications.html` | 92 publications + 11 patents, filterable | About + Publications |
| 4 | `/articles/` | `articles/index.html` | Article listing (6 cards) | Articles |
| 5 | `/articles/<slug>.html` | `articles/<slug>.html` | Individual article pages | Articles |
| 6 | `/reviews/` | `reviews/index.html` | Review form + sample reviews | Reviews + Appointment |
| 7 | `/appointment/` | `appointment/index.html` | Appointment form + contact info | Reviews + Appointment |
| 8 | `/privacy-policy.html` | `privacy-policy.html` | Privacy policy (legal) | Legal Pages |
| 9 | `/cookie-policy.html` | `cookie-policy.html` | Cookie policy (legal) | Legal Pages |
| 10 | `/medical-disclaimer.html` | `medical-disclaimer.html` | Medical disclaimer (legal) | Legal Pages |

**URL pattern:** Clean URLs via folder-per-page + `index.html`. No `.html` extension in user-facing URLs except `/about/publications.html`.

---

## Color Palette

Extracted from existing live site `ssvnauka.com`.

### CSS Variables

```css
:root {
  /* Primary gradient — teal to blue-purple */
  --primary-start: #0d9488;       /* Teal-600 */
  --primary-end: #7c3aed;         /* Violet-600 */
  --primary: #0d9488;             /* Teal base */
  
  /* Secondary / accent */
  --secondary: #7c3aed;           /* Violet-600 */
  --accent: #f59e0b;              /* Amber-500 — CTAs, highlights */
  
  /* Text */
  --text: #1f2937;                /* Gray-800 — body text */
  --text-light: #6b7280;          /* Gray-500 — secondary text */
  --text-inverse: #ffffff;        /* White — on dark/gradient bg */
  
  /* Backgrounds */
  --bg: #f8fafc;                  /* Slate-50 — page bg */
  --card-bg: #ffffff;             /* White — cards */
  --footer-bg: #111827;           /* Gray-900 — footer */
  
  /* Borders & shadows */
  --border: #e2e8f0;              /* Slate-200 */
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
  
  /* Success / error */
  --success: #10b981;             /* Emerald-500 */
  --error: #ef4444;               /* Red-500 */
  
  /* Gradients */
  --gradient-hero: linear-gradient(135deg, #0d9488 0%, #7c3aed 100%);
  --gradient-btn: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
  --gradient-btn-hover: linear-gradient(135deg, #0f766e 0%, #0d9488 100%);
}
```

### Usage Rules

- **Hero sections:** `var(--gradient-hero)` background, white text
- **Primary buttons:** `var(--gradient-btn)` with white text
- **Cards:** `var(--card-bg)` with `var(--shadow)` and `border-radius: 12px`
- **Section backgrounds alternate:** `var(--bg)` (light gray) → white → `var(--bg)` → white
- **Accent color (amber):** Used sparingly for price tags, urgent CTAs, star ratings
- **Footer:** `var(--footer-bg)` with light gray text

---

## Typography

**Font Family:** `Inter` (Google Fonts) — clean, modern, excellent Cyrillic support. Fallback: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.

**Font Loading:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Type Scale

| Element | Size | Weight | Line-height | Letter-spacing |
|---------|------|--------|-------------|----------------|
| H1 (hero) | 48px / 3rem | 700 | 1.1 | -0.02em |
| H2 (section) | 36px / 2.25rem | 700 | 1.2 | -0.01em |
| H3 (card title) | 24px / 1.5rem | 600 | 1.3 | 0 |
| H4 (sub-section) | 20px / 1.25rem | 600 | 1.4 | 0 |
| Body | 16px / 1rem | 400 | 1.6 | 0 |
| Body-small | 14px / 0.875rem | 400 | 1.5 | 0 |
| Caption | 12px / 0.75rem | 500 | 1.4 | 0.02em |
| Nav link | 15px / 0.9375rem | 500 | 1 | 0 |
| Button | 16px / 1rem | 600 | 1 | 0 |

**Responsive:** H1 scales to 36px on tablet, 28px on mobile. H2 scales to 28px / 24px.

---

## Layout Rules

### Container

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
```

- **Desktop (≥1024px):** `max-width: 1200px`, padding 24px
- **Tablet (768–1023px):** `max-width: 100%`, padding 20px
- **Mobile (<768px):** `max-width: 100%`, padding 16px

### Section Spacing

```css
section {
  padding: 80px 0;  /* Desktop */
}
/* Tablet: 60px 0 */
/* Mobile: 48px 0 */
```

### Grid System

- **Services grid:** 3 columns desktop, 2 columns tablet, 1 column mobile. Gap: 24px.
- **Stats bar:** 4–5 columns desktop, 2 columns tablet, 2 columns mobile. Gap: 24px.
- **Articles grid:** 3 columns desktop, 2 columns tablet, 1 column mobile. Gap: 24px.
- **Why Us grid:** 4 columns desktop, 2 columns tablet, 1 column mobile. Gap: 24px.

### Breakpoints

| Name | Width | Tailwind eq |
|------|-------|-------------|
| sm | 640px | — |
| md | 768px | md |
| lg | 1024px | lg |
| xl | 1280px | xl |

---

## Shared Components

### 1. Header (Fixed)

**Position:** Fixed top, `z-index: 1000`, full width.
**Height:** 72px desktop, 64px mobile.
**Background:** White with `backdrop-filter: blur(10px)` and `box-shadow: 0 1px 3px rgba(0,0,0,0.05)` on scroll.
**Layout (desktop):** Logo left | Nav center | Lang switcher + CTA right
**Layout (mobile):** Logo left | Hamburger right. Nav as full-screen overlay.

**Elements:**
- **Logo:** Hospital/medical icon (SVG) + "MARIA MEDICAL CENTER" text. Icon: 32px, text: 18px bold.
- **Nav links:** Услуги / О центре / Статьи / Запись / Контакты (RU). Services, About, Articles, Appointment, Contact (EN). Послуги, Про центр, Статті, Запис, Контакти (UA).
- **Language switcher:** RU | UA | EN. Active language underlined or in pill shape. `cursor: pointer`. Stores preference in `localStorage`.
- **CTA button:** "Запись онлайн" / "Online Appointment" / "Запис онлайн". Small gradient button, rounded-full.

**Scroll behavior:** Header gains shadow after 50px scroll. Transition: `box-shadow 0.3s ease`.

**Mobile menu:**
- Hamburger icon (3 lines) → X when open. Animation: 0.3s ease.
- Full-screen overlay: gradient background, centered nav links, large text (24px).
- Close on link click, escape key, or outside click.

### 2. Footer

**Background:** `var(--footer-bg)` (#111827)
**Text color:** Gray-300, headings white.
**Padding:** 60px 0 top, 24px 0 bottom (legal strip).
**Layout (desktop):** 4 columns: Brand + About | Services | Quick Links | Contact
**Layout (mobile):** Stacked, accordion-style or simple stack.

**Content:**
- **Column 1:** Logo + short tagline + social icons (Telegram, WhatsApp, Viber, email)
- **Column 2:** Services list (6 links)
- **Column 3:** Quick links (Home, About, Articles, Reviews, Appointment, Privacy, Cookies, Disclaimer)
- **Column 4:** Address, phone, email, hours

**Legal strip:** © 2025 MARIA Medical Center. Privacy Policy | Cookie Policy | Medical Disclaimer. Centered, small text, gray-500.

### 3. Cards

```css
.card {
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 24px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

- **Service card:** Icon (48px, gradient bg circle) + title + description + "Подробнее →" link
- **Article card:** Image (16:9, rounded top) + title + excerpt + date + read time
- **Stat card:** Large number (gradient text) + label + icon
- **Why Us card:** Icon (40px, teal) + title + description

### 4. Buttons

**Primary button:**
```css
.btn-primary {
  background: var(--gradient-btn);
  color: white;
  padding: 14px 32px;
  border-radius: 9999px;  /* pill */
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-primary:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(13, 148, 136, 0.3);
}
```

**Secondary button (outline):**
```css
.btn-secondary {
  border: 2px solid var(--primary);
  color: var(--primary);
  background: transparent;
  padding: 12px 30px;
  border-radius: 9999px;
  font-weight: 600;
}
.btn-secondary:hover {
  background: var(--primary);
  color: white;
}
```

**Icon button:** 48px circle, gradient bg, white icon. Used for payment CTAs.

### 5. Forms

**Input fields:**
```css
input, textarea, select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
input:focus, textarea:focus, select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);
  outline: none;
}
```

**Labels:** 14px, weight 500, color `--text-light`, margin-bottom 6px.
**Required indicator:** Red asterisk `*` after label.
**Error state:** Red border + error message below in 12px red text.
**Success state:** Green border + check icon.

**Form layout:** 2-column grid on desktop for name/phone pairs, stacked on mobile.

---

## Interaction Language

### Hover States
- Buttons: `scale(1.02)` + shadow lift
- Cards: `translateY(-4px)` + shadow-lg
- Links: color transition to `--primary`, 0.2s
- Nav links: underline slide-in from left

### Transitions
- Default easing: `ease`
- Default duration: `0.3s`
- Page elements: fade-in + translateY(20px) on scroll. Use `IntersectionObserver`.

### Scroll Animations
- **Reveal:** Elements fade in and translate up 20px when entering viewport.
- **Stagger:** Grid items stagger by 0.1s delay each.
- **Stats counter:** Numbers animate from 0 to final value over 2s when visible.

### Language Switcher
- Instant switch (no page reload). All text nodes updated via JS from JSON.
- Smooth opacity transition: `opacity 0 → 1` over 0.15s during swap.
- Active language stored in `localStorage` as `lang` (values: `ru`, `ua`, `en`).
- Default: `ru`.

---

## Asset Manifest

### Photos
| File | Source | Usage | Dimensions |
|------|--------|-------|------------|
| `images/doctor-portrait.jpg` | Existing repo | Hero, About page, Profile card | 800x1000px, 3:4 ratio |
| `images/doctor-surgery.jpg` | Existing repo | About page, operations section | 1200x800px, 3:2 ratio |
| `images/hero-bg.jpg` | Optional | Hero section fallback/texture | 1920x1080px |
| `images/articles/*.jpg` | Generated/ sourced | Article card thumbnails | 800x450px, 16:9 |

### Icons
- **Source:** Lucide icons (CDN or inline SVG)
- **Style:** Stroke width 2, 24px default, rounded caps
- **Key icons:**
  - Hospital (logo), Menu, X, ChevronRight, Phone, Mail, MapPin, Clock, Calendar, CreditCard, Star, CheckCircle, Shield, Stethoscope, Users, BookOpen, Award, Microscope, FlaskConical, Baby, HeartPulse, Search, User, MessageSquare, Send, Telegram, MessageCircle (WhatsApp), Smartphone (Viber)

### Favicon
- SVG favicon: hospital icon in teal gradient
- PNG fallback: 32x32, 180x180 (Apple touch)

---

## Dependencies

**None.** Pure static HTML5 + CSS3 + vanilla JS.

**External resources (CDNs only):**
- Google Fonts: Inter (weights 300, 400, 500, 600, 700)
- Lucide icons: `https://unpkg.com/lucide@latest` (or inline SVGs)
- Google Maps embed (iframe, no API key needed for simple embed)
- Payment button: external payment processor link (e.g., WayForPay / LiqPay)

**No build step. No npm. No framework.**

---

## Worker Grouping Suggestions

| Group | Workers | Deliverable |
|-------|---------|-------------|
| **Design** | Designer (this document) | `design/` folder with 7 `.md` files |
| **Scaffold** | Scaffold worker | Base `index.html`, `styles.css`, `scripts.js`, `translations/ru.json`, `translations/ua.json`, `translations/en.json`, folder structure |
| **Home** | Home worker | `/index.html` with all sections per `home.md` |
| **About + Publications** | About worker | `/about/index.html` + `/about/publications.html` per `about.md` and `publications.md` |
| **Articles** | Articles worker | `/articles/index.html` + 6 individual article `.html` files per `articles.md` |
| **Reviews + Appointment** | Forms worker | `/reviews/index.html` + `/appointment/index.html` per `reviews.md` and `appointment.md` |
| **Legal** | Legal worker | `/privacy-policy.html`, `/cookie-policy.html`, `/medical-disclaimer.html` |
| **Integration** | Main agent | Merge all, verify links, consistency, Lighthouse, deploy |

---

## SEO & Meta Requirements (All Pages)

- `<html lang="ru">` (switched via JS to `ua` or `en`)
- `<meta charset="UTF-8">`
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- `<meta name="description" content="...">` — translated per page
- `<meta name="keywords" content="...">`
- `<link rel="canonical" href="...">` — absolute URL
- Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Schema.org JSON-LD: `MedicalBusiness` or `Physician` type on relevant pages
- `robots: index, follow` on all pages except none needed

## Accessibility Requirements

- WCAG 2.1 AA minimum
- All images have `alt` text (translated)
- Form labels properly associated with inputs (`for` + `id`)
- Color contrast: 4.5:1 minimum for body text
- Focus states visible on all interactive elements
- Skip-to-content link
- Semantic HTML5: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- ARIA labels on icon-only buttons and language switcher

## PWA Requirements

- `manifest.json` with app name, icons, theme colors
- Service worker for offline caching (optional, static pages only)
- Theme color: `#0d9488` (teal)
- Background color: `#ffffff`
