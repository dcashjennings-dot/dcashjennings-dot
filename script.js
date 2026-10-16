/* ================================
   Full-Screen Image Popup
================================ */

document.querySelectorAll('.carousel-track img').forEach(img => {
    img.addEventListener('click', () => {
        openImage(img.src);
    });
});

function openImage(src) {
    const overlay = document.createElement('div');
    overlay.classList.add('image-overlay');

    const fullImg = document.createElement('img');
    fullImg.src = src;

    overlay.appendChild(fullImg);

    overlay.addEventListener('click', () => {
        overlay.remove();
    });

    document.body.appendChild(overlay);
}

/* ================================
   Two-Way Pixel-Based Carousel
================================ */

const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const images = document.querySelectorAll('.carousel-track img');

let index = 0;
const slideAmount = 920; // 900px image + 20px margin

nextBtn.addEventListener('click', () => {
    if (index < images.length - 1) {
        index++;
        track.style.transform = `translateX(-${index * slideAmount}px)`;
    }
});

prevBtn.addEventListener('click', () => {
    if (index > 0) {
        index--;
        track.style.transform = `translateX(-${index * slideAmount}px)`;
    }
});
