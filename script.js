// Array of quotes
const quotes = [
    "'I love deadlines. I love the whooshing noise they make as they go by.' – Douglas Adams",
    "'I refuse to answer that question on the grounds that I don't know the answer.' – Douglas Adams",
    "'Don't Panic.' – Douglas Adams",
    "'Time is an illusion. Lunchtime doubly so.' – Douglas Adams",
    "'A common mistake that people make when trying to design something completely foolproof is to underestimate the ingenuity of complete fools.' – Douglas Adams",
    "'The story so far: In the beginning the Universe was created. This has made a lot of people very angry and been widely regarded as a bad move.' – Douglas Adams",
];

// Function to display a random quote in a random position
function displayRandomQuote() {
    const quoteElement = document.getElementById("quote");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];

    // Set random position
    const randomX = Math.floor(Math.random() * (window.innerWidth - 200));
    const randomY = Math.floor(Math.random() * (window.innerHeight - 50));
    quoteElement.style.left = `${randomX}px`;
    quoteElement.style.bottom = `${randomY}px`;
}

// Function to toggle the menu visibility
function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
}

// Call the function on page load
window.onload = displayRandomQuote;
