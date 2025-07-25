// TechFlow Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initializeAnimations();
    initializeCounters();
    initializeContactForm();
    initializeNewsletterForm();
    initializeScrollAnimations();
    initializeInteractiveElements();
    
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
});

// Animation Initialization
function initializeAnimations() {
    // Add entrance animations to elements
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Contact Form Handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        // Validate form
        if (contactForm.checkValidity()) {
            handleFormSubmission(contactForm);
        } else {
            contactForm.classList.add('was-validated');
            showFormError('Please fill in all required fields correctly.');
        }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });
}

// Form Submission Handler
function handleFormSubmission(form) {
    const submitBtn = form.querySelector('#submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
    submitBtn.classList.add('loading');
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        form.reset();
        form.classList.remove('was-validated');
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove('loading');
        
        // Show success message
        showSuccessMessage('Thank you for your message! We\'ll get back to you within 24 hours.');
        
        // Scroll to top of form
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    }, 2000);
}

// Field Validation
function validateField(field) {
    const isValid = field.checkValidity();
    
    if (isValid) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
    }
    
    return isValid;
}

// Newsletter Form
function initializeNewsletterForm() {
    const newsletterBtns = document.querySelectorAll('#newsletter-btn');
    
    newsletterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const emailInput = this.previousElementSibling;
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                handleNewsletterSubscription(email, this);
            } else {
                showFormError('Please enter a valid email address.');
                emailInput.focus();
            }
        });
    });
    
    // Handle Enter key in newsletter inputs
    const newsletterInputs = document.querySelectorAll('#newsletter-email');
    newsletterInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.nextElementSibling.click();
            }
        });
    });
}

// Newsletter Subscription Handler
function handleNewsletterSubscription(email, button) {
    const originalText = button.innerHTML;
    
    // Show loading state
    button.disabled = true;
    button.innerHTML = '<i class="bi bi-hourglass-split"></i>';
    
    // Simulate subscription (replace with actual API call)
    setTimeout(() => {
        button.disabled = false;
        button.innerHTML = '<i class="bi bi-check"></i>';
        
        showSuccessMessage(`Successfully subscribed ${email} to our newsletter!`);
        
        // Reset after 3 seconds
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 3000);
        
    }, 1500);
}

// Scroll Animations
function initializeScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    scrollElements.forEach(el => {
        scrollObserver.observe(el);
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    // Schedule Call Button
    const scheduleBtn = document.getElementById('schedule-call-btn');
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', function() {
            showInfoMessage('Call scheduling feature coming soon! Please use the contact form for now.');
        });
    }
    
    // Request Quote Button
    const quoteBtn = document.getElementById('request-quote-btn');
    if (quoteBtn) {
        quoteBtn.addEventListener('click', function() {
            showInfoMessage('Quote request feature coming soon! Please use the contact form for now.');
        });
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .service-card, .team-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Social link interactions
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showInfoMessage('Social media links will be activated soon!');
        });
    });
}

// Utility Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showFormError(message) {
    showMessage(message, 'danger');
}

function showInfoMessage(message) {
    showMessage(message, 'info');
}

function showMessage(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert-custom');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show alert-custom position-fixed`;
    alert.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 1050;
        min-width: 300px;
        max-width: 500px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        border-radius: 10px;
        border: none;
    `;
    
    alert.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-${getIconForType(type)} me-2"></i>
            <div>${message}</div>
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 150);
        }
    }, 5000);
}

function getIconForType(type) {
    const icons = {
        'success': 'check-circle-fill',
        'danger': 'exclamation-triangle-fill',
        'warning': 'exclamation-triangle-fill',
        'info': 'info-circle-fill'
    };
    return icons[type] || 'info-circle-fill';
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
        navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.classList.remove('navbar-scrolled');
        navbar.style.backgroundColor = '';
        navbar.style.backdropFilter = '';
    }
});

// Preloader (if exists)
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Add any scroll-based functionality here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

function safeQuerySelectorAll(selector) {
    try {
        return document.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Elements not found: ${selector}`);
        return [];
    }
}

// Console welcome message
console.log(`
🚀 TechFlow Website Loaded Successfully!
📧 Contact: hello@techflow.com
🌐 Built with Bootstrap 5 & Vanilla JavaScript
`);

// Export functions for potential external use
window.TechFlow = {
    showMessage,
    showSuccessMessage,
    showFormError,
    showInfoMessage,
    validateEmail
};
