// Reveal on scroll
const revealEls = document.querySelectorAll(
  '.hero__text, .hero__photo, .process__head, .process__step, .about__photo, .about__text, .service, .manifesto__text, .manifesto__sign, .guarantee, .project-card, .contact__inner, .farewell'
);
revealEls.forEach((el) => el.classList.add('reveal'));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);
revealEls.forEach((el) => io.observe(el));

// Smooth nav highlight on scroll (subtle hide nav on scroll down)
let lastY = window.scrollY;
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  // Don't hide nav while mobile menu is open
  if (document.body.classList.contains('menu-open')) return;
  const y = window.scrollY;
  if (y > 100 && y > lastY) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  nav.style.transition = 'transform 0.4s ease';
  lastY = y;
});

// Mobile menu toggle
const burger = document.querySelector('.nav__burger');
const mobileMenu = document.querySelector('.mobile-menu');

function closeMobileMenu() {
  mobileMenu.classList.remove('is-open');
  burger.classList.remove('is-active');
  burger.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  document.body.classList.remove('menu-open');
  nav.classList.remove('is-menu-open');
}

function openMobileMenu() {
  mobileMenu.classList.add('is-open');
  burger.classList.add('is-active');
  burger.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.body.classList.add('menu-open');
  nav.classList.add('is-menu-open');
  nav.style.transform = 'translateY(0)';
}

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close menu when any link is clicked
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });
}
