// --- Section fade and slide animations ---
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

// Observe elements with animation classes
document.querySelectorAll('.fade-in, .slide-up').forEach(el => observer.observe(el));

// --- Optional: subtle hover sound or glow pulse ---
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('mouseover', () => link.classList.add('hovered'));
  link.addEventListener('mouseleave', () => link.classList.remove('hovered'));
});
