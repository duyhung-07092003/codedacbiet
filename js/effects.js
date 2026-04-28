/* ========== UTILITIES & EFFECTS ========== */

// ========== MODAL FUNCTIONS ==========

const storyData = {
    1: {
        title: 'Ngày Đầu Gặp Nhau',
        story: 'Anh vẫn nhớ rõ như hôm nay. Lần đầu tiên anh nhìn thấy em, trái tim anh đã biết mình cần phải biết thêm về em. Cái cách em cười, cái cách em nói chuyện... tất cả đều khiến anh mê hoặc. Ngày hôm đó, anh đã tìm thấy lý do để sống - đó là em.'
    },
    2: {
        title: 'Buổi Hẹn Đầu',
        story: 'Chúng ta cười hết ngày. Từng giây, từng phút bên em đều là quý giá nhất. Anh nhớ em mặc bộ đầm yêu thích ấy, và cách em nhìn anh với ánh mắt đầy tình cảm. Đó là lúc anh biết chắc chắn: em là người anh muốn ở bên mãi mãi.'
    },
    3: {
        title: 'Chuyến Đi Đầu Tiên',
        story: 'Đó là chuyến đi tuyệt vời. Chúng ta khám phá những địa điểm mới, thử những đồ ăn mới, nhưng điều quan trọng nhất là chúng ta được cùng nhau. Những khoảnh khắc bình thường trở nên đặc biệt vì em ở bên anh. Em là điểm đến mà anh muốn tới.'
    },
    4: {
        title: 'Những Lúc Bình Thường',
        story: 'Không cần đi đâu xa, không cần làm gì đặc biệt. Chỉ cần ở bên em, nghe em kể chuyện, cười cùng em... những điều bình thường ấy trở thành những kỷ niệm quý giá nhất của anh. Những lúc bình thường bên em, là những lúc anh cảm thấy mình sống thực sự.'
    }
};

function openModal(storyId) {
    const modal = document.getElementById('storyModal');
    const title = document.getElementById('modalTitle');
    const story = document.getElementById('modalStory');

    if (storyData[storyId]) {
        title.textContent = storyData[storyId].title;
        story.textContent = storyData[storyId].story;
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('storyModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('storyModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// ========== REASON CARDS ==========

const reasons = [
    '❤️ Em cười rất đáng yêu',
    '💕 Em luôn hiểu anh',
    '🌟 Em là nhà của anh',
    '✨ Em làm anh trở thành phiên bản tốt hơn',
    '🎀 Em xinh đẹp từ trong ra ngoài',
    '💝 Em chăm sóc anh rất tốt',
    '🌸 Em có trái tim vàng',
    '😘 Nụ hôn em ngọt ngào',
    '🎵 Giọng nói em rất dịu dàng',
    '🌈 Em mang những sắc màu vào đời anh',
    '💪 Em mạnh mẽ và dũng cảm',
    '🎯 Em biết những gì anh cần',
    '👑 Em là nữ hoàng trong tim anh',
    '🌙 Em đẹp như ánh trăng',
    '☀️ Em sáng như mặt trời',
    '🦋 Em nhẹ nhàng và tuyệt vời',
    '🌺 Em có mùi hương tuyệt vời',
    '💐 Em là bó hoa tươi nhất',
    '🎨 Em là tác phẩm của tình yêu',
    '🎭 Em mang tình cảm vào tất cả',
    '🏆 Em là người tuyệt vời nhất',
    '🔥 Em nóng bỏng và cuốn hút',
    '❄️ Em mát mẻ và yên tĩnh',
    '🌊 Em sâu sắc như đại dương',
    '🏔️ Em mạnh mẽ như núi',
    '🌳 Em dịu dàng như lá cây',
    '🎪 Em làm cuộc sống anh vui vẻ',
    '🎨 Em tô vẽ đời anh bằng màu sắc',
    '🚀 Em đưa anh lên mây xanh',
    '💎 Em quý giá như kim cương'
];

function initializeReasonCards() {
    const container = document.getElementById('reasonsContainer');
    if (!container) return;

    const shuffled = [...reasons].sort(() => Math.random() - 0.5);
    
    container.innerHTML = '';
    shuffled.forEach((reason, index) => {
        const card = document.createElement('div');
        card.className = 'reason-card';
        card.innerHTML = `
            <div class="reason-card-inner">
                <div class="reason-card-front">💕</div>
                <div class="reason-card-back">${reason}</div>
            </div>
        `;

        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });

        container.appendChild(card);
    });
}

function shuffleReasons() {
    initializeReasonCards();
    
    // Animate cards
    const cards = document.querySelectorAll('.reason-card');
    cards.forEach((card, index) => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'slideUp 0.5s ease forwards';
        }, index * 50);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeReasonCards();
});

// ========== LETTER OPENING ==========

function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');

    if (envelope && letter) {
        envelope.style.display = 'none';
        letter.style.display = 'block';
        letter.classList.add('open');
    }
}

// ========== SCROLL NAVIGATION ==========

function scrollToSection(sectionNumber) {
    const section = document.getElementById(`section${sectionNumber}`);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function restartJourney() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Reset all sections
    setTimeout(() => {
        // Reset gift box
        const giftBox = document.getElementById('giftBox');
        const giftReveal = document.getElementById('giftReveal');
        if (giftBox && giftReveal) {
            giftBox.style.display = 'block';
            giftReveal.style.display = 'none';
        }

        // Reset envelope
        const envelope = document.getElementById('envelope');
        const letter = document.getElementById('letter');
        if (envelope && letter) {
            envelope.style.display = 'block';
            letter.style.display = 'none';
        }

        // Reset all flames
        document.querySelectorAll('.flame').forEach(flame => {
            flame.classList.remove('blown');
        });

        // Reset reason cards
        initializeReasonCards();
    }, 500);
}

// ========== AUDIO CONTROL ==========

document.addEventListener('DOMContentLoaded', () => {
    const audioToggle = document.getElementById('audioToggle');
    const bgMusic = document.getElementById('bgMusic');

    if (audioToggle && bgMusic) {
        audioToggle.addEventListener('click', function() {
            if (bgMusic.paused) {
                bgMusic.play().catch(() => {
                    console.log('Autoplay prevented - user must interact first');
                });
                audioToggle.classList.remove('muted');
            } else {
                bgMusic.pause();
                audioToggle.classList.add('muted');
            }
        });

        // Try to play music on first user interaction
        document.addEventListener('click', function initAudio() {
            if (bgMusic.paused && !audioToggle.classList.contains('muted')) {
                bgMusic.play().catch(() => {
                    // Silent fail - browser may not allow autoplay
                });
            }
            document.removeEventListener('click', initAudio);
        }, { once: true });
    }
});

// ========== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ==========

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('entrance-fade');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.timeline-item').forEach(el => {
        observer.observe(el);
    });
});

// ========== KEYBOARD SHORTCUTS ==========

document.addEventListener('keydown', (e) => {
    // ESC to close modal
    if (e.key === 'Escape') {
        closeModal();
    }

    // Arrow keys for navigation (optional)
    if (e.key === 'ArrowDown') {
        const current = getCurrentSection();
        if (current < 8) {
            scrollToSection(current + 1);
        }
    }

    if (e.key === 'ArrowUp') {
        const current = getCurrentSection();
        if (current > 1) {
            scrollToSection(current - 1);
        }
    }
});

function getCurrentSection() {
    const sections = document.querySelectorAll('.section');
    let current = 1;

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2) {
            current = index + 1;
        }
    });

    return current;
}

// ========== PRELOAD PREVENTION (Optional) ==========

window.addEventListener('beforeunload', (e) => {
    // Uncomment to prevent accidental refresh
    // e.preventDefault();
    // e.returnValue = '';
});
