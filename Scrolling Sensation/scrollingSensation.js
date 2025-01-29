// Snap Sections

const snapSections = document.querySelectorAll('#snap-sections .section');
const snapContainer = document.querySelector('#snap-sections');
const footer = document.querySelector('#footer');
let currentSection = 0;
let isInSnapZone = false;
let isAnimating = false;

// Scroll to a specific section
const scrollToSection = (index) => {
  if (index >= 0 && index < snapSections.length && !isAnimating) {
    isAnimating = true;
    snapSections[index].scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      isAnimating = false;
      currentSection = index;
    }, 1400); // Prevents double scroll during animation
  }
};

// Detect when entering or leaving the snapping area
window.addEventListener('scroll', () => {
  const snapStart = snapContainer.offsetTop;
  const scrollTop = window.scrollY;

  if (scrollTop >= snapStart) {
    // Enter snapping zone
    if (!isInSnapZone) {
      isInSnapZone = true;
      document.body.style.overflow = 'hidden'; // Lock body scroll
    }
  } else {
    // Exit snapping zone
    if (isInSnapZone) {
      isInSnapZone = false;
      document.body.style.overflow = ''; // Enable regular scrolling
    }
  }
});

// Add event listener for snapping behavior
window.addEventListener('wheel', (e) => {
  if (!isInSnapZone || isAnimating) return;

  if (e.deltaY > 0 && currentSection < snapSections.length - 1) {
    scrollToSection(currentSection + 1); // Scroll down
  } else if (e.deltaY < 0 && currentSection > 0) {
    scrollToSection(currentSection - 1); // Scroll up
  } else if (e.deltaY < 0 && currentSection === 0) {
    // Exit snapping zone if at the first section and scrolling up
    document.body.style.overflow = ''; // Enable regular scroll
    isInSnapZone = false;
  } else if (e.deltaY > 0 && currentSection === snapSections.length - 1) {
    // Open footer when scrolling down past the last section
    footer.classList.add('open');
    document.body.style.overflow = ''; // Re-enable scrolling
    isInSnapZone = false;
  }
});

// Hide footer when scrolling back up without affecting page position
window.addEventListener('wheel', (e) => {
  if (footer.classList.contains('open') && e.deltaY < 0) {
    footer.classList.remove('open');
    scrollToSection(currentSection)
  }
});

// Fix Header To This Page
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.endsWith("fullPageSmoothScroll.html")) {
      document.querySelector("header").classList.add("fixed-header");
    }
  });
  