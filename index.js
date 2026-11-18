/* =========================================================
   ERICK RODRIGUES PEDROSO — PORTFOLIO
   Interatividade: digitação, navbar, menu mobile, spotlight,
   scroll reveal (fallback) e tema
   ========================================================= */

(function () {
  'use strict';


  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. TYPING EFFECT ---------- */
  const phrases = [
    'Desenvolvimento web',
    'HTML, CSS e JavaScript',
    'PHP e MySQL'
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

  // Usado pelo animations.js como fallback ao terminar a entrada do Hero.
  window.startTyping = startTyping;

  const heroIntroSelector = [
    '.hero-greeting',
    '.hero-name',
    '.hero-typing',
    '.hero-subtitle',
    '.hero-actions .btn',
    '.hero-scroll'
  ].join(', ');

  window.playHeroIntro = function (onComplete) {
    const elements = document.querySelectorAll(heroIntroSelector);
    const finishIntro = () => {
      if (typeof gsap !== 'undefined') {
        gsap.set(elements, { autoAlpha: 1, y: 0 });
      }
      startTyping();
      if (onComplete) onComplete();
    };

    if (!elements.length) {
      finishIntro();
      return;
    }

    if (prefersReducedMotion) {
      finishIntro();
      return;
    }

    if (typeof gsap === 'undefined') {
      if (typeof Element.prototype.animate !== 'function') {
        finishIntro();
        return;
      }

      const animations = Array.from(elements, (element, index) => element.animate(
        [
          { opacity: 0, transform: 'translateY(32px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        {
          duration: 700,
          delay: index * 100,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'both'
        }
      ));

      animations[animations.length - 1].onfinish = finishIntro;
      return;
    }

    gsap.from(elements, {
      y: 32,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      onComplete: finishIntro
    });
  };

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
      navToggle.setAttribute('aria-label', 'Abrir menu');
    }
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
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

  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
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
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
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

  /* ---------- 8. PROJECT IMAGE GALLERY ---------- */
  const projectLightbox = document.getElementById('projectLightbox');
  const lightboxTitle = document.getElementById('projectLightboxTitle');
  const lightboxStage = document.getElementById('projectLightboxStage');
  const lightboxStatus = document.getElementById('projectLightboxStatus');
  const lightboxCounter = document.getElementById('projectLightboxCounter');
  const lightboxClose = document.getElementById('projectLightboxClose');
  const lightboxPrevious = document.getElementById('projectLightboxPrevious');
  const lightboxNext = document.getElementById('projectLightboxNext');
  const lightboxSlides = [
    document.getElementById('projectLightboxImageA'),
    document.getElementById('projectLightboxImageB')
  ];
  const galleryTriggers = document.querySelectorAll('.project-gallery-trigger');

  if (
    projectLightbox &&
    lightboxTitle &&
    lightboxStage &&
    lightboxStatus &&
    lightboxCounter &&
    lightboxClose &&
    lightboxPrevious &&
    lightboxNext &&
    lightboxSlides.every(Boolean)
  ) {
    let activeTrigger = null;
    let gallerySources = [];
    let currentProjectTitle = '';
    let currentImageIndex = 0;
    let activeSlideIndex = -1;
    let requestId = 0;
    let isLightboxOpen = false;
    let previousBodyOverflow = '';
    let closeTimer = null;

    function updateGalleryControls() {
      lightboxCounter.textContent = gallerySources.length
        ? `${currentImageIndex + 1} / ${gallerySources.length}`
        : '';
      lightboxPrevious.disabled = gallerySources.length < 2;
      lightboxNext.disabled = gallerySources.length < 2;
    }

    function preloadGalleryImage(source) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image), { once: true });
        image.addEventListener('error', () => reject(new Error(source)), { once: true });
        image.src = source;

        if (image.complete) {
          if (image.naturalWidth > 0) {
            resolve(image);
          } else {
            reject(new Error(source));
          }
        }
      });
    }

    async function showGalleryImage(index) {
      const source = gallerySources[index];
      if (!source) return;

      const currentRequestId = ++requestId;
      lightboxStage.setAttribute('aria-busy', 'true');
      lightboxStatus.textContent = `Carregando imagem ${index + 1} de ${gallerySources.length}...`;

      try {
        await preloadGalleryImage(source);
      } catch {
        if (currentRequestId !== requestId || !isLightboxOpen) return;
        lightboxStage.setAttribute('aria-busy', 'false');
        lightboxStatus.textContent = `Não foi possível carregar "${source}". Confira o nome e o caminho do arquivo.`;
        return;
      }

      if (currentRequestId !== requestId || !isLightboxOpen) return;

      const nextSlideIndex = activeSlideIndex === 0 ? 1 : 0;
      const nextSlide = lightboxSlides[nextSlideIndex];
      const previousSlide = activeSlideIndex >= 0 ? lightboxSlides[activeSlideIndex] : null;

      nextSlide.src = source;
      nextSlide.alt = `${currentProjectTitle} — imagem ${index + 1} de ${gallerySources.length}`;
      nextSlide.classList.add('is-active');
      if (previousSlide) previousSlide.classList.remove('is-active');

      activeSlideIndex = nextSlideIndex;
      currentImageIndex = index;
      updateGalleryControls();
      lightboxStage.setAttribute('aria-busy', 'false');
      lightboxStatus.textContent = `Imagem ${index + 1} de ${gallerySources.length}`;
    }

    function openGallery(trigger) {
      if (trigger.disabled) return;

      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
      }

      activeTrigger = trigger;
      gallerySources = (trigger.dataset.gallery || '')
        .split('|')
        .map(source => source.trim())
        .filter(Boolean);
      currentProjectTitle = trigger.closest('.project-card')?.querySelector('h3')?.textContent.trim() || 'Imagens do projeto';
      currentImageIndex = 0;
      activeSlideIndex = -1;
      isLightboxOpen = true;
      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      lightboxSlides.forEach(slide => {
        slide.removeAttribute('src');
        slide.alt = '';
        slide.classList.remove('is-active');
      });

      lightboxTitle.textContent = currentProjectTitle;
      lightboxStage.setAttribute('aria-busy', 'false');
      updateGalleryControls();
      projectLightbox.hidden = false;
      requestAnimationFrame(() => {
        projectLightbox.classList.add('is-open');
        lightboxClose.focus();
      });
      showGalleryImage(0);
    }

    function closeGallery() {
      if (!isLightboxOpen) return;

      isLightboxOpen = false;
      requestId++;
      projectLightbox.classList.remove('is-open');
      document.body.style.overflow = previousBodyOverflow;

      const triggerToRestore = activeTrigger;
      closeTimer = window.setTimeout(() => {
        projectLightbox.hidden = true;
        closeTimer = null;
        if (triggerToRestore && document.contains(triggerToRestore)) {
          triggerToRestore.focus();
        }
      }, prefersReducedMotion ? 0 : 240);
    }

    galleryTriggers.forEach(trigger => {
      const sources = (trigger.dataset.gallery || '').split('|').map(source => source.trim()).filter(Boolean);
      trigger.disabled = sources.length === 0;
      trigger.title = sources.length
        ? 'Clique para abrir as imagens do projeto'
        : 'Adicione capturas do projeto para ativar a galeria';
      trigger.addEventListener('click', () => openGallery(trigger));
    });

    lightboxClose.addEventListener('click', closeGallery);
    lightboxPrevious.addEventListener('click', () => {
      if (gallerySources.length < 2) return;
      showGalleryImage((currentImageIndex - 1 + gallerySources.length) % gallerySources.length);
    });
    lightboxNext.addEventListener('click', () => {
      if (gallerySources.length < 2) return;
      showGalleryImage((currentImageIndex + 1) % gallerySources.length);
    });
    projectLightbox.addEventListener('click', event => {
      if (event.target === projectLightbox) closeGallery();
    });
    document.addEventListener('keydown', event => {
      if (!isLightboxOpen) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        closeGallery();
      } else if (event.key === 'ArrowRight' && gallerySources.length > 1) {
        event.preventDefault();
        showGalleryImage((currentImageIndex + 1) % gallerySources.length);
      } else if (event.key === 'ArrowLeft' && gallerySources.length > 1) {
        event.preventDefault();
        showGalleryImage((currentImageIndex - 1 + gallerySources.length) % gallerySources.length);
      } else if (event.key === 'Tab') {
        const focusableElements = [lightboxClose, lightboxPrevious, lightboxNext]
          .filter(element => !element.disabled);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    });
  }

  /* ---------- 9. THEME TOGGLE ---------- */
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
      if (meta) meta.content = theme === 'light' ? '#ffffff' : '#121212';
    }

    btn.addEventListener('click', () => {
      const next = root.dataset.theme === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  initThemeToggle();

  

})();
