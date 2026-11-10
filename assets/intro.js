// Animate the splash logo into the matching header elements.
const splash = document.querySelector('.intro-screen');
if (document.documentElement.classList.contains('intro-playing') && splash) {
  const finish = () => {
    document.documentElement.classList.remove('intro-playing');
    splash.remove();
  };
  // A failed animation must never leave the site behind a black screen.
  const fallback = setTimeout(finish, 4000);
  setTimeout(() => {
    const pairs = [
      [splash.querySelector('.intro-screen-logo'), document.querySelector('.brand-icon')],
      [splash.querySelector('.intro-screen-name'), document.querySelector('.brand-label')]
    ];
    if (pairs.some(([from, to]) => !from || !to || !from.animate)) {
      clearTimeout(fallback);
      finish();
      return;
    }
    splash.classList.add('is-revealing');
    const animations = pairs.map(([from, to]) => {
      const start = from.getBoundingClientRect();
      let end = to.getBoundingClientRect();
      if (to.classList.contains('brand-label')) {
        const text = document.createRange();
        text.selectNodeContents(to.firstChild);
        end = text.getBoundingClientRect();
      }
      return from.animate([
        {transform: 'translate(0, 0) scale(1)'},
        {transform: `translate(${end.left - start.left}px, ${end.top - start.top}px) scale(${end.width / start.width}, ${end.height / start.height})`}
      ], {duration: 1100, easing: 'cubic-bezier(.65, 0, .25, 1)', fill: 'forwards'});
    });
    Promise.all(animations.map(animation => animation.finished)).then(() => {
      clearTimeout(fallback);
      finish();
    }).catch(() => {
      clearTimeout(fallback);
      finish();
    });
  }, 1150);
}
