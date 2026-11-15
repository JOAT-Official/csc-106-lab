/**
 * COS 106 – Introduction to Web Technologies | Practical Term Project
 * Student: Apaokagi Ashraf Abdulquadir (MIVA Open University)
 * File: js/main.js — Shared Navigation, Theme Toggle & Project Case-Study Modal
 */

(function () {
  'use strict';

  const THEME_STORAGE_KEY = 'cos106_editorial_theme';

  // Project case-study data for interactive modal preview on projects.html
  const PROJECT_CASE_STUDIES = {
    insurafix: {
      category: 'PropTech / Subscription Service Platform',
      title: 'Insurafix — Subscription Repair & Maintenance Platform',
      role: 'Product Engineer — Product Strategy, UX Design & Frontend Architecture',
      problem:
        'Homeowners and facility managers face unpredictable repair bills, unvetted artisans, and inflated per-visit labor charges whenever electrical, plumbing, or HVAC faults occur.',
      solution:
        'Designed and engineered a subscription-based maintenance platform that connects subscribers to KYC-vetted, skill-verified artisans on a strict "no extra labor cost" basis, complete with real-time dispatch tracking and SLA monitoring.',
      highlights: [
        'Structured tiered membership coverage waiving 100% of artisan call-out and labor fees.',
        'Built artisan onboarding, skill verification badges, and automated ticket dispatch queues.',
        'Designed high-contrast consumer and artisan web interfaces with transparent parts-only billing.'
      ],
      stack: ['HTML5', 'CSS3', 'TypeScript', 'React', 'Next.js', 'PostgreSQL', 'Figma']
    },
    localroots: {
      category: 'AgTech / Cooperative FinTech',
      title: 'Local Roots — "Ajo" Cooperative Produce Yield Platform',
      role: 'Product Engineer — Systems Design, UX Flows & Web Application',
      problem:
        'High food inflation and capital barriers prevent everyday households from participating in large-scale farming or buying staple produce at farm-gate prices.',
      solution:
        'Built a digital cooperative platform inspired by the traditional Yoruba "Ajo" rotational contribution model, pooling member contributions to fund verified cultivation cycles and distribute calculated produce yields.',
      highlights: [
        'Translated the cultural "Ajo" contribution model into a transparent digital yield calculator.',
        'Reduced household staple food procurement costs by connecting contributors directly to farm harvest pools.',
        'Created interactive cycle tracking dashboards showing planting, vegetative growth, and harvest dispatch stages.'
      ],
      stack: ['React', 'TypeScript', 'Firebase', 'CSS Grid', 'Figma', 'Product Strategy']
    },
    franchiseos: {
      category: 'B2B SaaS / Hospitality & Restaurant Operating System',
      title: 'Franchise OS — Multi-Outlet Restaurant & KDS Suite',
      role: 'Product Engineer — End-to-End Product Design & Frontend Engineering',
      problem:
        'Growing restaurant chains suffer from fragmented point-of-sale tools, delayed kitchen ticket handoffs, and blind spots in multi-branch inventory and revenue reporting.',
      solution:
        'Architected an all-in-one operating software suite unifying three synchronized pillars: a multi-branch Management Dashboard, a real-time Kitchen Display System (KDS), and a frictionless Customer Ordering App.',
      highlights: [
        'Engineered real-time ticket routing between customer orders and station-specific KDS screens.',
        'Designed executive analytics views tracking daily GMV, prep-time SLAs, and ingredient stock alerts across outlets.',
        'Built a cohesive component library supporting dark-mode kitchen displays and mobile customer ordering.'
      ],
      stack: ['Next.js', 'TypeScript', 'Dart', 'PostgreSQL', 'Tailwind / CSS3', 'Figma']
    },
    nitda: {
      category: 'GovTech / Enterprise Monitoring & Evaluation',
      title: 'NITDA Monitoring & Evaluation (M&E) Platform',
      role: 'Lead Product Engineer (Contract) — NITDA',
      problem:
        'Tracking national technology programmes across multiple geopolitical zones required replacing fragmented spreadsheets with a unified, auditable reporting workflow.',
      solution:
        'Led the end-to-end product strategy, UX design, frontend architecture, and deployment of a role-based Monitoring & Evaluation (M&E) platform for the National Information and Technology Development Agency (NITDA).',
      highlights: [
        'Designed role-based dashboards for Field Evaluators, Zonal Coordinators, and Executive Directorates.',
        'Implemented structured data collection workflows, KPI compliance tracking, and automated reporting tools.',
        'Managed the full product lifecycle from stakeholder discovery and Figma prototyping to production release.'
      ],
      stack: ['TypeScript', 'JavaScript', 'React', 'HTML5 / CSS3', 'PostgreSQL', 'System Architecture']
    }
  };

  /**
   * Initialize Light/Dark Editorial Theme
   */
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
    applyTheme(savedTheme);

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem(THEME_STORAGE_KEY, next);
      });
    }
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    const toggleLabel = document.getElementById('theme-toggle-label');
    if (toggleLabel) {
      toggleLabel.textContent = theme === 'dark' ? 'LIGHT' : 'DARK';
    }
  }

  /**
   * Initialize Mobile Navigation Menu Toggle
   */
  function initMobileNav() {
    const menuToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.textContent = isOpen ? 'CLOSE ✕' : 'MENU ☰';
    });

    // Close mobile menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = 'MENU ☰';
      });
    });
  }

  /**
   * Initialize Project Case-Study Modal on projects.html
   */
  function initProjectModal() {
    const modalBackdrop = document.getElementById('project-modal');
    if (!modalBackdrop) return;

    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalRole = document.getElementById('modal-role');
    const modalProblem = document.getElementById('modal-problem');
    const modalSolution = document.getElementById('modal-solution');
    const modalHighlights = document.getElementById('modal-highlights');
    const modalStack = document.getElementById('modal-stack');
    const closeBtn = document.getElementById('modal-close');

    const triggerButtons = document.querySelectorAll('[data-project-modal]');

    triggerButtons.forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.preventDefault();
        const projectKey = btn.getAttribute('data-project-modal');
        const data = PROJECT_CASE_STUDIES[projectKey];
        if (!data) return;

        modalCategory.textContent = data.category;
        modalTitle.textContent = data.title;
        modalRole.textContent = data.role;
        modalProblem.textContent = data.problem;
        modalSolution.textContent = data.solution;

        modalHighlights.innerHTML = '';
        data.highlights.forEach(function (item) {
          const li = document.createElement('li');
          li.textContent = item;
          modalHighlights.appendChild(li);
        });

        modalStack.innerHTML = '';
        data.stack.forEach(function (tech) {
          const li = document.createElement('li');
          li.className = 'badge';
          li.textContent = tech;
          modalStack.appendChild(li);
        });

        modalBackdrop.classList.add('open');
        modalBackdrop.setAttribute('aria-hidden', 'false');
      });
    });

    function closeModal() {
      modalBackdrop.classList.remove('open');
      modalBackdrop.setAttribute('aria-hidden', 'true');
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modalBackdrop.addEventListener('click', function (event) {
      if (event.target === modalBackdrop) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeModal();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initMobileNav();
    initProjectModal();
  });
})();
