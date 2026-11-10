// Progressive enhancement: content remains visible without JS or reduced motion.
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const sections = document.querySelectorAll('.atlas-head, .map-column, .info-panel, .about > div');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, {threshold: 0.08, rootMargin: '0px 0px -24px 0px'});
  sections.forEach(section => {section.classList.add('reveal');observer.observe(section)});
  document.documentElement.classList.add('motion-ready');
  // Very short screens and background tabs should never keep content hidden.
  setTimeout(() => sections.forEach(section => section.classList.add('is-visible')), 3500);
}
