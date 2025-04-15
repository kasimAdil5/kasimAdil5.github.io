/* Enhanced animations and visual effects for English Learning Website */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements when they come into view
    initializeAnimations();
    
    // Initialize resource preview hover effects
    initializeResourcePreviews();
    
    // Add color transitions to section headers
    animateSectionHeaders();
    
    // Add shadow effects to cards
    enhanceCardEffects();
    
    // Initialize animated progress bars
    initializeProgressBars();
});

// Initialize animations for elements when they come into view
function initializeAnimations() {
    // Get all elements that should be animated
    const animatedElements = document.querySelectorAll('.overview-item, .month-goals, .weekly-breakdown, .schedule-item, .tracking-item, .tip-item, .usage-step');
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If element is in view
            if (entry.isIntersecting) {
                // Add animation class based on element type
                if (entry.target.classList.contains('overview-item')) {
                    entry.target.classList.add('animate-fadeIn');
                } else if (entry.target.classList.contains('month-goals')) {
                    entry.target.classList.add('animate-slideInLeft');
                } else if (entry.target.classList.contains('weekly-breakdown')) {
                    entry.target.classList.add('animate-slideInRight');
                } else if (entry.target.classList.contains('schedule-item')) {
                    entry.target.classList.add('animate-slideInUp');
                } else if (entry.target.classList.contains('tracking-item')) {
                    entry.target.classList.add('animate-fadeIn');
                } else if (entry.target.classList.contains('tip-item')) {
                    entry.target.classList.add('animate-slideInUp');
                } else if (entry.target.classList.contains('usage-step')) {
                    entry.target.classList.add('animate-slideInLeft');
                }
                
                // Stop observing after animation is added
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });
    
    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize hover effects for resource previews
function initializeResourcePreviews() {
    const resourcePreviews = document.querySelectorAll('.resource-preview');
    
    resourcePreviews.forEach(preview => {
        preview.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        preview.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Animate section headers with color transitions
function animateSectionHeaders() {
    const sectionHeaders = document.querySelectorAll('section h2');
    
    sectionHeaders.forEach(header => {
        header.addEventListener('mouseenter', function() {
            this.style.color = '#4285f4';
        });
        
        header.addEventListener('mouseleave', function() {
            this.style.color = '';
        });
    });
}

// Enhance card hover effects
function enhanceCardEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize animated progress bars
function initializeProgressBars() {
    // This will be called when progress tracking pages are loaded
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const value = bar.getAttribute('data-value') || 0;
        animateProgressBar(bar, value);
    });
}

// Animate a progress bar to a specific value
function animateProgressBar(bar, targetValue) {
    let currentValue = 0;
    const duration = 1500; // Animation duration in ms
    const interval = 20; // Update interval in ms
    const steps = duration / interval;
    const increment = targetValue / steps;
    
    const animation = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(animation);
        }
        
        bar.style.width = currentValue + '%';
        
        // Update text if present
        const textElement = bar.querySelector('.progress-text');
        if (textElement) {
            textElement.textContent = Math.round(currentValue) + '%';
        }
    }, interval);
}

// Add text shadowing effect to important headings
function addTextShadowEffects() {
    const headings = document.querySelectorAll('h1, h2');
    
    headings.forEach(heading => {
        heading.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.1)';
    });
}

// Add this function call to the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    addTextShadowEffects();
});

// Add pulsing effect to important buttons
function addPulsingEffects() {
    const importantButtons = document.querySelectorAll('#reminder-form button, #backToTopBtn');
    
    importantButtons.forEach(button => {
        button.classList.add('animate-pulse');
    });
}

// Add this function call to the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    addPulsingEffects();
});
