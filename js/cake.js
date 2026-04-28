// --- PHÁO HOA ---
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let fireworks = [];
let candlesBlownCount = 0;
const totalCandles = 3;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor(x, y, color) {
        this.x = x; this.y = y; this.color = color;
        this.velocity = { x: (Math.random() - 0.5) * 12, y: (Math.random() - 0.5) * 12 };
        this.alpha = 1; this.friction = 0.95;
    }
    draw() {
        ctx.save(); ctx.globalAlpha = this.alpha; ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = this.color; ctx.fill(); ctx.restore();
    }
    update() {
        this.velocity.x *= this.friction; this.velocity.y *= this.friction;
        this.x += this.velocity.x; this.y += this.velocity.y; this.alpha -= 0.015;
    }
}

function createFirework(x, y) {
    const colors = ['#E91E63', '#FFD700', '#FF4081', '#FFEB3B', '#FFFFFF'];
    for (let i = 0; i < 50; i++) {
        fireworks.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((p, i) => {
        if (p.alpha <= 0) fireworks.splice(i, 1);
        else { p.update(); p.draw(); }
    });
    requestAnimationFrame(animate);
}
animate();

// --- THỔI NẾN ---
const statusText = document.getElementById('ai-status');

window.blowCandle = function() {
    const candles = document.querySelectorAll('.candle-box');
    let blownAny = false;
    
    candles.forEach(element => {
        const flame = element.querySelector('.flame');
        if (flame && flame.style.display !== 'none') {
            flame.style.opacity = '0';
            setTimeout(() => { flame.style.display = 'none'; }, 200);
            candlesBlownCount++;
            const rect = element.getBoundingClientRect();
            createFirework(rect.left + rect.width/2, rect.top);
            blownAny = true;
        }
    });

    if (blownAny && candlesBlownCount >= totalCandles) {
        showWish();
    }
}

// Support manual click as well
document.querySelectorAll('.candle-box').forEach(c => {
    c.onclick = () => { window.blowCandle(); };
});

function showWish() {
    document.getElementById('wishSection').style.display = 'block';
    statusText.innerText = "Chúc mừng sinh nhật! Điều ước sẽ thành hiện thực! ❤️";
    for(let i=0; i<20; i++) {
        setTimeout(() => createFirework(Math.random() * canvas.width, Math.random() * canvas.height/2), i * 200);
    }
}

// --- AUDIO DETECTION (Dành cho việc thổi vào mic) ---
async function startAudioDetection() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        function checkBlow() {
            if (candlesBlownCount >= totalCandles) return;
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for(let i=0; i<bufferLength; i++) sum += dataArray[i];
            let average = sum / bufferLength;
            
            // Nếu âm thanh đủ lớn (tiếng thổi)
            if (average > 60) { // Độ nhạy: số càng nhỏ càng nhạy
                window.blowCandle();
            }
            requestAnimationFrame(checkBlow);
        }
        checkBlow();
    } catch (err) {
        console.log("Mic access denied or not available", err);
    }
}
startAudioDetection();

// --- AI MEDIA PIPE (Nhận diện chu môi) ---
const videoElement = document.getElementById('webcam');
const faceMesh = new FaceMesh({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
});

faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
});

faceMesh.onResults((results) => {
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        if (candlesBlownCount < totalCandles) statusText.innerText = "Chu môi hoặc thổi vào mic để tắt nến nào! 🎂";
        
        const landmarks = results.multiFaceLandmarks[0];
        const topLip = landmarks[13];
        const bottomLip = landmarks[14];
        const leftMouth = landmarks[61];
        const rightMouth = landmarks[291];

        const mouthWidth = Math.sqrt(Math.pow(leftMouth.x - rightMouth.x, 2) + Math.pow(leftMouth.y - rightMouth.y, 2));
        const mouthHeight = Math.sqrt(Math.pow(topLip.x - bottomLip.x, 2) + Math.pow(topLip.y - bottomLip.y, 2));
        const puckerRatio = mouthWidth / (mouthHeight + 0.0001);

        // Rất nhạy: puckerRatio < 2.5 là đã bắt đầu nhận diện thổi
        if (puckerRatio < 2.5 && mouthHeight > 0.01) { 
             window.blowCandle();
        }
    } else {
        statusText.innerText = "Xích lại gần camera để thổi nến nhé!";
    }
});

const camera = new Camera(videoElement, {
    onFrame: async () => { await faceMesh.send({ image: videoElement }); },
    width: 480, height: 480,
});

camera.start();
