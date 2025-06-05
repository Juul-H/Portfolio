document.getElementById('currentYear').textContent = new Date().getFullYear();

const fullName = "Juul Hannes";
const typingSpeed = 150;
const cursorFlickerInterval = 500;
const typedTextElement = document.getElementById('typed-text');
let charIndex = 0;
let animationComplete = false;
let cursorInterval;

function typeEffect() {
    if (animationComplete) return;

    typedTextElement.textContent = fullName.substring(0, charIndex);

    if (charIndex < fullName.length) {
        charIndex++;
        setTimeout(typeEffect, typingSpeed);
    } else {
        animationComplete = true;
        typedTextElement.style.borderRightColor = 'white';
        cursorInterval = setInterval(() => {
            typedTextElement.style.borderRightColor =
                typedTextElement.style.borderRightColor === 'transparent' ? 'white' : 'transparent';
        }, cursorFlickerInterval);
    }
}
document.addEventListener('DOMContentLoaded', typeEffect);

const fadeSections = document.querySelectorAll('.fade-in-section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

fadeSections.forEach(section => {
    observer.observe(section);
});

const allSections = document.querySelectorAll('main section');

allSections.forEach(section => {
    section.addEventListener('mouseenter', () => {
        // Only apply dimming if on a screen size where it's active (e.g., desktop)
        if (window.innerWidth >= 640) { // Check if screen is larger than mobile breakpoint
            allSections.forEach(otherSection => {
                if (otherSection !== section) {
                    otherSection.classList.add('dimmed-section');
                }
            });
        }
    });
    section.addEventListener('mouseleave', () => {
        if (window.innerWidth >= 640) { // Only remove dimming if on a screen size where it's active
            allSections.forEach(otherSection => {
                otherSection.classList.remove('dimmed-section');
            });
        }
    });
});