gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)
const screenHeight = window.innerHeight
const screenWidth = window.innerWidth

function toggleTheme() {
    document.documentElement.classList.toggle('theme-dark');
}
