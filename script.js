/* ================================================
   THEME (Dark / Light)
   ================================================ */
(function () {
  const html   = document.documentElement;
  const btn    = document.getElementById('themeToggle');
  const stored = localStorage.getItem('bv-theme') || 'light';

  html.setAttribute('data-theme', stored);

  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('bv-theme', next);
  });
})();

/* ================================================
   MOBILE MENU
   ================================================ */
(function () {
  const toggle = document.getElementById('hamburger');
  const menu   = document.getElementById('mobileMenu');

  function close() {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    if (isOpen) { close(); return; }
    menu.classList.add('open');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
  });

  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
})();

/* ================================================
   STICKY NAV
   ================================================ */
(function () {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 48);
  }, { passive: true });
})();

/* ================================================
   ACTIVE NAV LINK ON SCROLL
   ================================================ */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => obs.observe(s));
})();

/* ================================================
   SCROLL REVEAL
   ================================================ */
(function () {
  const els = document.querySelectorAll('.reveal-fade, .reveal-up, .reveal-card');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      // Reset delay after reveal so hover transitions feel instant
      e.target.addEventListener('transitionend', () => {
        e.target.style.transitionDelay = '0s';
      }, { once: true });
      obs.unobserve(e.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

  els.forEach(el => obs.observe(el));
})();

/* ================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = document.getElementById('nav').offsetHeight;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
