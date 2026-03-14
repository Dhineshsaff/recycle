/* global JS for RecycleRight */

'use strict';

// ─── Navbar scroll shadow ────────────────────────────────────────────────────
(function () {
  const navbar = document.getElementById('navbar');
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
}());

// ─── Mobile nav toggle ───────────────────────────────────────────────────────
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    const open = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}());

// ─── Animated number counter ─────────────────────────────────────────────────
function animateCounter(el, target, duration) {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    // ease-out quad
    const eased = 1 - (1 - progress) * (1 - progress);
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// ─── Intersection Observer for scroll reveals & counters ─────────────────────
(function () {
  // Reveal animation
  const revealEls = document.querySelectorAll(
    '.category-card, .step-card, .tip-card, .impact-card, .cta-box'
  );

  revealEls.forEach(function (el) {
    el.classList.add('reveal');
  });

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(function (el) { revealObserver.observe(el); });

  // Counter animation – hero stats
  const heroCounters = document.querySelectorAll('.hero-stats .stat-number[data-target]');
  const heroObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'), 10);
          animateCounter(entry.target, target, 1800);
          heroObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  heroCounters.forEach(function (el) { heroObserver.observe(el); });

  // Counter animation – impact section
  const impactCounters = document.querySelectorAll('.impact-card-stat[data-target]');
  const impactObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'), 10);
          animateCounter(entry.target, target, 2000);
          impactObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  impactCounters.forEach(function (el) { impactObserver.observe(el); });
}());

// ─── Category Modal ───────────────────────────────────────────────────────────
(function () {
  const DATA = {
    plastic: {
      icon: '🧴',
      title: 'Recycling Plastic',
      body:
        'Check the recycling symbol (♻ + number) moulded into the base of each item. ' +
        'Numbers 1 (PET) and 2 (HDPE) are the most widely accepted. ' +
        'Rinse containers, leave lids on when possible, and avoid bagging recyclables inside plastic bags.',
      tips: [
        'Crush bottles to save space in the bin',
        'Remove pump dispensers – they are usually not recyclable',
        'Black plastic trays are often not accepted – check locally',
        'Soft plastics (bags, wrappers) need a dedicated drop-off point',
      ],
    },
    paper: {
      icon: '📦',
      title: 'Recycling Paper & Cardboard',
      body:
        'Paper and cardboard are among the easiest materials to recycle. ' +
        'Flatten boxes to save space, and keep paper dry. ' +
        'Shredded paper should be placed in a sealed paper bag so it does not escape during collection.',
      tips: [
        'Remove tape and staples if possible',
        'Pizza boxes with grease are usually not recyclable',
        'Waxed or plastic-coated cardboard is not recyclable',
        'Cardboard coffee cups have a plastic lining – check locally',
      ],
    },
    glass: {
      icon: '🍶',
      title: 'Recycling Glass',
      body:
        'Glass bottles and jars can be recycled indefinitely without loss of quality. ' +
        'Sort by colour if your local council requires it, rinse clean, and remove lids. ' +
        'Do not include ceramics, Pyrex, mirrors, or window glass.',
      tips: [
        'Remove metal lids and recycle separately',
        'Broken glass should be wrapped safely before disposal',
        'Light bulbs are NOT accepted in glass recycling',
        'Pyrex and oven-proof glass have a different composition',
      ],
    },
    metal: {
      icon: '🥫',
      title: 'Recycling Metal',
      body:
        'Aluminium and steel are highly valuable recyclables. ' +
        'Rinse tins and cans, crush if you can, and place in your kerbside bin. ' +
        'Aluminium foil should be scrunched into a ball at least the size of a fist.',
      tips: [
        'Check the magnet test: steel sticks, aluminium does not',
        'Aerosol cans are recyclable when fully empty',
        'Aluminium trays from takeaways are recyclable when rinsed',
        'Large scrap metal should go to a metal recycling depot',
      ],
    },
    electronics: {
      icon: '💻',
      title: 'Recycling Electronics (E-waste)',
      body:
        'Electronic devices contain valuable metals and hazardous substances that must not go to landfill. ' +
        'Drop e-waste at certified collection points, council depots, or retailer take-back schemes. ' +
        'Always wipe personal data before recycling.',
      tips: [
        'Batteries must never go in kerbside bins',
        'Most mobile retailers accept old phones for recycling',
        'TVs and monitors are accepted at council e-waste drops',
        'Certified e-recyclers ensure responsible data destruction',
      ],
    },
    organic: {
      icon: '🌱',
      title: 'Composting & Organic Waste',
      body:
        'Organic waste includes food scraps, garden clippings, and compostable packaging. ' +
        'Home composting is the most sustainable option. ' +
        'If you have a green-lid bin, use it for all food waste and garden material.',
      tips: [
        'Avoid putting cooked meat or dairy in a home compost heap',
        'Worm farms are excellent for apartment composting',
        'Compostable packaging needs industrial conditions to break down',
        'Coffee grounds and tea bags are great compost additions',
      ],
    },
  };

  const overlay    = document.getElementById('modalOverlay');
  const closeBtn   = document.getElementById('modalClose');
  const modalIcon  = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody  = document.getElementById('modalBody');
  const modalTips  = document.getElementById('modalTips');

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function openModal(categoryKey) {
    const d = DATA[categoryKey];
    if (!d) return;
    modalIcon.textContent  = d.icon;
    modalTitle.textContent = d.title;
    modalBody.textContent  = d.body;
    modalTips.innerHTML = d.tips
      .map(function (t) {
        return '<div class="modal-tip-item">' + escapeHtml(t) + '</div>';
      })
      .join('');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.category-card').forEach(function (card) {
    function activate() { openModal(card.getAttribute('data-category')); }
    card.addEventListener('click', activate);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
}());

// ─── CTA Form ─────────────────────────────────────────────────────────────────
(function () {
  const form  = document.getElementById('ctaForm');
  const input = document.getElementById('emailInput');
  const msgEl = document.getElementById('ctaMsg');

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!isValidEmail(input.value)) {
      msgEl.style.color = '#dc2626';
      msgEl.textContent = '⚠ Please enter a valid email address.';
      input.focus();
      return;
    }
    msgEl.style.color = '';
    msgEl.textContent = '🎉 You\'re on the list! Check your inbox for next steps.';
    form.reset();
  });
}());

// ─── Smooth active nav link highlight on scroll ───────────────────────────────
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActive() {
    const scrollY = window.scrollY + 120;
    let current = '';
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollY) current = sec.getAttribute('id');
    });
    navAs.forEach(function (a) {
      a.classList.toggle('active-link', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
}());

