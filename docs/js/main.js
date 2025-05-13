/**
 * Boulder Marketing - Home Page JavaScript
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
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
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
          if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
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
      const activeSlide = testimonials[currentSlide];
      wrapper.style.height = `${activeSlide.offsetHeight}px`;
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
});