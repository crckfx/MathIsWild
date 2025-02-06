// *************************************************
// --- THEMES ---
// ----------------------------------------------
const root = document.documentElement;
// experimental
const themeCheckbox = document.querySelector('.switch-label').querySelector('input');

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
    themeCheckbox.checked = root.classList.contains('theme-light') ? true : false;
}
// Toggle theme between dark and light
function toggleTheme() {
    const isDark = root.classList.contains('theme-dark');
    if (isDark) {
        root.classList.remove('theme-dark');
        root.classList.add('theme-light');
        themeCheckbox.checked = true;
        saveThemeCookie('theme-light');
    } else {
        root.classList.remove('theme-light');
        root.classList.add('theme-dark');
        themeCheckbox.checked = false;
        saveThemeCookie('theme-dark');
    }
}
// ----------------------------------------------

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => applySavedTheme());

