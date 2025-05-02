/**
 * PaperPrint - Premium Printing Solutions
 * Main JavaScript file
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the site
  initPreloader();
  initThemeToggle();
  initMobileMenu();
  initScrollEffects();
  initStickyHeader();
  initBackToTop();
  initAnimations();
  initTestimonialSlider();
  initPricingTabs();
  initSplitText();
  
  // Manually trigger animations for initial visible elements
  animateOnScroll();
});

/**
 * Preloader functionality
 */
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  
  if (preloader) {
    // Hide preloader after site is loaded
    window.addEventListener('load', function() {
      setTimeout(function() {
        preloader.classList.add('loaded');
      }, 500);
    });
  }
}

/**
 * Theme toggle (light/dark mode)
 */
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  
  if (themeToggle) {
    // Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply dark mode if saved preference is dark or if user prefers dark
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark-mode');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      
      // Save preference
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });
  }
}

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const header = document.querySelector('.header');
  const dropdowns = document.querySelectorAll('.dropdown');
  
  if (menuToggle && header) {
    // Toggle menu on button click
    menuToggle.addEventListener('click', function() {
      document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (document.body.classList.contains('menu-open') && 
          !event.target.closest('.main-nav') && 
          !event.target.closest('.mobile-menu-toggle')) {
        document.body.classList.remove('menu-open');
      }
    });
  }
  
  // Handle dropdowns on mobile
  if (window.innerWidth < 992) {
    dropdowns.forEach(dropdown => {
      const link = dropdown.querySelector('.nav-link');
      
      link.addEventListener('click', function(e) {
        if (window.innerWidth < 992) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      });
    });
  }
}

/**
 * Smooth scroll for anchor links
 */
function initScrollEffects() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        document.body.classList.remove('menu-open');
      }
    });
  });
}

/**
 * Sticky header on scroll
 */
function initStickyHeader() {
  const header = document.querySelector('.header');
  
  if (header) {
    const triggerPoint = 100;
    
    function checkScrollPosition() {
      if (window.scrollY > triggerPoint) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    // Check position on initial load
    checkScrollPosition();
    
    // Check position on scroll
    window.addEventListener('scroll', checkScrollPosition);
  }
}

/**
 * Back to top button
 */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (backToTopBtn) {
    const triggerPoint = 600;
    
    function checkScrollPosition() {
      if (window.scrollY > triggerPoint) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    }
    
    // Check position on initial load
    checkScrollPosition();
    
    // Check position on scroll
    window.addEventListener('scroll', checkScrollPosition);
    
    // Scroll to top on button click
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * Scroll animations
 */
function initAnimations() {
  // Animate elements on scroll
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('resize', animateOnScroll);
}

function animateOnScroll() {
  const animatedElements = document.querySelectorAll('[data-animation]');
  
  animatedElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.8;
    
    // Add delay if specified
    let delay = 0;
    if (element.getAttribute('data-delay')) {
      delay = parseInt(element.getAttribute('data-delay'));
    }
    
    if (elementTop < triggerPoint) {
      setTimeout(() => {
        element.classList.add('animated');
      }, delay);
    }
  });
}

/**
 * Testimonial slider
 */
function initTestimonialSlider() {
  const testimonialSlider = document.querySelector('.testimonial-slider');
  
  if (testimonialSlider) {
    const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-arrow.prev');
    const nextBtn = document.querySelector('.testimonial-arrow.next');
    let currentSlide = 0;
    let interval;
    
    // Show slide by index
    function showSlide(index) {
      // Hide all slides
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // Remove active class from all dots
      dots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Show active slide and dot
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      
      currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
      currentSlide++;
      if (currentSlide >= slides.length) {
        currentSlide = 0;
      }
      showSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
      currentSlide--;
      if (currentSlide < 0) {
        currentSlide = slides.length - 1;
      }
      showSlide(currentSlide);
    }
    
    // Add event listeners
    if (nextBtn && prevBtn) {
      nextBtn.addEventListener('click', function() {
        nextSlide();
        resetInterval();
      });
      
      prevBtn.addEventListener('click', function() {
        prevSlide();
        resetInterval();
      });
    }
    
    // Add dot event listeners
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        showSlide(index);
        resetInterval();
      });
    });
    
    // Start automatic sliding
    function startInterval() {
      interval = setInterval(nextSlide, 5000);
    }
    
    // Reset interval after manual navigation
    function resetInterval() {
      clearInterval(interval);
      startInterval();
    }
    
    // Initialize
    startInterval();
    
    // Pause on hover
    testimonialSlider.addEventListener('mouseenter', function() {
      clearInterval(interval);
    });
    
    testimonialSlider.addEventListener('mouseleave', function() {
      startInterval();
    });
  }
}

/**
 * Pricing tabs
 */
function initPricingTabs() {
  const pricingTabs = document.querySelectorAll('.pricing-tab');
  const pricingGroups = document.querySelectorAll('.pricing-group');
  
  if (pricingTabs.length && pricingGroups.length) {
    pricingTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        pricingTabs.forEach(t => {
          t.classList.remove('active');
        });
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Get tab data
        const tabData = this.getAttribute('data-tab');
        
        // Hide all pricing groups
        pricingGroups.forEach(group => {
          group.classList.remove('active');
        });
        
        // Show matching group
        document.querySelector(`[data-tab-content="${tabData}"]`).classList.add('active');
      });
    });
  }
}

/**
 * Split text animation for headings
 */
function initSplitText() {
  const elements = document.querySelectorAll('.split-text');
  
  elements.forEach(element => {
    const text = element.textContent;
    let newHTML = '';
    
    // Split text into individual characters
    for (let i = 0; i < text.length; i++) {
      const char = text[i] === ' ' ? '&nbsp;' : text[i];
      newHTML += `<span class="char" style="animation-delay: ${i * 0.05}s">${char}</span>`;
    }
    
    element.innerHTML = newHTML;
    
    // Add animated class once HTML is updated
    setTimeout(() => {
      element.classList.add('animated');
    }, 10);
  });
}