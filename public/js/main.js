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
    
    // Animate statistics counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
      // Check if element is in viewport
      function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      }
      
      // Animate counter from 0 to target number
      function animateCounter(element, target) {
        let count = 0;
        const duration = 2000; // Animation duration in milliseconds
        const frameDuration = 1000 / 60; // 60 frames per second
        const totalFrames = Math.round(duration / frameDuration);
        const increment = target / totalFrames;
        
        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            element.textContent = target;
            clearInterval(timer);
          } else {
            element.textContent = Math.floor(count);
          }
        }, frameDuration);
      }
      
      // Start animation when stats section comes into view
      let animated = false;
      
      function checkStats() {
        if (!animated && isInViewport(document.querySelector('.stats-section'))) {
          statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count') || stat.textContent, 10);
            animateCounter(stat, target);
          });
          animated = true;
          window.removeEventListener('scroll', checkStats);
        }
      }
      
      window.addEventListener('scroll', checkStats);
      // Check on initial load as well
      checkStats();
    }
    
    // Simple testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider) {
      const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
      let currentSlide = 0;
      
      // Initially hide all slides except the first one
      slides.forEach((slide, index) => {
        if (index !== 0) {
          slide.style.display = 'none';
        }
      });
      
      // Function to show the next slide
      function nextSlide() {
        slides[currentSlide].style.display = 'none';
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.display = 'block';
      }
      
      // Auto-advance slides every 5 seconds
      setInterval(nextSlide, 5000);
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
    
    // Optional: Add a verse of the day to the footer
    const verseContainer = document.querySelector('.verse-container');
    
    if (verseContainer) {
      // Array of Bible verses focusing on service, purpose, and faith
      const verses = [
        {
          text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
          reference: "Colossians 3:23"
        },
        {
          text: "Each of you should use whatever gift you have received to serve others, as faithful stewards of God's grace in its various forms.",
          reference: "1 Peter 4:10"
        },
        {
          text: "For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
          reference: "Ephesians 2:10"
        },
        {
          text: "Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.",
          reference: "Matthew 5:16"
        },
        {
          text: "Commit to the Lord whatever you do, and he will establish your plans.",
          reference: "Proverbs 16:3"
        }
      ];
      
      // Get random verse
      const randomVerse = verses[Math.floor(Math.random() * verses.length)];
      
      // Create verse elements
      const verseQuote = document.createElement('div');
      verseQuote.className = 'verse-quote';
      verseQuote.textContent = randomVerse.text;
      
      const verseReference = document.createElement('div');
      verseReference.className = 'verse-reference';
      verseReference.textContent = randomVerse.reference;
      
      // Add to container
      verseContainer.appendChild(verseQuote);
      verseContainer.appendChild(verseReference);
    }
    
    // Dynamic copyright year
    const yearElement = document.querySelector('.copyright');
    if (yearElement) {
      const year = new Date().getFullYear();
      yearElement.innerHTML = yearElement.innerHTML.replace(/\d{4}/, year);
    }
  });