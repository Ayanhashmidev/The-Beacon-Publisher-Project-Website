// Navbar toggle animation and click backend-like behavior
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });
  // Intersection Observer for fade-up animation on scroll
  const fadeElements = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        // optional: once appeared, unobserve to reduce load
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });

  fadeElements.forEach(el => observer.observe(el));

  // Button click effect: For full experience, show a small friendly console log / alert for demo
  // matches "View All Services" action (no page break, but shows dedication)
  const viewBtn = document.getElementById('viewAllServicesBtn');
  if(viewBtn) {
    viewBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // subtle micro interaction: ripple effect
      viewBtn.style.transform = 'scale(0.98)';
      setTimeout(() => { viewBtn.style.transform = ''; }, 150);
      // You can replace with actual navigation or modal; maintains design spirit
      alert("✨ Explore all premium publishing & marketing services! ✨\n(Full catalog available — from editing to global distribution)");
    });
  }

  // Additional Hover enhancements for stats (just extra polish)
  const stats = document.querySelectorAll('.stat-item');
  stats.forEach(stat => {
    stat.addEventListener('mouseenter', () => {
      const numberSpan = stat.querySelector('.stat-number');
      if(numberSpan) {
        numberSpan.style.transition = 'all 0.2s';
        numberSpan.style.transform = 'scale(1.02)';
      }
    });
    stat.addEventListener('mouseleave', () => {
      const numberSpan = stat.querySelector('.stat-number');
      if(numberSpan) {
        numberSpan.style.transform = 'scale(1)';
      }
    });
  });

  // Make service cards have fluid interaction (already done with css but ensures consistency)
  console.log('Publishing Suite — 100% match to design with responsive & animations');

  // ---------- BOOK DATA (6–7 cards) ----------
  const booksData = [
    {
      title: "The Midnight Library",
      description: "Between life and death lies a library full of infinite possibilities. A profound journey of regret, hope, and second chances.",
      image: "https://picsum.photos/id/20/400/550"
    },
    {
      title: "Project Hail Mary",
      description: "A lone astronaut must save humanity from extinction. Riveting sci-fi with wit, heart, and brilliant problem-solving.",
      image: "https://picsum.photos/id/0/400/550"
    },
    {
      title: "Atomic Habits",
      description: "Tiny changes, remarkable results. Learn how small habits compound into extraordinary transformation.",
      image: "https://picsum.photos/id/1/400/550"
    },
    {
      title: "Where the Crawdads Sing",
      description: "Mystery, romance, and nature blend in this mesmerizing coming-of-age story set in North Carolina marshes.",
      image: "https://picsum.photos/id/101/400/550"
    },
    {
      title: "Dune",
      description: "Epic interstellar saga of politics, religion, and ecology on the desert planet Arrakis. A masterpiece.",
      image: "https://picsum.photos/id/116/400/550"
    },
    {
      title: "The Silent Patient",
      description: "Alicia shoots her husband and never speaks again. A psychological thriller with shocking final twist.",
      image: "https://picsum.photos/id/26/400/550"
    },
    {
      title: "Becoming",
      description: "Intimate memoir by Michelle Obama, inspiring readers with warmth, wisdom, and resilience.",
      image: "https://picsum.photos/id/25/400/550"
    }
  ];

  // DOM elements
  const track = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('dotsContainer');
  const autoToggleBtn = document.getElementById('autoToggleBtn');

  let currentIndex = 0;            // current slide index (card index)
  let visibleCardsCount = 4;       // will be computed dynamically on resize
  let totalCards = booksData.length; // 7 cards
  let autoInterval = null;
  let isAutoPlaying = true;
  let resizeObserverActive = false;

  // Helper: determine visible cards based on current window width
  function getVisibleCardsCount() {
    const width = window.innerWidth;
    if (width >= 1280) return 4;        // large desktop -> 4 cards visible
    if (width >= 1024) return 3;        // desktop 1024–1279 -> 3 cards
    if (width >= 640) return 2;         // tablet -> 2 cards
    return 1;                           // mobile -> 1 card
  }

  // Build cards HTML and also store refs if needed
  function buildSliderCards() {
    track.innerHTML = '';
    booksData.forEach((book, idx) => {
      const card = document.createElement('div');
      card.className = 'book-card';
      // using LoremFlick? but using picsum with consistent book vibes - each image unique
      // optional: add custom image ID to differentiate them further
      card.innerHTML = `
        <div class="card-img">
          <img src="${book.image}" alt="${book.title}" loading="lazy">
        </div>
        <div class="card-content">
          <div class="book-title">${escapeHtml(book.title)}</div>
          <div class="book-description">${escapeHtml(book.description)}</div>
        </div>
      `;
      track.appendChild(card);
    });
  }

  // simple XSS escape
  function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
      return c;
    });
  }

  // update slider position based on currentIndex & visible cards
  function updateSliderPosition() {
    if (!track) return;
    visibleCardsCount = getVisibleCardsCount();
    // Calculate max index: totalCards - visibleCardsCount
    const maxIndex = Math.max(0, totalCards - visibleCardsCount);
    // clamp index
    let safeIndex = currentIndex;
    if (safeIndex > maxIndex) safeIndex = maxIndex;
    if (safeIndex < 0) safeIndex = 0;
    currentIndex = safeIndex;
    
    // get card width including gap (flex basis + margin/gap)
    const cards = document.querySelectorAll('.book-card');
    if (cards.length === 0) return;
    // get computed gap from track style (gap property)
    const trackStyle = window.getComputedStyle(track);
    const gapValue = parseFloat(trackStyle.gap) || 0;
    // card width including margin (actual outer width using offsetWidth)
    const firstCard = cards[0];
    const cardWidth = firstCard.offsetWidth;
    const translateX = - (currentIndex * (cardWidth + gapValue));
    track.style.transform = `translateX(${translateX}px)`;
    
    // update dots active state
    updateDotsActive();
  }

  // update dots based on current "page" concept
  function updateDotsActive() {
    const maxIndex = Math.max(0, totalCards - getVisibleCardsCount());
    const activePage = currentIndex;
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      if (idx === activePage) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // generate pagination dots
  function generateDots() {
    dotsContainer.innerHTML = '';
    const maxIndex = Math.max(0, totalCards - getVisibleCardsCount());
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === currentIndex) dot.classList.add('active');
      dot.addEventListener('click', () => {
        if (isAutoPlaying) stopAutoSlide();
        currentIndex = i;
        updateSliderPosition();
        if (isAutoPlaying) startAutoSlide(); // restart fresh timer
      });
      dotsContainer.appendChild(dot);
    }
    // if no dots or maxIndex <0, keep empty
  }

  // handle next/prev infinite seamless? but we will simulate seamless by using loop (infinite) wrap concept
  // We implement "infinite loop" by resetting index when reaching boundaries but with extra smoothness: when reaching end, jump to start (with transition reset)
  // To make it seamless: we can detect if we hit boundary and then without animation reset the track, but we'll use a smoother method:
  // For better UX, if we are at far right (max index) and click next -> go to 0. If at 0 and click prev -> go to maxIndex.
  // BUT: we need to avoid abrupt visual shift: we will temporarily disable transition, move, then re-enable.
  // However, for simplicity and yet infinite, we implement "rewind" with transition reset trick.
  function goToNext() {
    if (isAutoPlaying) {
      // reset auto timer after manual
      stopAutoSlide();
    }
    const maxPossible = Math.max(0, totalCards - getVisibleCardsCount());
    if (currentIndex >= maxPossible) {
      // seamless infinite: jump to first card (index 0)
      currentIndex = 0;
      updateSliderPosition();
    } else {
      currentIndex++;
      updateSliderPosition();
    }
    if (isAutoPlaying) startAutoSlide();
    generateDots();  // dots might change if visibleCards changes due to resize, but regenerate anyway
    updateSliderPosition();
  }
  
  function goToPrev() {
    if (isAutoPlaying) stopAutoSlide();
    const maxPossible = Math.max(0, totalCards - getVisibleCardsCount());
    if (currentIndex <= 0) {
      // jump to last slide
      currentIndex = maxPossible;
      updateSliderPosition();
    } else {
      currentIndex--;
      updateSliderPosition();
    }
    if (isAutoPlaying) startAutoSlide();
    generateDots();
    updateSliderPosition();
  }
  
  // Auto slide
  function startAutoSlide() {
    if (autoInterval) clearInterval(autoInterval);
    if (!isAutoPlaying) return;
    autoInterval = setInterval(() => {
      goToNext();
    }, 4000);
  }
  
  function stopAutoSlide() {
    if (autoInterval) {
      clearInterval(autoInterval);
      autoInterval = null;
    }
  }
  
  function toggleAutoPlay() {
    if (isAutoPlaying) {
      isAutoPlaying = false;
      stopAutoSlide();
      autoToggleBtn.textContent = '⏸ Auto-slide OFF';
      autoToggleBtn.classList.remove('active');
    } else {
      isAutoPlaying = true;
      startAutoSlide();
      autoToggleBtn.textContent = '▶ Auto-slide ON';
      autoToggleBtn.classList.add('active');
    }
  }
  
  // resize handler: update layout, card spans, recalc position & dots, maintain correct index range
  function handleResize() {
    const newVisible = getVisibleCardsCount();
    const maxNewIndex = Math.max(0, totalCards - newVisible);
    if (currentIndex > maxNewIndex) {
      currentIndex = maxNewIndex;
    }
    generateDots();          // dots count changes based on new visible cards
    updateSliderPosition();  // recalc translation using fresh widths
  }
  
  // For smooth infinite effect and better initial load, we handle track transition end for eventual consistency
  // also attach window resize with debounce
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      handleResize();
    }, 120);
  });
  
  // init function: build, attach events, set initial position, start auto
  function initSlider() {
    buildSliderCards();
    generateDots();
    // initial visible count and set currentIndex = 0
    currentIndex = 0;
    visibleCardsCount = getVisibleCardsCount();
    // ensure translation after images loaded? wait a frame
    setTimeout(() => {
      updateSliderPosition();
    }, 20);
    // event listeners for arrows
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      goToPrev();
    });
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      goToNext();
    });
    autoToggleBtn.addEventListener('click', toggleAutoPlay);
    // start auto playing by default
    isAutoPlaying = true;
    autoToggleBtn.classList.add('active');
    autoToggleBtn.textContent = '▶ Auto-slide ON';
    startAutoSlide();
  }
  
  // make sure that on window load, all fonts/images affect offsetWidth
  window.addEventListener('load', () => {
    initSlider();
    // additional call to ensure after images fully loaded
    setTimeout(() => {
      updateSliderPosition();
      generateDots();
    }, 100);
  });
  
  // optional: for dynamic range when card layout shifts (e.g., font load)
  // use MutationObserver just for safety, but not needed much. Recalculate on window resize anyway.
  // Also listen to orientation change
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      handleResize();
    }, 50);
  });
  
  // Drag to scroll? (extra touch improvement) - nice bonus but not mandatory, we implement lightweight
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let startX = 0;
  
  track.addEventListener('mousedown', dragStart);
  track.addEventListener('touchstart', dragStart);
  window.addEventListener('mousemove', dragMove);
  window.addEventListener('touchmove', dragMove);
  window.addEventListener('mouseup', dragEnd);
  window.addEventListener('touchend', dragEnd);
  
  function dragStart(e) {
    if (isAutoPlaying) stopAutoSlide();
    isDragging = true;
    startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    track.style.transition = 'none';
    startPos = getTranslateX();
    e.preventDefault();
  }
  
  function dragMove(e) {
    if (!isDragging) return;
    const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const diff = currentX - startX;
    let newTranslate = startPos + diff;
    // apply boundaries? but we allow dragging temporarily
    track.style.transform = `translateX(${newTranslate}px)`;
    e.preventDefault();
  }
  
  function dragEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';
    const endX = e.type === 'mouseup' ? e.clientX : (e.changedTouches ? e.changedTouches[0].clientX : startX);
    const dragDelta = (endX - startX);
    const threshold = 50;
    if (Math.abs(dragDelta) > threshold) {
      if (dragDelta > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    } else {
      updateSliderPosition();
    }
    if (isAutoPlaying) startAutoSlide();
  }
  
  function getTranslateX() {
    const style = window.getComputedStyle(track);
    const matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m41;
  }
  
  // ensure that after any manual action we update dots and track
  // also finish update after resize
  window.addEventListener('resize', () => {
    if (autoInterval) {
      if (!isAutoPlaying) return;
      stopAutoSlide();
      startAutoSlide();
    }
  });