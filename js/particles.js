/* ========== PARTICLE EFFECTS ========== */

class Particle {
    constructor(x, y, type = 'heart') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.life = Math.random() * 0.5 + 0.5;
        this.maxLife = this.life;
        
        // Velocity
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4 - 2;
        
        // Size
        this.size = Math.random() * 15 + 5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
        
        // Color
        this.colors = ['#FF69B4', '#FFB6C1', '#FF1493', '#FFD700', '#FFA500'];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    update(gravity = 0.1) {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += gravity;
        this.rotation += this.rotationSpeed;
        this.life -= 0.01;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;

        if (this.type === 'heart') {
            this.drawHeart(ctx);
        } else if (this.type === 'star') {
            this.drawStar(ctx);
        }

        ctx.restore();
    }

    drawHeart(ctx) {
        const s = this.size;
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.5);
        ctx.bezierCurveTo(-s * 0.8, -s * 0.8, -s * 1, -s * 0.3, -s * 0.3, s * 0.2);
        ctx.bezierCurveTo(0, s * 0.6, s * 0.3, s * 0.2, s * 0.3, s * 0.2);
        ctx.bezierCurveTo(s * 1, -s * 0.3, s * 0.8, -s * 0.8, 0, -s * 0.5);
        ctx.fill();
    }

    drawStar(ctx) {
        const s = this.size;
        const spikes = 5;
        const step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(0, -s);

        for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? s : s * 0.5;
            const angle = i * step - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.closePath();
        ctx.fill();
    }

    isDead() {
        return this.life <= 0;
    }
}

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.isRunning = false;
        this.animationId = null;

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Auto-start if canvas is on visible section
        this.startIfVisible();
    }

    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    startIfVisible() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isRunning) {
                    this.start();
                } else if (!entry.isIntersecting && this.isRunning) {
                    this.stop();
                }
            });
        });

        if (this.canvas) {
            observer.observe(this.canvas);
        }
    }

    createParticle(x, y, type = 'heart') {
        this.particles.push(new Particle(x, y, type));
    }

    burstParticles(x, y, count = 20) {
        for (let i = 0; i < count; i++) {
            const type = Math.random() > 0.5 ? 'heart' : 'star';
            this.createParticle(x, y, type);
        }
    }

    start() {
        if (this.isRunning || !this.canvas) return;
        this.isRunning = true;
        this.animate();

        // Emit particles continuously
        this.emissionInterval = setInterval(() => {
            if (this.isRunning) {
                const x = Math.random() * this.canvas.width;
                const y = Math.random() * this.canvas.height * 0.3;
                const type = Math.random() > 0.6 ? 'heart' : 'star';
                this.createParticle(x, y, type);
            }
        }, 300);
    }

    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        if (this.emissionInterval) {
            clearInterval(this.emissionInterval);
            this.emissionInterval = null;
        }
    }

    animate = () => {
        if (!this.canvas) return;

        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(26, 26, 46, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.update();
            particle.draw(this.ctx);

            if (particle.isDead()) {
                this.particles.splice(i, 1);
            }
        }

        if (this.isRunning) {
            this.animationId = requestAnimationFrame(this.animate);
        }
    }
}

// Initialize particle system on cover section
let particleSystem = null;

document.addEventListener('DOMContentLoaded', () => {
    particleSystem = new ParticleSystem('particleCanvas');
});
