/* ========== CANDLE BLOWING GAME ========== */

class CandleGame {
    constructor() {
        this.candles = document.querySelectorAll('.candle');
        this.flames = document.querySelectorAll('.flame');
        this.allBlown = false;
        this.audioContext = null;
        this.analyser = null;
        this.micStream = null;
        this.isListening = false;
        this.blownCandles = new Set();

        this.setupClickHandlers();
    }

    setupClickHandlers() {
        this.candles.forEach((candle, index) => {
            candle.addEventListener('click', () => this.blowCandle(index));
        });
    }

    blowCandle(index) {
        if (this.blownCandles.has(index)) return;

        const flame = this.flames[index];
        if (flame) {
            flame.classList.add('blown');
            this.blownCandles.add(index);

            // Play blow sound
            this.playBlowSound();

            // Check if all candles are blown
            this.checkCompletion();
        }
    }

    async startMicDetection() {
        if (this.isListening) {
            this.stopMicDetection();
            return;
        }

        try {
            // Request microphone access
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.micStream = stream;
            this.isListening = true;

            // Setup Web Audio API
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            const source = this.audioContext.createMediaStreamSource(stream);
            source.connect(this.analyser);
            this.analyser.fftSize = 256;

            // Update button state
            const micBtn = document.getElementById('micBtn');
            if (micBtn) {
                micBtn.textContent = '🎤 Listening...';
                micBtn.style.background = 'rgba(255, 105, 180, 0.3)';
            }

            // Start detecting blow
            this.detectBlow();
        } catch (err) {
            console.error('Microphone access denied:', err);
            alert('Vui lòng cấp quyền sử dụng microphone');
        }
    }

    detectBlow = () => {
        if (!this.isListening || !this.analyser) return;

        const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(dataArray);

        // Calculate average energy
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;

        // Detect sudden spike (blow) - threshold adjustable
        if (average > 100) {
            const unblownIndex = Array.from(this.blownCandles).length;
            if (unblownIndex < this.candles.length) {
                this.blowCandle(unblownIndex);
            }
        }

        requestAnimationFrame(this.detectBlow);
    }

    stopMicDetection() {
        this.isListening = false;

        if (this.micStream) {
            this.micStream.getTracks().forEach(track => track.stop());
            this.micStream = null;
        }

        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }

        const micBtn = document.getElementById('micBtn');
        if (micBtn) {
            micBtn.textContent = '🎤 Kích hoạt Microphone';
            micBtn.style.background = '';
        }
    }

    checkCompletion() {
        if (this.blownCandles.size === this.candles.length) {
            this.allBlown = true;
            this.onComplete();
        }
    }

    onComplete() {
        console.log('All candles blown! Celebration time!');
        this.playSuccessSound();
        
        // Trigger celebration effect
        if (fireworksSystem && document.getElementById('section8')) {
            const canvas = document.getElementById('fireworksCanvas');
            if (canvas) {
                const rect = canvas.getBoundingClientRect();
                fireworksSystem.burst(rect.width / 2, rect.height / 2, 8);
            }
        }

        this.stopMicDetection();
    }

    playBlowSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.frequency.value = 600;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.2);
        } catch (e) {
            // Silent fail
        }
    }

    playSuccessSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const notes = [800, 1000, 1200];

            notes.forEach((freq, i) => {
                setTimeout(() => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();

                    osc.connect(gain);
                    gain.connect(ctx.destination);

                    osc.frequency.value = freq;
                    osc.type = 'sine';
                    gain.gain.setValueAtTime(0.3, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

                    osc.start(ctx.currentTime);
                    osc.stop(ctx.currentTime + 0.2);
                }, i * 150);
            });
        } catch (e) {
            // Silent fail
        }
    }
}

// ========== SECTION 6 & 8 CANDLE GAMES ==========

let candleGameSection6 = null;
let candleGameSection8 = null;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize candle games
    const section6 = document.getElementById('section6');
    const section8 = document.getElementById('section8');

    if (section6) {
        candleGameSection6 = new CandleGame();
    }

    if (section8) {
        candleGameSection8 = new CandleGame();
    }

    // Setup microphone button
    const micBtn = document.getElementById('micBtn');
    if (micBtn && candleGameSection6) {
        micBtn.addEventListener('click', () => {
            candleGameSection6.startMicDetection();
        });
    }
});

// ========== FINALE CANDLE INTERACTION ==========

document.addEventListener('DOMContentLoaded', () => {
    const finalCandles = document.querySelectorAll('#section8 .candle');
    
    finalCandles.forEach((candle, index) => {
        candle.addEventListener('click', function() {
            const flame = this.querySelector('.flame');
            if (flame && !flame.classList.contains('blown')) {
                flame.classList.add('blown');

                // Trigger fireworks burst
                if (fireworksSystem) {
                    const canvas = document.getElementById('fireworksCanvas');
                    if (canvas) {
                        const rect = canvas.getBoundingClientRect();
                        fireworksSystem.burst(rect.width / 2, rect.height / 2, 12);
                    }
                }

                // Play celebration sound
                playCelebrationSound();

                // Show wish message after a delay
                setTimeout(() => {
                    const finaleContent = document.querySelector('#section8 .finale-content');
                    if (finaleContent) {
                        const wish = document.createElement('p');
                        wish.style.marginTop = '30px';
                        wish.style.fontSize = '1.3rem';
                        wish.style.color = '#FFD700';
                        wish.style.animation = 'float 3s ease-in-out infinite';
                        wish.textContent = '✨ Ước mong của em được thực hiện! ✨';
                        finaleContent.appendChild(wish);
                    }
                }, 500);
            }
        });
    });
});

function playCelebrationSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [1000, 1200, 1400, 1600];

        notes.forEach((freq, i) => {
            setTimeout(() => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.frequency.value = freq;
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.3);
            }, i * 100);
        });
    } catch (e) {
        // Silent fail
    }
}
