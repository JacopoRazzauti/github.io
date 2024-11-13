// Ocean Animation Class
class OceanBackground {
    constructor() {
        this.createFishSchools();
        this.createBubbles();
        this.updateDepthEffects();
    }

    createFishSchools() {
        const fishContainer = document.createElement('div');
        fishContainer.className = 'fish-school';
        document.body.appendChild(fishContainer);

        // Create multiple schools at different depths
        const schoolCount = 3;
        for (let s = 0; s < schoolCount; s++) {
            const depth = (s + 1) * 25; // Distribute schools vertically
            this.createSchool(fishContainer, depth);
        }
    }

    createSchool(container, depth) {
        const fishCount = 12;
        for (let i = 0; i < fishCount; i++) {
            const fish = document.createElement('div');
            fish.className = 'fish';
            
            // Randomize fish positions and rotations within school
            const yVariation = Math.random() * 50 - 25;
            const rotation = Math.random() * 10 - 5;
            
            fish.style.setProperty('--y', `${depth + yVariation}vh`);
            fish.style.setProperty('--r', `${rotation}deg`);
            
            // Adjust fish appearance based on depth
            const opacity = 1 - (depth / 100) * 0.5;
            fish.style.opacity = opacity;
            
            // Add slight delay between fish
            fish.style.animationDelay = `${i * 0.3}s`;
            
            container.appendChild(fish);
        }
    }

    createBubbles() {
        const bubbleContainer = document.createElement('div');
        bubbleContainer.className = 'bubble-container';
        document.body.appendChild(bubbleContainer);

        setInterval(() => {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            // Randomize bubble properties
            const size = Math.random() * 20 + 10;
            const left = Math.random() * 100;
            const duration = Math.random() * 5 + 8;
            
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${left}vw`;
            bubble.style.setProperty('--duration', `${duration}s`);
            
            bubbleContainer.appendChild(bubble);
            
            // Remove bubble after animation
            setTimeout(() => bubble.remove(), duration * 1000);
        }, 500);
    }

    updateDepthEffects() {
        window.addEventListener('scroll', () => {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            
            // Adjust visibility and colors based on depth
            document.body.style.setProperty('--depth-multiplier', scrollPercent);
            
            // Adjust fish behavior based on depth
            const fishSchools = document.querySelectorAll('.fish');
            fishSchools.forEach(fish => {
                const depth = parseFloat(fish.style.getPropertyValue('--y'));
                const opacity = Math.max(0.2, 1 - (depth / 100));
                fish.style.opacity = opacity;
            });
        });
    }
}

// Initialize ocean background when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new OceanBackground();
});