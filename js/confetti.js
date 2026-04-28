/* ========== CONFETTI ANIMATION ========== */

class ConfettiPiece {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = Math.random() * -8 - 4;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 8 + 4;
        this.life = 1;
        this.gravity = 0.15;
        
        const colors = ['#FF69B4', '#FFB6C1', '#FFD700', '#FFA500', '#FF1493', '#87CEEB', '#DDA0DD'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.rotation += this.rotationSpeed;
        this.life -= 0.01;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        
        // Draw square confetti
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        
        ctx.restore();
    }
}

class ConfettiSystem {
    constructor() {
        this.canvas = document.getElementById('confettiCanvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.pieces = [];
        this.isAnimating = false;
        this.animationId = null;

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    burst(x, y, count = 100) {
        for (let i = 0; i < count; i++) {
            this.pieces.push(new ConfettiPiece(x, y));
        }
        
        // Show canvas and start animation
        this.canvas.style.display = 'block';
        if (!this.isAnimating) {
            this.animate();
        }
    }

    animate = () => {
        if (!this.canvas) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw confetti
        for (let i = this.pieces.length - 1; i >= 0; i--) {
            const piece = this.pieces[i];
            piece.update();
            piece.draw(this.ctx);

            if (piece.life <= 0) {
                this.pieces.splice(i, 1);
            }
        }

        if (this.pieces.length > 0) {
            this.isAnimating = true;
            this.animationId = requestAnimationFrame(this.animate);
        } else {
            this.isAnimating = false;
            this.canvas.style.display = 'none';
        }
    }
}

// Initialize confetti system
let confettiSystem = null;

document.addEventListener('DOMContentLoaded', () => {
    confettiSystem = new ConfettiSystem();

    // Gift box interaction
    const giftBox = document.getElementById('giftBox');
    if (giftBox) {
        let isOpened = false;

        giftBox.addEventListener('click', function() {
            if (isOpened) return;
            isOpened = true;

            // Shake animation
            giftBox.classList.add('shake');

            // Trigger confetti burst
            const rect = giftBox.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            if (confettiSystem) {
                confettiSystem.burst(centerX, centerY, 150);
            }

            // Show gift reveal after animation
            setTimeout(() => {
                giftBox.style.display = 'none';
                const giftReveal = document.getElementById('giftReveal');
                if (giftReveal) {
                    giftReveal.style.display = 'block';
                }
            }, 600);

            // Play success sound effect (optional)
            playSound('success');
        });
    }
});

// Helper function to play sounds
function playSound(type) {
    try {
        // Create a simple beep using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        if (type === 'success') {
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    } catch (e) {
        // Silent fail if Web Audio is not available
    }
}
