/**
 * General Scripts and utilities used across the site.
 * Includes menu toggle functionality and main page background/mosquito effects.
 */

// Configuration object (Keep as is from biography.js)
const CONFIG = {
    menu: {
        animationDelay: 50, // Adjusted slightly for potentially faster menu animation
    },
    milestone: {
        threshold: 0.1,     // Intersection observer threshold
        fadeDelay: 100      // Delay between milestone animations (ms)
    },
    // Add config for mosquitos if needed, e.g., mosquitoMoveInterval: 4000
};

// --- Menu Handling (Consolidated from various files) ---

// Get menu elements
const menu = document.getElementById('menu');
const menuButton = document.querySelector('.menu-icon');
// Note: menuLinks might be defined inside NavigationMenu class if used, 
// or select them here if toggleMenu animates them directly. 
// Let's make the menu handling a simple function for now.

/**
 * Toggles the visibility of the navigation menu.
 */
function toggleMenu() {
    // Ensure the menu element exists before trying to toggle
    if (menu) {
        menu.classList.toggle('show');
        // Optional: Add animation class if you want to animate menu items
        // animateMenuItems(); // Requires menuLinks to be defined or passed
    } else {
        console.warn("Menu element with ID 'menu' not found.");
    }
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    // Ensure menu and menuButton elements exist
    if (menu && menuButton) {
        const isMenuShown = menu.classList.contains('show');
        const isClickInsideMenu = menu.contains(e.target);
        const isClickOnMenuButton = menuButton.contains(e.target);

        if (isMenuShown && !isClickInsideMenu && !isClickOnMenuButton) {
            toggleMenu(); // Close the menu
        }
    }
});


// --- Main Page Background and Mosquito Effects (From original script.js) ---

/**
 * Sets a random background image from the backgrounds array
 */
function setRandomBackground() {
    const backgrounds = [
        '../images/backgrounds/background1.jpg', // Updated path
        '../images/backgrounds/background5.jpg', // Updated path
        '../images/backgrounds/background6.jpg', // Updated path
        '../images/backgrounds/background7.jpg', // Updated path
    ];

    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    const imageUrl = `url('${backgrounds[randomIndex]}')`;

    // Create a new image to preload
    const img = new Image();
    img.onload = () => {
        // Apply background only after it's loaded
        document.body.style.backgroundImage = imageUrl;
        // Fade in body once background is set and loaded
        document.body.style.opacity = 1;
    };
    img.onerror = () => {
         console.error("Failed to load background image:", imageUrl);
         // Fallback or handle error if image fails to load
         document.body.style.backgroundImage = 'none'; // Or a fallback solid color/pattern
         document.body.style.backgroundColor = 'black';
         document.body.style.opacity = 1; // Still show the page
    };
    img.src = backgrounds[randomIndex];
}

/**
 * Generates a random position within the viewport
 * @returns {{x: number, y: number}} Coordinates
 */
function getRandomPosition() {
    const margin = 50; // Use a constant for margin
    // Ensure positions are within visible area considering element size (approx 50px)
    const maxX = window.innerWidth - margin - 50;
    const maxY = window.innerHeight - margin - 50;

    return {
        x: margin + Math.random() * (maxX - margin),
        y: margin + Math.random() * (maxY - margin)
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
        mosquito.style.transition = 'all 4s ease-in-out'; // Increased duration for smoother travel
        mosquito.style.left = `${x}px`;
        mosquito.style.top = `${y}px`;

        // Optional: Random rotation for more natural movement
        // const rotation = Math.random() * 360;
        // mosquito.style.transform = `rotate(${rotation}deg)`;
        // Note: If you use rotate, ensure it combines with any other transforms like scale if applied
    });
}

/**
 * Handles window resize events
 */
function handleResize() {
    // Immediately update mosquito positions when window is resized
    updateMosquitoPositions();
}

// --- Initialization ---

/**
 * Initializes all page animations and effects relevant to the index page
 * and general functionality like the menu.
 */
function initializePageEffects() {
    // Only run index-specific effects on the index page
    if (document.body.classList.contains('index-page')) { // Add a class="index-page" to your index.html body
         // Set initial background (handles loading and opacity fade-in)
        setRandomBackground();

        // Position mosquitoes initially
        updateMosquitoPositions();

        // Start mosquito movement interval
        setInterval(updateMosquitoPositions, 6000); // Adjusted interval

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

    // Add resize handler (relevant if elements reposition on resize, like mosquitos)
    window.addEventListener('resize', handleResize);

    // Menu toggle initialization (Ensure menuButton and menu are globally accessible or select them here)
    // These were selected at the top of the file
     if (!menuButton || !menu) {
         console.warn("Menu button or menu not found. Menu toggle may not work.");
     }

}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePageEffects);

// Add a class to the body when everything is loaded (useful for CSS transitions)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});