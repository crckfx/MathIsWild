class Slideshow {
    constructor(slideShowElement, mediaElements) {
        this.slideShowElement = slideShowElement;
        this.imageContain = slideShowElement.querySelector('.image-contain');
        this.imageView = slideShowElement.querySelector('.image-view');
        this.nameView = slideShowElement.querySelector('.name-view');
        this.mediaElements = mediaElements;

        this.currentIndex = 1; // Start at the "real" first slide
        this.isTransitioning = false;

        this.setHeight();
        this.initSlides();
        this.addEventListeners();

    }

    setHeight() {
        this.imageContain.classList.add('init');
        const calcHeight = this.imageContain.offsetHeight;
        console.log(calcHeight);
        this.imageContain.style.height = `${calcHeight}px`;
        this.imageContain.classList.remove('init');
        console.log(this.imageContain.offsetHeight);
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
        // Set initial position without transition
        this.imageView.style.transition = 'none';  // Disable transition
        this.imageView.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        // Re-enable transition for subsequent moves
        setTimeout(() => {
            this.imageView.style.transition = 'transform 200ms ease'; // Re-enable transition
        }, 0);
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
            }, 0);
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
            }, 0);
        };

        this.imageView.addEventListener('transitionend', handleTransitionEnd);
    }

    addEventListeners() {
        const prevButton = this.slideShowElement.querySelector('.button-prev');
        const nextButton = this.slideShowElement.querySelector('.button-next');
        if (prevButton) prevButton.addEventListener('click', () => this.moveLeft());
        if (nextButton) nextButton.addEventListener('click', () => this.moveRight());

        window.addEventListener('resize', () => this.setHeight());
    }
}