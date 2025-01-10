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

    touchX = 0;
    currentX = 0;
    offsetX = 0;
    biasX = 0;

    touchstart(event) {
        if (event.touches.length > 1) return; // Ignore multi-touch for zoom or other gestures.        
        const touch = event.touches[0]; // Get the primary touch.
        this.startX = touch.clientX; // Record the starting X position.
        this.currentX = touch.clientX; // Initialize current X to the start X.
        this.offsetX = 0; // Initialize offset to 0.        

        // Query the current transform value for the bias.
        const transform = window.getComputedStyle(this.imageView).transform;

        if (transform && transform !== 'none') {
            // Extract the translateX value from the matrix.
            const matrix = transform.match(/matrix\((.+)\)/);
            if (matrix) {
                const values = matrix[1].split(', ');
                this.biasX = parseFloat(values[4]); // The 5th value in the matrix is translateX.
            } else {
                this.biasX = 0; // Default to 0 if parsing fails.
            }
        } else {
            this.biasX = 0; // Default to 0 if no transform is applied.
        }

        console.log('BiasX:', this.biasX); // Debugging: Log the initial bias.
    }
    touchmove(event) {
        if (event.touches.length > 1) return; // Ignore multi-touch.

        const touch = event.touches[0]; // Get the primary touch.
        this.currentX = touch.clientX; // Update the current X position.
        this.offsetX = this.currentX - this.startX; // Calculate the offset.

        // Apply a translation based on the offset.
        // this.imageContain.style.transform = `translateX(${this.offsetX}px)`;
        this.imageView.style.transform = `translateX(${this.offsetX + this.biasX}px)`;

        console.log('Offset:', this.offsetX); // Log the offset for debugging.        
    }
    touchend(event) {
        console.log('finished touch');

        this.startX = 0;
        this.currentX = 0;
        this.offsetX = 0;
        this.updateSlideView(true);
    }

}