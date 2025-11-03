// Fixed nav: mobile toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('show'));
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) nav.classList.remove('show');
  });
}

// Soft parallax
const parallaxNodes = [...document.querySelectorAll('[data-parallax-speed]')];
window.addEventListener('scroll', () => {
  const y = window.scrollY || window.pageYOffset;
  parallaxNodes.forEach(el => {
    const speed = parseFloat(el.getAttribute('data-parallax-speed') || '0.1');
    el.style.backgroundPosition = `center ${Math.round(y * speed)}px`;
  });
}, { passive: true });

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Lightbox for images with captions
const lb = document.getElementById('lightbox');
const lbImg = lb ? lb.querySelector('.lightbox-img') : null;
const lbCap = lb ? lb.querySelector('.lightbox-cap') : null;
const lbClose = lb ? lb.querySelector('.lightbox-close') : null;

function openLightbox(src, cap) {
  if (!lb || !lbImg) return;
  lbImg.src = src;
  lbCap.innerHTML = cap || '';
  lb.classList.add('show');
  lb.setAttribute('aria-hidden', 'false');
}
function closeLightbox(){
  if (!lb) return;
  lb.classList.remove('show');
  lb.setAttribute('aria-hidden', 'true');
  if (lbImg) lbImg.src = '';
}
if (lb) {
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  lbClose && lbClose.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
}

// Bind images
document.querySelectorAll('figure.media img').forEach(img => {
  img.addEventListener('click', () => {
    const cap = img.getAttribute('data-cap') || (img.closest('figure')?.querySelector('figcaption')?.innerHTML || '');
    openLightbox(img.src, cap);
  });
});

// Timeline interactions
const tl = document.getElementById('timeline');
const prevBtn = document.querySelector('.tl-btn.prev');
const nextBtn = document.querySelector('.tl-btn.next');

function scrollByAmount(x){
  if (!tl) return;
  tl.scrollBy({ left: x, behavior: 'smooth' });
}

prevBtn && prevBtn.addEventListener('click', () => scrollByAmount(-320));
nextBtn && nextBtn.addEventListener('click', () => scrollByAmount(320));

if (tl) {
  // Keyboard
  tl.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollByAmount(320); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollByAmount(-320); }
  });

  // Drag to scroll
  let isDown = false, startX = 0, scrollLeft = 0;
  tl.addEventListener('pointerdown', (e) => {
    isDown = true; tl.setPointerCapture(e.pointerId);
    startX = e.clientX; scrollLeft = tl.scrollLeft;
  });
  tl.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    tl.scrollLeft = scrollLeft - dx;
  });
  ['pointerup','pointercancel','pointerleave'].forEach(type => tl.addEventListener(type, () => { isDown = false; }));
}
