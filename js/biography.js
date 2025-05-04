/**
 * Scripts specific to the Biography page.
 * Handles image loading, milestone animations, and bio box effects.
 * Menu toggle functionality is handled by js/script.js.
 */

// Configuration object (Keep specific config for milestones here)
const CONFIG = {
    // menu config is now in js/script.js if needed there
    milestone: {
        threshold: 0.1,    // Intersection observer threshold
        fadeDelay: 100     // Delay between milestone animations (ms)
    }
};

// Image handling (Keep as is, specific to biography page milestones)
class ImageHandler {
    constructor() {
        this.images = document.querySelectorAll('.milestone-image img');
        this.init();
    }

    init() {
        this.images.forEach(img => {
            img.addEventListener('load', () => this.handleImageLoad(img));
            img.addEventListener('error', () => this.handleImageError(img));

            // If image is already cached
            if (img.complete) {
                this.handleImageLoad(img);
            }
        });
    }

    handleImageLoad(img) {
        console.log('Image loaded successfully:', img.src);
        img.style.opacity = '1';
    }

    handleImageError(img) {
        console.error('Failed to load image:', img.src);
        img.style.opacity = '0.3';
        img.style.filter = 'grayscale(100%)';
        const container = img.closest('.milestone-image-container');
        if (container) {
            container.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
        }
    }
}

// Milestone animations (Keep as is, specific to biography page)
class MilestoneAnimator {
    constructor() {
        this.milestones = document.querySelectorAll('.milestone');
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupHoverEffects();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            threshold: CONFIG.milestone.threshold,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * CONFIG.milestone.fadeDelay);
                }
            });
        }, options);

        this.milestones.forEach(milestone => {
            milestone.style.opacity = '0';
            milestone.style.transform = 'translateY(50px)';
            milestone.style.transition = 'all 0.8s ease-out';
            observer.observe(milestone);
        });
    }

    setupHoverEffects() {
        document.querySelectorAll('.milestone-image-container').forEach(container => {
            container.addEventListener('mousemove', (e) => this.handleContainerHover(e, container));
            container.addEventListener('mouseleave', () => this.resetContainerTransform(container));
        });
    }

    handleContainerHover(e, container) {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angleX = (mouseY - centerY) / 10;
        const angleY = (mouseX - centerX) / 10;

        container.style.transform = `
            perspective(1000px)
            rotateX(${-angleX}deg)
            rotateY(${angleY}deg)
            scale3d(1.02, 1.02, 1.02)
        `;
    }

    resetContainerTransform(container) {
        container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
}

// Bio box effects (Keep as is, specific to biography page)
class BioBox {
    constructor() {
        this.bioBox = document.querySelector('.bio-box');
        if (this.bioBox) {
            this.init();
        }
    }

    init() {
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }

    handleMouseMove(e) {
        if (!this.bioBox) return;

        const rect = this.bioBox.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = Math.sqrt(
            window.innerWidth * window.innerWidth +
            window.innerHeight * window.innerHeight
        );

        const intensity = 1 - Math.min(distance / maxDistance, 1);

        this.bioBox.style.boxShadow = `
            ${deltaX * 0.05}px
            ${deltaY * 0.05}px
            ${20 + intensity * 20}px
            rgba(0, 0, 0, ${0.2 + intensity * 0.1})
        `;
    }
}

// Initialize specific elements for the biography page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Removed: new NavigationMenu(); // Menu handling is now in script.js
    new ImageHandler();
    new MilestoneAnimator();
    new BioBox();

    // Debug logging for background image (optional, can remove)
    const backgroundWrapper = document.querySelector('.background-wrapper');
    if (backgroundWrapper) {
        console.log('Background wrapper found');
        const computedStyle = window.getComputedStyle(backgroundWrapper);
        // Note: This won't show the path if it's set in CSS pseudo-elements like ::after
        console.log('Background image style:', computedStyle.backgroundImage);
    } else {
        console.error('Background wrapper not found');
    }
});