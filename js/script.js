/* Timeline reveal on scroll */
const onScrollReveal = () => {
  const items = document.querySelectorAll('.t-item');
  const vh = window.innerHeight || 800;
  items.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < vh - 80) el.classList.add('show');
  });
};
document.addEventListener('scroll', onScrollReveal, { passive: true });
document.addEventListener('DOMContentLoaded', onScrollReveal);

/* Optional lightbox (kept lightweight if you add images later) */
(() => {
  const imgs = document.querySelectorAll('figure img, .gallery img');
  if (!imgs.length) return;

  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,.9);display:none;
    align-items:center;justify-content:center;z-index:9999;padding:20px
  `;
  const full = document.createElement('img');
  full.style.cssText = 'max-width:92vw;max-height:88vh;border-radius:8px;box-shadow:0 20px 60px rgba(0,0,0,.6)';
  overlay.appendChild(full);
  overlay.addEventListener('click', () => overlay.style.display = 'none');
  document.body.appendChild(overlay);

  imgs.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      full.src = img.src;
      overlay.style.display = 'flex';
    });
  });
})();
