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
      const res = await fetch(`translations/${lang}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      translations = await res.json();
    } catch (err) {
      console.warn('Failed to load translations:', err);
      translations = {};
    }
  }

  function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
    updateLangSwitcherUI();
    updateHtmlLang();

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

    // Translate meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && translations.meta && translations.meta.description) {
      metaDesc.content = translations.meta.description;
    }

    // Translate title
    if (translations.meta && translations.meta.title) {
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
     Expose utilities globally for page workers
     ------------------------------- */
  window.MARIA = {
    getLang: () => currentLang,
    setLanguage,
    t: (key) => getNestedValue(translations, key) || key,
    loadTranslations,
  };
})();
