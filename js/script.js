/* =====================================================
   SUN POWER – JavaScript
   ===================================================== */

'use strict';

// ---------- Navbar scroll effect ----------
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---------- Mobile menu ----------
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

function closeMenu() {npx expo start
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', (e) => { if (!navbar.contains(e.target)) closeMenu(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

// ---------- Scroll-in animations ----------
const animateEls = document.querySelectorAll('[data-animate]');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('[data-animate]'));
        const idx      = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), idx * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  animateEls.forEach(el => observer.observe(el));
} else {
  animateEls.forEach(el => el.classList.add('visible'));
}

// ---------- Counter animation ----------
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = target > 1000 ? 1800 : 900;
  const start    = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statsSection = document.querySelector('.background');
let   statsAnimated = false;

if (statsSection && 'IntersectionObserver' in window) {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        document.querySelectorAll('.stat-num[data-target]').forEach(animateCounter);
      }
    });
  }, { threshold: 0.4 }).observe(statsSection);
}

// ---------- Active nav highlight ----------
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

if ('IntersectionObserver' in window) {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' }).observe = (() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => a.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => obs.observe(s));
    return obs.observe.bind(obs);
  })();
}

// ---------- Contact form ----------
const form        = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

function showError(fieldId, message) {
  const el = document.getElementById(`${fieldId}-error`);
  if (el) el.textContent = message;
}

function clearErrors() {
  document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
  if (formSuccess) formSuccess.textContent = '';
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();
    let valid = true;

    if (!name)  { showError('name', 'Please enter your full name.'); valid = false; }

    if (!email) {
      showError('email', 'Please enter your email address.'); valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('email', 'Please enter a valid email address.'); valid = false;
    }

    if (!message) { showError('message', 'Please enter a message.'); valid = false; }

    if (!valid) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled    = true;
    btn.textContent = 'Sending…';

    setTimeout(() => {
      form.reset();
      btn.disabled    = false;
      btn.textContent = 'Send Message';
      formSuccess.textContent = '✓ Thank you! We\'ll be in touch shortly.';
      setTimeout(() => { formSuccess.textContent = ''; }, 6000);
    }, 1200);
  });
}

// ---------- Footer year ----------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
  