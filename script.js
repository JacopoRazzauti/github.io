/**
 * Sets a random background image from the backgrounds array
 */
function setRandomBackground() {
    const backgrounds = [
        'images/background1.jpg',
        'images/background5.jpg',
        'images/background6.jpg',
        'images/background7.jpg',
    ];

    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    const imageUrl = `url('${backgrounds[randomIndex]}')`;

    // Create a new image to preload
    const img = new Image();
    img.onload = () => {
        document.body.style.backgroundImage = imageUrl;
        document.body.style.opacity = 1;
    };
    img.src = backgrounds[randomIndex];
}

/**
 * Generates a random position within the viewport
 * @returns {{x: number, y: number}} Coordinates
 */
function getRandomPosition() {
    const margin = 50; // Use a constant for margin
    return {
        x: margin + Math.random() * (window.innerWidth - 2 * margin),
        y: margin + Math.random() * (window.innerHeight - 2 * margin)
    };
}

/**
 * Updates positions of all mosquitoes
 */
function updateMosquitoPositions() {
    const mosquitoes = document.querySelectorAll('.mosquito');

    mosquitoes.forEach(mosquito => {
        const {
            x,
            y
        } = getRandomPosition();

        // Apply smooth transition
        mosquito.style.transition = 'all 2s ease-in-out';
        mosquito.style.left = `${x}px`;
        mosquito.style.top = `${y}px`;

        // Random rotation for more natural movement
        const rotation = Math.random() * 360;
        mosquito.style.transform = `rotate(${rotation}deg)`;
    });
}

/**
 * Handles window resize events
 */
function handleResize() {
    // Immediately update mosquito positions when window is resized
    updateMosquitoPositions();
}

/**
 * Initializes all page animations and effects
 */
function initializePageEffects() {
    // Set initial background
    setRandomBackground();

    // Position mosquitoes initially
    updateMosquitoPositions();

    // Start mosquito movement interval
    setInterval(updateMosquitoPositions, 4000); // Use a constant if needed

    // Add resize handler
    window.addEventListener('resize', handleResize);

    // Add hover effect for main circle
    const mainCircle = document.querySelector('.main-circle');
    if (mainCircle) {
        mainCircle.addEventListener('mousemove', (e) => {
            const rect = mainCircle.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Create subtle gradient movement effect
            mainCircle.style.background = `
                radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(255, 255, 255, 0.2),
                    rgba(255, 255, 255, 0.15)
                )
            `;
        });

        mainCircle.addEventListener('mouseleave', () => {
            mainCircle.style.background = 'rgba(255, 255, 255, 0.15)';
        });
    }
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', initializePageEffects);

// Handle background loading
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});