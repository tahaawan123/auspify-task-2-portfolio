

(function () {
  'use strict';

  
  const FORM_ENDPOINT = 'https://formspree.io/f/mppwvbov';

  const CONTACT_EMAIL = 'tahaawan598@gmail.com';
  const MIN_MESSAGE_LENGTH = 20;

  /* Reduced-motion preference is checked once and reused everywhere. */
  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* ========================================================================
     01. PROJECT DATA
     ======================================================================== */

  const PROJECTS = [
    {
      title: 'Gym Website',
      description: 'A modern fitness club website with class schedules, trainer profiles and membership plans.',
      tags: ['Next.js', 'Tailwind CSS', 'Responsive'],
      url: 'https://gym-website-flax-three.vercel.app/',
      image: 'assets/img/projects/gym-website.jpg',
      category: 'web',
      glyph: 'GYM'
    },
    {
      title: 'Pakistan Travel Places',
      description: 'An interactive travel guide showcasing the most beautiful destinations across Pakistan.',
      tags: ['Next.js', 'UI Design', 'Responsive'],
      url: 'https://pakistan-travel-places.vercel.app/',
      image: 'assets/img/projects/pakistan-travel.jpg',
      category: 'web',
      glyph: 'TRAVEL'
    },
    {
      title: 'Ecommerce Shopping Store',
      description: 'A dynamic online store with product listings, a shopping cart and a smooth checkout flow.',
      tags: ['Next.js', 'React', 'Dynamic Routing'],
      url: 'https://dynamic-ecommerce-seven.vercel.app/',
      image: 'assets/img/projects/ecommerce-store.jpg',
      category: 'web',
      glyph: 'SHOP'
    },
    {
      title: 'Comforty Furniture Store',
      description: 'A furniture e-commerce store built on live API data with a clean data-migration pipeline.',
      tags: ['Next.js', 'API Integration', 'Data Migration'],
      url: 'https://taha-api-integration-and-data-migration.vercel.app/',
      image: 'assets/img/projects/comforty-furniture.jpg',
      category: 'web',
      glyph: 'COMFY'
    },
    {
      title: 'Fast Food Website',
      description: 'A responsive fast-food ordering site with an appetising menu and a modern, bold layout.',
      tags: ['HTML5', 'CSS3', 'JavaScript'],
      url: 'https://second-hackathon-liard.vercel.app/',
      image: 'assets/img/projects/fast-food.jpg',
      category: 'web',
      glyph: 'FOOD'
    },
    {
      title: 'Dynamic Resume Builder',
      description: 'A browser-based resume builder that generates a clean, shareable CV in seconds.',
      tags: ['HTML5', 'CSS3', 'JavaScript'],
      url: 'https://hackathon-milestone.vercel.app/',
      image: 'assets/img/projects/resume-builder.jpg',
      category: 'web',
      glyph: 'CV'
    },
    {
      title: 'BMI Calculator',
      description: 'A Streamlit app that calculates body mass index and returns instant, personalised feedback.',
      tags: ['Python', 'Streamlit'],
      url: 'https://assignment04-q32jqj78fkk8cfd8dsxpat.streamlit.app/',
      image: 'assets/img/projects/bmi-calculator.jpg',
      category: 'python-ai',
      glyph: 'BMI'
    },
    {
      title: 'Unit Converter',
      description: 'A Streamlit tool that converts length, weight and temperature units in real time.',
      tags: ['Python', 'Streamlit'],
      url: 'https://unit-convertor-gk9yntb2brnc75ahmon92v.streamlit.app/',
      image: 'assets/img/projects/unit-converter.jpg',
      category: 'python-ai',
      glyph: 'UNIT'
    },
    {
      title: 'Data Sweeper',
      description: 'A file-cleaning app that strips duplicates, blanks and messy rows from CSV and Excel data.',
      tags: ['Python', 'Streamlit', 'Pandas'],
      url: 'https://file-cleaner-app-app-eeumlsknmcqjk2sbes2bn4.streamlit.app/',
      image: 'assets/img/projects/data-sweeper.jpg',
      category: 'python-ai',
      glyph: 'DATA'
    },
    {
      title: 'Secure Data App',
      description: 'An encryption app that protects sensitive text with secure, password-based encoding.',
      tags: ['Python', 'Streamlit', 'Cryptography'],
      url: 'https://securedataencryption-bx35srpo3kyb6rpvis2vx4.streamlit.app/',
      image: 'assets/img/projects/secure-data.jpg',
      category: 'python-ai',
      glyph: 'SECURE'
    },
    {
      title: 'Personal Library',
      description: 'A library manager to add, search and organise your personal book collection.',
      tags: ['Python', 'Streamlit', 'CRUD'],
      url: 'https://personallibrarymanager-niufgytsppmw8a4bjx9qpy.streamlit.app/',
      image: 'assets/img/projects/personal-library.jpg',
      category: 'python-ai',
      glyph: 'LIB'
    },
    {
      title: 'Password Generator',
      description: 'A password generator that creates strong, customisable passwords with a strength meter.',
      tags: ['Python', 'Streamlit', 'Security'],
      url: 'https://passwordgenerate-cwzi2sbwpftrvqudlfjhxf.streamlit.app/',
      image: 'assets/img/projects/password-generator.jpg',
      category: 'python-ai',
      glyph: 'PASS'
    }
  ];

  const TYPED_ROLES = ['Full Stack Developer', 'AI Developer', 'Agentic AI Builder'];

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;


  /* ========================================================================
     02. HELPERS
     ======================================================================== */

  /** Shorthand for querySelector. */
  const $ = (selector, scope) => (scope || document).querySelector(selector);

  /** Shorthand for querySelectorAll, returned as a real array. */
  const $$ = (selector, scope) => Array.from((scope || document).querySelectorAll(selector));

  /**
   * Escapes text before it is inserted into an HTML template so project data
   * can never break the markup.
   */
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /** Shows a short-lived message at the bottom of the screen. */
  let toastTimer = null;
  function showToast(message) {
    let toast = $('.toast');

    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('is-visible');

    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2200);
  }


  /* ========================================================================
     03. THEME TOGGLE
     ======================================================================== */

  const THEME_KEY = 'portfolio-theme';

  function initTheme() {
    const root = document.documentElement;
    const toggle = $('#themeToggle');

    /** Keeps the button label in sync with the current theme. */
    function syncToggleLabel() {
      if (!toggle) return;
      const isDark = root.getAttribute('data-theme') === 'dark';
      toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }

    /** Applies a theme and remembers it for the next visit. */
    function applyTheme(theme) {
      root.setAttribute('data-theme', theme);
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (error) {
        /* Storage blocked (private mode) — the theme still applies for this visit. */
      }
      syncToggleLabel();
    }

    syncToggleLabel();

    if (toggle) {
      toggle.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    }

    // Follow the OS preference only while the visitor has not chosen manually.
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = (event) => {
      let hasSavedChoice = false;
      try {
        hasSavedChoice = Boolean(localStorage.getItem(THEME_KEY));
      } catch (error) {
        hasSavedChoice = false;
      }
      if (!hasSavedChoice) {
        root.setAttribute('data-theme', event.matches ? 'dark' : 'light');
        syncToggleLabel();
      }
    };

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onSystemChange);
    } else if (typeof media.addListener === 'function') {
      media.addListener(onSystemChange);
    }
  }


  /* ========================================================================
     04. NAVIGATION
     ======================================================================== */

  function initNavigation() {
    const header = $('#header');
    const toggle = $('#navToggle');
    const menu = $('#navMenu');
    const links = $$('.navbar__link');

    /* --- Mobile hamburger menu --- */
    function closeMenu() {
      if (!menu || !toggle) return;
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      document.body.style.overflow = '';
    }

    function openMenu() {
      if (!menu || !toggle) return;
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation menu');
      document.body.style.overflow = 'hidden';
    }

    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      // Close after tapping a link (the browser still handles the smooth scroll).
      $$('a', menu).forEach((link) => link.addEventListener('click', closeMenu));

      // Escape closes the menu and returns focus to the button.
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menu.classList.contains('is-open')) {
          closeMenu();
          toggle.focus();
        }
      });

      // Clicking outside closes it too.
      document.addEventListener('click', (event) => {
        if (!menu.classList.contains('is-open')) return;
        if (menu.contains(event.target) || toggle.contains(event.target)) return;
        closeMenu();
      });

      // Returning to desktop width should reset the mobile state.
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) closeMenu();
      });
    }

    /* --- Active link highlighting --- */
    const sections = $$('main section[id]');

    if ('IntersectionObserver' in window && sections.length) {
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.getAttribute('id');
            links.forEach((link) => {
              const isMatch = link.getAttribute('href') === '#' + id;
              link.classList.toggle('is-active', isMatch);
              if (isMatch) {
                link.setAttribute('aria-current', 'true');
              } else {
                link.removeAttribute('aria-current');
              }
            });
          });
        },
        // A thin band across the middle of the viewport decides the active section.
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
      );

      sections.forEach((section) => spy.observe(section));
    }

    /* --- Header shadow + back-to-top visibility on scroll --- */
    const toTop = $('#toTop');
    let ticking = false;

    function onScrollFrame() {
      const offset = window.scrollY;

      if (header) header.classList.toggle('is-scrolled', offset > 8);
      if (toTop) toTop.classList.toggle('is-visible', offset > 400);

      ticking = false;
    }

    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(onScrollFrame);
      },
      { passive: true }
    );

    onScrollFrame();
  }


  /* ========================================================================
     05. HERO
     ======================================================================== */

  /** Types and deletes each role in a loop. */
  function initTypingAnimation() {
    const target = $('#typedRole');
    if (!target) return;

    // Reduced motion: show a single static role and skip the animation.
    if (prefersReducedMotion) {
      target.textContent = TYPED_ROLES[0];
      return;
    }

    const TYPE_SPEED = 85;
    const DELETE_SPEED = 45;
    const HOLD_TIME = 1600;

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function tick() {
      const role = TYPED_ROLES[roleIndex];

      if (isDeleting) {
        charIndex -= 1;
      } else {
        charIndex += 1;
      }

      target.textContent = role.slice(0, charIndex);

      let delay = isDeleting ? DELETE_SPEED : TYPE_SPEED;

      if (!isDeleting && charIndex === role.length) {
        // Finished typing — hold, then start deleting.
        isDeleting = true;
        delay = HOLD_TIME;
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting — move on to the next role.
        isDeleting = false;
        roleIndex = (roleIndex + 1) % TYPED_ROLES.length;
        delay = 320;
      }

      window.setTimeout(tick, delay);
    }

    tick();
  }

  /** Counts each stat up from zero the first time it scrolls into view. */
  function initStatCounters() {
    const counters = $$('[data-count-to]');
    if (!counters.length) return;

    function runCounter(el) {
      const target = Number(el.getAttribute('data-count-to')) || 0;
      const suffix = el.getAttribute('data-suffix') || '';

      if (prefersReducedMotion) {
        el.textContent = target + suffix;
        return;
      }

      const DURATION = 1500;
      const start = performance.now();

      function frame(now) {
        const progress = Math.min((now - start) / DURATION, 1);
        // easeOutCubic keeps the count fast at first, then settles.
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;

        if (progress < 1) window.requestAnimationFrame(frame);
      }

      window.requestAnimationFrame(frame);
    }

    if (!('IntersectionObserver' in window)) {
      counters.forEach(runCounter);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  /** Hides the profile photo if the file is missing, revealing the initials. */
  function initProfilePhoto() {
    const img = $('#profileImg');
    if (!img) return;

    function reveal() {
      img.classList.add('is-loaded');
    }

    // Already cached and decoded before this script ran.
    if (img.complete && img.naturalWidth > 0) {
      reveal();
      return;
    }

    // Already failed before this script ran (assets/img/profile.jpg is missing).
    if (img.complete && img.naturalWidth === 0) {
      img.remove();
      return;
    }

    img.addEventListener('load', reveal);
    img.addEventListener('error', () => {
      // No profile.jpg yet — the gradient initials placeholder stays visible.
      img.remove();
    });
  }


  /* ========================================================================
     06. SCROLL REVEAL
     ======================================================================== */

  let revealObserver = null;

  function initScrollReveal() {
    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
      $$('.reveal').forEach((el) => el.classList.add('is-visible'));
      return;
    }

    revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    observeReveals(document);
  }

  /** Starts observing any un-revealed elements inside `scope`. */
  function observeReveals(scope) {
    const elements = $$('.reveal', scope);

    elements.forEach((el) => {
      if (el.classList.contains('is-visible')) return;

      if (revealObserver) {
        revealObserver.observe(el);
      } else {
        el.classList.add('is-visible');
      }
    });
  }


  /* ========================================================================
     07. PROJECTS
     ======================================================================== */

  function initProjects() {
    const grid = $('#projectsGrid');
    const emptyState = $('#projectsEmpty');
    const countStatus = $('#projectsCount');
    const filterButtons = $$('.filter');

    if (!grid) return;

    const arrowIcon =
      '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M14 4h6v6"></path><path d="M20 4 10 14"></path>' +
      '<path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"></path></svg>';

    /** Builds the markup for a single project card. */
    function createCard(project, index) {
      const item = document.createElement('li');
      item.className = 'card project reveal';
      item.style.transitionDelay = Math.min(index, 6) * 60 + 'ms';

      const tags = project.tags
        .map((tag) => '<li class="project__tag">' + escapeHtml(tag) + '</li>')
        .join('');

      item.innerHTML =
        '<div class="project__media">' +
        // Sits behind the thumbnail and doubles as the fallback placeholder.
        '<span class="project__glyph" aria-hidden="true">' + escapeHtml(project.glyph) + '</span>' +
        '<img class="project__thumb" src="' + escapeHtml(project.image) + '"' +
        ' alt="Screenshot of the ' + escapeHtml(project.title) + ' project"' +
        ' width="800" height="500" loading="lazy" decoding="async">' +
        // Decorative — the real link below is the accessible control.
        '<span class="project__overlay" aria-hidden="true">' +
        '<span class="project__overlay-label">View Project' + arrowIcon + '</span>' +
        '</span>' +
        '</div>' +
        '<div class="project__body">' +
        '<h3 class="project__title">' + escapeHtml(project.title) + '</h3>' +
        '<p class="project__text">' + escapeHtml(project.description) + '</p>' +
        '<ul class="project__tags" aria-label="Technologies used">' + tags + '</ul>' +
        '<a class="project__link" href="' + escapeHtml(project.url) + '" target="_blank" ' +
        'rel="noopener noreferrer" aria-label="View ' + escapeHtml(project.title) +
        ' (opens in a new tab)">View Project' + arrowIcon + '</a>' +
        '</div>';

      initThumbnail(item);

      return item;
    }

    /**
     * Degrades a thumbnail in two steps when an image cannot be shown:
     *   1. fall back to the matching .svg placeholder in the same folder
     *   2. if that fails too, hide the <img> so the gradient and glyph already
     *      sitting underneath the card become the visible artwork
     */
    function initThumbnail(card) {
      const thumb = $('.project__thumb', card);
      if (!thumb) return;

      const JPG = /\.jpg$/i;

      const showPlaceholder = () => thumb.classList.add('is-missing');

      function handleError() {
        const current = thumb.getAttribute('src') || '';

        // Still on the photo — swap to the SVG placeholder and try again.
        if (JPG.test(current)) {
          thumb.setAttribute('src', current.replace(JPG, '.svg'));
          return;
        }

        showPlaceholder();
      }

      // Not `once`: a second error promotes the SVG to the gradient.
      thumb.addEventListener('error', handleError);

      // The image may already have failed before this listener was attached.
      if (thumb.complete && thumb.naturalWidth === 0) handleError();
    }

    /** Renders the cards matching the given category. */
    function render(category, animate) {
      const visible =
        category === 'all'
          ? PROJECTS
          : PROJECTS.filter((project) => project.category === category);

      grid.innerHTML = '';

      visible.forEach((project, index) => {
        const card = createCard(project, animate ? index : 0);

        if (!animate) {
          // Filtering should not re-trigger the reveal animation.
          card.style.transitionDelay = '';
          card.classList.add('is-visible');
        }

        grid.appendChild(card);
      });

      if (emptyState) emptyState.hidden = visible.length > 0;

      // Announced politely to screen readers when the filter changes.
      if (countStatus) {
        countStatus.textContent =
          'Showing ' + visible.length + ' of ' + PROJECTS.length + ' projects.';
      }

      if (animate) observeReveals(grid);
    }

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        if (button.classList.contains('is-active')) return;

        filterButtons.forEach((other) => {
          other.classList.remove('is-active');
          other.setAttribute('aria-pressed', 'false');
        });

        button.classList.add('is-active');
        button.setAttribute('aria-pressed', 'true');

        render(button.getAttribute('data-filter'), false);
      });
    });

    // First paint: animate the cards in as the user scrolls to them.
    render('all', true);
  }


  /* ========================================================================
     08. CONTACT
     ======================================================================== */

  function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;

    const submitBtn = $('#submitBtn');
    const status = $('#formStatus');
    const messageInput = $('#message');
    const messageCount = $('#messageCount');

    /**
     * Named-field lookup. `namedItem` is used instead of `form.elements.name`
     * so a field can never be shadowed by a built-in collection property.
     */
    function getField(name) {
      return form.elements.namedItem(name);
    }

    /* --- Validation rules, one entry per field --- */
    const RULES = {
      name: (value) => {
        if (!value) return 'Please enter your name.';
        if (value.length < 2) return 'Name must be at least 2 characters.';
        return '';
      },
      email: (value) => {
        if (!value) return 'Please enter your email address.';
        if (!EMAIL_PATTERN.test(value)) return 'Please enter a valid email address (e.g. you@example.com).';
        return '';
      },
      subject: (value) => {
        if (!value) return 'Please enter a subject.';
        if (value.length < 3) return 'Subject must be at least 3 characters.';
        return '';
      },
      message: (value) => {
        if (!value) return 'Please enter a message.';
        if (value.length < MIN_MESSAGE_LENGTH) {
          return 'Message must be at least ' + MIN_MESSAGE_LENGTH + ' characters (' + value.length + ' so far).';
        }
        return '';
      }
    };

    /** Writes (or clears) the inline error for one field. */
    function setFieldState(field, errorMessage) {
      const wrapper = field.closest('.form__field');
      const errorEl = $('.form__error', wrapper);

      if (errorEl) errorEl.textContent = errorMessage;

      if (wrapper) {
        wrapper.classList.toggle('has-error', Boolean(errorMessage));
        wrapper.classList.toggle('is-valid', !errorMessage && field.value.trim() !== '');
      }

      field.setAttribute('aria-invalid', errorMessage ? 'true' : 'false');
      return !errorMessage;
    }

    /** Validates a single input and reflects the result in the UI. */
    function validateField(field) {
      const rule = RULES[field.name];
      if (!rule) return true;
      return setFieldState(field, rule(field.value.trim()));
    }

    /** Validates every field; returns the first invalid one (or null). */
    function validateForm() {
      let firstInvalid = null;

      Object.keys(RULES).forEach((name) => {
        const field = getField(name);
        if (field && !validateField(field) && !firstInvalid) {
          firstInvalid = field;
        }
      });

      return firstInvalid;
    }

    const fields = Object.keys(RULES)
      .map((name) => getField(name))
      .filter(Boolean);

    fields.forEach((field) => {
      // Validate while typing, but only once the field has been touched.
      field.addEventListener('blur', () => validateField(field));

      field.addEventListener('input', () => {
        const wrapper = field.closest('.form__field');
        // Live feedback only after an error has already been shown.
        if (wrapper && wrapper.classList.contains('has-error')) validateField(field);
      });
    });

    /* --- Live character counter for the message --- */
    if (messageInput && messageCount) {
      messageInput.addEventListener('input', () => {
        messageCount.textContent = String(messageInput.value.trim().length);
      });
    }

    /* --- Status messaging --- */
    function setStatus(message, type) {
      if (!status) return;
      status.textContent = message;
      status.classList.remove('is-success', 'is-error');
      if (type) status.classList.add('is-' + type);
    }

    function setLoading(isLoading) {
      if (!submitBtn) return;
      submitBtn.classList.toggle('is-loading', isLoading);
      submitBtn.disabled = isLoading;
      submitBtn.setAttribute('aria-busy', isLoading ? 'true' : 'false');

      const label = $('.btn__label', submitBtn);
      if (label) label.textContent = isLoading ? 'Sending…' : 'Send Message';
    }

    /** Fallback path: hand the message to the visitor's email client. */
    function openMailtoFallback(data) {
      const subject = encodeURIComponent(data.subject);
      const body = encodeURIComponent(
        data.message + '\n\n—\n' + data.name + '\n' + data.email
      );
      window.location.href =
        'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;
    }

    /* --- Submit --- */
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (submitBtn && submitBtn.disabled) return; // Guards double submits.

      // Honeypot: a filled hidden field means a bot — pretend it worked and stop.
      const honeypot = getField('_gotcha');
      if (honeypot && honeypot.value) {
        form.reset();
        setStatus('Thanks! Your message has been sent.', 'success');
        return;
      }

      const firstInvalid = validateForm();

      if (firstInvalid) {
        setStatus('Please fix the highlighted fields and try again.', 'error');
        firstInvalid.focus();
        return;
      }

      const data = {
        name: getField('name').value.trim(),
        email: getField('email').value.trim(),
        subject: getField('subject').value.trim(),
        message: getField('message').value.trim()
      };

      // No real endpoint configured yet — use the mailto fallback instead.
      if (FORM_ENDPOINT.indexOf('YOUR_FORM_ID') !== -1) {
        openMailtoFallback(data);
        setStatus(
          'Opening your email app… (The Formspree endpoint has not been configured yet.)',
          'success'
        );
        return;
      }

      setLoading(true);
      setStatus('Sending your message…', null);

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((response) => {
          if (!response.ok) throw new Error('Request failed with status ' + response.status);
          return response.json().catch(() => ({}));
        })
        .then(() => {
          form.reset();
          if (messageCount) messageCount.textContent = '0';
          $$('.form__field', form).forEach((wrapper) => {
            wrapper.classList.remove('has-error', 'is-valid');
          });
          setStatus('Thanks, ' + data.name + '! Your message has been sent — I will reply soon.', 'success');
        })
        .catch(() => {
          setStatus(
            'Sorry, something went wrong. Please email me directly at ' + CONTACT_EMAIL + '.',
            'error'
          );
        })
        .finally(() => {
          setLoading(false);
        });
    });

    /* --- Copy-to-clipboard buttons --- */
    $$('.copy-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const value = button.getAttribute('data-copy') || '';

        const markCopied = () => {
          button.classList.add('is-copied');
          showToast('Copied: ' + value);
          window.setTimeout(() => button.classList.remove('is-copied'), 1800);
        };

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(value).then(markCopied).catch(fallbackCopy);
        } else {
          fallbackCopy();
        }

        // Works on http:// and older browsers where the async API is blocked.
        function fallbackCopy() {
          const helper = document.createElement('textarea');
          helper.value = value;
          helper.setAttribute('readonly', '');
          helper.style.position = 'fixed';
          helper.style.opacity = '0';
          document.body.appendChild(helper);
          helper.select();

          try {
            document.execCommand('copy');
            markCopied();
          } catch (error) {
            showToast('Copy failed — please copy manually.');
          }

          document.body.removeChild(helper);
        }
      });
    });
  }


  /* ========================================================================
     09. BACK TO TOP
     ======================================================================== */

  function initBackToTop() {
    const button = $('#toTop');
    if (!button) return;

    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }


  /* ========================================================================
     10. INIT
     ======================================================================== */

  function init() {
    initTheme();
    initNavigation();
    initTypingAnimation();
    initStatCounters();
    initProfilePhoto();
    // Scroll reveal is set up before the projects render so freshly created
    // cards are observed instead of being shown immediately.
    initScrollReveal();
    initProjects();
    initContactForm();
    initBackToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
