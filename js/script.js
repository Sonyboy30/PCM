/* ===== PCM — consolidated JS (mobile menu, scroll offset, scrollspy, reveal) ===== */

(() => {
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

  // ----- Mobile menu toggle
  const body = document.body;
  const toggleBtn = $('.nav-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const open = body.classList.toggle('nav-open');
      toggleBtn.setAttribute('aria-expanded', String(open));
    });

    // close on ESC or clicking outside
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') body.classList.remove('nav-open');
    });
    document.addEventListener('click', (e) => {
      if (body.classList.contains('nav-open')) {
        const nav = $('.nav');
        if (nav && !nav.contains(e.target) && e.target !== toggleBtn) {
          body.classList.remove('nav-open');
        }
      }
    });
  }

  // ----- Smooth scroll with sticky header offset (same-page anchors)
  const header = $('.site-header');
  const headerH = () => header ? header.getBoundingClientRect().height : 0;

  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const target = id && id.length > 1 ? $(id) : null;
      if (!target) return;
      e.preventDefault();
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerH() - 8);
      window.scrollTo({ top, behavior: (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth') });
      history.pushState(null, '', id);
      body.classList.remove('nav-open');
    });
  });

  // Correct initial hash offset on load
  window.addEventListener('load', () => {
    if (location.hash && $(location.hash)) {
      const t = $(location.hash);
      const top = Math.max(0, t.getBoundingClientRect().top + window.scrollY - headerH() - 8);
      window.scrollTo(0, top);
    }
  });

  // ----- Scrollspy: highlight current nav link
  const navLinks = $$('.nav a').filter(a => a.hash);
  const sections = navLinks
    .map(a => $(a.hash))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const byId = Object.fromEntries(navLinks.map(a => [a.hash, a]));

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = '#' + entry.target.id;
        navLinks.forEach(a => a.classList.toggle('is-active', a.hash === id));
      });
    }, {
      rootMargin: `-${headerH() + 24}px 0px -60% 0px`,
      threshold: 0.1
    });

    sections.forEach(sec => io.observe(sec));
  }

  // ----- Reveal on scroll (nice but respects reduced motion)
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const revealTargets = $$('[data-reveal]');
    const revealer = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.transition = 'transform .5s ease, opacity .5s ease';
          e.target.style.transform = 'none';
          e.target.style.opacity = '1';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      revealer.observe(el);
    });
  }
})();
