// Password protection - Obfuscated for basic security
// To change password: 
// 1. Choose your password (e.g., 'mySecret123')
// 2. Encode it: Open browser console and type: btoa('mySecret123')
// 3. Replace the string below with the encoded result
// Or use: https://www.base64encode.org/
const PASSWORD_HASH = 'amM0Nzk1MDA='; // Base64 encoded password (current: 'jc479500')

// Always show password screen on page load (requires password on every refresh)
showPasswordScreen();

function checkPassword() {
    const input = document.getElementById('password-input');
    const errorMsg = document.getElementById('error-msg');
    const password = input.value.trim();
    
    // Compare with obfuscated password
    if (btoa(password) === PASSWORD_HASH) {
        showMainContent();
    } else {
        errorMsg.textContent = '🎅 WRONG! The fish are disappointed! 🐠';
        input.value = '';
        input.focus();
        
        // Shake animation
        const container = document.querySelector('.password-container');
        container.style.animation = 'shake 0.5s';
        setTimeout(() => {
            container.style.animation = '';
        }, 500);
    }
}

function showPasswordScreen() {
    document.getElementById('password-screen').classList.remove('hidden');
    document.getElementById('main-content').classList.add('hidden');
}

function showMainContent() {
    document.getElementById('password-screen').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    // Initialize photos with background removal effects
    initializePhotos();
}

// Physics system for photos
const photoPhysics = {
    photos: [],
    animationId: null,
    
    init() {
        const photoElements = document.querySelectorAll('.scattered-photo');
        
        photoElements.forEach((photo, index) => {
            // Wait for image to load
            photo.addEventListener('load', function() {
                applyBackgroundRemoval(photo);
            });
            
            if (photo.complete) {
                applyBackgroundRemoval(photo);
            }
            
            // Initialize physics properties
            const currentScale = 0.7 + Math.random() * 0.3; // Slightly bigger scale range
            const baseWidth = 140; // Smaller base size
            const baseHeight = 140;
            const scaledWidth = baseWidth * currentScale;
            const scaledHeight = baseHeight * currentScale;
            
            const randomX = Math.random() * Math.max(0, window.innerWidth - scaledWidth);
            const randomY = Math.random() * Math.max(0, window.innerHeight - scaledHeight);
            const randomVX = (Math.random() - 0.5) * 3; // Random velocity (faster)
            const randomVY = (Math.random() - 0.5) * 3;
            const randomRotate = (Math.random() - 0.5) * 60;
            
            const photoData = {
                element: photo,
                x: randomX,
                y: randomY,
                vx: randomVX, // velocity x
                vy: randomVY, // velocity y
                rotation: randomRotate,
                rotationSpeed: (Math.random() - 0.5) * 1.5, // random rotation speed
                scale: currentScale,
                width: scaledWidth,
                height: scaledHeight,
                isDragging: false,
                dragStartX: 0,
                dragStartY: 0,
                lastTouchX: 0,
                lastTouchY: 0,
                lastTouchTime: 0,
                friction: 0.985, // friction coefficient (slightly less friction)
                bounce: 0.8, // bounce coefficient (more bouncy)
                randomForce: 0.03, // random floating force
                zIndex: 10000 + index
            };
            
            // Update dimensions when image loads
            photo.addEventListener('load', function() {
                const rect = photo.getBoundingClientRect();
                photoData.width = rect.width;
                photoData.height = rect.height;
            });
            
            // Set initial position
            photo.style.left = photoData.x + 'px';
            photo.style.top = photoData.y + 'px';
            photo.style.right = 'auto';
            photo.style.bottom = 'auto';
            photo.style.zIndex = photoData.zIndex;
            photo.style.transform = `rotate(${photoData.rotation}deg) scale(${photoData.scale})`;
            photo.style.pointerEvents = 'auto'; // Enable touch interaction
            photo.style.cursor = 'grab';
            photo.style.touchAction = 'none'; // Prevent default touch behavior
            
            // Add touch/mouse event listeners
            this.addInteractionListeners(photoData);
            
            this.photos.push(photoData);
        });
        
        // Start physics animation loop
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.photos.forEach(photo => {
                // Keep photos within bounds on resize
                photo.x = Math.max(0, Math.min(photo.x, window.innerWidth - photo.width));
                photo.y = Math.max(0, Math.min(photo.y, window.innerHeight - photo.height));
            });
        });
    },
    
    addInteractionListeners(photoData) {
        const photo = photoData.element;
        
        // Touch events (mobile)
        const handleTouchMove = (e) => {
            if (!photoData.isDragging) return;
            e.preventDefault();
            const touch = e.touches[0];
            
            photoData.x = touch.clientX - photoData.dragStartX;
            photoData.y = touch.clientY - photoData.dragStartY;
            
            // Calculate velocity from touch movement
            const now = Date.now();
            const dt = Math.max(1, now - photoData.lastTouchTime);
            photoData.vx = (touch.clientX - photoData.lastTouchX) / dt * 16;
            photoData.vy = (touch.clientY - photoData.lastTouchY) / dt * 16;
            
            photoData.lastTouchX = touch.clientX;
            photoData.lastTouchY = touch.clientY;
            photoData.lastTouchTime = now;
            
            this.updatePhotoPosition(photoData);
        };
        
        const handleTouchEnd = (e) => {
            if (!photoData.isDragging) return;
            e.preventDefault();
            photoData.isDragging = false;
            photo.style.cursor = 'grab';
            photo.style.zIndex = photoData.zIndex; // Restore original z-index
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            // Velocity is already set from touchmove, so momentum is preserved
        };
        
        photo.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            photoData.isDragging = true;
            photoData.dragStartX = touch.clientX - photoData.x;
            photoData.dragStartY = touch.clientY - photoData.y;
            photoData.lastTouchX = touch.clientX;
            photoData.lastTouchY = touch.clientY;
            photoData.lastTouchTime = Date.now();
            photo.style.cursor = 'grabbing';
            photo.style.zIndex = 20000; // Bring to front when dragging
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleTouchEnd, { passive: false });
        });
        
        // Mouse events (desktop)
        const handleMouseMove = (e) => {
            if (!photoData.isDragging) return;
            e.preventDefault();
            
            photoData.x = e.clientX - photoData.dragStartX;
            photoData.y = e.clientY - photoData.dragStartY;
            
            const now = Date.now();
            const dt = Math.max(1, now - photoData.lastTouchTime);
            photoData.vx = (e.clientX - photoData.lastTouchX) / dt * 16;
            photoData.vy = (e.clientY - photoData.lastTouchY) / dt * 16;
            
            photoData.lastTouchX = e.clientX;
            photoData.lastTouchY = e.clientY;
            photoData.lastTouchTime = now;
            
            this.updatePhotoPosition(photoData);
        };
        
        const handleMouseUp = (e) => {
            if (!photoData.isDragging) return;
            e.preventDefault();
            photoData.isDragging = false;
            photo.style.cursor = 'grab';
            photo.style.zIndex = photoData.zIndex;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        
        photo.addEventListener('mousedown', (e) => {
            e.preventDefault();
            photoData.isDragging = true;
            photoData.dragStartX = e.clientX - photoData.x;
            photoData.dragStartY = e.clientY - photoData.y;
            photoData.lastTouchX = e.clientX;
            photoData.lastTouchY = e.clientY;
            photoData.lastTouchTime = Date.now();
            photo.style.cursor = 'grabbing';
            photo.style.zIndex = 20000;
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        });
    },
    
    updatePhotoPosition(photoData) {
        photoData.element.style.left = photoData.x + 'px';
        photoData.element.style.top = photoData.y + 'px';
        photoData.element.style.transform = `rotate(${photoData.rotation}deg) scale(${photoData.scale})`;
    },
    
    animate() {
        this.photos.forEach(photo => {
            if (photo.isDragging) {
                // Don't apply physics while dragging
                return;
            }
            
            // Add random floating force
            photo.vx += (Math.random() - 0.5) * photo.randomForce;
            photo.vy += (Math.random() - 0.5) * photo.randomForce;
            
            // Apply friction
            photo.vx *= photo.friction;
            photo.vy *= photo.friction;
            
            // Update position
            photo.x += photo.vx;
            photo.y += photo.vy;
            
            // Update rotation
            photo.rotation += photo.rotationSpeed;
            
            // Bounce off walls with proper boundary checking
            const maxX = window.innerWidth - photo.width;
            const maxY = window.innerHeight - photo.height;
            
            if (photo.x <= 0) {
                photo.x = 0;
                photo.vx = Math.abs(photo.vx) * photo.bounce;
            } else if (photo.x >= maxX) {
                photo.x = maxX;
                photo.vx = -Math.abs(photo.vx) * photo.bounce;
            }
            
            if (photo.y <= 0) {
                photo.y = 0;
                photo.vy = Math.abs(photo.vy) * photo.bounce;
            } else if (photo.y >= maxY) {
                photo.y = maxY;
                photo.vy = -Math.abs(photo.vy) * photo.bounce;
            }
            
            // Keep within bounds (safety check)
            photo.x = Math.max(0, Math.min(photo.x, maxX));
            photo.y = Math.max(0, Math.min(photo.y, maxY));
            
            // Update DOM
            this.updatePhotoPosition(photo);
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
};

// Initialize scattered photos with physics
function initializePhotos() {
    photoPhysics.init();
}

// Apply background removal effects using CSS filters
// Note: For best results, use a tool like remove.bg to pre-process images
function applyBackgroundRemoval(img) {
    // Enhanced CSS filters to make people stand out
    img.style.filter = 'contrast(1.3) saturate(1.4) brightness(1.1) drop-shadow(0 5px 15px rgba(0,0,0,0.5))';
    img.style.mixBlendMode = 'normal';
    
    // Add a glow effect to help separate from background
    img.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)';
}

// Allow Enter key to submit password
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
        passwordInput.focus();
    }
});

// Reveal card animation
function revealCard() {
    const card = document.querySelector('.card-container');
    const btn = document.querySelector('.reveal-btn');
    
    if (!card) {
        console.error('Card container not found!');
        return;
    }
    
    if (!btn) {
        console.error('Reveal button not found!');
        return;
    }
    
    if (card.classList.contains('flipped')) {
        card.classList.remove('flipped');
        btn.textContent = '🎁 Reveal the Magic! 🎁';
    } else {
        card.classList.add('flipped');
        btn.textContent = '🎄 Flip Back 🎄';
        
        // Add confetti effect
        createConfetti();
    }
}

// Simple confetti effect with Christmas theme
function createConfetti() {
    const emojis = ['🎉', '🎊', '🐠', '🐟', '🐡', '🦈', '🎁', '🎄', '🎅', '❄', '⭐', '🌟'];
    const confettiCount = 40;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confetti.style.position = 'fixed';
            confetti.style.fontSize = '30px';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-50px';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 50);
    }
}

// Add confetti animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

