# Agent Swarm Coordination Spec — ssvnauka.com Professional Redesign

## User Goal
Создать профессиональный, современный сайт для медицинского центра MARIA и профессора Сушкова С.В., объединив:
1. Профессиональный дизайн существующего ssvnauka.com (логотип, навигация, переключение языков, градиенты)
2. Полный контент из репозитория Serg2206.github.io (публикации, статьи, биография, отзывы, запись)
3. Мультиязычность (RU, UA, EN)
4. SEO, Schema.org, PWA, адаптивность

## Non-Goals
- Не использовать React/Vite (для GitHub Pages проще статический HTML)
- Не добавлять backend/базу данных
- Не менять домен или хостинг

## Stack
- Static HTML5 + CSS3 + vanilla JS
- GitHub Pages deployment
- No build step required

## Architecture
- Single shared CSS file: `styles.css`
- Single shared JS file: `scripts.js` (language switcher, mobile menu, etc.)
- Each page: `index.html` in its own folder (for clean URLs)
- Images: `images/` folder
- Translations: JSON files in `translations/`

## Pages / Routes
1. `/` — Home (главная)
2. `/about/` — О профессоре / About
3. `/about/publications.html` — Публикации / Publications
4. `/articles/` — Статьи / Articles
5. `/articles/<article-slug>.html` — Individual article
6. `/reviews/` — Отзывы / Reviews
7. `/appointment/` — Запись / Appointment
8. `/privacy-policy.html` — Privacy
9. `/cookie-policy.html` — Cookies
10. `/medical-disclaimer.html` — Disclaimer

## Shared Contract
- CSS variables for colors: `--primary`, `--secondary`, `--accent`, `--text`, `--bg`, `--card-bg`
- Color scheme: Teal/purple gradient (matching existing ssvnauka.com)
- Header: fixed, with logo, nav, language switcher, CTA button
- Footer: links, contact info, legal links
- Mobile: hamburger menu, stacked layout
- Language switcher: RU | UA | EN, stores preference in localStorage

## Design Direction (from existing ssvnauka.com)
- Logo: "MARIA MEDICAL CENTER" with hospital icon
- Hero: Large gradient background, clear CTA
- Cards: White with subtle shadow, rounded corners
- Buttons: Primary (gradient), Secondary (outline)
- Typography: Clean sans-serif, hierarchical sizing
- Spacing: Generous whitespace, clear sections

## Content Source
- Bio, stats, achievements: from repo index.html
- 92 publications + 11 patents: from repo /about/publications.html
- 6 articles: from repo /articles/
- Reviews form: from repo /reviews/
- Appointment form: from repo /appointment/
- Photos: /images/doctor-portrait.jpg, /images/doctor-surgery.jpg

## Task Slices & Ownership
1. **Designer** (plan): Create `design/design.md` with full design system, page specs, asset manifest
2. **Scaffold** (coder): Create base HTML structure, CSS variables, shared components, JS utilities
3. **Home Page** (coder): Implement index.html with hero, stats, services, articles preview, CTA
4. **About + Publications** (coder): Implement about/index.html and about/publications.html
5. **Articles** (coder): Implement articles/index.html and individual article pages
6. **Reviews + Appointment** (coder): Implement reviews/index.html and appointment/index.html
7. **Legal Pages** (coder): Implement privacy, cookie, disclaimer pages
8. **Integration** (main agent): Merge all pages, verify links, consistency, deploy

## Validation
- All internal links work
- Mobile responsive (test 320px, 768px, 1024px, 1440px)
- Language switcher works on all pages
- Schema.org JSON-LD present on all pages
- Lighthouse score: 90+ for accessibility, 80+ for performance
- No console errors

## Merge Order
1. Designer → Scaffold (design system)
2. Scaffold → Page workers (base structure)
3. All pages → Integration (merge and verify)
4. Integration → Deploy
