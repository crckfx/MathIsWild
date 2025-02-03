gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

console.clear();

// ✅ DOM Selectors
const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const stage = select('.stage');
const slides = selectAll(".slide");
const links = selectAll(".slide__scroll-link");
const titles = selectAll('.col__content-title');
let slideID = 0;

// ✅ Custom Text Splitter (Replaces SplitText)
function splitText(element) {
    const text = element.textContent;
    element.innerHTML = '';
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.classList.add('char');
        span.textContent = char;
        element.appendChild(span);
    });
}
titles.forEach(splitText);

// ✅ Header Animations
function initHeader() {
    gsap.from('.logo', { y: -40, opacity: 0, duration: 2, ease: 'power4.out' });
    gsap.from('.nav-btn__svg rect', {
        scale: 0,
        transformOrigin: "center right",
        duration: 0.6,
        ease: 'power4.out',
        stagger: 0.1
    });
    
    const navBtn = select('.nav-btn');
    navBtn.addEventListener("mouseover", () => {
        gsap.to('.nav-rect', { scaleX: 1, duration: 0.4, ease: "power4.out" });
    });
    navBtn.addEventListener("mouseout", () => {
        gsap.to('.nav-rect', { scaleX: 0.8, duration: 0.6, ease: "power4.out" });
    });
}

// ✅ Intro Section Animations
function initIntro() {
    gsap.from('.intro__title .char', {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 1.5,
        ease: 'power4.out'
    });

    gsap.from('.intro__txt', {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.5
    });

    gsap.to('.intro__title', {
        scrollTrigger: {
            trigger: '.intro',
            scrub: 1,
            start: "top bottom",
            end: "bottom top"
        },
        x: 400,
        ease: 'power4.inOut'
    });
}

// ✅ Smooth Scrolling Navigation
function initLinks() {
    links.forEach((link, index) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            gsap.to(window, {
                duration: 1.5,
                scrollTo: `#slide-${index + 1}`,
                ease: "power2.inOut"
            });
            slideID = index + 1;
        });
    });

    const topLink = select('.footer__link-top');
    topLink.addEventListener("click", (e) => {
        e.preventDefault();
        scrollTop();
    });
}

// ✅ Slide Animations
function initSlides() {
    slides.forEach((slide) => {
        gsap.from(slide.querySelectorAll('.col__content-title .char'), {
            scrollTrigger: {
                trigger: slide,
                start: "top 80%",
                toggleActions: "play none none reset"
            },
            y: 100,
            opacity: 0,
            duration: 1.5,
            stagger: 0.05,
            ease: 'power4.out'
        });

        gsap.from(slide.querySelectorAll('.col__content-txt'), {
            x: 100,
            opacity: 0,
            duration: 1.5,
            ease: 'power4.out'
        });
    });
}

// ✅ Parallax Effect (Replaces ScrollSmoother)
function initParallax() {
    slides.forEach((slide) => {
        const image = slide.querySelector('.col__image-wrap');
        gsap.to(image, {
            y: "-20vh",
            scrollTrigger: {
                trigger: slide,
                scrub: true,
                start: "top bottom",
                end: "bottom top"
            },
            ease: "none"
        });
    });
}

// ✅ Scroll to Top Function
function scrollTop() {
    gsap.to(window, {
        duration: 1.5,
        scrollTo: "#slide-0",
        ease: "power2.inOut"
    });
}

// ✅ Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.keyCode === 40 && slideID < slides.length) { // Down Arrow
        slideID++;
        gsap.to(window, {
            duration: 1.5,
            scrollTo: `#slide-${slideID}`,
            ease: "power2.inOut"
        });
    } else if (e.keyCode === 38) { // Up Arrow
        slideID = 0;
        scrollTop();
    }
});

// ✅ Initialization
function init() {
    gsap.set(stage, { autoAlpha: 1 });
    initHeader();
    initIntro();
    initLinks();
    initSlides();
    initParallax();
}

window.onload = init;
