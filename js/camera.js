let stream = null;
const video = document.getElementById('cameraFeed');
const canvas = document.getElementById('photoCanvas');
const ctx = canvas.getContext('2d');
const startCameraBtn = document.getElementById('startCameraBtn');
const takeShotBtn = document.getElementById('takeShotBtn');
const stopCameraBtn = document.getElementById('stopCameraBtn');
const gallery = document.getElementById('polaroidGallery');
const flash = document.getElementById('cameraFlash');

// Start Camera
startCameraBtn.addEventListener('click', async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'user',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            },
            audio: false 
        });
        video.srcObject = stream;
        video.play();

        video.onloadedmetadata = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        };

        startCameraBtn.style.display = 'none';
        takeShotBtn.style.display = 'inline-block';
        stopCameraBtn.style.display = 'inline-block';
    } catch (error) {
        console.error('Camera error:', error);
        alert('Không thể truy cập camera. Vui lòng kiểm tra quyền và kết nối HTTPS.');
    }
});

// Take Polaroid Shot
takeShotBtn.addEventListener('click', () => {
    // Flash Effect
    flash.classList.remove('camera-flash-active');
    void flash.offsetWidth; // Trigger reflow
    flash.classList.add('camera-flash-active');

    // Draw to canvas (mirrored)
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    ctx.restore();

    const imageData = canvas.toDataURL('image/png');
    localStorage.setItem('lastCapturedPhoto', imageData);
    createPolaroid(imageData);
});

function createPolaroid(src) {
    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid';
    
    // Random rotation for natural look
    const rotation = Math.random() * 10 - 5;
    polaroid.style.setProperty('--rotation', `${rotation}deg`);

    const date = new Date();
    const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    polaroid.innerHTML = `
        <i class="fas fa-heart polaroid-sticker"></i>
        <img src="${src}" alt="Kỷ niệm">
        <div class="polaroid-caption">My Love - ${dateString}</div>
    `;

    // Click to download
    polaroid.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = src;
        link.download = `love_polaroid_${Date.now()}.png`;
        link.click();
    });

    // Add to gallery
    if (gallery.firstChild) {
        gallery.insertBefore(polaroid, gallery.firstChild);
    } else {
        gallery.appendChild(polaroid);
    }

    // Optional: Limit to 6 photos to avoid clutter
    if (gallery.children.length > 6) {
        gallery.removeChild(gallery.lastChild);
    }
}

// Stop Camera
stopCameraBtn.addEventListener('click', () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    startCameraBtn.style.display = 'inline-block';
    takeShotBtn.style.display = 'none';
    stopCameraBtn.style.display = 'none';
    video.srcObject = null;
});

// Cleanup
window.addEventListener('beforeunload', () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
});
