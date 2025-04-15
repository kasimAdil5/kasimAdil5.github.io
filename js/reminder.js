// Reminder System for English Learning Website

// Initialize reminder system
document.addEventListener('DOMContentLoaded', function() {
    initializeReminderSystem();
    checkLastVisit();
});

// Set up reminder system
function initializeReminderSystem() {
    // Check if browser supports notifications
    if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        setupReminderSystem();
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                setupReminderSystem();
            }
        });
    }
    
    // Set up email reminder form
    const reminderForm = document.getElementById('reminder-form');
    if (reminderForm) {
        reminderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('reminder-email').value;
            if (validateEmail(email)) {
                saveEmailForReminders(email);
                showMessage('Email saved for reminders!', 'success');
                
                // Save to local storage
                localStorage.setItem('reminderEmail', email);
                localStorage.setItem('reminderEnabled', 'true');
                
                // Update UI
                updateReminderStatus();
            } else {
                showMessage('Please enter a valid email address', 'error');
            }
        });
    }
    
    // Set up reminder toggle
    const reminderToggle = document.getElementById('reminder-toggle');
    if (reminderToggle) {
        reminderToggle.addEventListener('change', function() {
            localStorage.setItem('reminderEnabled', this.checked ? 'true' : 'false');
            updateReminderStatus();
        });
    }
    
    // Initialize reminder status
    updateReminderStatus();
}

// Record visit time
function recordVisit() {
    const now = new Date().getTime();
    localStorage.setItem('lastVisit', now);
    console.log('Visit recorded at: ' + new Date(now).toLocaleString());
}

// Check when user last visited
function checkLastVisit() {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date().getTime();
    
    if (lastVisit) {
        const lastVisitDate = new Date(parseInt(lastVisit));
        const hoursSinceLastVisit = (now - lastVisit) / (1000 * 60 * 60);
        
        console.log('Last visit: ' + lastVisitDate.toLocaleString());
        console.log('Hours since last visit: ' + hoursSinceLastVisit.toFixed(2));
        
        // If it's been more than 20 hours but less than 28 hours (to avoid showing on first visit of the day)
        if (hoursSinceLastVisit > 20 && hoursSinceLastVisit < 28) {
            showWelcomeBackMessage();
        }
    }
    
    // Record this visit
    recordVisit();
}

// Show welcome back message
function showWelcomeBackMessage() {
    const welcomeBack = document.createElement('div');
    welcomeBack.className = 'welcome-back';
    welcomeBack.innerHTML = `
        <div class="welcome-content">
            <h3>Welcome Back!</h3>
            <p>Great to see you continuing your English learning journey!</p>
            <button id="close-welcome">Continue Learning</button>
        </div>
    `;
    document.body.appendChild(welcomeBack);
    
    document.getElementById('close-welcome').addEventListener('click', function() {
        welcomeBack.style.opacity = '0';
        setTimeout(() => {
            welcomeBack.remove();
        }, 500);
    });
    
    setTimeout(() => {
        welcomeBack.style.opacity = '1';
    }, 100);
}

// Set up the reminder system
function setupReminderSystem() {
    // Check if service worker is supported
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    }
}

// Save email for reminders
function saveEmailForReminders(email) {
    // In a real implementation, this would connect to a backend service
    console.log('Email saved for reminders: ' + email);
    // For demo purposes, we'll just use localStorage
    localStorage.setItem('reminderEmail', email);
}

// Validate email format
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Show message to user
function showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message ' + type;
    messageElement.textContent = message;
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        messageElement.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        messageElement.style.opacity = '0';
        setTimeout(() => {
            messageElement.remove();
        }, 500);
    }, 3000);
}

// Update reminder status in UI
function updateReminderStatus() {
    const reminderStatus = document.getElementById('reminder-status');
    const reminderToggle = document.getElementById('reminder-toggle');
    const reminderEmail = localStorage.getItem('reminderEmail');
    const reminderEnabled = localStorage.getItem('reminderEnabled') === 'true';
    
    if (reminderStatus) {
        if (reminderEnabled && reminderEmail) {
            reminderStatus.textContent = `Reminders enabled for: ${reminderEmail}`;
            reminderStatus.className = 'status-enabled';
        } else {
            reminderStatus.textContent = 'Reminders disabled';
            reminderStatus.className = 'status-disabled';
        }
    }
    
    if (reminderToggle) {
        reminderToggle.checked = reminderEnabled;
    }
}

// Schedule next reminder check
function scheduleReminderCheck() {
    // Check if reminders are enabled
    const reminderEnabled = localStorage.getItem('reminderEnabled') === 'true';
    if (!reminderEnabled) return;
    
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date().getTime();
    
    if (lastVisit) {
        const hoursSinceLastVisit = (now - parseInt(lastVisit)) / (1000 * 60 * 60);
        
        // If it's been more than 24 hours since last visit
        if (hoursSinceLastVisit >= 24) {
            sendReminderNotification();
        }
    }
    
    // Schedule next check in 1 hour
    setTimeout(scheduleReminderCheck, 60 * 60 * 1000);
}

// Send reminder notification
function sendReminderNotification() {
    if (Notification.permission === "granted") {
        const notification = new Notification("Time for English Learning!", {
            body: "It's been over 24 hours since your last study session. Keep up your daily practice!",
            icon: "/images/logo.png"
        });
        
        notification.onclick = function() {
            window.focus();
            notification.close();
        };
    }
}

// Start the reminder system
scheduleReminderCheck();
