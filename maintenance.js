// Progress simulation
function simulateProgress() {
    let progress = 0;
    const progressElement = document.getElementById('progress');
    const progressInterval = setInterval(() => {
        progress += Math.random() * 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
        }
        progressElement.textContent = Math.min(progress, 100).toFixed(0) + '%';
    }, 1000);
}

// Countdown timer (30 minutes)
function startCountdown() {
    const countdownElement = document.getElementById('countdown-timer');
    let timeLeft = 30 * 60; // 30 minutes in seconds
    
    const timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            countdownElement.textContent = 'Soon!';
            return;
        }
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timeLeft--;
    }, 1000);
}

// Animated status dots
function animateStatusDots() {
    const dots = document.querySelectorAll('.status-dot');
    dots.forEach((dot, index) => {
        dot.style.animationDelay = `${index * 0.5}s`;
    });
}

// Text animation effects
function textAnimations() {
    const headings = document.querySelectorAll('.animated-heading, .animated-text');
    
    headings.forEach((heading, index) => {
        heading.style.animationDelay = `${index * 0.3}s`;
    });
}

// Initialize all animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    simulateProgress();
    startCountdown();
    animateStatusDots();
    textAnimations();
    
    // Add some interactive effects
    const container = document.querySelector('.content-wrapper');
    container.style.transform = 'scale(0.9)';
    container.style.opacity = '0';
    
    setTimeout(() => {
        container.style.transition = 'all 0.5s ease';
        container.style.transform = 'scale(1)';
        container.style.opacity = '1';
    }, 100);
});

// Add some background particles for premium feel
function createParticles() {
    const container = document.querySelector('.maintenance-container');
    const particles = 20;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        // Add animation for floating
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        container.appendChild(particle);
    }
}

// Initialize particles
createParticles();
