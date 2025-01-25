const slides = document.querySelector('.slides');
const dotsContainer = document.querySelector('.pagination');
const slideCount = document.querySelectorAll('.slide').length;

let currentIndex = 0;
let startX = 0;
let endX = 0;

function createDots() {
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateSlider();
        });
        dotsContainer.appendChild(dot);
    }
    updateDots();
}

function updateSlider() {
    const offset = -currentIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

slides.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

slides.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
});

slides.addEventListener('touchend', () => {
    const threshold = 50;
    if (startX - endX > threshold && currentIndex < slideCount - 1) {
        currentIndex++;
        updateSlider();
    } else if (endX - startX > threshold && currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

createDots();