// JavaScript for the English Learning Website

// Function to handle tab navigation for monthly plans
function openMonth(evt, monthName) {
    // Hide all month content
    const monthContent = document.getElementsByClassName("month-content");
    for (let i = 0; i < monthContent.length; i++) {
        monthContent[i].classList.remove("active");
    }

    // Remove active class from all month tabs
    const monthTabs = document.getElementsByClassName("month-tab");
    for (let i = 0; i < monthTabs.length; i++) {
        monthTabs[i].classList.remove("active");
    }

    // Show the selected month content and add active class to the clicked tab
    document.getElementById(monthName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Function to handle tab navigation for resources
function openResource(evt, resourceName) {
    // Hide all resource content
    const resourceContent = document.getElementsByClassName("resource-content");
    for (let i = 0; i < resourceContent.length; i++) {
        resourceContent[i].classList.remove("active");
    }

    // Remove active class from all resource tabs
    const resourceTabs = document.getElementsByClassName("resource-tab");
    for (let i = 0; i < resourceTabs.length; i++) {
        resourceTabs[i].classList.remove("active");
    }

    // Show the selected resource content and add active class to the clicked tab
    document.getElementById(resourceName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    
    for (const link of navLinks) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    }
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('main section').forEach(section => {
            if (section.offsetTop <= scrollPosition && 
                section.offsetTop + section.offsetHeight > scrollPosition) {
                
                const currentId = section.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});

// Back to top button functionality
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    const backToTopBtn = document.getElementById("backToTopBtn");
    if (backToTopBtn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add back to top button dynamically
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTopBtn';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.title = 'Back to top';
    backToTopBtn.onclick = scrollToTop;
    
    document.body.appendChild(backToTopBtn);
    
    // Add styles for the button
    const style = document.createElement('style');
    style.innerHTML = `
        #backToTopBtn {
            display: none;
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 99;
            border: none;
            outline: none;
            background-color: var(--primary-color);
            color: white;
            cursor: pointer;
            padding: 15px;
            border-radius: 50%;
            font-size: 18px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        
        #backToTopBtn:hover {
            background-color: #1a6aa8;
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(style);
});

// Progress tracking functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a tracking page
    const trackingForms = document.querySelectorAll('.tracking-form');
    
    trackingForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const formEntries = Object.fromEntries(formData.entries());
            
            // Save to local storage
            const formId = form.id;
            let savedData = JSON.parse(localStorage.getItem(formId)) || [];
            savedData.push({
                date: new Date().toISOString(),
                data: formEntries
            });
            
            localStorage.setItem(formId, JSON.stringify(savedData));
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Progress saved successfully!';
            form.appendChild(successMsg);
            
            // Remove message after 3 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
            
            // Update progress charts if they exist
            if (typeof updateCharts === 'function') {
                updateCharts();
            }
            
            // Reset form if it's not a tracking form that needs to keep values
            if (!form.classList.contains('persistent-form')) {
                form.reset();
            }
        });
    });
    
    // Load saved data for each form
    const loadSavedData = () => {
        trackingForms.forEach(form => {
            const formId = form.id;
            const savedData = JSON.parse(localStorage.getItem(formId));
            
            if (savedData && savedData.length > 0) {
                const latestEntry = savedData[savedData.length - 1].data;
                
                // Fill form with latest data
                for (const key in latestEntry) {
                    const input = form.querySelector(`[name="${key}"]`);
                    if (input) {
                        if (input.type === 'checkbox') {
                            input.checked = latestEntry[key] === 'on';
                        } else {
                            input.value = latestEntry[key];
                        }
                    }
                }
            }
        });
    };
    
    // Load saved data when page loads
    loadSavedData();
    
    // Initialize charts if they exist
    if (typeof initCharts === 'function') {
        initCharts();
    }
});
