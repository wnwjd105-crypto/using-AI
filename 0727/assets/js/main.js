/**
 * ==========================================================================
 * MMDD_portfolio_v2 - Main Application Logic
 * Developer: Joo Jeonghoon (주정훈)
 * Features:
 *   1. Horizontal Slide Track Controller (CSS Transform + Flex)
 *   2. macOS Terminal Interactive Typing Engine
 *   3. IntersectionObserver & Dynamic Reveal Animations
 *   4. Skill Progress Bar Trigger
 *   5. Keyboard, Touch Swipe & Wheel Navigation Support
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. DOM Elements & State Management
  // --------------------------------------------------------------------------
  const track = document.getElementById('mainTrack');
  const sections = document.querySelectorAll('.slide-section');
  const navLinks = document.querySelectorAll('.nav-link');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const currentNumEl = document.getElementById('slideCounterCurrent');
  const typingTarget = document.getElementById('terminalTyping');
  const contactForm = document.getElementById('quickMessageForm');
  const formFeedback = document.getElementById('formFeedback');

  let currentSlide = 0;
  const totalSlides = sections.length;
  let isSliding = false;
  let hasTyped = false;

  // --------------------------------------------------------------------------
  // 2. Horizontal Slide Track Navigation Engine
  // --------------------------------------------------------------------------
  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    if (isSliding && index === currentSlide) return;

    isSliding = true;
    currentSlide = index;

    // A. Move Track via CSS Transform
    track.style.transform = `translateX(-${currentSlide * 100}vw)`;

    // B. Update Slide Section Active Class (Triggers reveal animations)
    sections.forEach((sec, idx) => {
      if (idx === currentSlide) {
        sec.classList.add('is-active');
      } else {
        sec.classList.remove('is-active');
      }
    });

    // C. Update Top Nav Links
    navLinks.forEach((link) => {
      const targetIdx = parseInt(link.getAttribute('data-slide'), 10);
      if (targetIdx === currentSlide) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    // D. Update Bottom Progress Dots
    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // E. Update Counter Text (01 / 06 format)
    if (currentNumEl) {
      currentNumEl.textContent = `0${currentSlide + 1}`;
    }

    // F. Update Prev / Next Buttons State
    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;

    // G. Trigger specific section interactive effects
    handleSectionEffects(currentSlide);

    // Release sliding lock after transition
    setTimeout(() => {
      isSliding = false;
    }, 750);
  }

  // Handle section-specific triggers
  function handleSectionEffects(slideIndex) {
    // Slide 2: Skills Progress Fill Animation
    if (slideIndex === 2) {
      animateSkillBars();
    }
  }

  function animateSkillBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    progressFills.forEach((fill) => {
      const targetWidth = fill.getAttribute('data-pct') || '0%';
      fill.style.width = targetWidth;
    });
  }

  // --------------------------------------------------------------------------
  // 3. macOS Terminal Typing Animation
  // --------------------------------------------------------------------------
  function runTerminalTyping() {
    if (hasTyped || !typingTarget) return;
    hasTyped = true;

    const fullMessage =
      "Connecting Hardware, Communication, and Software. I am Joo Jeonghoon, a Full-Stack Systems Engineer.";
    let charIndex = 0;
    typingTarget.textContent = '';

    function typeNextChar() {
      if (charIndex < fullMessage.length) {
        typingTarget.textContent += fullMessage.charAt(charIndex);
        charIndex++;
        // Natural typing variation
        const delay = Math.floor(Math.random() * 25) + 30;
        setTimeout(typeNextChar, delay);
      }
    }

    // Start with a brief natural pause
    setTimeout(typeNextChar, 350);
  }

  // --------------------------------------------------------------------------
  // 4. Event Listeners & Controls
  // --------------------------------------------------------------------------

  // Top Nav Click Events
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIdx = parseInt(link.getAttribute('data-slide'), 10);
      if (!isNaN(targetIdx)) {
        goToSlide(targetIdx);
      }
    });
  });

  // Bottom Dots Click Events
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetIdx = parseInt(dot.getAttribute('data-slide'), 10);
      if (!isNaN(targetIdx)) {
        goToSlide(targetIdx);
      }
    });
  });

  // Prev / Next Button Clicks
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) goToSlide(currentSlide - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
    });
  }

  // Keyboard Arrow Navigation
  window.addEventListener('keydown', (e) => {
    // Ignore when focus is inside form input or textarea
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      if (currentSlide > 0) goToSlide(currentSlide - 1);
    } else if (e.key === 'Home') {
      goToSlide(0);
    } else if (e.key === 'End') {
      goToSlide(totalSlides - 1);
    }
  });

  // Wheel Scroll Navigation (Debounced horizontal traversal)
  let wheelTimeout = null;
  window.addEventListener(
    'wheel',
    (e) => {
      // Allow internal scrolling if target has scrollable content
      const activeSection = sections[currentSlide];
      const isInsideScrollable =
        activeSection &&
        activeSection.scrollHeight > activeSection.clientHeight &&
        ((e.deltaY > 0 &&
          activeSection.scrollTop + activeSection.clientHeight < activeSection.scrollHeight - 10) ||
          (e.deltaY < 0 && activeSection.scrollTop > 10));

      if (isInsideScrollable) return;

      if (wheelTimeout) return;

      if (Math.abs(e.deltaY) > 30 || Math.abs(e.deltaX) > 30) {
        if (e.deltaY > 0 || e.deltaX > 0) {
          if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
        } else {
          if (currentSlide > 0) goToSlide(currentSlide - 1);
        }

        wheelTimeout = setTimeout(() => {
          wheelTimeout = null;
        }, 800);
      }
    },
    { passive: true }
  );

  // Touch Swipe Gesture Support (Mobile / Tablet)
  let touchStartX = 0;
  let touchStartY = 0;

  window.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    },
    { passive: true }
  );

  window.addEventListener(
    'touchend',
    (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // Ensure horizontal swipe is dominant
      if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0 && currentSlide < totalSlides - 1) {
          goToSlide(currentSlide + 1);
        } else if (diffX < 0 && currentSlide > 0) {
          goToSlide(currentSlide - 1);
        }
      }
    },
    { passive: true }
  );

  // Logo Click -> Return to Home Slide
  const brandLogo = document.querySelector('.brand-logo');
  if (brandLogo) {
    brandLogo.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(0);
    });
  }

  // Any quick jump buttons with data-jump
  document.querySelectorAll('[data-jump]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIdx = parseInt(btn.getAttribute('data-jump'), 10);
      if (!isNaN(targetIdx)) {
        goToSlide(targetIdx);
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. Contact Form Simulator
  // --------------------------------------------------------------------------
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<span>⚡ Dispatching Signal...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<span>✓ Signal Transmitted</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #00f5a0, #00c6ff)';
        if (formFeedback) {
          formFeedback.style.display = 'block';
          formFeedback.textContent =
            'Message delivered to Joo Jeonghoon (Full-Stack Systems Engineer). Confirmation ACK received!';
        }
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          if (formFeedback) formFeedback.style.display = 'none';
        }, 4000);
      }, 1000);
    });
  }

  // --------------------------------------------------------------------------
  // 6. Initial Initialization
  // --------------------------------------------------------------------------
  goToSlide(0);
  runTerminalTyping();
});
