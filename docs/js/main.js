/**
 * Boulder Marketing - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Scroll animation for header
  const header = document.querySelector('.site-header');
  const scrollTopBtn = document.querySelector('.scroll-top');
  
  window.addEventListener('scroll', function() {
    // Add scrolled class to header
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Toggle visibility of scroll-to-top button
    if (scrollTopBtn && window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else if (scrollTopBtn) {
      scrollTopBtn.classList.remove('show');
    }
  });
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', function() {
      navList.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      menuToggle.classList.toggle('open');
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const headerHeight = document.querySelector('.site-header').offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = targetPosition - headerHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (navList && navList.classList.contains('active')) {
            navList.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle.classList.remove('open');
          }
        }
      }
    });
  });
  
  // Scroll to top button
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Testimonial slider
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-arrow.prev');
  const nextBtn = document.querySelector('.slider-arrow.next');
  
  if (testimonials.length > 0) {
    let currentSlide = 0;
    
    // Function to switch slide
    function showSlide(index) {
      // Handle bounds
      if (index < 0) index = testimonials.length - 1;
      if (index >= testimonials.length) index = 0;
      
      // Update current slide index
      currentSlide = index;
      
      // Hide all slides and remove active class from dots
      testimonials.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Show current slide and set active dot
      testimonials[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
      
      // Set wrapper height based on active slide height
      const wrapper = document.querySelector('.testimonial-wrapper');
      if (wrapper) {
        const activeSlide = testimonials[currentSlide];
        wrapper.style.height = `${activeSlide.offsetHeight}px`;
      }
    }
    
    // Set initial slide and wrapper height
    showSlide(0);
    
    // Event listeners for next/prev buttons
    if (nextBtn) {
      nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto rotate testimonials
    let slideInterval = setInterval(() => showSlide(currentSlide + 1), 7000);
    
    // Pause auto rotation on hover
    const sliderContainer = document.querySelector('.testimonial-slider');
    
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
      });
      
      sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => showSlide(currentSlide + 1), 7000);
      });
    }
    
    // Update slide height on window resize
    window.addEventListener('resize', () => {
      showSlide(currentSlide);
    });
  }
  
  // Scroll indicator fade out on scroll
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  if (scrollIndicator) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
      } else {
        scrollIndicator.style.opacity = '0.7';
      }
    });
  }
  
  // Reveal elements on scroll (for AOS-like functionality)
  const revealElements = document.querySelectorAll('[data-aos]');
  
  if (revealElements.length > 0) {
    const revealOnScroll = function() {
      revealElements.forEach(function(el) {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
          el.classList.add('revealed');
        }
      });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    // Initial check on page load
    revealOnScroll();
  }
  
  // Portfolio filtering (if on portfolio page)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
  
  // FAQ accordion (if on services or contact page)
  const questionToggles = document.querySelectorAll('.question-toggle');
  
  if (questionToggles.length > 0) {
    questionToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        const faqItem = this.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
          item.classList.remove('active');
          const icon = item.querySelector('.fas');
          if (icon) {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
          }
        });
        
        // If clicked item wasn't active, open it
        if (!isActive) {
          faqItem.classList.add('active');
          const icon = this.querySelector('.fas');
          if (icon) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
          }
        }
      });
    });
  }
});