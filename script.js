

// *************************************************
// --- GSAP ---
// ----------------------------------------------
// reliable way to only try to 'register' gsap if it is already defined by other includes elsewhere
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)
}
// ----------------------------------------------


// *************************************************
// --- THEMES ---
// ----------------------------------------------
const root = document.documentElement;
// experimental
const fakeCheck = document.querySelector('.switch-label').querySelector('input');
console.log(fakeCheck)

// Save theme in a cookie
function saveThemeCookie(theme) {
    document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Strict`;  // 1 year expiration
    console.log(document.cookie);
}
// Retrieve theme from the cookie
function getThemeCookie() {
    const match = document.cookie.match(/theme=([^;]+)/);
    return match ? match[1] : 'theme-light';  // Default to 'theme-light' if no theme found
}
// Apply saved theme to the page
function applySavedTheme() {
    document.documentElement.className = getThemeCookie();
    fakeCheck.checked = root.classList.contains('theme-light') ? true : false;
}
// Toggle theme between dark and light
function toggleTheme() {
    const isDark = root.classList.contains('theme-dark');
    if (isDark) {
        root.classList.remove('theme-dark');
        root.classList.add('theme-light');
        fakeCheck.checked = true;
        saveThemeCookie('theme-light');
    } else {
        root.classList.remove('theme-light');
        root.classList.add('theme-dark');
        fakeCheck.checked = false;
        saveThemeCookie('theme-dark');
    }
}
// ----------------------------------------------

// Apply saved theme on page load
applySavedTheme();


