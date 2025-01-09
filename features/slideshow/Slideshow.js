class Slideshow {
    constructor(slideShowElement, mediaElements) {
        this.slideShowElement = slideShowElement;
        this.imageContain = slideShowElement.querySelector('.image-contain');
        this.imageView = slideShowElement.querySelector('.image-view');
        this.nameView = slideShowElement.querySelector('.name-view');
        this.mediaElements = mediaElements;

        this.currentIndex = 1; // Start at the "real" first slide
        this.isTransitioning = false;

        this.setSize();
        this.initSlides();
        this.addEventListeners();
        this.slideShowElement.focus();

    }

    setSize() {
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
        this.imageView.classList.add('immediate');
        this.imageView.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        // the timeout 0 helps the removal fire at the right time
        setTimeout(() => {
            this.imageView.classList.remove('immediate');
        }, 0);
    }

    updateSlideView(withTransition = true) {
        withTransition ? this.imageView.classList.remove('immediate') : this.imageView.classList.add('immediate');
        this.imageView.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }

    moveRight() {
        if (this.isTransitioning && this.currentIndex === this.totalSlides - 1) return;
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
        if (this.isTransitioning && this.currentIndex === 0) return;
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

        this.slideShowElement.addEventListener('keydown', (e) => {
            console.log(e);
        })

        window.addEventListener('resize', () => this.setSize());
    }
}