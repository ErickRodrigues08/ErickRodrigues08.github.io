/* =========================================================
   ERICK RODRIGUES PEDROSO — PORTFOLIO
   Interactivity: typing, scroll reveal, navbar, hover 3D
   ========================================================= */

(function () {
    'use strict';

    /* ---------- 1. PAGE LOADER (entrance animation) ---------- */
    const pageLoader = document.getElementById('pageLoader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            pageLoader.classList.add('is-hidden');
            document.body.style.overflow = '';
            startTyping();
        }, 1100);
    });

    document.body.style.overflow = 'hidden';

    /* ---------- 2. TYPING EFFECT ---------- */
    const phrases = [
        'Erick Rodrigues Pedroso',
        'Desenvolvedor Full-Stack',
        'Estudante'
    ];

    const TYPE_SPEED = 90;
    const ERASE_SPEED = 45;
    const PAUSE_AFTER_TYPE = 1600;
    const PAUSE_AFTER_ERASE = 400;

    function startTyping() {
        const target = document.getElementById('typedText');
        if (!target) return;

        let phraseIndex = 0;
        let charIndex = 0;
        let isErasing = false;

        function tick() {
            const current = phrases[phraseIndex];

            if (!isErasing) {
                charIndex++;
                target.textContent = current.slice(0, charIndex);

                if (charIndex === current.length) {
                    isErasing = true;
                    return setTimeout(tick, PAUSE_AFTER_TYPE);
                }

                return setTimeout(tick, TYPE_SPEED + Math.random() * 60);
            }

            charIndex--;
            target.textContent = current.slice(0, charIndex);

            if (charIndex === 0) {
                isErasing = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                return setTimeout(tick, PAUSE_AFTER_ERASE);
            }

            setTimeout(tick, ERASE_SPEED);
        }

        tick();
    }

    /* ---------- 3. NAVBAR (scroll style + active link) ---------- */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');

    function onScroll() {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        const scrollPos = window.scrollY + window.innerHeight * 0.35;
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

        const backTop = document.getElementById('backToTop');
        if (backTop) {
            backTop.classList.toggle('is-visible', window.scrollY > 600);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- 4. MOBILE MENU TOGGLE ---------- */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    function closeMenu() {
        navToggle.classList.remove('is-open');
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

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

    /* ---------- 5. SCROLL REVEAL (IntersectionObserver) ---------- */
    const revealEls = document.querySelectorAll('[data-reveal]');

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

    /* ---------- 6. HOVER 3D ON PROFILE PHOTO ---------- */
    const photoFrame = document.getElementById('photoFrame');

    if (photoFrame && window.matchMedia('(hover: hover)').matches) {
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

    /* ---------- 7. SMOOTH SCROLL (offset for fixed nav) ---------- */
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

    /* ---------- 8. HERO BACKGROUND KEPT STATIC ---------- */

})();
