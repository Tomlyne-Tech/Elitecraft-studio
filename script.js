// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card').forEach(el => {
  observer.observe(el);
});

// Stats counter animation
const statsCounters = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.hero-stats');

const animateStats = () => {
  statsCounters.forEach(counter => {
    const target = counter.innerText;
    const numericTarget = parseInt(target.replace(/[^\d]/g, ''));
    let current = 0;
    const increment = numericTarget / 50;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        current = numericTarget;
        clearInterval(timer);
      }
      
      if (target.includes('+')) {
        counter.innerText = Math.floor(current) + '+';
      } else if (target.includes('/')) {
        counter.innerText = target; // Keep original format for "24/7"
      } else {
        counter.innerText = Math.floor(current);
      }
    }, 20);
  });
};

// Trigger stats animation when section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (statsSection) {
  statsObserver.observe(statsSection);
}

// Form submission handler
const contactForm = document.querySelector('.form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.textContent = 'Message Sent!';
      submitBtn.style.background = '#10b981';
      
      // Reset form
      this.reset();
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 2000);
    }, 1000);
  });
}

// Typing effect for hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const text = heroTitle.innerHTML;
  heroTitle.innerHTML = '';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  };
  
  // Start typing effect after a delay
  setTimeout(typeWriter, 500);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Portfolio filter functionality (if needed in future)
const portfolioItems = document.querySelectorAll('.portfolio-item');
const portfolioFilters = document.querySelectorAll('.portfolio-filter');

portfolioFilters.forEach(filter => {
  filter.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Remove active class from all filters
    portfolioFilters.forEach(f => f.classList.remove('active'));
    // Add active class to clicked filter
    filter.classList.add('active');
    
    const filterValue = filter.getAttribute('data-filter');
    
    portfolioItems.forEach(item => {
      if (filterValue === 'all' || item.classList.contains(filterValue)) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 100);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Loading screen (optional)
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Scroll to top functionality
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Create scroll to top button
const createScrollToTopBtn = () => {
  const btn = document.createElement('button');
  btn.innerHTML = '↑';
  btn.className = 'scroll-to-top';
  btn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1000;
  `;
  
  btn.addEventListener('click', scrollToTop);
  document.body.appendChild(btn);
  
  // Show/hide scroll to top button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.style.opacity = '1';
    } else {
      btn.style.opacity = '0';
    }
  });
};

// Initialize scroll to top button
createScrollToTopBtn();

// Add smooth hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// Tech stack icons animation
document.querySelectorAll('.tech-icon').forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    icon.style.transform = 'translateY(-5px) rotate(5deg)';
  });
  
  icon.addEventListener('mouseleave', () => {
    icon.style.transform = 'translateY(0) rotate(0deg)';
  });
});

// Testimonial slider (if multiple testimonials)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

const showTestimonial = (index) => {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.display = i === index ? 'block' : 'none';
  });
};

const nextTestimonial = () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
};

// Auto-rotate testimonials every 5 seconds
if (testimonials.length > 1) {
  setInterval(nextTestimonial, 5000);
}

// Initialize AOS (Animate On Scroll) alternative
const initScrollAnimations = () => {
  const elements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .feature-item');
  
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(el);
  });
};

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Add loading state to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
  btn.addEventListener('click', function(e) {
    if (this.getAttribute('href') === '#contact') {
      e.preventDefault();
      document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Performance optimization: Throttle scroll events
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
  // Your scroll event handlers here
}, 100));