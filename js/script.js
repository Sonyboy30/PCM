/* Lightbox for any image inside a figure (uses the figcaption text if present) */
(function () {
  const imgs = document.querySelectorAll('figure img, img[data-lightbox]');
  if (!imgs.length) return;

  // Create one lightbox for the whole site
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <button class="lb-close" aria-label="Close image (Esc)">✕</button>
    <div class="lb-inner" role="dialog" aria-modal="true">
      <img alt="">
      <div class="lb-caption" aria-live="polite"></div>
    </div>
  `;
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('.lb-caption');
  const close = () => lb.classList.remove('open');

  lb.addEventListener('click', (e) => {
    // click backdrop or the close button closes
    if (e.target === lb || e.target.classList.contains('lb-close')) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  imgs.forEach(img => {
    img.addEventListener('click', () => {
      const cap = img.closest('figure')?.querySelector('figcaption')?.textContent?.trim() || img.alt || '';
      lbImg.src = img.src;
      lbImg.alt = img.alt || 'Enlarged image';
      lbCap.textContent = cap;
      lb.classList.add('open');
    });
  });
})();

/* Subtle timeline item reveal when scrolled into view */
(function () {
  const items = document.querySelectorAll('.tl-item');
  if (!items.length) return;

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.style.opacity = 1;
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    }
  }, { root: document.querySelector('.timeline-track'), threshold: 0.2 });

  items.forEach(el => io.observe(el));
})();
