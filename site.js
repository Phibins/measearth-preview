// MeasEarth site script: mobile menu and a light scroll reveal. No libraries.
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Coax quote form: if no form has appeared a while after load, show the phone fallback.
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.querySelectorAll('.coax--forms--container').forEach(function (c) {
        var fb = c.parentNode.querySelector('.form-fallback');
        if (fb && !c.querySelector('iframe')) { fb.hidden = false; }
      });
    }, 8000);
  });

  var items = document.querySelectorAll('.rise');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach(function (el) {
    // Anything already on screen at load is shown at once, so the first view is complete.
    if (el.getBoundingClientRect().top < window.innerHeight) { el.classList.add('in'); }
    else { io.observe(el); }
  });
})();
