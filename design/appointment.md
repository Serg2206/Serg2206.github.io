# Appointment Page Design — `/appointment/index.html`

**Page goal:** Convert visitors to booked appointments. Provide multiple contact channels.

**Page title:** Запись на приём / Запис на прийом / Book an Appointment
**Meta description:** Запишитесь на консультацию к профессору Сушкову С.В. Онлайн-запись, телефон, Telegram, WhatsApp, Viber.

---

## Section 1: Page Hero (Compact)

**Background:** `var(--gradient-hero)`
**Height:** 30vh (min 220px)
**Content:**
- **H1:** 
  - RU: `Запись на консультацию`
  - UA: `Запис на консультацію`
  - EN: `Book a Consultation`
- **Subtitle:**
  - RU: `Заполните форму, и мы свяжемся с вами для подтверждения записи`
  - UA: `Заповніть форму, і ми зв'яжемося з вами для підтвердження запису`
  - EN: `Fill out the form and we will contact you to confirm your appointment`
- **Breadcrumb:** Главная / Запись (RU)
- **Phone:** `+380 96 501 52 28` — large, white, with phone icon. `tel:` link.

---

## Section 2: Contact Form Card

**Background:** White
**Layout:** Centered card, max-width 640px. Shadow, rounded-xl, padding 40px.
**Position:** Left side on desktop (60%), if paired with contact info. Or full-width centered if stacked.

**Recommended layout:** 2 columns desktop.
- Left (55%): Form card
- Right (45%): Contact info + map (see Section 3)
- Mobile: Stacked, form first.

**H2:** 
- RU: `Онлайн-форма записи`
- UA: `Онлайн-форма запису`
- EN: `Online Booking Form`

**Form fields:**

| Field | Type | Required | Placeholder RU |
|-------|------|----------|----------------|
| Имя | text | Yes | Иван |
| Фамилия | text | Yes | Иванов |
| Телефон | tel | Yes | +380 XX XXX XX XX |
| Email | email | No | email@example.com |
| Тип приёма | select | Yes | Выберите тип приёма... |
| Желаемая дата | date | No | — |
| Дополнительная информация | textarea | No | Опишите симптомы или вопросы... |

**Select options (Тип приёма):**
- Консультация хирурга / Консультація хірурга / Surgical Consultation
- Консультация онколога / Консультація онколога / Oncological Consultation
- Консультация гинеколога / Консультація гінеколога / Gynecological Consultation
- Повторный приём / Повторний прийом / Follow-up Visit
- Операция (консультация) / Операція (консультація) / Surgery (Consultation)
- Другое / Інше / Other

**Phone input:**
- Auto-format to Ukrainian format: `+380 XX XXX XX XX`
- Pattern validation
- Country code prefix shown

**Date input:**
- Min date: today
- No max date
- Native HTML5 date picker

**Privacy checkbox:**
- Required
- RU: `Я согласен с политикой конфиденциальности и обработкой персональных данных`
- UA: `Я погоджуюсь з політикою конфіденційності та обробкою персональних даних`
- EN: `I agree to the privacy policy and processing of personal data`
- Link: `/privacy-policy.html` — opens in new tab

**Submit button:**
- RU: `Записаться на приём`
- UA: `Записатися на прийом`
- EN: `Book Appointment`
- Style: Primary gradient, full width, large, with Calendar icon

**Form action:**
- `formspree.io` or similar service
- `action="https://formspree.io/f/YOUR_FORM_ID" method="POST"`
- Success message: "Спасибо! Мы свяжемся с вами в течение 1 часа для подтверждения записи." / "Дякуємо! Ми зв'яжемося з вами протягом 1 години для підтвердження запису." / "Thank you! We will contact you within 1 hour to confirm your appointment."

---

## Section 3: Contact Info (Right Column or Below)

**Background:** `var(--bg)` (slate-50) if stacked below form. Or white with subtle border if side-by-side.
**Layout:** Card or stacked blocks.

**H3:** 
- RU: `Контактная информация`
- UA: `Контактна інформація`
- EN: `Contact Information`

**Contact blocks (icon + text):**

| Icon | Label RU | Value |
|------|----------|-------|
| MapPin | Адрес | вул. Сірохінська, Харків, Харківська область, 61000 |
| Phone | Телефон | +380 67 570 79 49 (also +380 96 501 52 28) |
| Mail | Email | ssvproff@gmail.com |
| Clock | Часы приёма | Уточняйте по телефону / Уточнюйте за телефоном / Please call for hours |
| Info | Важно | Приём ведётся по предварительной записи. Пожалуйста, запишитесь заранее. / Прийом проводиться за попереднім записом. Будь ласка, запишіться заздалегідь. / By appointment only. Please book in advance. |

**Messenger buttons (row of 4):**
- **Telegram:** Blue button, icon + "Telegram" → `https://t.me/...` (bot link)
- **WhatsApp:** Green button, icon + "WhatsApp" → `https://wa.me/380965015228`
- **Viber:** Purple button, icon + "Viber" → `viber://chat?number=+380965015228`
- **Phone call:** Teal button, icon + "Позвонить" / "Подзвонити" / "Call" → `tel:+380965015228`

**Button style:**
- Rounded-full, 48px height, white text, brand color bg
- Gap: 12px between buttons
- Full width on mobile, horizontal row on desktop

---

## Section 4: Map

**Background:** White (if stacked) or same as contact section
**Layout:** Full-width within container, rounded corners.

**Content:**
- Google Maps iframe, height 350px (250px mobile)
- Address label above map:
  - RU: `Медицинский центр MARIA, Харьков, Украина`
  - UA: `Медичний центр MARIA, Харків, Україна`
  - EN: `MARIA Medical Center, Kharkiv, Ukraine`
- Placeholder for actual coordinates:
  ```html
  <iframe src="https://www.google.com/maps/embed?pb=..." width="100%" height="350" style="border:0; border-radius:12px;" allowfullscreen="" loading="lazy"></iframe>
  ```

---

## Section 5: Payment Reminder

**Background:** `var(--bg)` (slate-50)
**Layout:** Centered compact card.

**Content:**
- H3: `Оплата консультации` / `Оплата консультації` / `Consultation Payment`
- Text: `Консультация профессора — 500 грн` / `Консультація професора — 500 грн` / `Professor consultation — 500 UAH`
- Button: `💳 Оплатить онлайн` / `💳 Оплатити онлайн` / `💳 Pay Online` → links to payment page (same as home payment section)
- Subtext: `После оплаты мы свяжемся с вами в течение 1 часа.` / `Після оплати ми зв'яжемося з вами протягом 1 години.` / `We will contact you within 1 hour after payment.`

---

## Section 6: FAQ / Preparation Tips (Optional)

**Background:** White
**Layout:** Accordion.

**H3:** Как подготовиться к приёму / Як підготуватися до прийому / How to Prepare

**Items:**
1. `Что взять с собой?` / `Що взяти з собою?` / `What to bring?` — Паспорт, результаты предыдущих анализов (если есть), список принимаемых лекарств.
2. `Нужно ли приходить натощак?` / `Чи потрібно приходити натщо?` / `Should I come on an empty stomach?` — Зависит от цели приёма. Уточните при записи.
3. `Сколько длится консультация?` / `Скільки триває консультація?` / `How long is the consultation?` — Обычно 30–45 минут.

**Accordion style:**
- Header: clickable, padding 16px, border-bottom 1px `var(--border)`
- ChevronRight icon rotates 90° when open
- Content: padding 16px, `var(--bg)` bg, border-radius 8px
- Only one item open at a time

---

## Section 7: Footer

Standard footer.

---

## Schema.org JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "MARIA Medical Center",
  "telephone": "+380965015228",
  "email": "ssvproff@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "вул. Сірохінська",
    "addressLocality": "Kharkiv",
    "addressRegion": "Kharkiv Oblast",
    "postalCode": "61000",
    "addressCountry": "UA"
  },
  "openingHours": "By appointment",
  "priceRange": "500 UAH consultation"
}
```
