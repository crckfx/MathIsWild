const swapMode = document.querySelector(".buttonFloat")
const styleContainer = document.querySelector(".styleContainer")
const styleHeader = document.querySelector(".styleHeader")

const body = document.querySelector('body');


swapMode.addEventListener("click", () => {
    if (!body.classList.contains('dark')) {
        body.classList.add('dark');
        // enter dark mode
        swapMode.textContent = "Light Mode"        
        // styleHeader.classList.add('dark');
        // styleContainer.classList.add('dark');
        
    } else {
        body.classList.remove('dark');
        // enter light mode
        swapMode.textContent = "Dark Mode"
        // styleHeader.classList.remove('dark');
        // styleContainer.classList.remove('dark');

    }
})
