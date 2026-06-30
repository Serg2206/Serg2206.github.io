# Articles Page Design — `/articles/index.html`

**Page goal:** Provide expert medical content for SEO and patient education. Drive organic traffic.

**Page title:** Статьи / Статті / Articles
**Meta description:** Экспертные статьи профессора Сушкова С.В. о хирургии, онкологии, гинекологии и современных методах лечения.

---

## Section 1: Page Hero (Compact)

**Background:** `var(--gradient-hero)`
**Height:** 35vh (min 240px)
**Content:**
- **H1:** 
  - RU: `Полезные статьи`
  - UA: `Корисні статті`
  - EN: `Expert Articles`
- **Subtitle:**
  - RU: `Экспертные материалы о здоровье, диагностике и лечении от профессора Сушкова С.В.`
  - UA: `Експертні матеріали про здоров'я, діагностику та лікування від професора Сушкова С.В.`
  - EN: `Expert materials on health, diagnostics, and treatment by Prof. Sushkov S.V.`
- **Breadcrumb:** Главная / Статьи (RU)

---

## Section 2: Articles Grid

**Background:** White
**Layout:** Grid, 3 columns desktop, 2 tablet, 1 mobile. Gap 24px.

**6 Articles:**

| # | Slug | Title RU | Title UA | Title EN | Excerpt RU | Date | Read Time |
|---|------|----------|----------|----------|------------|------|-----------|
| 1 | laparoscopic-cholecystectomy-kharkiv | Лапароскопическая холецистэктомия в Харькове | Лапароскопічна холецистектомія у Харкові | Laparoscopic Cholecystectomy in Kharkiv | Современные методы удаления желчного пузыря с минимальными разрезами. Восстановление за 3–7 дней. | 2025-03-15 | 5 мин |
| 2 | oncological-surgery-kharkiv | Онкологическая хирургия в Харькове | Онкологічна хірургія у Харкові | Oncological Surgery in Kharkiv | Лечение онкологических заболеваний: рак желудка, кишечника, молочной железы, женских органов. | 2025-02-20 | 7 мин |
| 3 | gynecological-consultation-kharkiv | Гинекологическая консультация в Харькове | Гінекологічна консультація у Харкові | Gynecological Consultation in Kharkiv | Профилактика и лечение гинекологических заболеваний. Планирование беременности. | 2025-01-10 | 4 мин |
| 4 | myomectomy-kharkiv | Миомэктомия в Харькове | Міомектомія у Харкові | Myomectomy in Kharkiv | Удаление миомы матки с сохранением органа. Возможность беременности после операции. | 2024-12-05 | 6 мин |
| 5 | cancer-screening-kharkiv | Скрининг онкологических заболеваний в Харькове | Скринінг онкологічних захворювань у Харкові | Cancer Screening in Kharkiv | Раннее выявление онкологии: УЗИ, маммография, кольпоскопия, лабораторные исследования. | 2024-11-15 | 5 мин |
| 6 | gynecological-exam-kharkiv | Гинекологический осмотр в Харькове | Гінекологічний огляд у Харкові | Gynecological Exam in Kharkiv | Регулярные проверки для женщин. Профилактика и раннее выявление заболеваний. | 2024-10-20 | 4 мин |

**Card layout:**
- **Image:** Top, 16:9 aspect ratio, `border-radius: 12px 12px 0 0`
  - Placeholder: gradient bg with article icon (Stethoscope, HeartPulse, etc.) centered
  - Future: actual article images in `images/articles/`
- **Category tag:** Small pill, teal bg, white text, absolute positioned over image top-left
  - Categories: Хирургия, Онкология, Гинекология, Диагностика
- **Title:** H3, 2 lines max, ellipsis
- **Excerpt:** Body-small, `--text-light`, 3 lines max
- **Meta row:** Date (left) + read time with Clock icon (right)
- **Read more link:** "Читать далее →" / "Читати далі →" / "Read more →" — teal, bottom of card
- **Entire card clickable** — links to `/articles/<slug>.html`

**Hover:** Card lifts, shadow increases. Image scales slightly (1.03) with overflow hidden.

---

## Section 3: Individual Article Pages

**Route:** `/articles/<slug>.html` (e.g., `/articles/laparoscopic-cholecystectomy-kharkiv.html`)

**Template structure:**
1. **Header:** Shared
2. **Article hero:** Compact, no gradient. White bg with breadcrumb.
   - Breadcrumb: Главная / Статьи / [Article Title]
   - Title: H1
   - Meta: Date + read time + category tag
3. **Article body:**
   - Max-width: 720px, centered
   - Font: 18px body, 1.7 line-height for readability
   - First paragraph: lead text (larger, `--text-light`)
   - Subheadings: H2, H3
   - Lists: bullet points with teal checkmarks
   - Blockquotes: left border 4px teal, italic, `var(--bg)` bg
   - Images: full width, rounded, shadow
   - Callout boxes: `var(--bg)` bg, rounded, for important notes/warnings
4. **Author box:**
   - `images/doctor-portrait.jpg` (64px circle)
   - Name: Профессор Сушков С.В.
   - Credentials: Д-р мед. наук, профессор | Хирург-онколог
   - Link: "Все статьи автора" → `/articles/`
5. **Share buttons:** Telegram, WhatsApp, Viber, Copy link
6. **Related articles:** 3 cards at bottom, same style as listing grid
7. **CTA:** "Записаться на консультацию" → `/appointment/`
8. **Footer:** Shared

**Schema.org:** `Article` type JSON-LD with `author`, `datePublished`, `dateModified`, `headline`, `image`.

---

## Section 4: CTA + Footer

Standard CTA + footer.

---

## Schema.org JSON-LD (Articles List)

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Expert Articles by Prof. Sushkov",
  "hasPart": [
    {"@type": "Article", "headline": "...", "url": "..."}
  ]
}
```
