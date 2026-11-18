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

  /* ---------- 1. HERO ENTRANCE ---------- */
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

  /* ---------- 2. SCROLL ANIMATIONS ---------- */
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
    document.addEventListener('DOMContentLoaded', initHero);
  } else {
    initHero();
  }

})();
