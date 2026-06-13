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

/* ================================================
   SCROLL PROGRESS BAR
   ================================================ */
(function () {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  function update() {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width  = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ================================================
   ANIMATED STAT COUNTERS
   ================================================ */
(function () {
  const nums = document.querySelectorAll('.stat-num');
  if (!nums.length) return;

  function animateCounter(el) {
    const target   = +el.dataset.target;
    const prefix   = el.dataset.prefix || '';
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const t0       = performance.now();

    function tick(now) {
      const t      = Math.min((now - t0) / duration, 1);
      const eased  = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + Math.round(eased * target) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }

    el.textContent = prefix + '0' + suffix;
    requestAnimationFrame(tick);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      animateCounter(e.target);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.6 });

  nums.forEach(el => obs.observe(el));
})();

/* ================================================
   MOBILE FLOATING CTA
   ================================================ */
(function () {
  const fab     = document.getElementById('mobileFab');
  const hero    = document.getElementById('hero');
  const contact = document.getElementById('contact');
  if (!fab || !hero || !contact) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.target.id === 'hero') {
        fab.classList.toggle('fab-visible', !e.isIntersecting);
      }
      if (e.target.id === 'contact' && e.isIntersecting) {
        fab.classList.remove('fab-visible');
      }
    });
  }, { threshold: 0.15 });

  obs.observe(hero);
  obs.observe(contact);
})();
