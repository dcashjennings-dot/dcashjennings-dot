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
   Browser-Consistent Carousel
================================ */

const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const images = document.querySelectorAll('.carousel-track img');

let index = 0;

// Move by percentage instead of pixels (works the same in all browsers)
nextBtn.addEventListener('click', () => {
    if (index < images.length - 1) {
        index++;
        track.style.transform = `translateX(-${index * (100 / images.length)}%)`;
    }
});

prevBtn.addEventListener('click', () => {
    if (index > 0) {
        index--;
        track.style.transform = `translateX(-${index * (100 / images.length)}%)`;
    }
});
