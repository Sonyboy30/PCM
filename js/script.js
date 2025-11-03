// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('show'));
}

// Hero background via data attribute
const hero = document.querySelector('.hero');
if (hero && hero.dataset.hero) {
  // Keep your asset path; CSS uses a fallback too
  hero.style.setProperty('--hero-img', `url('assets/${hero.dataset.hero}')`);
}

// Fade-in on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
}, { threshold: 0.18 });
document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

// Lightbox
const lb = document.querySelector('.lightbox');
const lbImg = document.querySelector('.lightbox-img');
const lbCap = document.querySelector('.lightbox-cap');
const lbClose = document.querySelector('.lightbox-close');

function openLightbox(src, cap) {
  if (!lb) return;
  lbImg.src = src;
  lbCap.textContent = cap || '';
  lb.classList.add('show');
  lb.setAttribute('aria-hidden','false');
}
function closeLightbox() {
  if (!lb) return;
  lb.classList.remove('show');
  lb.setAttribute('aria-hidden','true');
  lbImg.src = '';
  lbCap.textContent = '';
}
if (lbClose) lbClose.addEventListener('click', closeLightbox);
if (lb) lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// Click any gallery/frame image to open
document.querySelectorAll('.frame img').forEach(img => {
  img.addEventListener('click', () => {
    const cap = img.getAttribute('data-cap') || img.closest('figure')?.querySelector('figcaption')?.innerText || '';
    openLightbox(img.src, cap);
  });
});

// Interactive timeline: expand on click/Enter/Space
document.querySelectorAll('.t-item').forEach(item => {
  item.addEventListener('click', () => item.classList.toggle('open'));
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); item.classList.toggle('open'); }
  });
});
