/* =========================================================
   ERICK RODRIGUES PEDROSO — PORTFOLIO
   GSAP Animations (requires gsap + ScrollTrigger)
   ========================================================= */

(function () {
  'use strict';

  const hasGsap = typeof gsap !== 'undefined';
  const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
  if (hasGsap && hasScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. PRELOADER ---------- */
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    const fill = document.getElementById('preloaderFill');
    const count = document.getElementById('preloaderCount');

    if (!preloader) { initHero(); return; }
    if (!hasGsap) {
      preloader.style.display = 'none';
      document.body.style.overflow = '';
      initHero();
      return;
    }

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
    const playScrollAnimations = () => initScrollAnimations();

    if (prefersReducedMotion) {
      if (hasGsap) gsap.set('.hero-grid, .navbar', { opacity: 1, y: 0 });
      if (window.playHeroIntro) {
        window.playHeroIntro(playScrollAnimations);
      } else {
        if (window.startTyping) window.startTyping();
        playScrollAnimations();
      }
      return;
    }

    if (!hasGsap) {
      if (window.playHeroIntro) {
        window.playHeroIntro(playScrollAnimations);
      } else {
        if (window.startTyping) window.startTyping();
        playScrollAnimations();
      }
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Navbar slides down
    tl.from('.navbar', { y: -40, opacity: 0, duration: 0.6 });

    // Grid fades in
    tl.from('.hero-grid', { opacity: 0, duration: 0.8 }, '-=0.3');

    // Hero text animations are centralized in index.js.
    tl.add(() => {
      if (window.playHeroIntro) {
        window.playHeroIntro(playScrollAnimations);
      } else {
        if (window.startTyping) window.startTyping();
        playScrollAnimations();
      }
    });
  }

  /* ---------- 3. SCROLL ANIMATIONS ---------- */
  function initScrollAnimations() {
    if (prefersReducedMotion || !hasGsap || !hasScrollTrigger) return;

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

    // --- Gallery parallax ---
    const galleryItems = gsap.utils.toArray('.gallery-item');
    if (galleryItems.length) {
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
