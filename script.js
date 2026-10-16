// script.js
// Image carousel with arrows, keyboard, swipe, and optional autoplay.
// Expects HTML IDs/classes: #carousel, #track, .carousel-slide, #prevBtn, #nextBtn, #carouselStatus

(function () {
  const carousel = document.getElementById('carousel');
  const track = document.getElementById('track');
  const slides = Array.from(track.querySelectorAll('.carousel-slide'));
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const status = document.getElementById('carouselStatus');

  if (!carousel || !track || slides.length === 0) return;

  let currentIndex = 0;
  const total = slides.length;

  // Autoplay settings
  const autoPlay = false;           // set to true to enable autoplay
  const autoPlayInterval = 4000;    // ms
  let autoPlayTimer = null;

  // Swipe / pointer state
  let pointerDown = false;
  let startX = 0;
  let currentTranslate = 0;
  let lastTranslate = 0;
  const swipeThreshold = 50; // px to trigger slide change

  // Ensure track layout is correct
  track.style.display = 'flex';
  track.style.transition = 'transform 320ms cubic-bezier(.22,.9,.35,1)';
  slides.forEach(s => {
    s.style.minWidth = '100%';
    s.style.flexShrink = '0';
    s.setAttribute('role', 'group');
  });

  // Update UI: translate track and update aria/status
  function updateUI() {
    const offsetPercent = -currentIndex * 100;
    track.style.transform = `translateX(${offsetPercent}%)`;

    slides.forEach((s, i) => {
      const hidden = i !== currentIndex;
      s.setAttribute('aria-hidden', hidden ? 'true' : 'false');
      s.tabIndex = hidden ? -1 : 0;
    });

    if (status) status.textContent = `Image ${currentIndex + 1} of ${total}`;
  }

  function showIndex(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    currentIndex = index;
    updateUI();
    resetAutoplay();
  }

  function next() { showIndex(currentIndex + 1); }
  function prev() { showIndex(currentIndex - 1); }

  // Button events
  prevBtn && prevBtn.addEventListener('click', prev);
  nextBtn && nextBtn.addEventListener('click', next);

  // Keyboard support: when carousel or its children are focused
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  });

  // Also allow arrow keys when any element inside carousel is focused
  document.addEventListener('keydown', (e) => {
    const active = document.activeElement;
    if (!carousel.contains(active)) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  });

  // Autoplay helpers
  function startAutoplay() {
    if (!autoPlay) return;
    stopAutoplay();
    autoPlayTimer = setInterval(next, autoPlayInterval);
  }
  function stopAutoplay() {
    if (autoPlayTimer) { clearInterval(autoPlayTimer); autoPlayTimer = null; }
  }
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Pause autoplay on pointer enter / focus
  carousel.addEventListener('pointerenter', stopAutoplay);
  carousel.addEventListener('pointerleave', startAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', startAutoplay);

  // Pointer / touch swipe handling
  track.addEventListener('pointerdown', (e) => {
    pointerDown = true;
    startX = e.clientX;
    lastTranslate = -currentIndex * carousel.clientWidth;
    track.style.transition = 'none';
    track.setPointerCapture(e.pointerId);
  });

  track.addEventListener('pointermove', (e) => {
    if (!pointerDown) return;
    const dx = e.clientX - startX;
    currentTranslate = lastTranslate + dx;
    // convert px to percent for transform
    const percent = (currentTranslate / carousel.clientWidth) * 100;
    track.style.transform = `translateX(${percent}%)`;
  });

  function endPointer(e) {
    if (!pointerDown) return;
    pointerDown = false;
    track.style.transition = 'transform 320ms cubic-bezier(.22,.9,.35,1)';
    const dx = e.clientX - startX;
    if (Math.abs(dx) > swipeThreshold) {
      if (dx < 0) next();
      else prev();
    } else {
      // snap back to current
      updateUI();
    }
    try { track.releasePointerCapture(e.pointerId); } catch (err) {}
  }

  track.addEventListener('pointerup', endPointer);
  track.addEventListener('pointercancel', endPointer);
  track.addEventListener('pointerleave', (e) => {
    // If pointer leaves while pressed, treat as end
    if (pointerDown) endPointer(e);
  });

  // Prevent image dragging interfering with swipe
  track.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
    // clicking an image focuses the carousel so keyboard works
    img.addEventListener('click', () => carousel.focus());
  });

  // Resize observer to keep transforms correct if container width changes
  const ro = new ResizeObserver(() => updateUI());
  ro.observe(carousel);

  // Initialize
  updateUI();
  startAutoplay();

  // Expose simple API for debugging if needed
  window.myCarousel = { next, prev, showIndex, startAutoplay, stopAutoplay };
})();
