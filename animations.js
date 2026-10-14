/* =========================================================
   ERICK RODRIGUES PEDROSO — PORTFOLIO
   GSAP Animations (requires gsap + ScrollTrigger)
   ========================================================= */

(function () {
  'use strict';

  // Bail out if GSAP isn't loaded
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- UTILITY: Scramble text effect ---------- */
  function scrambleText(element, finalText, opts = {}) {
    const { duration = 1.2, chars = '!<>-_\\/[]{}#$%^&*()=+01' } = opts;
    return new Promise(resolve => {
      let frame = 0;
      const totalFrames = Math.floor(duration * 60);
      const interval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        let result = '';
        for (let i = 0; i < finalText.length; i++) {
          if (i < finalText.length * progress) {
            result += finalText[i];
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        element.textContent = result;
        if (frame >= totalFrames) {
          clearInterval(interval);
          element.textContent = finalText;
          resolve();
        }
      }, 1000 / 60);
    });
  }

  /* ---------- 1. PRELOADER ---------- */
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    const fill = document.getElementById('preloaderFill');
    const count = document.getElementById('preloaderCount');

    if (!preloader) { initHero(); return; }

    // Skip if already shown this session
    let shown = false;
    try { shown = sessionStorage.getItem('preloaderShown'); } catch(e) {}
    if (shown || prefersReducedMotion) {
      preloader.style.display = 'none';
      document.body.style.overflow = '';
      initHero();
      return;
    }

    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        try { sessionStorage.setItem('preloaderShown', '1'); } catch(e) {}
        document.body.style.overflow = '';
        initHero();
      }
    });

    // Counter animation
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 1.4,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(counter.val);
        if (count) count.textContent = v + '%';
        if (fill) fill.style.width = v + '%';
      }
    });

    // Fade out and slide up
    tl.to(preloader, {
      yPercent: -100,
      duration: 0.6,
      ease: 'power3.inOut'
    }, '+=0.2');

    tl.set(preloader, { display: 'none' });

    // Skip on click/keypress
    function skipPreloader() {
      tl.progress(1);
      preloader.removeEventListener('click', skipPreloader);
      document.removeEventListener('keydown', skipPreloader);
    }
    preloader.addEventListener('click', skipPreloader);
    document.addEventListener('keydown', skipPreloader);
  }

  /* ---------- 2. HERO ENTRANCE ---------- */
  function initHero() {
    if (prefersReducedMotion) {
      // Just make everything visible
      gsap.set('.hero-greeting, .hero-name, .hero-typing, .hero-direct, .hero-subtitle, .hero-status, .hero-actions, .hero-scroll, .navbar', { opacity: 1, y: 0 });
      if (window.startTyping) window.startTyping();
      initScrollAnimations();
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        if (window.startTyping) window.startTyping();
      }
    });

    // Navbar slides down
    tl.from('.navbar', { y: -40, opacity: 0, duration: 0.6 });

    // Grid fades in
    tl.from('.hero-grid', { opacity: 0, duration: 0.8 }, '-=0.3');

    // Greeting with scramble
    const greeting = document.querySelector('.hero-greeting');
    if (greeting) {
      const originalText = greeting.textContent;
      greeting.textContent = '';
      tl.add(() => {
        scrambleText(greeting, originalText, { duration: 0.8 });
      });
      tl.to({}, { duration: 0.8 }); // wait for scramble
    }

    // Reveal the name after the preloader, when the hero is visible.
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
      tl.add(() => heroName.classList.add('intro'), '-=0.2');
      tl.to({}, { duration: 0.6 });
    }

    // Direct phrase and subtitle
    tl.from('.hero-direct', { y: 20, opacity: 0, duration: 0.5 }, '-=0.1');
    tl.from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3');

    // Status badge
    tl.from('.hero-status', { y: 20, opacity: 0, duration: 0.4 }, '-=0.2');

    // Action buttons staggered
    tl.from('.hero-actions .btn', {
      y: 20, opacity: 0, duration: 0.4, stagger: 0.1
    }, '-=0.2');

    // Scroll indicator with a loop
    tl.from('.hero-scroll', { y: 20, opacity: 0, duration: 0.4 }, '-=0.1');

    // Init scroll animations after hero
    tl.add(() => initScrollAnimations());
  }

  /* ---------- 3. SCROLL ANIMATIONS ---------- */
  function initScrollAnimations() {
    if (prefersReducedMotion) return;

    // --- Scroll progress bar ---
    const progressBar = document.getElementById('scrollProgressBar');
    if (progressBar) {
      gsap.to(progressBar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3
        }
      });
    }

    // --- Section titles: mask reveal ---
    gsap.utils.toArray('.section-header').forEach(header => {
      const title = header.querySelector('.section-title');
      const tag = header.querySelector('.section-tag');
      const sub = header.querySelector('.section-sub');

      if (title) {
        gsap.from(title, {
          yPercent: 100,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            once: true
          }
        });
      }
      if (tag) {
        gsap.from(tag, {
          y: 20, opacity: 0, duration: 0.5,
          scrollTrigger: { trigger: header, start: 'top 85%', once: true }
        });
      }
      if (sub) {
        gsap.from(sub, {
          y: 20, opacity: 0, duration: 0.5, delay: 0.2,
          scrollTrigger: { trigger: header, start: 'top 85%', once: true }
        });
      }
    });

    // --- Cards batch reveal ---
    const cards = gsap.utils.toArray('.stack-card, .project-card, .contact-card');
    if (cards.length) {
      ScrollTrigger.batch(cards, {
        start: 'top 85%',
        once: true,
        onEnter: batch => {
          gsap.from(batch, {
            opacity: 0,
            y: 60,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out'
          });
        }
      });
    }

    // --- About photo reveal ---
    const photoFrame = document.querySelector('.photo-frame');
    if (photoFrame) {
      gsap.from(photoFrame, {
        clipPath: 'inset(100% 0 0 0)',
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: photoFrame,
          start: 'top 80%',
          once: true
        }
      });

      // Corner brackets animate
      gsap.from('.photo-corner', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: photoFrame,
          start: 'top 75%',
          once: true
        }
      });

      // Slight parallax on photo
      gsap.to('.photo-img', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // --- About stats counter ---
    gsap.utils.toArray('.about-stat__number').forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      if (isNaN(target)) return;
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        },
        onUpdate: () => {
          el.textContent = Math.round(counter.val);
        }
      });
    });

    // --- Gallery: staggered entry + parallax ---
    const galleryItems = gsap.utils.toArray('.gallery-item');
    if (galleryItems.length) {
      ScrollTrigger.batch(galleryItems, {
        start: 'top 88%',
        once: true,
        onEnter: batch => {
          gsap.from(batch, {
            opacity: 0,
            y: 40,
            scale: 0.95,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out'
          });
        }
      });

      // Parallax on gallery items (desktop only)
      if (window.innerWidth >= 768) {
        galleryItems.forEach((item, i) => {
          const speed = (i % 3 === 0) ? -20 : (i % 3 === 1) ? 20 : -10;
          gsap.to(item, {
            y: speed,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        });
      }
    }

    // --- Footer quote: words lighting up ---
    const quoteWords = gsap.utils.toArray('.footer-quote .word');
    if (quoteWords.length) {
      gsap.to(quoteWords, {
        color: 'var(--text)',
        stagger: 0.05,
        scrollTrigger: {
          trigger: '.footer-quote',
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: true
        }
      });
    }

    // --- Magnetic buttons ---
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const magneticBtns = document.querySelectorAll('.btn-primary, .btn-download, .btn-whatsapp');
      magneticBtns.forEach(btn => {
        const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3' });
        const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3' });

        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const relX = e.clientX - rect.left - rect.width / 2;
          const relY = e.clientY - rect.top - rect.height / 2;
          xTo(relX * 0.3);
          yTo(relY * 0.3);
        });

        btn.addEventListener('mouseleave', () => {
          xTo(0);
          yTo(0);
        });
      });

      // --- Tilt on project cards ---
      document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          const tiltX = (0.5 - y) * 6;
          const tiltY = (x - 0.5) * 6;
          gsap.to(card, {
            rotateX: tiltX,
            rotateY: tiltY,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 800
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
        });
      });
    }

    // --- Back to top smooth scroll ---
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Refresh ScrollTrigger after all images load
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });
  }

  /* ---------- INIT ---------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreloader);
  } else {
    initPreloader();
  }

})();
