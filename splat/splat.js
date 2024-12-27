const swapMode = document.querySelector(".buttonFloat")
const styleContainer = document.querySelector(".styleContainer")
const styleHeader = document.querySelector(".styleHeader")

const body = document.querySelector('body');


swapMode.addEventListener("click", () => {
    if (!body.classList.contains('dark')) {
        // enter dark mode
        body.classList.add('dark');
        swapMode.textContent = "Light Mode"        
    } else {
        // enter light mode
        body.classList.remove('dark');
        swapMode.textContent = "Dark Mode"
    }
})
