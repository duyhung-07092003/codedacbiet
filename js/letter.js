document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const envelopeContainer = document.getElementById('envelopeContainer');
    const letterContent = document.getElementById('letterContent');
    const letterDate = document.getElementById('letterDate');
    const attachedPhoto = document.getElementById('attachedPhoto');
    const polaroidInLetter = document.getElementById('polaroidInLetter');

    // Cập nhật ngày tháng
    const now = new Date();
    letterDate.innerText = `Ngày ${now.getDate()} tháng ${now.getMonth() + 1} năm ${now.getFullYear()}`;

    // Kiểm tra ảnh từ localStorage
    const lastPhoto = localStorage.getItem('lastCapturedPhoto');
    if (lastPhoto) {
        attachedPhoto.src = lastPhoto;
        polaroidInLetter.style.display = 'block';
    }

    // Hiệu ứng mở thư
    envelope.addEventListener('click', () => {
        envelope.classList.add('open');
        
        setTimeout(() => {
            // Hiệu ứng mờ dần phong bì và hiện bức thư
            envelopeContainer.style.transition = 'all 0.8s ease';
            envelopeContainer.style.opacity = '0';
            envelopeContainer.style.transform = 'translateY(-50px)';
            
            setTimeout(() => {
                envelopeContainer.style.display = 'none';
                letterContent.style.display = 'block';
                letterContent.style.animation = 'slideUp 1s ease forwards';
                
                // Bắn pháo hoa giấy mừng sinh nhật
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#ff0000', '#ffa500', '#ffc0cb', '#ffffff']
                    });
                }
            }, 500);
        }, 800);
    });
});
