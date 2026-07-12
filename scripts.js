/* ================================
   MARIA Medical Center — Global Scripts
   Pure vanilla JS, no frameworks
   ================================ */

(function () {
  'use strict';

  const STORAGE_KEYS = {
    LANG: 'lang',
    COOKIE_CONSENT: 'cookie_consent',
  };

  const DEFAULT_LANG = 'ru';
  const SUPPORTED_LANGS = ['ru', 'ua', 'en'];

  /* -------------------------------
     Analytics Config (replace with real IDs)
     ------------------------------- */
  const GA_ID = 'G-XXXXXXXXXX';          // Google Analytics 4 Measurement ID
  const YM_ID = '12345678';              // Yandex.Metrika counter ID
  const GA_ENABLED = false;             // Set true after configuring GA_ID
  const YM_ENABLED = false;             // Set true after configuring YM_ID

  /* -------------------------------
     State
     ------------------------------- */
  let currentLang = DEFAULT_LANG;
  let translations = {};

  /* -------------------------------
     DOM Ready
     ------------------------------- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initLanguage();
    initMobileMenu();
    initHeaderScroll();
    initScrollReveal();
    initSmoothScroll();
    initCookieBanner();
    initCurrentNavHighlight();
    initForms();
    initAnalytics();
  }

  /* -------------------------------
     Language Switcher
     ------------------------------- */
  function initLanguage() {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    currentLang = SUPPORTED_LANGS.includes(saved) ? saved : DEFAULT_LANG;

    updateLangSwitcherUI();
    loadTranslations(currentLang).then(() => {
      applyTranslations();
      updateHtmlLang();
    });

    // Bind desktop switcher buttons
    document.querySelectorAll('.lang-switcher__btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (lang && lang !== currentLang) {
          setLanguage(lang);
        }
      });
    });

    // Bind mobile switcher buttons
    document.querySelectorAll('.mobile-nav__lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (lang && lang !== currentLang) {
          setLanguage(lang);
          closeMobileMenu();
        }
      });
    });
  }

  async function loadTranslations(lang) {
    try {
      const [res, serviceRes, faqRes] = await Promise.all([
        fetch(`/translations/${lang}.json`),
        fetch('/translations/service-pages.json'),
        fetch('/translations/faq-extra.json')
      ]);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      translations = await res.json();
      if (serviceRes.ok) {
        const serviceTranslations = await serviceRes.json();
        const selected = serviceTranslations[lang] || {};
        Object.keys(selected).forEach(page => {
          translations[page] = Object.assign({}, translations[page] || {}, selected[page]);
        });
      }
      if (faqRes.ok) {
        const faqTranslations = await faqRes.json();
        const selectedFaq = faqTranslations[lang] || {};
        Object.keys(selectedFaq).forEach(page => {
          translations[page] = Object.assign({}, translations[page] || {}, selectedFaq[page]);
        });
      }
    } catch (err) {
      console.warn('Failed to load translations:', err);
      translations = {};
    }
  }

  async function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
    updateLangSwitcherUI();
    updateHtmlLang();

    // Load the newly selected dictionary before updating the document.
    await loadTranslations(lang);

    // Fade out, swap, fade in
    const main = document.querySelector('main');
    if (main) {
      main.style.transition = 'opacity 0.15s ease';
      main.style.opacity = '0';
      setTimeout(() => {
        applyTranslations();
        main.style.opacity = '1';
      }, 150);
    } else {
      applyTranslations();
    }
  }

  function updateHtmlLang() {
    document.documentElement.lang = currentLang === 'ua' ? 'uk' : currentLang;
  }

  function updateLangSwitcherUI() {
    document.querySelectorAll('.lang-switcher__btn').forEach((btn) => {
      btn.classList.toggle('lang-switcher__btn--active', btn.dataset.lang === currentLang);
    });
    document.querySelectorAll('.mobile-nav__lang-btn').forEach((btn) => {
      btn.classList.toggle('mobile-nav__lang-btn--active', btn.dataset.lang === currentLang);
    });
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      const value = getNestedValue(translations, key);
      if (value !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          if (el.placeholder !== undefined) {
            el.placeholder = value;
          } else {
            el.value = value;
          }
        } else if (el.tagName === 'SELECT') {
          // For select elements, we may need to translate options separately
          // but data-i18n on the select itself is for the label
          el.textContent = value;
        } else {
          el.textContent = value;
        }
      }
    });

    // Translate placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      const value = getNestedValue(translations, key);
      if (value !== undefined) el.placeholder = value;
    });

    // Translate alt attributes
    document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
      const key = el.dataset.i18nAlt;
      const value = getNestedValue(translations, key);
      if (value !== undefined) el.alt = value;
    });

    const pageScope = document.body && document.body.dataset.i18nPage;
    const pageTranslations = pageScope ? translations[pageScope] : null;

    // Translate meta description when a page-specific description exists.
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && pageTranslations && pageTranslations.description) {
      metaDesc.content = pageTranslations.description;
    } else if (metaDesc && !pageScope && translations.meta && translations.meta.description) {
      metaDesc.content = translations.meta.description;
    }

    // Keep page identity instead of replacing every title with the home-page title.
    if (pageTranslations && pageTranslations.title) {
      document.title = pageTranslations.title + ' | SSVproff';
    } else if (!pageScope && translations.meta && translations.meta.title) {
      document.title = translations.meta.title;
    }
  }

  function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), obj);
  }

  /* -------------------------------
     Mobile Menu Toggle
     ------------------------------- */
  function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.contains('hamburger--open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    });

    // Close on outside click (optional, mobile nav covers full screen so this is less relevant)
  }

  function openMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    if (hamburger) hamburger.classList.add('hamburger--open');
    if (mobileNav) mobileNav.classList.add('mobile-nav--open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    if (hamburger) hamburger.classList.remove('hamburger--open');
    if (mobileNav) mobileNav.classList.remove('mobile-nav--open');
    document.body.style.overflow = '';
  }

  /* -------------------------------
     Header Scroll Shadow
     ------------------------------- */
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    const threshold = 50;
    let ticking = false;

    function updateHeader() {
      const scrolled = window.scrollY > threshold;
      header.classList.toggle('header--scrolled', scrolled);
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });

    updateHeader();
  }

  /* -------------------------------
     Scroll Reveal (IntersectionObserver)
     ------------------------------- */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  /* -------------------------------
     Smooth Scroll for Anchor Links
     ------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      });
    });
  }

  /* -------------------------------
     Cookie Banner
     ------------------------------- */
  function initCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    if (!banner) return;

    const consent = localStorage.getItem(STORAGE_KEYS.COOKIE_CONSENT);
    if (!consent) {
      setTimeout(() => {
        banner.classList.add('cookie-banner--visible');
      }, 1000);
    }

    const btn = banner.querySelector('.cookie-banner__btn');
    if (btn) {
      btn.addEventListener('click', () => {
        localStorage.setItem(STORAGE_KEYS.COOKIE_CONSENT, 'true');
        banner.classList.remove('cookie-banner--visible');
      });
    }
  }

  /* -------------------------------
     Form Handling (redirect to thank-you)
     ------------------------------- */
  function initForms() {
    const appointmentForm = document.getElementById('appointmentForm');
    const reviewForm = document.getElementById('reviewForm');

    if (appointmentForm && !appointmentForm.action.includes('formsubmit.co')) {
      appointmentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // Basic validation
        const name = appointmentForm.querySelector('[name="name"]');
        const phone = appointmentForm.querySelector('[name="phone"]');
        if (!name || !name.value.trim()) {
          alert(window.MARIA.t('appointment_page.error_name') || 'Введите имя');
          name.focus();
          return;
        }
        if (!phone || !phone.value.trim()) {
          alert(window.MARIA.t('appointment_page.error_phone') || 'Введите телефон');
          phone.focus();
          return;
        }
        // Build mailto and open
        const subject = 'Запись на приём — ' + (name.value || '');
        const body = 'Имя: ' + (name.value || '') + ' ' + (appointmentForm.querySelector('[name="surname"]')?.value || '') + '\n' +
                     'Телефон: ' + (phone.value || '') + '\n' +
                     'Email: ' + (appointmentForm.querySelector('[name="email"]')?.value || '') + '\n' +
                     'Тип приёма: ' + (appointmentForm.querySelector('[name="type"]')?.value || '') + '\n' +
                     'Дата: ' + (appointmentForm.querySelector('[name="date"]')?.value || '') + '\n' +
                     'Сообщение: ' + (appointmentForm.querySelector('[name="message"]')?.value || '');
        window.location.href = 'mailto:ssvnauka@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        // Redirect to thank-you after short delay
        setTimeout(function () {
          window.location.href = '../thank-you.html';
        }, 1500);
      });
    }

    if (reviewForm && !reviewForm.action.includes('formsubmit.co')) {
      reviewForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = reviewForm.querySelector('[name="name"]');
        const text = reviewForm.querySelector('[name="text"]');
        if (!name || !name.value.trim()) {
          alert(window.MARIA.t('reviews_page.error_name') || 'Введите имя');
          name.focus();
          return;
        }
        if (!text || !text.value.trim()) {
          alert(window.MARIA.t('reviews_page.error_text') || 'Введите текст отзыва');
          text.focus();
          return;
        }
        const subject = 'Отзыв от ' + (name.value || '');
        const body = 'Имя: ' + (name.value || '') + '\n' +
                     'Email: ' + (reviewForm.querySelector('[name="email"]')?.value || '') + '\n' +
                     'Оценка: ' + (reviewForm.querySelector('[name="rating"]:checked')?.value || '') + '\n' +
                     'Услуга: ' + (reviewForm.querySelector('[name="service"]')?.value || '') + '\n' +
                     'Отзыв: ' + (text.value || '');
        window.location.href = 'mailto:ssvnauka@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        setTimeout(function () {
          window.location.href = '../thank-you.html';
        }, 1500);
      });
    }
  }

  /* -------------------------------
     Current Nav Link Highlighting
     ------------------------------- */
  function initCurrentNavHighlight() {
    const path = window.location.pathname;
    const navLinks = document.querySelectorAll('.header__nav-link, .mobile-nav__link');

    navLinks.forEach((link) => {
      const href = link.getAttribute('href') || '';
      // Match exact or starts with for sub-pages
      if (href === '/' && path === '/') {
        link.classList.add('header__nav-link--active');
      } else if (href !== '/' && path.startsWith(href.replace(/\/$/, ''))) {
        link.classList.add('header__nav-link--active');
      }
    });
  }

  /* -------------------------------
     Analytics (GA4 + Yandex.Metrika)
     ------------------------------- */
  function initAnalytics() {
    // Google Analytics 4
    if (GA_ENABLED && GA_ID !== 'G-XXXXXXXXXX') {
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', GA_ID, { anonymize_ip: true });
    }

    // Yandex.Metrika
    if (YM_ENABLED && YM_ID !== '12345678') {
      (function (m, e, t, r, i, k, a) {
        m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
        m[i].l = 1 * new Date();
        k = e.createElement(t), a = e.getElementsByTagName(t)[0];
        k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
      })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
      window.ym(YM_ID, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      });
    }
  }

  /* -------------------------------
     Viber click handler — desktop fallback
     ------------------------------- */
  function handleViberClick(e) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      e.preventDefault();
      if (confirm('Viber открывается только на мобильном устройстве с установленным приложением.\n\nСкопировать номер +380 67 570 79 49?')) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('+380675707949').then(function() {
            alert('Номер скопирован. Откройте Viber и вставьте его.');
          }).catch(function() {
            alert('Номер: +380 67 570 79 49');
          });
        } else {
          alert('Номер: +380 67 570 79 49');
        }
      }
      return false;
    }
    return true;
  }

  /* -------------------------------
     Expose utilities globally for page workers
     ------------------------------- */
  window.MARIA = {
    getLang: () => currentLang,
    setLanguage,
    t: (key) => getNestedValue(translations, key) || key,
    loadTranslations,
  };
})();
