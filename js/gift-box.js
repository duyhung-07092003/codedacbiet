const giftBox = document.getElementById('giftBox');
const giftBoxTop = document.getElementById('giftBoxTop');
const giftMessage = document.getElementById('giftMessage');
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');

let isOpened = false;

// Setup canvas
function setupCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

// Confetti particles
class Confetti {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = Math.random() * confettiCanvas.height * 0.5 - 10;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = Math.random() * 3 + 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 20 - 10;
        this.size = Math.random() * 10 + 5;
        this.color = ['#FF69B4', '#FFB6D9', '#FFD700', '#FFA500', '#FF1493'][
            Math.floor(Math.random() * 5)
        ];
        this.opacity = 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1; // gravity
        this.rotation += this.rotationSpeed;
        this.opacity -= 0.01;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

let confettiPieces = [];

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        confettiPieces.push(new Confetti());
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiPieces.forEach((piece) => {
        piece.update();
        piece.draw();
    });

    confettiPieces = confettiPieces.filter((piece) => piece.opacity > 0);

    if (confettiPieces.length > 0) {
        requestAnimationFrame(animateConfetti);
    }
}

// Open gift box
function openGift() {
    if (isOpened) return;
    isOpened = true;

    // Shake animation
    giftBoxTop.classList.add('shake');

    // Play sound
    playSound();

    setTimeout(() => {
        // Create confetti
        createConfetti();
        animateConfetti();

        // Open box
        giftBox.classList.add('open');

        // Show message
        setTimeout(() => {
            giftMessage.style.opacity = '1';
            giftMessage.style.pointerEvents = 'auto';
        }, 1000);
    }, 300);
}

// Click on box to open
giftBox.addEventListener('click', openGift);

// Play beep sound using Web Audio API
function playSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Setup
setupCanvas();
window.addEventListener('resize', setupCanvas);
