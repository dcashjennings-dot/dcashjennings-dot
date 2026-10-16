// Make carousel images open in a full-screen popup
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

// Carousel controls
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;

// Each image is now 400px wide + 20px margin = 420px slide distance
nextBtn.addEventListener('click', () => {
    const images = document.querySelectorAll('.carousel-track img');
    if (index < images.length - 1) {
        index++;
        track.style.transform = `translateX(-${index * 420}px)`;
    }
});

prevBtn.addEventListener('click', () => {
    if (index > 0) {
        index--;
        track.style.transform = `translateX(-${index * 420}px)`;
    }
});
