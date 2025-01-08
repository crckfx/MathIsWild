class Slideshow {
    constructor(slideShowElement) {
        this.slideShowElement = slideShowElement;
        this.imageView = slideShowElement.querySelector('.image-view');
        this.nameView = slideShowElement.querySelector('.name-view');
        this.mediaElements = [
            "https://i.pinimg.com/736x/54/27/64/542764d7ba3a31abb75a7110b235a5a8.jpg",
            "https://i.pinimg.com/originals/e0/56/58/e05658d539c0e509e293d45b970d67b0.jpg",
            "https://i.pinimg.com/736x/6c/d4/7f/6cd47f0dc801757c6230f634aba56dfb.jpg"
        ];
        this.currentIndex = 1; // Start at the "real" first slide
        this.isTransitioning = false;
        this.initSlides();
        this.addEventListeners();
    }

    initSlides() {
        // Create slides dynamically
        this.mediaElements.forEach(src => {
            const el = document.createElement('div');
            el.classList.add('media-element');
            const img = document.createElement('img');
            img.src = src;
            el.appendChild(img);
            this.imageView.appendChild(el);
        });
        // Clone first and last elements
        const firstClone = this.imageView.firstElementChild.cloneNode(true);
        const lastClone = this.imageView.lastElementChild.cloneNode(true);
        this.imageView.appendChild(firstClone);
        this.imageView.insertBefore(lastClone, this.imageView.firstElementChild);
        this.totalSlides = this.mediaElements.length + 2; // Includes clones
        // Set initial position
        this.imageView.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }

    updateSlideView(withTransition = true) {
        this.imageView.style.transition = withTransition ? 'transform 200ms ease' : 'none';
        this.imageView.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }

    moveRight() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        this.currentIndex++;
        this.updateSlideView(true);

        const handleTransitionEnd = () => {
            this.imageView.removeEventListener('transitionend', handleTransitionEnd);
            
            if (this.currentIndex === this.totalSlides - 1) {
                this.currentIndex = 1;
                this.updateSlideView(false);
            }
            
            setTimeout(() => {
                this.isTransitioning = false;
            }, 50);
        };

        this.imageView.addEventListener('transitionend', handleTransitionEnd);
    }

    moveLeft() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        this.currentIndex--;
        this.updateSlideView(true);

        const handleTransitionEnd = () => {
            this.imageView.removeEventListener('transitionend', handleTransitionEnd);
            
            if (this.currentIndex === 0) {
                this.currentIndex = this.totalSlides - 2;
                this.updateSlideView(false);
            }
            
            setTimeout(() => {
                this.isTransitioning = false;
            }, 50);
        };

        this.imageView.addEventListener('transitionend', handleTransitionEnd);
    }

    addEventListeners() {
        const prevButton = this.slideShowElement.querySelector('.button-prev');
        const nextButton = this.slideShowElement.querySelector('.button-next');
        if (prevButton) prevButton.addEventListener('click', () => this.moveLeft());
        if (nextButton) nextButton.addEventListener('click', () => this.moveRight());
    }
}