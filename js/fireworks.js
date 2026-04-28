/* ========== FIREWORKS ANIMATION ========== */

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.createParticles();
    }

    createParticles(count = 50) {
        const colors = ['#FF69B4', '#FFB6C1', '#FFD700', '#FFA500', '#FF1493', '#87CEEB', '#DDA0DD', '#00FF00'];
        
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const velocity = Math.random() * 8 + 4;
            
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                size: Math.random() * 4 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 1,
                gravity: 0.1
            });
        }
    }

    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.life -= 0.01;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    draw(ctx) {
        for (const p of this.particles) {
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    isDead() {
        return this.particles.length === 0;
    }
}

class FireworksSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.fireworks = [];
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

    createFirework(x, y) {
        this.fireworks.push(new Firework(x, y));
        
        if (!this.isAnimating) {
            this.animate();
        }
    }

    burst(x, y, count = 5) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.createFirework(x, y);
            }, i * 100);
        }
    }

    animate = () => {
        if (!this.canvas) return;

        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw fireworks
        for (let i = this.fireworks.length - 1; i >= 0; i--) {
            const firework = this.fireworks[i];
            firework.update();
            firework.draw(this.ctx);

            if (firework.isDead()) {
                this.fireworks.splice(i, 1);
            }
        }

        if (this.fireworks.length > 0) {
            this.isAnimating = true;
            this.animationId = requestAnimationFrame(this.animate);
        } else {
            this.isAnimating = false;
        }
    }
}

// Initialize fireworks system
let fireworksSystem = null;

document.addEventListener('DOMContentLoaded', () => {
    fireworksSystem = new FireworksSystem('fireworksCanvas');
});
