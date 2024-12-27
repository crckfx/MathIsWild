function toggleTheme() {
    document.documentElement.classList.toggle('theme-dark');
    swapMode.textContent = (document.documentElement.classList.contains('theme-dark')) ? 'Light Mode' : 'Dark Mode';
}

// note: shortened this script down to essentially 'get the button and assign toggleTheme() to it'
// // if we were to instead define toggleTheme() in main 'script.js', we could probably set the button onclick in HTML
const swapMode = document.querySelector(".buttonFloat")

swapMode.addEventListener("click", () => toggleTheme());
