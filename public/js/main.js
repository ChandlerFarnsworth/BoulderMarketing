/**
 * Boulder Marketing - Main JavaScript
 * Christ-first, Student-led, Rooted in purpose
 */

document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
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
  
  // Mobile navigation toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (mobileMenuToggle && navList) {
    mobileMenuToggle.addEventListener('click', function() {
      navList.classList.toggle('active');
      this.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (navList.classList.contains('active') && !event.target.closest('.main-nav') && event.target !== mobileMenuToggle) {
        navList.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      }
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('.site-header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = targetPosition - headerHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (navList && navList.classList.contains('active')) {
            navList.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
          }
        }
      }
    });
  });
  
  // Scroll to top button functionality
  const scrollTop = document.querySelector('.scroll-top');
  
  if (scrollTop) {
    scrollTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Testimonial card hover effect enhancement
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  if (testimonialCards.length > 0) {
    testimonialCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        testimonialCards.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
      });
    });
    
    // Set the first card as active by default
    testimonialCards[0].classList.add('active');
  }
  
  // Form validation
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      let isValid = true;
      
      // Get form fields
      const nameField = document.getElementById('name');
      const emailField = document.getElementById('email');
      
      // Validate name
      if (!nameField.value.trim()) {
        isValid = false;
        showError(nameField, 'Please enter your name');
      } else {
        removeError(nameField);
      }
      
      // Validate email
      if (!emailField.value.trim()) {
        isValid = false;
        showError(emailField, 'Please enter your email');
      } else if (!isValidEmail(emailField.value.trim())) {
        isValid = false;
        showError(emailField, 'Please enter a valid email address');
      } else {
        removeError(emailField);
      }
      
      // If form is not valid, prevent submission
      if (!isValid) {
        event.preventDefault();
      }
    });
    
    // Helper functions for form validation
    function showError(field, message) {
      // Remove any existing error
      removeError(field);
      
      // Add error class to field
      field.classList.add('error');
      
      // Create and append error message
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.textContent = message;
      
      // Insert error message after the field
      field.parentNode.insertBefore(errorMessage, field.nextSibling);
    }
    
    function removeError(field) {
      // Remove error class
      field.classList.remove('error');
      
      // Remove any existing error message
      const errorMessage = field.parentNode.querySelector('.error-message');
      if (errorMessage) {
        errorMessage.remove();
      }
    }
    
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    // Remove error indication when field is changed
    contactForm.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', function() {
        removeError(this);
      });
    });
  }
  
  // Add subtle animation to values list
  const valueItems = document.querySelectorAll('.value-item');
  if (valueItems.length > 0) {
    // Add animation delay to each value item
    valueItems.forEach((item, index) => {
      item.style.animationDelay = (index * 0.2) + 's';
    });
  }
  
  // Add scripture verse to footer - this is already in the HTML now, so we're removing the JS code
  // that was previously adding it dynamically
  
  // Dynamic copyright year
  const yearElement = document.querySelector('.copyright');
  if (yearElement) {
    const year = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace(/\d{4}/, year);
  }
});