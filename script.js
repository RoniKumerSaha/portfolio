/* ========================================
   Roni Kumer Saha — Portfolio
   script.js
   ======================================== */

(function () {
  'use strict';

  /* ---------- Dynamic year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar scroll state ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 12) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });
    // Close menu when a link is tapped
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- Counter animation for stats ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'), 10);
            const duration = 1200;
            const start = performance.now();
            const tick = (now) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              el.textContent = Math.round(target * eased).toString();
              if (t < 1) requestAnimationFrame(tick);
              else el.textContent = target.toString();
            };
            requestAnimationFrame(tick);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => counterObserver.observe(c));
  }

  /* ---------- Typing effect for hero subtitle ---------- */
  const typingEl = document.getElementById('typing');
  if (typingEl) {
    const phrases = [
      'AI First Testing',
      'Playwright Automation',
      'API Testing',
      'CI/CD Pipelines',
      'Mobile & Web Quality',
      'Performance Testing',
    ];
    let pi = 0;
    let ci = 0;
    let deleting = false;

    const tick = () => {
      const word = phrases[pi];
      ci += deleting ? -1 : 1;
      typingEl.textContent = word.slice(0, ci);

      let delay = deleting ? 35 : 75;
      if (!deleting && ci === word.length) {
        delay = 1600;
        deleting = true;
      } else if (deleting && ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        delay = 250;
      }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 600);
  }
})();
