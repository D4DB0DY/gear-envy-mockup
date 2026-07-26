/* Gear Envy — progressive enhancement only.
   No dependencies, no build step. The pages render fully without JS;
   this file adds the mobile menu, FAQ accordion and the referral-link
   copy button. Ports to Sharetribe as small React hooks. */
(function () {
  'use strict';

  document.documentElement.classList.remove('ge-no-js');
  document.documentElement.classList.add('ge-js');

  /* Scroll reveal — elements marked .ge-reveal fade/rise in once, when
     they enter the viewport. Fully inert without JS or when the user
     prefers reduced motion (CSS handles both cases). */
  var revealEls = document.querySelectorAll('.ge-reveal');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    Array.prototype.forEach.call(revealEls, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(revealEls, function (el) { el.classList.add('is-visible'); });
  }

  /* Mobile menu */
  var toggle = document.querySelector('.ge-nav-toggle');
  var menu = document.querySelector('.ge-mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* FAQ accordion */
  var questions = document.querySelectorAll('.ge-faq-q');
  Array.prototype.forEach.call(questions, function (q) {
    q.addEventListener('click', function () {
      var answer = document.getElementById(q.getAttribute('aria-controls'));
      var expanded = q.getAttribute('aria-expanded') === 'true';
      q.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      if (answer) {
        answer.classList.toggle('is-open', !expanded);
      }
    });
  });

  /* Referral link copy (visual mockup — swaps label on success) */
  var copyBtn = document.querySelector('.ge-copy-btn');
  var copyValue = document.querySelector('.ge-copy-value');
  if (copyBtn && copyValue) {
    copyBtn.addEventListener('click', function () {
      var text = copyValue.textContent.trim();
      var done = function () {
        copyBtn.classList.add('is-copied');
        copyBtn.textContent = 'Copied';
        setTimeout(function () {
          copyBtn.classList.remove('is-copied');
          copyBtn.textContent = 'Copy link';
        }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        done();
      }
    });
  }
})();
