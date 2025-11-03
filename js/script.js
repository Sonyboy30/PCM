// Toggle mobile nav
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('header nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.setAttribute('aria-expanded', String(!expanded));
  });
}

// Active link highlight
(function highlightActive(){
  const pageKey = document.body.getAttribute('data-page');
  const map = {
    home: 'index.html',
    historical: 'historical.html',
    construction: 'construction.html',
    impact: 'impact.html',
    significance: 'significance.html',
    timeline: 'timeline.html',
    plaque: 'plaque.html'
  };
  const current = map[pageKey];
  if (!current) return;
  document.querySelectorAll('.nav a').forEach(a=>{
    if (a.getAttribute('href') === current){
      a.classList.add('active');
      a.setAttribute('aria-current','page');
    }
  });
})();
