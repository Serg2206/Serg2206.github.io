# -*- coding: utf-8 -*-
"""
Генератор языковых версий ssvnauka.com (статический HTML для Google).

    py tools/build_i18n.py          (из корня сайта; нужен: py -m pip install beautifulsoup4)

Источник: русские страницы + словари tools/i18n/<lang>.json («русский текст → перевод»).
tools/i18n/keep.json — строки, которые намеренно не переводятся (названия научных работ и т.п.).
Результат: /<lang>/<путь> с lang, canonical, og:locale, hreflang; hreflang в русских страницах;
блок языковых адресов в sitemap.xml. Скрипт идемпотентен — можно запускать сколько угодно раз.
"""
import datetime, json, os, re, sys
from urllib.parse import urljoin, urlsplit, quote
from bs4 import BeautifulSoup, Comment, Doctype

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SITE = 'https://ssvnauka.com'

CORE = ['index.html', 'surgery/index.html', 'oncosurgery/index.html', 'gynecology/index.html',
        'myomectomy/index.html', 'about/index.html', 'contacts/index.html', 'appointment/index.html',
        'articles/laparoscopic-cholecystectomy/index.html', 'checkup/index.html']
UK_EXTRA = ['about/publications.html', 'articles/index.html',
            'articles/breast-cancer-screening-kharkov.html', 'articles/ercp-cholecystectomy.html',
            'articles/multimodal-analgesia.html', 'articles/oncology-screening.html',
            'articles/appendicitis-symptoms/index.html', 'articles/breast-cancer-surgery/index.html',
            'articles/colon-cancer-surgery/index.html', 'articles/early-cancer-diagnosis-kharkiv/index.html',
            'articles/endometriosis-treatment/index.html', 'articles/gastric-cancer-signs/index.html',
            'articles/hernia-laparoscopy/index.html', 'articles/laparoscopy-recovery/index.html',
            'articles/myoma-uterus-treatment/index.html', 'articles/stomach-cancer-prevention-treatment/index.html',
            'diagnostika/rasshifrovka-gistologii/index.html', 'diagnostika/rasshifrovka-kt-mrt/index.html',
            'expert/index.html', 'expert-hub/index.html', 'guides/index.html',
            'guides/laparoscopy-preparation.html', 'guides/self-check-breast.html',
            'onco-diagnostics/index.html', 'publications/index.html', 'reviews/index.html',
            'cookie-policy.html', 'privacy-policy.html', 'terms-of-use.html', 'medical-disclaimer.html',
            'thank-you.html']

WA_RU = 'Здравствуйте! Я обращаюсь с сайта ssvnauka.com и хочу записаться на консультацию.'
LANGS = {
    'uk': dict(js='ua', html='uk', locale='uk_UA', pages=CORE + UK_EXTRA,
               wa='Добрий день! Я звертаюся із сайту ssvnauka.com і хочу записатися на консультацію.'),
    'en': dict(js='en', html='en', locale='en_US', pages=CORE,
               wa='Hello! I found you on ssvnauka.com and would like to book a consultation.'),
}

CYR = re.compile('[А-Яа-яЁёІіЇїЄєҐґ]')
RU_HINT = re.compile(r'[ыэъёЫЭЪЁ]|\b(и|что|это|как|или|если|только|Политика|Контакты|Разделы)\b')
ATTRS = ['alt', 'placeholder', 'aria-label', 'title', 'value', 'data-tooltip']
META = {'description', 'keywords', 'twitter:title', 'twitter:description', 'og:title', 'og:description', 'og:image:alt'}
URL_ATTRS = ['href', 'src', 'action', 'poster', 'data-src']
H_START, H_END = '<!-- hreflang:start -->', '<!-- hreflang:end -->'
S_START, S_END = '<!-- i18n:start -->', '<!-- i18n:end -->'


def url_of(p):
    return '/' + (p[:-len('index.html')] if p.endswith('index.html') else p)


URLS = {lang: {url_of(p) for p in cfg['pages']} for lang, cfg in LANGS.items()}


def langs_for(ru_url):
    return [l for l in LANGS if ru_url in URLS[l]]


def read(path):
    with open(os.path.join(ROOT, path), encoding='utf-8', newline='') as f:
        return f.read()


def write(path, text):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full) or ROOT, exist_ok=True)
    with open(full, 'w', encoding='utf-8', newline='') as f:
        f.write(text)


def load_js_dict(code):
    t = json.loads(read(f'translations/{code}.json'))
    b = json.loads(read(f'translations/bundle-{code}.json'))
    for k, v in b.items():
        t[k] = {**t.get(k, {}), **v} if isinstance(v, dict) else v
    return t


def get(o, p):
    if p in o:
        return o[p]
    for part in p.split('.'):
        if not isinstance(o, dict) or part not in o:
            return None
        o = o[part]
    return o


def flat(o):
    if isinstance(o, str):
        yield o.strip()
    elif isinstance(o, dict):
        for v in o.values():
            yield from flat(v)
    elif isinstance(o, list):
        for v in o:
            yield from flat(v)


def in_code(node):
    return any(p.name in ('script', 'style', 'noscript', 'code') for p in node.parents)


class Translator:
    def __init__(self, lang, mem, keep, js_dict):
        self.lang, self.mem, self.keep, self.missing = lang, mem, keep, set()
        # для украинского: строки, уже стоящие по-украински (из JS-словаря), не требуют перевода
        # (строки JS-словаря, оставшиеся по-русски, сюда не попадают)
        self.known = ({x for x in flat(js_dict) if not RU_HINT.search(x)} | set(mem.values())) if lang == 'uk' else set()

    def __call__(self, s):
        key = s.strip().replace('\r\n', '\n')
        if not key or not CYR.search(key):
            return s
        if key in self.mem:
            lead, trail = s[:len(s) - len(s.lstrip())], s[len(s.rstrip()):]
            return lead + self.mem[key] + trail
        if key in self.keep or key in self.known:
            return s
        self.missing.add(key)
        return s


def hreflang_block(ru_url):
    lines = [H_START, f'<link rel="alternate" hreflang="ru" href="{SITE}{ru_url}"/>']
    for l in langs_for(ru_url):
        lines.append(f'<link rel="alternate" hreflang="{LANGS[l]["html"]}" href="{SITE}/{l}{ru_url}"/>')
    lines += [f'<link rel="alternate" hreflang="x-default" href="{SITE}{ru_url}"/>', H_END]
    return '\n'.join(lines)


def rewrite_abs(v, lang):
    if v.startswith(SITE + '/'):
        path = urlsplit(v).path or '/'
        if path in URLS[lang]:
            return f'{SITE}/{lang}{path}' + v[len(SITE) + len(path):]
    return v


def rewrite_url(v, page_url, lang):
    if v and 'wa.me/' in v and 'text=' in v:
        v = v.replace(quote(WA_RU), quote(LANGS[lang]['wa']))
    if not v or v.startswith(('#', 'mailto:', 'tel:', 'javascript:', 'data:', '//')):
        return v
    if v.startswith(('http://', 'https://')):
        return rewrite_abs(v, lang)
    absu = urljoin(SITE + page_url, v)[len(SITE):]
    if urlsplit(absu).path in URLS[lang]:
        return f'/{lang}{absu}'
    return absu


def jsonld(obj, T, lang):
    if isinstance(obj, str):
        return T(obj)
    if isinstance(obj, list):
        return [jsonld(x, T, lang) for x in obj]
    if isinstance(obj, dict):
        out = {}
        for k, v in obj.items():
            if k == 'inLanguage':
                out[k] = LANGS[lang]['html']
            elif k in ('url', '@id') and isinstance(v, str):
                out[k] = rewrite_abs(v, lang)
            else:
                out[k] = jsonld(v, T, lang)
        return out
    return obj


def strip_hreflang(src):
    return re.sub(re.escape(H_START) + '.*?' + re.escape(H_END) + r'\r?\n?', '', src, flags=re.S)


def build_page(p, lang, T, js_dict):
    cfg = LANGS[lang]
    src = read(p)
    ru_url = url_of(p)
    soup = BeautifulSoup(strip_hreflang(src), 'html.parser')

    for el in soup.select('[data-i18n]'):
        v = get(js_dict, el['data-i18n'])
        if isinstance(v, str) and el.name not in ('input', 'textarea'):
            if lang == 'en' and CYR.search(v):
                continue
            el.string = v
    for el in soup.find_all(string=True):
        if isinstance(el, (Comment, Doctype)) or in_code(el):
            continue
        if CYR.search(el):
            el.replace_with(T(str(el)))
    for m in soup.find_all('meta'):
        n = m.get('name') or m.get('property')
        if n in META and m.get('content'):
            m['content'] = T(m['content'])
    for el in soup.find_all(True):
        for a in ATTRS:
            if isinstance(el.get(a), str):
                el[a] = T(el[a])
        for a in URL_ATTRS:
            if isinstance(el.get(a), str):
                el[a] = rewrite_url(el[a], ru_url, lang)
    for sc in soup.find_all('script', type='application/ld+json'):
        try:
            data = json.loads(sc.string)
        except Exception:
            continue
        sc.string = json.dumps(jsonld(data, T, lang), ensure_ascii=False, indent=2)

    soup.html['lang'] = cfg['html']
    page_abs = f'{SITE}/{lang}{ru_url}'
    for l in soup.find_all('link', rel='canonical'):
        l['href'] = page_abs
    for m in soup.find_all('meta', property='og:url'):
        m['content'] = page_abs
    for m in soup.find_all('meta', property='og:locale'):
        m['content'] = cfg['locale']
    for m in soup.find_all('meta', property='og:locale:alternate'):
        if m.get('content') == cfg['locale']:
            m['content'] = 'ru_RU'
    for l in soup.find_all('link', rel='alternate', hreflang=True):
        l.decompose()
    for btn in soup.select('.lang-switcher__btn, .mobile-nav__lang-btn'):
        cls = [c for c in btn.get('class', []) if not c.endswith('--active')]
        if btn.get('data-lang') == cfg['js'] and cls:
            cls.append(cls[0] + '--active')
        btn['class'] = cls

    html = re.sub(r'(?i)</head>', lambda _: hreflang_block(ru_url) + '\n</head>', str(soup), count=1)
    write(f'{lang}/{p}', html)


def update_ru_hreflang(p):
    src = read(p)
    nl = '\r\n' if '\r\n' in src else '\n'
    block = hreflang_block(url_of(p)).replace('\n', nl)
    if H_START in src:
        new = re.sub(re.escape(H_START) + '.*?' + re.escape(H_END), lambda _: block, src, flags=re.S)
    else:
        new = re.sub(r'(?i)</head>', lambda _: block + nl + '</head>', src, count=1)
    if new != src:
        write(p, new)


def update_sitemap():
    src = read('sitemap.xml')
    nl = '\r\n' if '\r\n' in src else '\n'
    src = re.sub(r'[ \t]*<!-- uk:start -->.*?<!-- uk:end -->\r?\n?', '', src, flags=re.S)  # старый формат
    today = datetime.date.today().isoformat()
    old = re.search(re.escape(S_START) + '.*?' + re.escape(S_END), src, re.S)
    items = []
    for lang, cfg in LANGS.items():
        for p in cfg['pages']:
            u = url_of(p)
            items.append(f'  <url>{nl}    <loc>{SITE}/{lang}{u}</loc>{nl}    <lastmod>{today}</lastmod>{nl}'
                         f'    <changefreq>monthly</changefreq>{nl}    <priority>{"1.0" if u == "/" else "0.7"}</priority>{nl}  </url>')
    block = f'{S_START}{nl}' + nl.join(items) + f'{nl}  {S_END}'
    if old:
        # не трогаем дату, если состав адресов не изменился
        if re.sub(r'<lastmod>[^<]*', '', old.group(0)) == re.sub(r'<lastmod>[^<]*', '', block):
            return
        new = src[:old.start()] + block + src[old.end():]
    else:
        new = src.replace('</urlset>', f'  {block}{nl}</urlset>')
    write('sitemap.xml', new)


def main():
    keep = set(json.loads(read('tools/i18n/keep.json'))) if os.path.exists(os.path.join(ROOT, 'tools/i18n/keep.json')) else set()
    failed = False
    all_pages = sorted({p for cfg in LANGS.values() for p in cfg['pages']})
    for lang, cfg in LANGS.items():
        mem = json.loads(read(f'tools/i18n/{lang}.json'))
        T = Translator(lang, mem, keep, load_js_dict(cfg['js']))
        for p in cfg['pages']:
            build_page(p, lang, T, load_js_dict(cfg['js']))
        print(f'{lang}: {len(cfg["pages"])} страниц')
        if T.missing:
            failed = True
            print(f'  Нет перевода ({lang}) для {len(T.missing)} строк:')
            for s in sorted(T.missing):
                print('   -', s[:110].replace('\n', ' '))
    for p in all_pages:
        update_ru_hreflang(p)
    update_sitemap()
    sys.exit(1 if failed else 0)


if __name__ == '__main__':
    main()
