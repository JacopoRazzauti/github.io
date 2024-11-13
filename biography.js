// Configuration object
const CONFIG = {
    menu: {
        animationDelay: 100,
    },
    scroll: {
        duration: 1000,
        easing: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1
    },
    milestone: {
        threshold: 0.1,
        fadeDelay: 100
    }
};

// Menu handling
class NavigationMenu {
    constructor() {
        this.menu = document.getElementById('menu');
        this.menuButton = document.querySelector('.menu-icon');
        this.menuLinks = document.querySelectorAll('nav a');
        this.isOpen = false;
        this.init();
    }

    init() {
        this.menuButton.addEventListener('click', () => this.toggleMenu());
        this.setupMenuLinks();
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.menu.contains(e.target) && !this.menuButton.contains(e.target)) {
                this.toggleMenu();
            }
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.menu.classList.toggle('show');
        this.animateMenuItems();
    }

    animateMenuItems() {
        this.menuLinks.forEach((link, index) => {
            setTimeout(() => {
                link.style.opacity = this.isOpen ? "1" : "0";
                link.style.transform = this.isOpen 
                    ? "translateX(0) scale(1)" 
                    : "translateX(-20px) scale(0.95)";
            }, index * CONFIG.menu.animationDelay);
        });
    }

    setupMenuLinks() {
        this.menuLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleLinkClick(e));
        });
    }

    handleLinkClick(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            this.smoothScroll(href);
        }
    }

    smoothScroll(targetId) {
        const target = document.querySelector(targetId);
        if (!target) return;

        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / CONFIG.scroll.duration, 1);
            const easing = CONFIG.scroll.easing(progress);
            window.scrollTo(0, startPosition + distance * easing);
            
            if (progress < 1) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }
}

// Image handling
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
        img.classList.add('loaded');
    }

    handleImageError(img) {
        img.src = 'images/placeholder.jpg'; // Fallback image
        img.alt = 'Image not available';
    }
}

// Milestone animations
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
        document.querySelectorAll('.milestone-image').forEach(image => {
            image.addEventListener('mousemove', (e) => this.handleImageHover(e, image));
            image.addEventListener('mouseleave', () => this.resetImageTransform(image));
        });
    }

    handleImageHover(e, image) {
        const bounds = image.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        const rotateX = (mouseY / bounds.height - 0.5) * 20;
        const rotateY = (mouseX / bounds.width - 0.5) * 20;

        image.style.transform = `
            perspective(1000px) 
            rotateX(${-rotateX}deg) 
            rotateY(${rotateY}deg)
            scale3d(1.05, 1.05, 1.05)
        `;
    }

    resetImageTransform(image) {
        image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavigationMenu();
    new ImageHandler();
    new MilestoneAnimator();
});

// Add page load transition
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});