// Array of background images (update paths to your image files)
const backgrounds = [
    'background1.jpg',
    'background2.jpg',
    'background3.jpg',
    'background5.jpg',
    'background6.jpg',
    'background7.jpg',
];

// Function to set a random background image
function setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    document.body.style.backgroundImage = `url('${backgrounds[randomIndex]}')`;
}

// Function to display a random quote
function display
