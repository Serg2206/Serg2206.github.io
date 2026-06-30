# Publications Page Design — `/about/publications.html`

**Page goal:** Showcase the full scientific output of Prof. Sushkov. Enable browsing by year and searching.

**Page title:** Публикации / Публікації / Publications
**Meta description:** 92 scientific publications (2004–2025) and 11 patents (2007–2009) by Prof. Sushkov S.V. h-index 6 (Scopus).

---

## Section 1: Page Hero (Compact)

**Background:** `var(--gradient-hero)`
**Height:** 35vh (min 240px)
**Content:**
- **H1:** 
  - RU: `Научные публикации и патенты`
  - UA: `Наукові публікації та патенти`
  - EN: `Scientific Publications & Patents`
- **Subtitle:**
  - RU: `92 публикации (2004–2025) · 11 патентов (2007–2009) · h-index 6 (Scopus)`
  - UA: `92 публікації (2004–2025) · 11 патентів (2007–2009) · h-index 6 (Scopus)`
  - EN: `92 publications (2004–2025) · 11 patents (2007–2009) · h-index 6 (Scopus)`
- **Breadcrumb:** Главная / О центре / Публикации (RU)

---

## Section 2: Filter Bar

**Background:** White, sticky below header on scroll (`position: sticky; top: 72px; z-index: 50`)
**Layout:** Horizontal row, centered, gap 12px.
**Padding:** 16px 0
**Border bottom:** 1px `var(--border)`

**Elements:**
- **Search input:** `🔍 Поиск по названию...` / `🔍 Пошук за назвою...` / `🔍 Search by title...`
  - Width: 300px desktop, 100% mobile
  - Real-time JS filter (client-side only)
- **Year filter buttons:** Pill buttons for each year group: 2025, 2021, 2019, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004
  - Active state: gradient bg, white text
  - Inactive: white bg, border, `--text` color
  - "Все" / "Всі" / "All" button (default active)
- **Toggle:** "Показать патенты" / "Показати патенти" / "Show Patents" checkbox

**Behavior:**
- Filter is AND logic: year AND search text AND type (publications vs patents)
- No page reload. JS hides/shows rows.
- Show "Ничего не найдено" / "Нічого не знайдено" / "Nothing found" message when filter returns 0 results.

---

## Section 3: Publications Table

**Background:** `var(--bg)` (slate-50)
**Layout:** Full-width table within container. Responsive: horizontal scroll on mobile (`overflow-x: auto`).

**Table columns:**
| № | Title | Authors | Journal | Year | DOI/Link |

**Column widths (desktop):**
- №: 40px
- Title: 35%
- Authors: 20%
- Journal: 20%
- Year: 60px
- DOI: 80px

**Row styling:**
- Odd rows: white bg
- Even rows: `var(--bg)` bg
- Hover: `rgba(13, 148, 136, 0.04)` background
- Padding: 12px 16px per cell
- Border-bottom: 1px `var(--border)`

**Title cell:**
- Bold if Prof. Sushkov is first author
- Italic for non-English titles
- Max 2 lines, ellipsis overflow

**Authors cell:**
- **Сушков С.В.** bolded
- Truncate long author lists with "et al."

**Year cell:**
- Bold, teal color
- Acts as year tag

**DOI cell:**
- If DOI available: link icon + "DOI" text, opens in new tab
- If no DOI: "—" dash
- If URL available: "Ссылка" / "Посилання" / "Link" text

**Mobile behavior:**
- Table wraps to card layout: each row becomes a card
- Card shows: Title (bold), Authors, Journal (italic), Year (pill), DOI (button if available)

---

## Section 4: Patents Section

**Background:** White
**Layout:** Collapsible section or separate table below publications.
**Default:** Collapsed, expandable via "Показать патенты (11)" button.

**Table columns:**
| № | Title | Patent Number | Year | Status |

**Patents (11 total, 2007–2009):**

| # | Title | Year |
|---|-------|------|
| 1 | Метод пластики черевної стінки | 2007 |
| 2 | (remaining 10 patents to be extracted from repo) | 2007–2009 |

**Note:** The full list of 11 patents is in the source repo. Implementation worker should extract all 11 entries with exact titles and years.

**Patent row styling:**
- Amber left border (4px) to distinguish from publications
- Background: `rgba(245, 158, 11, 0.03)`

---

## Section 5: Bibliometrics Summary

**Background:** `var(--bg)` (slate-50)
**Layout:** Centered cards row.

| Metric | Value | Source |
|--------|-------|--------|
| h-index | 6 | Scopus |
| Публикаций | 92 | 2004–2025 |
| Патентов | 11 | 2007–2009 |
| Цитирований | 93+ | Scopus / Google Scholar |
| Профиль ORCID | 0000-0002-6951-9789 | orcid.org |
| Scopus ID | 55360196800 | scopus.com |

**Card style:** Gradient border top (3px), white bg, shadow, centered text.

---

## Section 6: CTA + Footer

Standard CTA (appointment) + footer.

---

## Data Structure for Implementation

```javascript
const publications = [
  {
    id: 1,
    title: "Induction of different pathways of complement system protein activation in gastric adenocarcinoma",
    titleRU: "Induction of different pathways of complement system protein activation in gastric adenocarcinoma",
    authors: "Сушков С.В.",
    journal: "Journal of V.N. Karazin Kharkiv National University, series Medicine",
    year: 2025,
    doi: "DOI",
    type: "publication"
  },
  // ... 91 more entries
];

const patents = [
  {
    id: 1,
    title: "Метод пластики черевної стінки",
    titleRU: "Метод пластики черевної стінки",
    number: "...",
    year: 2007,
    type: "patent"
  },
  // ... 10 more entries
];
```

**Implementation note:** Store publication data in a JS array in `scripts.js` or inline `<script>` on the page. Render table rows via JS for filtering capability. Or render static HTML and add `data-year` attributes for JS filtering.

---

## Schema.org JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Scientific Publications by Prof. Sushkov S.V.",
  "description": "92 publications and 11 patents",
  "about": {
    "@type": "Person",
    "name": "Sushkov Sergey Valentinovich"
  }
}
```
