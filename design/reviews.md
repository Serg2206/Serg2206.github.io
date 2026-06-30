# Reviews Page Design — `/reviews/index.html`

**Page goal:** Build trust through social proof. Collect new reviews via form.

**Page title:** Отзывы пациентов / Відгуки пацієнтів / Patient Reviews
**Meta description:** Отзывы пациентов профессора Сушкова С.В. Поделитесь своим опытом лечения в МЦ MARIA.

---

## Section 1: Page Hero (Compact)

**Background:** `var(--gradient-hero)`
**Height:** 30vh (min 220px)
**Content:**
- **H1:** 
  - RU: `Что говорят пациенты`
  - UA: `Що кажуть пацієнти`
  - EN: `What Patients Say`
- **Subtitle:**
  - RU: `Реальные отзывы о профессоре Сушкове С.В. и медицинском центре MARIA`
  - UA: `Реальні відгуки про професора Сушкова С.В. та медичний центр MARIA`
  - EN: `Real reviews of Prof. Sushkov S.V. and MARIA Medical Center`
- **Breadcrumb:** Главная / Отзывы (RU)
- **Overall rating:** ⭐ 5.0 (based on sample reviews) — large display

---

## Section 2: Sample Reviews

**Background:** White
**Layout:** 2-column masonry-style grid desktop, 1 column mobile. Gap 20px.
**Max items displayed:** 6 (with "Load more" button if more exist).

**Review card:**
```
┌─────────────────────────────┐
│ ⭐⭐⭐⭐⭐                    │
│                             │
│ «Текст отзыва...»           │
│                             │
│ — Имя Ф.                    │
│   Город · Месяц Год         │
└─────────────────────────────┘
```

**Card styling:**
- White bg, `var(--shadow)`, rounded-xl, padding 24px
- Stars: 5 × amber filled stars (20px), `color: var(--accent)`
- Quote text: 16px, italic, `--text` color, line-height 1.6
- Author: 14px bold, `--text`
- Meta: 12px, `--text-light`
- Optional: service tag (e.g., "Лапароскопия", "Онкохирургия")

**Sample reviews (3):**

1. ⭐⭐⭐⭐⭐
   «Профессор Сушков провел сложную лапароскопическую операцию. Благодаря его опыту и внимательному отношению, восстановление прошло быстро и без осложнений. Огромное спасибо!»
   — Виктор М. (область) · Март 2025

2. ⭐⭐⭐⭐⭐
   «Обратился за консультацией по поводу онкологии. Профессор подробно объяснил все нюансы, назначил обследование. Чувствуется высочайший профессионализм.»
   — Ольга П. (Харьков) · Февраль 2025

3. ⭐⭐⭐⭐⭐
   «Муж проходил лечение в МЦ MARIA. Профессор Сушков — человек с золотыми руками. Спасибо за терпение и заботу!»
   — Анна К. (Харьков) · Январь 2025

**Placeholder notice:** If no real reviews yet, display a subtle banner:
- RU: `⚠️ Это примеры оформления. После получения первых реальных отзывов замените этот блок.`
- UA: `⚠️ Це приклади оформлення. Після отримання перших реальних відгуків замініть цей блок.`
- EN: `⚠️ These are layout examples. Replace with real reviews once received.`

---

## Section 3: External Review Links

**Background:** `var(--bg)` (slate-50)
**Layout:** Centered row of 2 buttons.

**Buttons:**
1. **Google Reviews:** "⭐ Оставить отзыв на Google" / "⭐ Залишити відгук на Google" / "⭐ Leave a Google Review"
   - Icon: Google "G" logo
   - Style: White bg, shadow, rounded-full
   - Links to Google Business review URL (placeholder)
2. **Telegram:** "✈️ Написать в Telegram" / "✈️ Написати в Telegram" / "✈️ Message on Telegram"
   - Style: Same

---

## Section 4: Review Form

**Background:** White
**Layout:** Centered card, max-width 600px. Shadow, rounded-xl, padding 40px.

**H2:** 
- RU: `Оставить отзыв`
- UA: `Залишити відгук`
- EN: `Leave a Review`

**Subtitle:**
- RU: `Все поля обязательны для заполнения. Ваш отзыв будет проверен перед публикацией.`
- UA: `Всі поля обов'язкові для заповнення. Ваш відгук буде перевірено перед публікацією.`
- EN: `All fields are required. Your review will be moderated before publication.`

**Form fields:**

| Field | Type | Required | Placeholder RU |
|-------|------|----------|----------------|
| Ваше имя | text | Yes | Иван Иванович |
| Email | email | Yes | email@example.com |
| Оценка | star rating (5 stars, clickable) | Yes | — |
| Услуга | select | Yes | Выберите услугу... |
| Ваш отзыв | textarea | Yes | Расскажите о вашем опыте... |

**Star rating widget:**
- 5 empty stars, clickable
- Hover: fill stars up to hovered position
- Click: sets value (1–5)
- Selected state: amber filled stars
- Store value in hidden input

**Service select options:**
- Хирургия / Хірургія / Surgery
- Онкохирургия / Онкохірургія / Oncological Surgery
- Гинекология / Гінекологія / Gynecology
- Миомэктомия / Міомектомія / Myomectomy
- Онко-диагностика / Онко-діагностика / Cancer Diagnostics
- Профосмотр / Профогляд / Medical Check-up
- Другое / Інше / Other

**Submit button:**
- RU: `Отправить отзыв`
- UA: `Надіслати відгук`
- EN: `Submit Review`
- Style: Primary gradient, full width, large

**Form action:**
- For static hosting: use `formspree.io` or similar
- `action="https://formspree.io/f/YOUR_FORM_ID" method="POST"`
- Include `_gotcha` honeypot field for spam protection
- Success message: "Спасибо! Ваш отзыв отправлен на модерацию." / "Дякуємо! Ваш відгук надіслано на модерацію." / "Thank you! Your review has been submitted for moderation."

**Privacy note below form:**
- RU: `Email не публикуется и используется только для связи.`
- UA: `Email не публікується і використовується лише для зв'язку.`
- EN: `Email is not published and is used for contact only.`

---

## Section 5: Moderation Policy

**Background:** `var(--bg)` (slate-50)
**Layout:** Centered text block, max-width 700px.

**H3:** 
- RU: `Политика публикации отзывов`
- UA: `Політика публікації відгуків`
- EN: `Review Publication Policy`

**List (with CheckCircle icons):**
- ✓ Все отзывы проходят предварительную модерацию / Усі відгуки проходять попередню модерацію / All reviews undergo pre-moderation
- ✓ Email не публикуется и используется только для связи / Email не публікується і використовується лише для зв'язку / Email is not published and used for contact only
- ✓ Запрещены оскорбления, клевета и реклама / Заборонені образи, наклепи та реклама / Insults, defamation, and advertising are prohibited
- ✓ Публикуется только имя и инициал фамилии (для конфиденциальности) / Публікується лише ім'я та ініціал прізвища / Only first name and initial are published
- ✓ Отзыв может быть отредактирован с сохранением смысла / Відгук може бути відредагований із збереженням сенсу / Review may be edited while preserving meaning

---

## Section 6: CTA + Footer

Standard CTA + footer.

---

## Schema.org JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "MARIA Medical Center",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "3"
  },
  "review": [
    {
      "@type": "Review",
      "author": "Виктор М.",
      "reviewRating": {"@type": "Rating", "ratingValue": "5"},
      "reviewBody": "...",
      "datePublished": "2025-03-01"
    }
  ]
}
```
