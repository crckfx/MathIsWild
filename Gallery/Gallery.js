// Gallery image slider
const gridImage = document.querySelector(".gridImage");
const leftSlider = document.querySelector(".acrossButtonLeft");
const rightSlider = document.querySelector(".acrossButtonRight");
const imageGuide = document.querySelector(".imageGuide");

const projectImages = [
    "../Images/splatoonOne.jpg",
    "../Images/wooperdooper.png",
];

let currentIndex = 0; // Current image index
let interval; // Interval for auto-play

const updateBackgroundImage = () => {
    gridImage.style.backgroundImage = `url(${projectImages[currentIndex]})`;
    updateActiveCircle();
};

const createGuideCircles = () => {
    projectImages.forEach((_, index) => {
        const circle = document.createElement("div");
        circle.classList.add("guideCircle");
        if (index === 0) circle.classList.add("active");
        circle.addEventListener("click", () => {
            currentIndex = index;
            updateBackgroundImage();
            resetInterval();
        });
        imageGuide.appendChild(circle);
    });
};

const updateActiveCircle = () => {
    const circles = document.querySelectorAll(".guideCircle");
    circles.forEach((circle, index) => {
        circle.classList.toggle("active", index === currentIndex);
    });
};

const playInterval = () => {
    currentIndex = (currentIndex + 1) % projectImages.length;
    updateBackgroundImage();
};

const resetInterval = () => {
    clearInterval(interval);
    interval = setInterval(playInterval, 5000);
};

// Initial setup
createGuideCircles();
updateBackgroundImage();
resetInterval();

// Button navigation
leftSlider.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + projectImages.length) % projectImages.length;
    updateBackgroundImage();
    resetInterval();
});

rightSlider.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % projectImages.length;
    updateBackgroundImage();
    resetInterval();
});
