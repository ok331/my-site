// Landing Page Enter Functions
const backgroundMusic = document.getElementById('background-music');

function enterSite() {
    const landingPage = document.getElementById('landing-page');
    const mainContent = document.getElementById('main-content');
    
    // Start playing music
    backgroundMusic.play().catch(error => {
        console.log("Audio autoplay was prevented by the browser");
    });
    
    landingPage.style.opacity = '0';
    setTimeout(() => {
        landingPage.style.display = 'none';
        mainContent.classList.remove('hidden');
    }, 500);
}

// Event Listeners for entering the site
document.querySelector('.enter-text').addEventListener('click', enterSite);
document.addEventListener('keydown', enterSite);
document.addEventListener('click', (e) => {
    if (e.target.closest('#landing-page')) {
        enterSite();
    }
});

// Mouse Follow Effect for Caption Outline
const captionOutline = document.querySelector('.caption-outline');
const caption = document.querySelector('.caption');

document.addEventListener('mousemove', (e) => {
    if (caption && captionOutline) {
        const rect = caption.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const angleX = (e.clientX - centerX) / (window.innerWidth / 2);
        const angleY = (e.clientY - centerY) / (window.innerHeight / 2);
        
        captionOutline.style.transform = `scaleX(1.2) translate(${angleX * 10}px, ${angleY * 10}px)`;
    }
});

// Performance optimization for animations
const animationFrame = {
    id: null,
    particles: [],
    lastTime: 0
};

function optimizedAnimateParticles(currentTime) {
    if (!animationFrame.lastTime) animationFrame.lastTime = currentTime;
    const deltaTime = currentTime - animationFrame.lastTime;
    
    if (deltaTime > 16) { // Roughly 60 FPS
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for(let i = animationFrame.particles.length - 1; i >= 0; i--) {
            const particle = animationFrame.particles[i];
            particle.update(deltaTime);
            particle.draw(ctx);
            
            if(particle.life <= 0) {
                animationFrame.particles.splice(i, 1);
            }
        }
        
        animationFrame.lastTime = currentTime;
    }
    
    animationFrame.id = requestAnimationFrame(optimizedAnimateParticles);
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 0.5; // Reduced particle size
        this.speedX = Math.random() * 1.5 - 0.75; // Reduced speed
        this.speedY = Math.random() * 1.5 - 0.75;
        this.life = 0.7; // Reduced life for faster fade
        this.velocity = {
            x: (Math.random() - 0.5) * 1.5, // Smoother movement
            y: (Math.random() - 0.5) * 1.5
        };
        this.alpha = 0.5; // Lower initial opacity
    }

    update(deltaTime) {
        const frameCorrection = deltaTime / 16;
        this.x += this.velocity.x * frameCorrection * 0.7; // Slower movement
        this.y += this.velocity.y * frameCorrection * 0.7;
        this.life -= 0.015 * frameCorrection; // Slower fade
        this.size = Math.max(0, this.size - 0.03 * frameCorrection);
        this.alpha = this.life * 0.5; // Smoother fade
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const mouseParticles = [];
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.mouse-particles').appendChild(canvas);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    for(let i = 0; i < 2; i++) { // Reduced number of particles
        animationFrame.particles.push(new Particle(mouseX, mouseY));
    }
});

// Start the optimized animation loop
optimizedAnimateParticles(0);

// Enhanced Snowflake Creation with improved performance
const snowflakePool = [];
const maxSnowflakes = 300; // Even more snowflakes

function createSnowflake() {
    let snowflake;
    if (snowflakePool.length < maxSnowflakes) {
        snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
    } else {
        snowflake = snowflakePool.pop();
        snowflake.style.opacity = Math.random() * 0.85 + 0.15;
    }
    
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.width = snowflake.style.height = Math.random() * 4 + 2 + 'px';
    
    const container = Math.random() < 0.5 ? 
        document.querySelector('.snow') : 
        document.querySelector('.snow-landing');
    
    container.appendChild(snowflake);
    
    const duration = Math.random() * 2000 + 3000;
    const startDelay = Math.random() * 300; // Even shorter delay
    
    const animation = snowflake.animate([
        { 
            transform: 'translateY(-10px) rotate(0deg)', 
            opacity: snowflake.style.opacity 
        },
        { 
            transform: `translateY(${window.innerHeight + 10}px) rotate(360deg)`, 
            opacity: 0 
        }
    ], {
        duration: duration,
        delay: startDelay,
        easing: 'linear',
        iterations: 1
    });
    
    animation.onfinish = () => {
        const rect = snowflake.getBoundingClientRect();
        const elements = document.querySelectorAll('.caption, .btn, .enter-text, .container');
        let shouldFreeze = false;
        
        elements.forEach(element => {
            const elementRect = element.getBoundingClientRect();
            const distance = Math.hypot(
                rect.left - elementRect.left,
                rect.top - elementRect.top
            );
            
            if (distance < 80 && Math.random() < 0.5) { // Increased freeze chance and range
                shouldFreeze = true;
                snowflake.classList.add('frozen');
                
                const freeze = document.createElement('div');
                freeze.classList.add('freeze-overlay');
                
                // Adjust freeze overlay position based on element type
                if (element.classList.contains('container')) {
                    // For container, create smaller freeze spots
                    freeze.style.width = '100px';
                    freeze.style.height = '100px';
                    freeze.style.left = `${rect.left}px`;
                    freeze.style.top = `${rect.top}px`;
                } else {
                    // For other elements, follow their shape
                    freeze.style.left = `${elementRect.left}px`;
                    freeze.style.top = `${elementRect.top}px`;
                    freeze.style.width = `${elementRect.width * 1.2}px`;
                    freeze.style.height = `${elementRect.height * 1.2}px`;
                    freeze.style.transform = 'translate(-10%, -10%)';
                }
                
                document.body.appendChild(freeze);
                
                requestAnimationFrame(() => {
                    freeze.style.opacity = '1';
                    element.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.6)';
                    element.style.transition = 'all 0.3s ease';
                    
                    // Add extra glow effect to container
                    if (element.classList.contains('container')) {
                        element.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.1)';
                    }
                });
                
                setTimeout(() => {
                    freeze.style.opacity = '0';
                    element.style.textShadow = '';
                    if (element.classList.contains('container')) {
                        element.style.boxShadow = '';
                    }
                    setTimeout(() => {
                        freeze.remove();
                        snowflake.classList.remove('frozen');
                        snowflakePool.push(snowflake);
                    }, 500);
                }, 1500);
            }
        });
        
        if (!shouldFreeze) {
            snowflakePool.push(snowflake);
        }
    };
}

// Create snowflakes more frequently
setInterval(createSnowflake, 15); // Even more frequent

// Initial snowflake burst
for(let i = 0; i < 100; i++) { // Doubled initial burst
    createSnowflake();
}

// Discord Copy Function with Custom Notification
function copyDiscord() {
    navigator.clipboard.writeText('pfkfjkr').then(() => {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = 'Discord Username copied to Clipboard!';
        document.body.appendChild(notification);
        
        // Trigger reflow for animation
        notification.offsetHeight;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    });
}

// Add 3D card effect
const container = document.querySelector('.container');
container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * 10; // Max 10 degree rotation
    const rotateY = ((x - centerX) / centerX) * 10;
    
    container.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
});

container.addEventListener('mouseleave', () => {
    container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
});

// Optimize animation frame rate
const fps = 60;
const interval = 1000 / fps;
let then = performance.now();

function animate(now) {
    const elapsed = now - then;
    if (elapsed > interval) {
        then = now - (elapsed % interval);
        optimizedAnimateParticles(now);
    }
    requestAnimationFrame(animate);
}
animate(performance.now());
