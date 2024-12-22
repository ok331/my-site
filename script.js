// Landing Page Enter Functions
const backgroundMusic = document.getElementById('background-music');

// Audio Controls
const audio = document.getElementById('background-music');
const volumeSlider = document.getElementById('volumeSlider');
const speakerIcon = document.querySelector('.speaker-icon i');
let lastVolume = 0.5;

// Initialize audio
audio.volume = 0.5;
audio.load(); // Ensure the audio is properly loaded

// Handle audio loading
audio.addEventListener('loadeddata', () => {
    console.log('Audio loaded successfully');
});

audio.addEventListener('error', (e) => {
    console.error('Error loading audio:', e);
});

// Volume slider control
volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    audio.volume = volume;
    lastVolume = volume;
    
    // Update speaker icon based on volume
    updateSpeakerIcon(volume);
});

// Speaker icon click to mute/unmute
speakerIcon.parentElement.addEventListener('click', () => {
    if (audio.volume > 0) {
        // Mute
        audio.volume = 0;
        volumeSlider.value = 0;
        speakerIcon.className = 'fas fa-volume-mute';
    } else {
        // Unmute
        audio.volume = lastVolume;
        volumeSlider.value = lastVolume * 100;
        updateSpeakerIcon(lastVolume);
    }
});

// Update speaker icon based on volume level
function updateSpeakerIcon(volume) {
    if (volume === 0) {
        speakerIcon.className = 'fas fa-volume-mute';
    } else if (volume < 0.5) {
        speakerIcon.className = 'fas fa-volume-down';
    } else {
        speakerIcon.className = 'fas fa-volume-up';
    }
}

function enterSite() {
    const landingPage = document.getElementById('landing-page');
    const mainContent = document.getElementById('main-content');
    
    // Play audio with user interaction
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('Audio playback started successfully');
        }).catch(error => {
            console.log('Audio playback was prevented:', error);
        });
    }
    
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

document.getElementById('landing-page').addEventListener('click', enterSite);

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

class Particle {
    constructor(x, y, isMouseParticle = false, isRaindrop = false) {
        this.x = x;
        this.y = y;
        this.isMouseParticle = isMouseParticle;
        this.isRaindrop = isRaindrop;
        this.targetX = x;
        this.targetY = y;
        
        if (isRaindrop) {
            this.size = Math.random() * 1.8 + 0.6; // Larger raindrops
            this.length = this.size * (Math.random() * 4 + 6); // Longer trails
            this.speed = Math.random() * 4 + 6; // Faster drops
            this.alpha = Math.random() * 0.4 + 0.2; // More visible
        } else if (isMouseParticle) {
            this.size = Math.random() * 2 + 0.8;
            this.life = 1;
            this.velocity = {
                x: 0,
                y: 0
            };
            this.alpha = 0.7;
            this.speed = 0.15; // Speed of following mouse
        }
        
        this.decay = isMouseParticle ? 0.008 : 0;
        this.color = {
            r: 255,
            g: 255,
            b: 255
        };
    }

    update(deltaTime, mouseX, mouseY) {
        const frameCorrection = deltaTime / 16;
        
        if (this.isRaindrop) {
            this.y += this.speed * frameCorrection;
            
            if (this.y > window.innerHeight) {
                this.y = -20;
                this.x = Math.random() * window.innerWidth;
                this.size = Math.random() * 1.8 + 0.6;
                this.length = this.size * (Math.random() * 4 + 6);
                this.speed = Math.random() * 4 + 6;
                this.alpha = Math.random() * 0.4 + 0.2;
            }
        } else if (this.isMouseParticle) {
            // Smooth following of mouse
            this.targetX = mouseX;
            this.targetY = mouseY;
            
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            
            this.velocity.x = dx * this.speed;
            this.velocity.y = dy * this.speed;
            
            this.x += this.velocity.x * frameCorrection;
            this.y += this.velocity.y * frameCorrection;
            
            this.life -= this.decay * frameCorrection;
            this.alpha = this.life * 0.7;
            this.size = Math.max(0.1, this.size - 0.01 * frameCorrection);
        }
    }

    draw(ctx) {
        if (this.isMouseParticle && this.life <= 0) return;
        
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        
        if (this.isRaindrop) {
            // Draw raindrop with glow
            const gradient = ctx.createLinearGradient(
                this.x, this.y,
                this.x, this.y + this.length
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
            
            // Add glow effect
            ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
            ctx.shadowBlur = 2;
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = this.size;
            ctx.lineCap = 'round';
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.length);
            ctx.stroke();
        } else {
            // Draw mouse particle with glow
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.size * 2
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
            gradient.addColorStop(0.6, `rgba(255, 255, 255, ${this.alpha * 0.3})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
            
            ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
            ctx.shadowBlur = 4;
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }
}

// Initialize raindrops
function initRaindrops() {
    const numRaindrops = 150; // More raindrops
    for (let i = 0; i < numRaindrops; i++) {
        animationFrame.particles.push(
            new Particle(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight,
                false,
                true
            )
        );
    }
}

// Mouse movement particle creation
let mouseX = 0, mouseY = 0;
const numMouseParticles = 50; // Constant number of mouse particles

// Initialize mouse particles
for (let i = 0; i < numMouseParticles; i++) {
    animationFrame.particles.push(new Particle(0, 0, true, false));
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Performance optimization for animations
const fps = 144; // Increased FPS
const interval = 1000 / fps;
let then = performance.now();

// Mouse particle system
class MouseParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1.5 + 0.8; // More consistent size
        this.length = this.size * (Math.random() * 3 + 5); // Consistent length
        this.speedX = (Math.random() * 0.6 - 0.3); // Less horizontal movement
        this.speedY = Math.random() * 2 + 3; // Consistent downward speed
        this.life = 0.9;
        this.decay = 0.015;
        this.alpha = Math.random() * 0.4 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.alpha = Math.max(0, this.life * 0.4);
    }

    draw(ctx) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        
        // Create gradient for raindrop effect
        const gradient = ctx.createLinearGradient(
            this.x, this.y,
            this.x, this.y + this.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.size;
        ctx.lineCap = 'round';
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.stroke();
        
        ctx.restore();
    }
}

const mouseParticles = [];
let lastMouseX = 0, lastMouseY = 0;
let mouseTimeout = null;

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    const distance = Math.hypot(mouseX - lastMouseX, mouseY - lastMouseY);
    if (distance > 5) { // Less sensitive to small movements
        const particlesToCreate = Math.min(2, Math.floor(distance / 15)); // Fewer particles
        for(let i = 0; i < particlesToCreate; i++) {
            mouseParticles.push(new MouseParticle(
                mouseX + Math.random() * 6 - 3, // Less spread
                mouseY + Math.random() * 6 - 3
            ));
        }
        
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    }
    
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    }, 40);
});

// Update and draw mouse particles
function updateMouseParticles(ctx) {
    while (mouseParticles.length > 40) { // Fewer maximum particles
        mouseParticles.shift();
    }
    
    for(let i = mouseParticles.length - 1; i >= 0; i--) {
        const particle = mouseParticles[i];
        particle.update();
        particle.draw(ctx);
        
        if(particle.life <= 0) {
            mouseParticles.splice(i, 1);
        }
    }
}

function animate(now) {
    requestAnimationFrame(animate);
    
    const delta = now - then;
    
    if (delta > interval) {
        then = now - (delta % interval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for(let i = animationFrame.particles.length - 1; i >= 0; i--) {
            const particle = animationFrame.particles[i];
            particle.update(delta, mouseX, mouseY);
            particle.draw(ctx);
        }
        
        // Update and draw mouse particles
        updateMouseParticles(ctx);
    }
}

// Initialize and start animation
initRaindrops();
animate(performance.now());

// Enhanced 3D card effect
const container = document.querySelector('.container');
let isFirstMove = true;

container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    if (isFirstMove) {
        container.style.transition = 'transform 0.1s ease-out';
        isFirstMove = false;
    }
    
    container.style.transform = `
        perspective(1000px) 
        rotateX(${-rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale3d(1.02, 1.02, 1.02)
        translateZ(10px)
    `;
});

container.addEventListener('mouseleave', () => {
    isFirstMove = true;
    container.style.transition = 'transform 0.5s cubic-bezier(0.2, 0, 0.1, 1)';
    container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1) translateZ(0)';
});

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.mouse-particles').appendChild(canvas);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

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

const maxSnowflakes = 0;
