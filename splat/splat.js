const swapMode = document.querySelector(".buttonFloat")
const styleContainer = document.querySelector(".styleContainer")
const styleHeader = document.querySelector(".styleHeader")


swapMode.addEventListener("click", () => {
    if (swapMode.textContent == "Dark Mode") {
        swapMode.textContent = "Light Mode"
        styleContainer.style.backgroundColor = "#1A202C";
        styleHeader.style.backgroundColor = "#4299E1";
        
    } else {
        swapMode.textContent = "Dark Mode"
        styleHeader.style.backgroundColor = "#0077CC";
        styleContainer.style.backgroundColor = "#F9FAFB";
    }
})
