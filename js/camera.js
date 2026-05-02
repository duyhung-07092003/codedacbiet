let stream = null;
const video = document.getElementById('cameraFeed');
const canvas = document.getElementById('photoCanvas');
const ctx = canvas.getContext('2d');
const startCameraBtn = document.getElementById('startCameraBtn');
const takeShotBtn = document.getElementById('takeShotBtn');
const stopCameraBtn = document.getElementById('stopCameraBtn');
const gallery = document.getElementById('polaroidGallery');
const flash = document.getElementById('cameraFlash');
const countdownEl = document.getElementById('countdown');
const frameOverlay = document.getElementById('frameOverlay');
const frameOptions = document.querySelectorAll('.frame-option');
const partnerPhotoInput = document.getElementById('partnerPhotoInput');
const uploadPartnerBtn = document.getElementById('uploadPartnerBtn');
const partnerImg = document.getElementById('partnerImg');
const partnerPlaceholder = document.getElementById('partnerPlaceholder');

let selectedFrame = 'none';
let partnerImageLoaded = false;

// Partner Photo Upload
uploadPartnerBtn.addEventListener('click', () => partnerPhotoInput.click());

partnerPhotoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const tempImg = new Image();
            tempImg.onload = () => {
                partnerImg.src = event.target.result;
                partnerImg.style.display = 'block';
                partnerPlaceholder.style.display = 'none';
                partnerImageLoaded = true;
                console.log("Partner image loaded successfully.");
            };
            tempImg.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Frame selection
frameOptions.forEach(option => {
    option.addEventListener('click', () => {
        frameOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        selectedFrame = option.dataset.frame;
        
        // Update overlay
        frameOverlay.className = 'camera-overlay';
        if (selectedFrame !== 'none') {
            frameOverlay.classList.add(`frame-${selectedFrame}`);
        }
    });
});

// Sound effect (Shutter)
const shutterSound = new Audio('https://assets.mixkit.co/active_storage/sfx/700/700-preview.mp3');

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
            canvas.width = 600;
            canvas.height = 800;
        };

        startCameraBtn.style.display = 'none';
        takeShotBtn.style.display = 'inline-block';
        stopCameraBtn.style.display = 'inline-block';
    } catch (error) {
        console.error('Camera error:', error);
        alert('Không thể truy cập camera. Vui lòng kiểm tra quyền và kết nối HTTPS.');
    }
});

// Take Polaroid Shot with Countdown
takeShotBtn.addEventListener('click', () => {
    let count = 3;
    countdownEl.innerText = count;
    countdownEl.classList.add('countdown-active');
    takeShotBtn.disabled = true;

    const timer = setInterval(() => {
        count--;
        if (count > 0) {
            countdownEl.innerText = count;
        } else {
            clearInterval(timer);
            countdownEl.classList.remove('countdown-active');
            capturePhoto();
            takeShotBtn.disabled = false;
        }
    }, 1000);
});

// Helper to draw image like object-fit: cover
function drawImageCover(ctx, img, x, y, w, h) {
    if (!img || (img instanceof HTMLVideoElement && img.readyState < 2)) return;
    
    const imgWidth = img instanceof HTMLVideoElement ? img.videoWidth : img.width;
    const imgHeight = img instanceof HTMLVideoElement ? img.videoHeight : img.height;
    
    const imgAspect = imgWidth / imgHeight;
    const canvasAspect = w / h;
    let sx, sy, sw, sh;

    if (imgAspect > canvasAspect) {
        sh = imgHeight;
        sw = imgHeight * canvasAspect;
        sx = (imgWidth - sw) / 2;
        sy = 0;
    } else {
        sw = imgWidth;
        sh = imgWidth / canvasAspect;
        sx = 0;
        sy = (imgHeight - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

function capturePhoto() {
    if (!video.videoWidth) return;

    // Shutter sound
    shutterSound.play();

    // Flash Effect
    flash.classList.remove('camera-flash-active');
    void flash.offsetWidth; 
    flash.classList.add('camera-flash-active');

    // Canvas size should be consistent
    canvas.width = 600;
    canvas.height = 800;

    // Clear canvas
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Camera Feed (mirrored)
    ctx.save();
    ctx.scale(-1, 1);
    drawImageCover(ctx, video, -canvas.width, 0, canvas.width, canvas.height);
    ctx.restore();

    // 2. Draw Partner Image if loaded
    if (partnerImageLoaded && partnerImg.src && partnerImg.src !== "") {
        const pWidth = canvas.width * 0.35; 
        const pHeight = pWidth * 1.33;
        const pX = canvas.width - pWidth - 30;
        const pY = 30;

        // Draw white border for partner photo
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 15;
        ctx.fillStyle = "white";
        ctx.fillRect(pX - 5, pY - 5, pWidth + 10, pHeight + 10);
        ctx.restore();

        // Draw image over white background
        drawImageCover(ctx, partnerImg, pX, pY, pWidth, pHeight);
    }

    // 3. Draw Beautiful Frame/Border
    const borderSize = 40;
    ctx.lineWidth = borderSize;

    if (selectedFrame !== 'none') {
        let color1 = '#fb7185', color2 = '#f43f5e';
        if (selectedFrame === 'flowers') { color1 = '#fbbf24'; color2 = '#f59e0b'; }
        if (selectedFrame === 'stars') { color1 = '#fef08a'; color2 = '#facc15'; }
        if (selectedFrame === 'birthday') { color1 = '#fbcfe8'; color2 = '#f472b6'; }
        if (selectedFrame === 'elegant') { color1 = '#db2777'; color2 = '#9d174d'; }
        
        // Gradient Border
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        
        ctx.strokeStyle = gradient;
        ctx.strokeRect(borderSize/2, borderSize/2, canvas.width - borderSize, canvas.height - borderSize);

        // Decorative Text
        ctx.fillStyle = "white";
        ctx.font = "italic bold 30px Arial";
        ctx.textAlign = "center";
        
        let label = "Forever Love";
        if (selectedFrame === 'birthday') label = "Happy Birthday My Dear";
        if (selectedFrame === 'flowers') label = "Together Everywhere";
        if (selectedFrame === 'elegant') label = "Our Precious Moment";
        
        ctx.fillText(label, canvas.width / 2, canvas.height - 60);
    } else {
        ctx.strokeStyle = "white";
        ctx.strokeRect(borderSize/2, borderSize/2, canvas.width - borderSize, canvas.height - borderSize);
    }

    const imageData = canvas.toDataURL('image/png');
    createPolaroid(imageData);
}

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

// Cleanup
window.addEventListener('beforeunload', () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
});
