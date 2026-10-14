/* =========================================================
   ERICK RODRIGUES PEDROSO — PORTFOLIO
   Interatividade: digitação, navbar, menu mobile, spotlight,
   cursor customizado, scroll reveal (fallback) e tema
   ========================================================= */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. TYPING EFFECT ---------- */
  const phrases = [
    'Desenvolvedor Full-Stack',
    'Estudante de Desenvolvimento de Sistemas no SENAI',
    'Apaixonado por basquete e tecnologia'
  ];

  const TYPE_SPEED = 60;
  const ERASE_SPEED = 35;
  const PAUSE_AFTER_TYPE = 1800;
  const PAUSE_AFTER_ERASE = 400;

  let phraseIndex = 0;
  let charIndex = 0;
  let isErasing = false;
  let typingTimeout = null;
  let isTypingStarted = false;

  const typedTextEl = document.getElementById('typedText');
  const heroTypingEl = document.querySelector('.hero-typing');

  // Configura acessibilidade e fallback inicial
  if (heroTypingEl) {
    heroTypingEl.setAttribute('aria-label', phrases[0]);
  }
  if (typedTextEl) {
    typedTextEl.setAttribute('aria-live', 'off');
    if (prefersReducedMotion) {
      typedTextEl.textContent = phrases[0];
    }
  }

  function tick() {
    if (document.hidden) return;
    if (!typedTextEl) return;

    const current = phrases[phraseIndex];

    if (!isErasing) {
      charIndex++;
      typedTextEl.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        isErasing = true;
        typingTimeout = setTimeout(tick, PAUSE_AFTER_TYPE);
        return;
      }

      typingTimeout = setTimeout(tick, TYPE_SPEED);
      return;
    }

    charIndex--;
    typedTextEl.textContent = current.slice(0, charIndex);

    if (charIndex === 0) {
      isErasing = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingTimeout = setTimeout(tick, PAUSE_AFTER_ERASE);
      return;
    }

    typingTimeout = setTimeout(tick, ERASE_SPEED);
  }

  function startTyping() {
    if (!typedTextEl) return;

    const typingContainer = typedTextEl.closest('.hero-typing') || document.querySelector('.hero-typing');
    if (typingContainer) {
      typingContainer.setAttribute('aria-label', phrases[0]);
    }
    typedTextEl.setAttribute('aria-live', 'off');

    if (prefersReducedMotion) {
      typedTextEl.textContent = phrases[0];
      return;
    }

    if (isTypingStarted) return;
    isTypingStarted = true;

    tick();
  }

  // Exporta para ser iniciado pelo animations.js após o preloader
  window.startTyping = startTyping;

  // Pausa e retoma a digitação ao alternar entre abas
  document.addEventListener('visibilitychange', () => {
    if (!isTypingStarted || prefersReducedMotion) return;

    if (document.hidden) {
      clearTimeout(typingTimeout);
    } else {
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(tick, TYPE_SPEED);
    }
  });

  /* ---------- 2. NAVBAR SCROLL DETECTION & ACTIVE LINK ---------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');
  const backTop = document.getElementById('backToTop');

  function onScroll() {
    const scrollY = window.scrollY;

    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 40);
    }

    const scrollPos = scrollY + window.innerHeight * 0.35;
    let currentId = '';

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) {
        currentId = sec.id;
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
      });
    }

    if (backTop) {
      backTop.classList.toggle('is-visible', scrollY > 600);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 3. MOBILE MENU TOGGLE ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  function closeMenu() {
    if (navToggle && navMenu) {
      navToggle.classList.remove('is-open');
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('is-open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }

  /* ---------- 4. SCROLL REVEAL (IntersectionObserver fallback) ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || '0', 10);
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ---------- 5. HOVER 3D ON PROFILE PHOTO ---------- */
  const photoFrame = document.getElementById('photoFrame');

  if (photoFrame && window.matchMedia('(hover: hover)').matches && !prefersReducedMotion) {
    const MAX_TILT = 10;

    photoFrame.addEventListener('mousemove', (e) => {
      const rect = photoFrame.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const tiltX = (0.5 - y) * MAX_TILT * 2;
      const tiltY = (x - 0.5) * MAX_TILT * 2;

      photoFrame.style.transform =
        `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    });

    photoFrame.addEventListener('mouseleave', () => {
      photoFrame.style.transform =
        'perspective(900px) rotateX(0) rotateY(0) scale(1)';
    });
  }

  /* ---------- 6. SMOOTH SCROLL (offset for fixed nav) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- 7. CARD SPOTLIGHT EFFECT ---------- */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion) {
    document.querySelectorAll('.stack-card, .project-card, .contact-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
      });
    });
  }

  /* ---------- 8. THEME TOGGLE ---------- */
  function initThemeToggle() {
    const root = document.documentElement;
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    function applyTheme(theme) {
      root.dataset.theme = theme;
      btn.setAttribute(
        'aria-label',
        theme === 'light' ? 'Alternar para o modo escuro' : 'Alternar para o modo claro'
      );
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.content = theme === 'light' ? '#f6f4f1' : '#070707';
    }

    btn.addEventListener('click', () => {
      const next = root.dataset.theme === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  initThemeToggle();

  

})();


