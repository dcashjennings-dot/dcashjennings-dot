// Make gallery images open in a full-screen popup

document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
        openImage(img.src);
    });
});

function openImage(src) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('image-overlay');

    // Create image element
    const fullImg = document.createElement('img');
    fullImg.src = src;

    // Add image to overlay
    overlay.appendChild(fullImg);

    // Close overlay when clicked
    overlay.addEventListener('click', () => {
        overlay.remove();
    });

    // Add overlay to page
    document.body.appendChild(overlay);
}
