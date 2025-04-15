// Generate placeholder images for resource previews
function generatePlaceholderImages() {
    // Create canvas elements for each resource type
    createResourcePreview('dalilk-podcast-preview.jpg', '#4285f4', 'Podcast', '🎧');
    createResourcePreview('lingq-beginner-preview.jpg', '#34a853', 'Reading', '📚');
    createResourcePreview('simple-news-preview.jpg', '#fbbc05', 'News', '📰');
    createResourcePreview('ted-talks-preview.jpg', '#ea4335', 'TED Talks', '🎤');
    createResourcePreview('english-songs-preview.jpg', '#673ab7', 'Songs', '🎵');
    createResourcePreview('grammar-guide-preview.jpg', '#009688', 'Grammar', '📝');
    
    // Create usage guide images
    createUsagePreview('monthly-plan-preview.jpg', '#4285f4', 'Monthly Plan', '📅');
    createUsagePreview('daily-schedule-preview.jpg', '#34a853', 'Daily Schedule', '⏰');
    createUsagePreview('tracking-preview.jpg', '#fbbc05', 'Progress Tracking', '📊');
    createUsagePreview('resources-preview.jpg', '#ea4335', 'Resources', '📚');
    createUsagePreview('reminder-preview.jpg', '#673ab7', 'Reminders', '🔔');
    createUsagePreview('achievement-preview.jpg', '#009688', 'Achievements', '🏆');
}

// Create a resource preview image
function createResourcePreview(filename, bgColor, title, icon) {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 240;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 
                Math.random() * 50 + 20, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Add icon
    ctx.font = '80px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(icon, canvas.width / 2, canvas.height / 2 - 20);
    
    // Add title
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(title, canvas.width / 2, canvas.height / 2 + 50);
    
    // Save image
    saveCanvasImage(canvas, 'resources/' + filename);
}

// Create a usage guide preview image
function createUsagePreview(filename, bgColor, title, icon) {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 
                Math.random() * 70 + 30, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Add screenshot-like elements
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
    
    // Add lines to simulate text
    ctx.fillStyle = '#ddd';
    for (let i = 0; i < 5; i++) {
        ctx.fillRect(70, 80 + i * 30, Math.random() * 300 + 100, 10);
    }
    
    // Add icon
    ctx.font = '40px Arial';
    ctx.fillStyle = bgColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(icon, canvas.width / 2, canvas.height / 2 - 20);
    
    // Add title
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#333';
    ctx.fillText(title, canvas.width / 2, canvas.height / 2 + 30);
    
    // Save image
    saveCanvasImage(canvas, 'usage/' + filename);
}

// Save canvas as image (this is a placeholder function since we can't directly save files from JS)
function saveCanvasImage(canvas, filename) {
    // In a real environment, this would save the file
    // For our demo, we'll just log that we would save it
    console.log('Would save image: ' + filename);
    
    // In a real implementation, you might use:
    // const dataURL = canvas.toDataURL('image/jpeg', 0.8);
    // Then send this data URL to a server-side script to save
}

// Call this function when the page loads to generate all placeholder images
window.addEventListener('load', function() {
    // Check if we're in a browser environment with canvas support
    if (typeof document !== 'undefined' && document.createElement) {
        generatePlaceholderImages();
    }
});
