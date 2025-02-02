// adapted from https://codepen.io/kevinpowell/pen/NWOgVga
//          and https://keithjgrant.com/posts/2023/04/transitioning-to-height-auto/

// automatically find any accordions and "create" them
const accordions = document.querySelectorAll(".accordion");
for (let i=0; i<accordions.length; i++) {
    createAccordion(accordions[i]);
}

// function to create accordion from a div
function createAccordion(accordion) {
    accordion.addEventListener("click", (e) => {
        // Ensure only clicks on the top/header trigger the toggle
        const header = e.target.closest(".accordion-trigger");
        if (!header) return;

        const activePanel = e.target.closest(".accordion-panel");
        if (!activePanel) return;
        toggleAccordion(activePanel);
    });

    function toggleAccordion(currentPanel) {
        const panelButton = currentPanel.querySelector("button");
        const panelIsOpened = panelButton.getAttribute("aria-expanded");
        
        const content = currentPanel.querySelector(".accordion-content");

        if (panelIsOpened === "true") {
            panelButton.setAttribute("aria-expanded", false);
            content.setAttribute("aria-hidden", true);
        } else {
            panelButton.setAttribute("aria-expanded", true);

            content.setAttribute("aria-hidden", false);

            // experimental: scroll to fit panel
            // this is kind of crude (fires after transition), but "nearest" seems to filter nicely
            content.addEventListener("transitionend", function handler(event) {
                if (event.propertyName === "grid-template-rows") {
                    console.log('transition end');
                    currentPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
                    content.removeEventListener("transitionend", handler);
                }
            });
        }
    }

}