# About Page Design — `/about/index.html`

**Page goal:** Establish authority and credibility. Showcase full biography, academic achievements, and scientific credentials.

**Page title:** О профессоре / Про професора / About the Professor
**Meta description:** Full biography of Prof. Sushkov S.V. — MD 1986, PhD 1998, DSc 2007. Pioneer of laparoscopic surgery in Kharkiv. 121 publications, 18 patents.

---

## Section 1: Page Hero (Compact)

**Background:** `var(--gradient-hero)`
**Height:** 40vh (min 280px), not full viewport.
**Layout:** Centered text.

**Content:**
- **H1:** 
  - RU: `Профессор Сушков Сергей Валентинович`
  - UA: `Професор Сушков Сергій Валентинович`
  - EN: `Professor Sushkov Sergey Valentinovich`
- **Subtitle:**
  - RU: `Д-р мед. наук, профессор | Хирург-онколог | Член EAES | 40+ лет опыта`
  - UA: `Д-р мед. наук, професор | Хірург-онколог | Член EAES | 40+ років досвіду`
  - EN: `MD, PhD, DSc, Professor | Surgical Oncologist | EAES Member | 40+ Years Experience`
- **Breadcrumb:** Главная / О центре / О профессоре (RU) — small, white, 70% opacity

---

## Section 2: Key Stats Bar

**Background:** White
**Layout:** 5–6 stat cards in a row, similar to home page trust bar but expanded.

| Number | Label RU | Label UA | Label EN |
|--------|----------|----------|----------|
| 40+ | Лет опыта | Років досвіду | Years Experience |
| 5000+ | Операций | Операцій | Operations |
| 121 | Публикаций | Публікацій | Publications |
| 18 | Патентов | Патентів | Patents |
| h=6 | Scopus h-index | Scopus h-index | Scopus h-index |
| 20+ | Аспирантов | Аспірантів | PhD Students |

**Visual:** Same as home stats — gradient numbers, icons, compact.

---

## Section 3: Bio with Timeline

**Background:** `var(--bg)` (slate-50)
**Layout:** 2 columns desktop. Left: portrait image. Right: timeline + text.
**Stacked on mobile:** Image first, then timeline.

**Left column:**
- `images/doctor-portrait.jpg` — large, rounded-2xl, shadow-xl
- Caption below: "Профессор Сушков С.В." — small, centered, `--text-light`

**Right column:**
- **H2:** 
  - RU: `Биография`
  - UA: `Біографія`
  - EN: `Biography`

**Timeline (vertical):**
Each entry: dot (12px, teal circle) + year (bold) + event text. Connected by vertical line (2px, teal, 30% opacity).

| Year | Event RU | Event UA | Event EN |
|------|----------|----------|----------|
| 1986 | Окончание Харьковского медицинского института (ныне ХНМУ). Начало карьеры хирурга. | Закінчення Харківського медичного інституту (нині ХНМУ). Початок кар'єри хірурга. | Graduated from Kharkiv Medical Institute (now KhNMU). Began career as a surgeon. |
| 1995–1997 | **Пионер лапароскопической хирургии в Харьковском регионе.** Выполнены первые лапароскопические холецистэктомия, спленэктомия, криоваготомия. | **Піонер лапароскопічної хірургії в Харківському регіоні.** Виконані перші лапароскопічні холецистектомія, спленектомія, криоваготомія. | **Pioneer of laparoscopic surgery in the Kharkiv region.** First laparoscopic cholecystectomy, splenectomy, cryovagotomy performed. |
| 1998 | Защита кандидатской диссертации. Тема: криохирургия и роль H. pylori в онкогенезе желудка. Установлена корреляция H. pylori — карцинома. | Захист кандидатської дисертації. Тема: кріохірургія та роль H. pylori в онкогенезі шлунка. Встановлена кореляція H. pylori — карцинома. | PhD defense. Topic: cryosurgery and role of H. pylori in gastric oncogenesis. Established H. pylori — carcinoma correlation. |
| 2007 | Защита докторской диссертации (DSc). Тема: «Хирургическое лечение множественных язв желудка и 12-перстной кишки». | Захист докторської дисертації (DSc). Тема: «Хірургічне лікування множинних виразок шлунка та 12-перстної кишки». | DSc defense. Topic: "Surgical treatment of multiple gastric and duodenal ulcers." |
| 2007–2026 | Профессор кафедры хирургии №1 ХНМУ. Заместитель директора по научной работе Института общей и неотложной хирургии им. В.Т. Зайцева НАМН Украины. | Професор кафедри хірургії №1 ХНМУ. Заступник директора з наукової роботи Інституту загальної та невідкладної хірургії ім. В.Т. Зайцева НАМН України. | Professor at Department of Surgery №1, KhNMU. Deputy Director for Research at V.T. Zaitsev Institute of General and Emergency Surgery. |
| 2026 | Хирург и онкологический хирург в ТОВ «Медицинский центр MARIA». Продолжение клинической и научной деятельности. | Хірург та онкологічний хірург у ТОВ «Медичний центр MARIA». Продовження клінічної та наукової діяльності. | Surgeon and Oncological Surgeon at LLC "MARIA Medical Center". Continuation of clinical and scientific work. |

**Highlighting:** The 1995–1997 and 2007 entries have bold text for key achievements. The timeline dot for these years is larger (16px) and solid.

---

## Section 4: Education & Qualifications

**Background:** White
**Layout:** Accordion-style cards or stacked sections. Each section has an icon + title + list.

**Subsections:**

### Higher Education
- Icon: GraduationCap
- **RU:** Харьковский медицинский институт (1986) — диплом с отличием, специальность «Лечебное дело»
- **UA:** Харківський медичний інститут (1986) — диплом з відзнакою, спеціальність «Лікувальна справа»
- **EN:** Kharkiv Medical Institute (1986) — diploma with honors, specialty "General Medicine"

### Academic Degrees
- Icon: Award
- **RU:** Кандидат медицинских наук (1998) — криохирургия и H. pylori; Доктор медицинских наук (2007) — множественные язвы; Профессор — ХНМУ
- **UA:** Кандидат медичних наук (1998) — кріохірургія та H. pylori; Доктор медичних наук (2007) — множинні виразки; Професор — ХНМУ
- **EN:** PhD (1998) — cryosurgery & H. pylori; DSc (2007) — multiple ulcers; Professor — KhNMU

### Highest Qualification Categories
- Icon: ShieldCheck
- List of 5 specialties (RU/UA/EN): General Surgery, Oncological Surgery, Vascular Surgery, Thoracic Surgery, Healthcare Management — all highest category

### Certifications
- Icon: ClipboardCheck
- **GCP (Good Clinical Practice)** — 20+ years
- **EAES** member
- Ukrainian Association of Surgeons
- Ukrainian Association of Minimally Invasive Surgery

---

## Section 5: Scientific Activity

**Background:** `var(--bg)` (slate-50)
**Layout:** Stats row + text blocks + link to publications.

**Stats row:**
| Number | Label |
|--------|-------|
| 121 | Публикаций / Публікацій / Publications |
| 18 | Патентов / Патентів / Patents |
| 5 | Монографий / Монографій / Monographs |
| 4 | Учебника / Підручників / Textbooks |

**Bibliometrics:**
- h-index: 6 (Scopus)
- Citations: 93+ (Scopus, Google Scholar)
- ORCID: 0000-0002-6951-9789
- Scopus: 55360196800

**Key publication examples (bullet list):**
- Пионерные работы по лапароскопической хирургии в Харьковском регионе (1995–1997)
- Исследования корреляции H. pylori и онкогенеза желудка (1998)
- Монография по хирургическому лечению множественных язв (2007)
- Работы по малоинвазивной хирургии и ERAS-протоколам
- Публикации по AI в хирургической прогностике

**CTA:** "Все публикации →" / "Усі публікації →" / "All Publications →" → `/about/publications.html`

---

## Section 6: Clinical Research

**Background:** White
**Layout:** Text + icon cards for research areas.

**Content:**
- **H2:** Клинические исследования / Клінічні дослідження / Clinical Research
- **Lead text:** 15+ международных мультикентровых клинических исследований в качестве Principal Investigator (PI).
- **Certification badge:** GCP (Good Clinical Practice) — 20+ лет. Styled as a pill/badge.
- **Research areas (4 cards):**
  1. Малоинвазивная хирургия и лапароскопия / Малоінвазивна хірургія та лапароскопія / Minimally Invasive Surgery
  2. Онкологическая хирургия (желудок, кишечник, молочная железа) / Онкологічна хірургія / Oncological Surgery
  3. Сепсис и критические инфекции / Сепсис та критичні інфекції / Sepsis & Critical Infections
  4. AI-прогностика хирургических осложнений / AI-прогностика хірургічних ускладнень / AI Prognostics for Surgery

---

## Section 7: Mentorship & Education

**Background:** `var(--bg)` (slate-50)
**Layout:** Stats + achievements list.

**Stats:**
| Number | Label |
|--------|-------|
| 20+ | Аспирантов / Аспірантів / PhD Students |
| 200+ | Обученных хирургов / Навчених хірургів / Surgeons Trained |
| 2 | Международные DSc консультации / Міжнародні DSc консультації / International DSc Consultations |
| 8 | Активных аспирантов / Активних аспірантів / Active PhD Students |

**Achievements:**
- Руководитель 20+ кандидатских диссертаций
- 2 международные консультации по докторским диссертациям (DSc)
- Обучение 200+ хирургов через резидентуру и курсы повышения квалификации
- 8 активных аспирантов на текущий момент
- Снижение послеоперационных осложнений на 20–30% через разработанные методологии

---

## Section 8: Awards & Memberships

**Background:** White
**Layout:** 2 columns. Left: memberships. Right: key achievements (icon grid).

**Memberships (list with icons):**
- EAES (Европейская ассоциация эндоскопической хирургии / Європейська асоціація ендоскопічної хірургії / European Association for Endoscopic Surgery)
- Украинская ассоциация хирургов / Українська асоціація хірургів / Ukrainian Association of Surgeons
- Украинская ассоциация малоинвазивной хирургии / Українська асоціація малоінвазивної хірургії / Ukrainian Association of Minimally Invasive Surgery

**Key achievements (icon grid, 3x3):**
Each: icon + short text.
- Пионер лапароскопии в Харькове
- Д-р мед. наук (2007)
- Профессор
- h-index 6
- 121 публикация
- 18 патентов
- 5 монографий
- 4 учебника
- GCP 20+ лет
- 15+ клин. исследований

---

## Section 9: Academic Links

**Background:** `var(--bg)` (slate-50)
**Layout:** Centered row of link cards.

**H2:** Академические профили / Академічні профілі / Academic Profiles

**Cards (4):**

| Platform | URL | Icon style |
|----------|-----|------------|
| ORCID | https://orcid.org/0000-0002-6951-9789 | Green circle with "iD" text |
| Scopus | https://www.scopus.com/authid/detail.uri?authorId=55360196800 | Orange abstract icon |
| Google Scholar | Search: Sergey Sushkov | Scholar cap icon |
| ResearchGate | Search: Sergey Sushkov | RG logo icon |

**Card style:**
- White bg, rounded-xl, shadow, padding 24px
- Icon + platform name + "Открыть профиль →" link
- Hover: lift + shadow-lg

---

## Section 10: CTA + Footer

Same CTA as home (Section 7) + standard footer.

---

## Schema.org JSON-LD (About)

```json
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Sushkov Sergey Valentinovich",
  "jobTitle": "Professor of Surgery",
  "description": "MD 1986, PhD 1998, DSc 2007. Pioneer of laparoscopic surgery in Kharkiv region.",
  "alumniOf": "Kharkiv National Medical University",
  "memberOf": ["EAES", "Ukrainian Association of Surgeons"],
  "knowsAbout": ["Surgery", "Oncology", "Laparoscopy", "Gynecology"],
  "workLocation": {
    "@type": "MedicalBusiness",
    "name": "MARIA Medical Center"
  }
}
```
