// *************************************************
// --- PARALLAX EFFECT ---
// ----------------------------------------------
function initParallax() {
    const backgrounds = document.querySelectorAll('section.background');

    console.log("Initializing Parallax for sections and floating elements");

    // Parallax for background sections
    backgrounds.forEach((section, index) => {
        const floatLeft = section.querySelector('.floatLeft');
        const floatRight = section.querySelector('.floatRight');

        console.log(`Parallax applied to background section ${index + 1}`);
        gsap.to(section, {
            backgroundPositionY: '-20%', // Increased intensity for background
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });

        // Parallax for floatLeft
        if (floatLeft) {
            gsap.fromTo(
                floatLeft,
                { y: '0vh' },
                {
                    y: '-15vh', // Increased intensity
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                }
            );
        }

        // Parallax for floatRight
        if (floatRight) {
            gsap.fromTo(
                floatRight,
                { y: '0vh' },
                {
                    y: '15vh', // Increased intensity
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                }
            );
        }
    });
}

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    initParallax();  // Initialize parallax effect after theme setup
});