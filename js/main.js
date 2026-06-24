/* ============================================
   AMBAR AEROBICS — MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSlider();
  initTestimonialSlider();
  initGalleryLightbox();
  initContactForm();
  initScrollToTop();
  setActiveNavLink();
});

/* ------------------------------------------
   1. STICKY NAVBAR + HAMBURGER
   ------------------------------------------ */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.textContent = '☰';
      });
    });
  }
}

/* ------------------------------------------
   2. HERO IMAGE SLIDER
   ------------------------------------------ */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.querySelector('.hero-arrow.prev');
  const nextBtn = document.querySelector('.hero-arrow.next');

  if (!slides.length) return;

  let currentSlide = 0;
  let autoPlay;

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    autoPlay = setInterval(nextSlide, 4000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlay);
    startAutoPlay();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoPlay();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetAutoPlay();
    });
  });

  startAutoPlay();
}

/* ------------------------------------------
   3. TESTIMONIAL SLIDER
   ------------------------------------------ */
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');

  if (!slides.length) return;

  let current = 0;
  let autoPlay;

  function goTo(index) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function next() {
    goTo(current + 1);
  }

  function startAuto() {
    autoPlay = setInterval(next, 5000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(autoPlay);
      goTo(i);
      startAuto();
    });
  });

  startAuto();
}

/* ------------------------------------------
   4. GALLERY LIGHTBOX
   ------------------------------------------ */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');

  if (!lightbox || !galleryItems.length) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lb-prev');
  const nextBtn = lightbox.querySelector('.lb-next');

  let currentIndex = 0;
  const images = Array.from(galleryItems);

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
  }

  images.forEach((img, index) => {
    img.parentElement.addEventListener('click', () => openLightbox(index));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);

  // Click overlay to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('show')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
}

/* ------------------------------------------
   5. WHATSAPP CONTACT FORM
   ------------------------------------------ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#fullName').value.trim();
    const phone = form.querySelector('#phone').value.trim();
    const email = form.querySelector('#email').value.trim();
    const interest = form.querySelector('#interest').value;
    const message = form.querySelector('#message').value.trim();

    // Basic validation
    if (!name || !phone || !email || !interest) {
      alert('Please fill in all required fields.');
      return;
    }

    // Build WhatsApp message
    let waText = `Name: ${name}%0APhone: ${phone}%0AEmail: ${email}%0AInterest: ${interest}`;
    if (message) {
      waText += `%0AMessage: ${message}`;
    }

    const waURL = `https://wa.me/919321065529?text=${waText}`;
    window.open(waURL, '_blank');
  });
}

/* ------------------------------------------
   6. SCROLL TO TOP
   ------------------------------------------ */
function initScrollToTop() {
  const scrollBtn = document.querySelector('.scroll-top');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ------------------------------------------
   7. ACTIVE NAV LINK
   ------------------------------------------ */
function setActiveNavLink() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
