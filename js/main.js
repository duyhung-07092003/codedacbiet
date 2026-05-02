/* ========== MAIN APP INITIALIZATION ========== */

/* ========== YOUTUBE BACKGROUND MUSIC ========== */
let ytPlayer;
const videoId = 'vhVBWw6rId0'; // Beautiful In White

// Load YouTube API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    // Check if container exists, if not create it hidden
    let container = document.getElementById('bgMusicContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'bgMusicContainer';
        container.style.position = 'fixed';
        container.style.top = '-100px';
        container.style.left = '-100px';
        container.style.width = '1px';
        container.style.height = '1px';
        container.style.opacity = '0';
        container.style.pointerEvents = 'none';
        document.body.appendChild(container);
    }

    ytPlayer = new YT.Player('bgMusicContainer', {
        height: '1',
        width: '1',
        videoId: videoId,
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'disablekb': 1,
            'fs': 0,
            'iv_load_policy': 3,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0,
            'loop': 1,
            'playlist': videoId
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    // Initial volume
    event.target.setVolume(40);
    // Check if we should play immediately (only if user interacted)
    if (localStorage.getItem('musicPlaying') === 'true') {
        event.target.playVideo();
    }
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        ytPlayer.playVideo();
    }
    if (event.data === YT.PlayerState.PLAYING) {
        localStorage.setItem('musicPlaying', 'true');
    } else {
        localStorage.setItem('musicPlaying', 'false');
    }
}

function toggleMusic() {
    const audioBtn = document.querySelector('.audio-btn') || document.getElementById('audioToggle');
    const icon = audioBtn ? audioBtn.querySelector('i') : null;

    if (ytPlayer && ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
        ytPlayer.pauseVideo();
        if (audioBtn) audioBtn.classList.add('muted');
        if (icon) {
            icon.classList.remove('fa-music');
            icon.classList.add('fa-volume-mute');
        }
    } else if (ytPlayer) {
        ytPlayer.playVideo();
        if (audioBtn) audioBtn.classList.remove('muted');
        if (icon) {
            icon.classList.remove('fa-volume-mute');
            icon.classList.add('fa-music');
        }
    }
}

// Function to boost video volume
function boostVolume(videoElement, multiplier = 4) {
    if (videoElement.dataset.boosted === 'true') return; // Prevent double boosting
    
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(videoElement);
        const gainNode = audioCtx.createGain();

        gainNode.gain.value = multiplier; 

        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        videoElement.dataset.boosted = 'true';
        console.log(`🔊 Audio boosted by ${multiplier}x for:`, videoElement.id || "video");
    } catch (e) {
        console.warn("Audio boost not supported or blocked by browser:", e);
    }
}

function initializeAudio() {
    const audioBtn = document.querySelector('.audio-btn') || document.getElementById('audioToggle');
    if (!audioBtn) return;

    audioBtn.addEventListener('click', toggleMusic);
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
        'Fetch API': !!window.fetch,
        'Intersection Observer': !!window.IntersectionObserver
    };

    console.log('🔍 Hỗ trợ trình duyệt:');
    Object.entries(required).forEach(([feature, supported]) => {
        console.log(`  ${supported ? '✅' : '❌'} ${feature}`);
    });

    return Object.values(required).every(v => v === true);
}

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
