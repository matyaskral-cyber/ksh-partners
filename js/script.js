// ── HERO BG PARALLAX ───────────────────────────────────────────
const heroBg = document.getElementById('hero-bg');
if (heroBg) {
  const img = new Image();
  img.onload = () => heroBg.classList.add('loaded');
  img.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80';
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `scale(1) translateY(${y * 0.3}px)`;
  });
}

// ── NAV SCROLL ─────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

// ── HAMBURGER ──────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('mobile-open');
});
document.querySelectorAll('#nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
});

// ── CONTACT FORM ───────────────────────────────────────────────
const form  = document.getElementById('contact-form');
const toast = document.getElementById('toast');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // V produkci zde nahradit odesláním na backend / Formspree / EmailJS
  toast.classList.add('show');
  form.reset();
  setTimeout(() => toast.classList.remove('show'), 4000);
});

// ── ANIMATE ON SCROLL ──────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .team-card, .ref-card, .blog-card, .onas-value').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});

document.addEventListener('animationend', () => {}, false);
document.querySelectorAll('.service-card, .team-card, .ref-card, .blog-card, .onas-value').forEach((el, i) => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, i * 80);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.1 });
  io.observe(el);
});
