/* ==========================================================================
   Group Portfolio Main JavaScript
   Controls interactive elements, mobile navigation, and page state.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle Handler
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      const isExpanded = navLinks.classList.contains('show');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('show');
      }
    });
  }

  // 2. Active Link Highlighting based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function highlightActiveNav() {
    let currentScroll = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav);

  // 3. Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        navLinks?.classList.remove('show');
        
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
