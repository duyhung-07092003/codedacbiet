document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.story-slide');
    const progressBar = document.getElementById('progressBar');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    
    let currentIndex = 0;
    let isPaused = false;
    let progress = 0;
    const duration = 6000; // 6 seconds per slide
    const interval = 10; // Update progress every 10ms
    let timer;

    function updateSlides() {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentIndex);
        });
        progress = 0;
        progressBar.style.width = '0%';
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlides();
    }

    function startTimeline() {
        timer = setInterval(() => {
            if (!isPaused) {
                progress += (interval / duration) * 100;
                progressBar.style.width = `${progress}%`;
                
                if (progress >= 100) {
                    nextSlide();
                }
            }
        }, interval);
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
    });

    pauseBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        pauseBtn.innerHTML = isPaused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
    });

    // Start the story
    updateSlides();
    startTimeline();
});
