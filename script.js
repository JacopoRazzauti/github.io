// Array of quotes
const quotes = [
    "'I love deadlines. I love the whooshing noise they make as they go by.' – Douglas Adams",
    "'I refuse to answer that question on the grounds that I don't know the answer.' – Douglas Adams",
    "'Don't Panic.' – Douglas Adams",
    "'Time is an illusion. Lunchtime doubly so.' – Douglas Adams",
    "'A common mistake that people make when trying to design something completely foolproof is to underestimate the ingenuity of complete fools.' – Douglas Adams",
    "'The story so far: In the beginning the Universe was created. This has made a lot of people very angry and been widely regarded as a bad move.' – Douglas Adams",
];

// Array of background images (update paths to your image files)
const backgrounds = [
    'background1.jpg',
    'background2.jpg',
    'background3.jpg',
    'background5.jpg',
    'background6.jpg',
    'background7.jpg',
    // Add more images as desired
];

// Function to display a random quote
function displayRandomQuote() {
    const quoteElement = document.getElementById("quote");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
}

// Function to set a random background image
function setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    document.body.style.backgroundImage = `url('${backgrounds[randomIndex]}')`;
}

// Call functions on page load
window.onload = () => {
    displayRandomQuote();
    setRandomBackground();
};
