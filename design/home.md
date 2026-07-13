# Home Page Design — `/index.html`

**Page goal:** Convert visitors to appointment bookings. Establish trust through credentials, stats, and services.

**Language:** All section content provided in RU (primary), with UA and EN equivalents noted where critical.

---

## Section 1: Hero

**Layout:** Full viewport height (100vh minimum), centered content. Gradient background `var(--gradient-hero)`.

**Content:**
- **Badge (optional):** "Профессорская хирургия в Харькове" / "Professor-level surgery in Kharkiv" / "Професорська хірургія у Харкові"
  - Small pill, white bg, teal text, uppercase, 12px, tracking wide
- **Headline (H1):**
  - RU: `Профессорская хирургия, онкология и гинекология`
  - UA: `Професорська хірургія, онкологія та гінекологія`
  - EN: `Professor-level Surgery, Oncology & Gynecology`
- **Subheadline:**
  - RU: `Д-р мед. наук, профессор Сушков С.В. — 40+ лет опыта, 5000+ операций. Индивидуальный подход, современное оборудование, безопасные операции.`
  - UA: `Д-р мед. наук, професор Сушков С.В. — 40+ років досвіду, 5000+ операцій. Індивідуальний підхід, сучасне обладнання, безпечні операції.`
  - EN: `MD, PhD, DSc, Prof. Sushkov S.V. — 40+ years experience, 5000+ operations. Individual approach, modern equipment, safe surgery.`
- **CTA buttons (row, centered):**
  - Primary: `Записаться на консультацию` / `Записатися на консультацію` / `Book a Consultation` → links to `/appointment/`
  - Secondary (outline, white): `Узнать больше` / `Дізнатися більше` / `Learn More` → smooth scroll to `#about`
- **Phone:** `+380 96 501 52 28` — displayed below CTAs with phone icon. `tel:` link.
- **Trust microcopy below phone:** "Приём по предварительной записи" / "Прийом за попереднім записом" / "By appointment only"

**Visual:**
- Subtle floating medical cross pattern or wave SVG overlay at bottom (opacity 0.05)
- No photo in hero — gradient is sufficient. Optional: doctor portrait on right on desktop (overlapping layout).

**Animations:**
- Headline: fade-in + translateY(30px), 0.6s, ease-out
- Subheadline: fade-in + translateY(30px), 0.6s, 0.2s delay
- Buttons: fade-in + translateY(30px), 0.6s, 0.4s delay

---

## Section 2: Trust Bar (Stats)

**Background:** White
**Layout:** Horizontal row of 5 stat cards. Centered. `max-width: 1000px`.
**Border:** Top and bottom 1px `var(--border)`.
**Padding:** 40px 0 (compact).

**Stats:**

| Icon | Number | Label RU | Label UA | Label EN |
|------|--------|----------|----------|----------|
| Calendar | 40+ | Лет опыта | Років досвіду | Years of Experience |
| Scissors | 5000+ | Операций | Операцій | Operations |
| BookOpen | 121 | Публикаций | Публікацій | Publications |
| Award | 18 | Патентов | Патентів | Patents |
| HeartPulse | 98% | Довольных пациентов | Задоволених пацієнтів | Satisfied Patients |

**Visual:**
- Number: 36px, bold, gradient text (`var(--gradient-hero)` clipped to text)
- Label: 14px, `--text-light`, uppercase, tracking wide
- Icon: 24px, `--text-light`, above number
- Divider: subtle vertical line between stats (1px, `--border`)

**Animation:** Counter animation from 0 to final value over 2s when section enters viewport. Stagger 0.1s per stat.

---

## Section 3: Doctor Profile Card

**Background:** `var(--bg)` (slate-50)
**Layout:** 2 columns desktop (60/40), stacked mobile. Container max-width.

**Left column (text):**
- **Overline:** "👨‍⚕️ Ваш врач" / "👨‍⚕️ Ваш лікар" / "👨‍⚕️ Your Physician" — 14px, teal, uppercase
- **Name:** "Профессор Сушков Сергей Валентинович" — H2
- **Credentials:** "Д-р мед. наук, профессор | Хирург-онколог | Член EAES" — 16px, `--text-light`
- **Bio excerpt (3 lines):**
  - RU: `Пионер лапароскопической хирургии в Харьковском регионе (1995–1997). Заместитель директора по научной работе Института общей и неотложной хирургии им. В.Т. Зайцева НАМН Украины. 121 публикация, 18 патентов, h-index 6.`
  - UA: `Піонер лапароскопічної хірургії в Харківському регіоні (1995–1997). Заступник директора з наукової роботи Інституту загальної та невідкладної хірургії ім. В.Т. Зайцева НАМН України. 121 публікація, 18 патентів, h-index 6.`
  - EN: `Pioneer of laparoscopic surgery in the Kharkiv region (1995–1997). Deputy Director for Research at the V.T. Zaitsev Institute of General and Emergency Surgery (NAMS of Ukraine). 121 publications, 18 patents, h-index 6.`
- **CTA link:** "Подробнее о профессоре →" / "Детальніше про професора →" / "More about the professor →" → `/about/`

**Right column (image):**
- `images/doctor-portrait.jpg`
- Rounded corners (16px), shadow-lg
- Optional: subtle gradient border overlay

**Animation:** Left column slides in from left, image from right, both on scroll.

---

## Section 4: Services Grid

**Background:** White
**Section title (H2, centered):** 
- RU: `Направления`
- UA: `Напрямки`
- EN: `Our Services`

**Subtitle (centered, `--text-light`):**
- RU: `Современная хирургия, онкология и гинекология`
- UA: `Сучасна хірургія, онкологія та гінекологія`
- EN: `Modern surgery, oncology, and gynecology`

**Grid:** 3 columns, 2 rows. 6 cards.

**Card content:**

| # | Icon | Title RU | Title UA | Title EN | Description RU |
|---|------|----------|----------|----------|----------------|
| 1 | Stethoscope | Хирургия | Хірургія | Surgery | Лапароскопия, малоинвазивная хирургия. Удаление желчного пузыря, аппендицит, грыжи и другие операции. |
| 2 | Target | Онкохирургия | Онкохірургія | Oncological Surgery | Лечение рака желудка, кишечника, молочной железы, женских органов. Раннее выявление и комплексная терапия. |
| 3 | Baby | Гинекология | Гінекологія | Gynecology | Профессорская консультация, планирование беременности, лечение женских заболеваний, профилактика. |
| 4 | Heart | Миомэктомия | Міомектомія | Myomectomy | Удаление миомы матки с сохранением органа. Планирование беременности после операции. |
| 5 | Microscope | Онко-диагностика | Онко-діагностика | Cancer Diagnostics | Скрининг, раннее выявление рака. УЗИ, маммография, кольпоскопия, лабораторные исследования. |
| 6 | Clipboard | Профосмотр | Профогляд | Medical Check-up | Медицинские осмотры, справки, комплексное обследование. Диагностика для профилактики заболеваний. |

**Card layout:**
- Icon: 48px circle, gradient bg, white icon, centered top
- Title: H4, centered
- Description: Body-small, `--text-light`, centered, 3 lines max
- Link: "Подробнее →" / "Детальніше →" / "Learn more →" — teal, with arrow

**Animation:** Cards stagger in from bottom, 0.1s delay each.

---

## Section 5: Why Us

**Background:** `var(--bg)` (slate-50)
**Section title (H2, centered):** 
- RU: `Почему доверяют MARIA?`
- UA: `Чому довіряють MARIA?`
- EN: `Why Choose MARIA?`

**Subtitle:**
- RU: `Медицинский центр MARIA — это команда высококвалифицированных специалистов с многолетним опытом.`
- UA: `Медичний центр MARIA — це команда висококваліфікованих фахівців з багаторічним досвідом.`
- EN: `MARIA Medical Center is a team of highly qualified specialists with many years of experience.`

**Grid:** 4 columns desktop, 2 tablet, 1 mobile. 4 cards.

| # | Icon | Title RU | Title UA | Title EN | Description RU |
|---|------|----------|----------|----------|----------------|
| 1 | GraduationCap | Профессорский уровень | Професорський рівень | Professor-Level | Врачи с учёными степенями и многолетним опытом практики. Постоянное повышение квалификации. |
| 2 | Microscope | Современное оборудование | Сучасне обладнання | Modern Equipment | Лапароскопическая стойка, аппарат УЗИ экспертного класса, современная лаборатория. |
| 3 | Shield | Безопасность и комфорт | Безпека та комфорт | Safety & Comfort | Щадящие малоинвазивные методы, короткий период реабилитации, комфортные палаты. |
| 4 | ListChecks | Комплексный подход | Комплексний підхід | Comprehensive Care | От диагностики до реабилитации — полный цикл лечения под наблюдением одной команды. |

**Card layout:**
- Icon: 40px, teal stroke, left-aligned
- Title: H4, left-aligned
- Description: Body-small, `--text-light`, left-aligned
- No shadow — minimal cards with icon accent

---

## Section 6: Articles Preview

**Background:** White
**Section title (H2, centered):** 
- RU: `Полезные статьи от профессора`
- UA: `Корисні статті від професора`
- EN: `Expert Articles from the Professor`

**Subtitle:**
- RU: `Читайте экспертные материалы о здоровье, диагностике и лечении`
- UA: `Читайте експертні матеріали про здоров'я, діагностику та лікування`
- EN: `Read expert materials on health, diagnostics, and treatment`

**Grid:** 3 cards, horizontal row. Desktop: 3 cols. Tablet: 2 cols. Mobile: 1 col.

**Cards display the 3 most recent articles:**
1. Лапароскопическая холецистэктомия в Харькове
2. Онкологическая хирургия в Харькове
3. Гинекологическая консультация в Харькове

**Card layout:**
- Thumbnail: 16:9, rounded-t-lg, gradient placeholder if no image
- Title: H4, 2 lines max
- Excerpt: 2 lines, `--text-light`
- Meta: Date + read time (e.g., "15 марта 2025 · 5 мин")
- Link: entire card is clickable to `/articles/<slug>.html`

**CTA below grid:**
- Secondary button: "Все статьи →" / "Усі статті →" / "All Articles →" → `/articles/`

---

## Section 7: CTA Section (Appointment)

**Background:** `var(--gradient-hero)`
**Text color:** White
**Layout:** Centered, max-width 700px.

**Content:**
- **H2:** 
  - RU: `Запишитесь на консультацию`
  - UA: `Запишіться на консультацію`
  - EN: `Book a Consultation`
- **Subtitle:**
  - RU: `Получите профессиональную консультацию опытного хирурга-онколога. Индивидуальный подход, современная диагностика, эффективное лечение.`
  - UA: `Отримайте професійну консультацію досвідченого хірурга-онколога. Індивідуальний підхід, сучасна діагностика, ефективне лікування.`
  - EN: `Get a professional consultation from an experienced surgical oncologist. Individual approach, modern diagnostics, effective treatment.`
- **Primary button (large):** `Записаться на приём` / `Записатися на прийом` / `Book an Appointment` → `/appointment/`
- **Secondary options (row of contact chips):**
  - Phone chip: 📞 `+380 96 501 52 28` → `tel:`
  - Telegram chip: ✈️ Telegram bot → external link
  - WhatsApp chip: 💬 WhatsApp → `https://wa.me/...`
  - Viber chip: 📱 Viber → `viber://chat?number=...`

**Contact chips style:**
- White bg, rounded-full, small shadow, icon + text, 14px
- Hover: lift + shadow increase

---

## Section 8: Payment Section

**Background:** `var(--bg)` (slate-50)
**Layout:** Centered card, max-width 500px, white bg, shadow.

**Content:**
- **Icon:** CreditCard (48px, gradient)
- **H3:** 
  - RU: `Онлайн-оплата консультации`
  - UA: `Онлайн-оплата консультації`
  - EN: `Online Consultation Payment`
- **Price:** 
  - RU: `Консультация профессора — **500 грн**`
  - UA: `Консультація професора — **500 грн**`
  - EN: `Professor consultation — **500 UAH**`
- **Subtext:**
  - RU: `После оплаты мы свяжемся с вами в течение 1 часа для согласования времени.`
  - UA: `Після оплати ми зв'яжемося з вами протягом 1 години для узгодження часу.`
  - EN: `After payment, we will contact you within 1 hour to schedule the time.`
- **Button:** `💳 Оплатить 500 грн` / `💳 Оплатити 500 грн` / `💳 Pay 500 UAH` — gradient, large, rounded-full. Links to external payment gateway.
- **Secondary:** `Или запишитесь через форму →` / `Або запишіться через форму →` / `Or book via form →` → `/appointment/`

**Trust badges below card:**
- SSL secure icon + "Безопасная оплата" / "Безпечна оплата" / "Secure Payment"
- Small text: "Оплата производится через защищённый шлюз" / "Оплата здійснюється через захищений шлюз" / "Payment via secure gateway"

---

## Section 9: Map

**Background:** White
**Layout:** Full-width iframe, height 400px (300px mobile). Rounded corners (12px) within container.

**Content:**
- Section title (H2): 
  - RU: `Как нас найти`
  - UA: `Як нас знайти`
  - EN: `How to Find Us`
- Address text above map:
  - RU: `Медицинский центр MARIA, Харьков, Украина`
  - UA: `Медичний центр MARIA, Харків, Україна`
  - EN: `MARIA Medical Center, Kharkiv, Ukraine`
- Google Maps iframe embed:
  ```html
  <iframe src="https://www.google.com/maps/embed?pb=..." width="100%" height="400" style="border:0; border-radius:12px;" allowfullscreen="" loading="lazy"></iframe>
  ```
  - **Placeholder:** Use a generic Kharkiv city center embed. Replace with actual coordinates in integration.

---

## Section 10: Footer

See `design.md` → Shared Components → Footer.

---

## Schema.org JSON-LD (Home)

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "MARIA Medical Center",
  "description": "...",
  "url": "https://ssvnauka.com",
  "logo": "...",
  "image": "...",
  "telephone": "+380965015228",
  "email": "ssvproff@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "...",
    "addressLocality": "Kharkiv",
    "addressCountry": "UA"
  },
  "medicalSpecialty": ["Surgery", "Oncology", "Gynecology"],
  "founder": {
    "@type": "Person",
    "name": "Sergiy Valentinovich Sushkov",
    "jobTitle": "Professor of Surgery",
    "alumniOf": "Kharkiv National Medical University"
  }
}
```
