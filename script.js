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
// Save theme in a cookie
function saveThemeCookie(theme) {
    document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Strict`;  // 1 year expiration
}
// Retrieve theme from the cookie
function getThemeCookie() {
    const match = document.cookie.match(/theme=([^;]+)/);
    return match ? match[1] : 'theme-light';  // Default to 'theme-light' if no theme found
}
// Apply saved theme to the page
function applySavedTheme() {
    document.documentElement.className = getThemeCookie();
}
// Toggle theme between dark and light
function toggleTheme() {
    const root = document.documentElement;
    const isDark = root.classList.contains('theme-dark');
    if (isDark) {
        root.classList.remove('theme-dark');
        root.classList.add('theme-light');
        saveThemeCookie('theme-light');
    } else {
        root.classList.remove('theme-light');
        root.classList.add('theme-dark');
        saveThemeCookie('theme-dark');
    }
}
// ----------------------------------------------

// Apply saved theme on page load
applySavedTheme();
