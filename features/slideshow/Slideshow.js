class Slideshow {
    constructor(slideShowElement, mediaElements) {
        this.slideShowElement = slideShowElement;
        this.imageContain = slideShowElement.querySelector('.image-contain');
        this.imageView = slideShowElement.querySelector('.image-view');
        this.nameView = slideShowElement.querySelector('.name-view');
        this.mediaElements = mediaElements;

        this.progressView = this.nameView.querySelector('.ss-progress');
        console.log(this.progressView);
        this.indexView = this.progressView.querySelector('.ss-index');
        console.log(this.indexView);


        this.currentIndex = 1; // Start at the "real" first slide
        this.isTransitioning = false;

        this.initSlides();
        this.setSize();
        this.addEventListeners();
        this.slideShowElement.focus();

    }

    setSize() {
        this.imageContain.classList.add('init');
        const calcHeight = this.imageContain.offsetHeight;
        console.log(calcHeight);
        this.imageContain.style.height = `${calcHeight}px`;
        this.imageContain.classList.remove('init');

        console.log(`Setting slideshow size to 'height: ${this.imageContain.offsetHeight}px'.`);


        this.indexView.style.width = (this.progressView.offsetWidth / (this.totalSlides - 2)) + 'px';
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
        withTransition ? this.indexView.classList.remove('immediate') : this.indexView.classList.add('immediate');
        this.imageView.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        const iWidth = parseFloat(this.indexView.style.width);
        const norm = iWidth * this.currentIndex;
        // console.log(`index:'${this.currentIndex-1}', translateX(${norm}px)`);
        this.indexView.style.transform = `translateX(${norm - iWidth}px)`;
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

        window.addEventListener('keydown', (e) => {
            // console.log(e);
            if (e.key === "ArrowLeft") { this.moveLeft(); }
            else if (e.key === "ArrowRight") { this.moveRight(); }
        });

        window.addEventListener('resize', () => this.setSize());

        this.imageContain.addEventListener('touchstart', (e) => this.touchstart(e));
        this.imageContain.addEventListener('touchmove', (e) => this.touchmove(e));
        this.imageContain.addEventListener('touchend', (e) => this.touchend(e));

    }

    touchstart(event) {
        // event.preventDefault();
    }
    touchmove(event) {
        // event.preventDefault();
    }
    touchend(event) {
        // event.preventDefault();
        console.log('finished touch');
    }

}