/* ========== MAIN APP INITIALIZATION ========== */

// Audio Control
const bgMusic = document.getElementById('bgMusic');
const audioBtn = document.querySelector('.audio-btn') || document.getElementById('audioToggle');
let isAudioPlaying = false;

function initializeAudio() {
    if (!bgMusic || !audioBtn) return;

    // Try to autoplay
    bgMusic.volume = 0.3;
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                isAudioPlaying = true;
                audioBtn.classList.remove('muted');
            })
            .catch(() => {
                // Autoplay failed - user needs to interact first
                isAudioPlaying = false;
                audioBtn.classList.add('muted');
            });
    }

    // Audio toggle button
    audioBtn.addEventListener('click', () => {
        const icon = audioBtn.querySelector('i');
        if (isAudioPlaying) {
            bgMusic.pause();
            audioBtn.classList.add('muted');
            if (icon) {
                icon.classList.remove('fa-music');
                icon.classList.add('fa-volume-mute');
            }
            isAudioPlaying = false;
        } else {
            bgMusic.play().catch(() => {});
            audioBtn.classList.remove('muted');
            if (icon) {
                icon.classList.remove('fa-volume-mute');
                icon.classList.add('fa-music');
            }
            isAudioPlaying = true;
        }
    });

    // Resume on visibility change
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && isAudioPlaying) {
            bgMusic.play().catch(() => {});
        } else if (document.hidden) {
            bgMusic.pause();
        }
    });
}

// Check viewport
function checkViewport() {
    const isMobile = window.innerWidth <= 768;
    document.body.classList.toggle('mobile-view', isMobile);
    document.body.classList.toggle('desktop-view', !isMobile);
}

// Browser support check
function checkBrowserSupport() {
    const required = {
        'Canvas API': !!document.createElement('canvas').getContext('2d'),
        'Web Audio API': !!(window.AudioContext || window.webkitAudioContext),
        'Fetch API': !!window.fetch,
        'Intersection Observer': !!window.IntersectionObserver
    };

    console.log('🔍 Hỗ trợ trình duyệt:');
    Object.entries(required).forEach(([feature, supported]) => {
        console.log(`  ${supported ? '✅' : '❌'} ${feature}`);
    });

    return Object.values(required).every(v => v === true);
}

// Keyboard navigation accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Error handling
window.addEventListener('error', (event) => {
    console.error('❌ Lỗi:', event.message);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Promise Rejection:', event.reason);
});

// Initialize on DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎁 Ứng dụng Tặng Quà Sinh Nhật đã khởi động');
    
    initializeAudio();
    checkViewport();
    checkBrowserSupport();
    
    window.addEventListener('resize', checkViewport);
});

// Page load complete
window.addEventListener('load', () => {
    console.log('✅ Tất cả tài nguyên đã được tải');
});

console.log('%c🎂 Trang Web Tặng Quà Sinh Nhật', 'color: #FF69B4; font-size: 16px; font-weight: bold;');
console.log('%cTạo với ❤️', 'color: #FFD700; font-size: 14px;');
console.log('%cHãy thưởng thức! 🎉', 'color: #87CEEB; font-size: 14px; font-style: italic;');
