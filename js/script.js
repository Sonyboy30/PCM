// Sticky header appearance
const header = document.querySelector('[data-sticky]');
let lastY = 0;
const onScroll = () => {
  const y = window.scrollY || document.documentElement.scrollTop;
  header?.setAttribute('data-scrolled', y > 10 ? 'true' : 'false');
  lastY = y;
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const siteHeader = document.querySelector('.site-header');
toggle?.addEventListener('click', () => {
  const open = siteHeader.getAttribute('data-open') === 'true';
  siteHeader.setAttribute('data-open', String(!open));
  toggle.setAttribute('aria-expanded', String(!open));
});

// Scroll reveal
const inView = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if (e.isIntersecting){
      e.target.classList.add('is-in');
      inView.unobserve(e.target);
    }
  });
},{ rootMargin:'-10% 0px -10% 0px', threshold:0.1 });
document.querySelectorAll('.fx-in, .fx-fade, .fx-rise, .fx-pop').forEach(el=>inView.observe(el));

// Parallax background shim (small effect)
const parallaxSections = document.querySelectorAll('[data-parallax]');
const onParallax = () => {
  const h = window.innerHeight;
  parallaxSections.forEach(sec=>{
    const r = sec.getBoundingClientRect();
    const p = ((r.top + r.height/2) - h/2) / h; // -1..1
    sec.style.setProperty('--py', String(p.toFixed(4)));
    sec.style.backgroundPositionY = `${Math.max(-20, Math.min(20, p*20))}px`;
  });
};
document.addEventListener('scroll', onParallax, { passive: true });
window.addEventListener('resize', onParallax);
onParallax();

// Lightbox for images
const lightbox = document.querySelector('[data-lightbox]');
if (lightbox){
  const lbImg = lightbox.querySelector('img');
  const lbCap = lightbox.querySelector('.lightbox-caption');
  const close = lightbox.querySelector('.lightbox-close');
  const openLB = (src, cap) => {
    lbImg.src = src;
    lbCap.textContent = cap || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  };
  const closeLB = () => {
    lightbox.hidden = true;
    lbImg.src = '';
    lbCap.textContent = '';
    document.body.style.overflow = '';
  };
  close.addEventListener('click', closeLB);
  lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) closeLB(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && !lightbox.hidden) closeLB(); });

  document.querySelectorAll('img[data-full]').forEach(img=>{
    img.addEventListener('click', ()=>{
      openLB(img.getAttribute('data-full') || img.src, img.closest('figure')?.querySelector('figcaption')?.textContent?.trim());
    });
  });
}

// Horizontal timeline controls
const tl = document.querySelector('[data-hscroll]');
if (tl){
  const progress = document.querySelector('.tl-progress span');
  const clamp = (n,min,max)=>Math.max(min,Math.min(max,n));
  const setProgress = () => {
    const max = tl.scrollWidth - tl.clientWidth;
    const v = max > 0 ? tl.scrollLeft / max : 0;
    progress.style.width = `${clamp(v*100,0,100)}%`;
  };
  tl.addEventListener('scroll', setProgress, { passive: true });
  setProgress();

  document.querySelectorAll('.tl-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const dir = Number(btn.getAttribute('data-dir')) || 1;
      const delta = Math.round(tl.clientWidth * 0.8) * dir;
      tl.scrollBy({ left: delta, behavior:'smooth' });
    });
  });
}

// Ensure hero text appears after load
window.addEventListener('load', ()=>{
  document.querySelectorAll('.fx-pop, .fx-rise, .fx-fade, .fx-in').forEach(el=>{
    // In case IntersectionObserver missed initial hero
    if (el.closest('.hero') || el.closest('.page-hero')) el.classList.add('is-in');
  });
});
