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
    'images/background1.jpg',
    'images/background2.jpg',
    'images/background3.jpg',
    'images/background4.jpg',
    // Add more images as desired
];

// Function to display a random quote in a random position along the bottom
function displayRandomQuote() {
    const quoteElement = document.getElementById("quote");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];

    // Set random horizontal position within the viewport width
    const randomX = Math.floor(Math.random() * (window.innerWidth - 200));
    quoteEl
