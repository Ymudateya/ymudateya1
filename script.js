function scrollToFast(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + start;
    const duration = 350; // ms — cámbialo para más rápido (menos ms) o más lento (más ms)
    let startTime = null;

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, start + (end - start) * easeInOutQuad(progress));
        if (elapsed < duration) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

let currentSlide = 0;
const cards = document.querySelectorAll(".card");

function showSlide(index) {
    cards.forEach(card => card.classList.remove("active"));
    cards[index].classList.add("active");
}

function nextSlide() {
    currentSlide++;
    if (currentSlide >= cards.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = cards.length - 1;
    }
    showSlide(currentSlide);
}