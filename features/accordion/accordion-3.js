// adapted from https://codepen.io/kevinpowell/pen/NWOgVga
//          and https://keithjgrant.com/posts/2023/04/transitioning-to-height-auto/

const accordions = document.querySelectorAll(".accordion");
for (let i=0; i<accordions.length; i++) {
    createAccordion(accordions[i]);
}

function createAccordion(accordion) {

    accordion.addEventListener("click", (e) => {
        // Ensure only clicks on the top/header trigger the toggle
        const header = e.target.closest(".accordion-trigger");
        if (!header) return;

        const activePanel = e.target.closest(".accordion-panel");
        if (!activePanel) return;
        toggleAccordion(activePanel);
    });

    function toggleAccordion(panelToActivate) {
        const activeButton = panelToActivate.querySelector("button");
        const activePanel = panelToActivate.querySelector(".accordion-content");
        const activePanelIsOpened = activeButton.getAttribute("aria-expanded");

        if (activePanelIsOpened === "true") {
            panelToActivate
                .querySelector("button")
                .setAttribute("aria-expanded", false);

            panelToActivate
                .querySelector(".accordion-content")
                .setAttribute("aria-hidden", true);
        } else {
            panelToActivate.querySelector("button").setAttribute("aria-expanded", true);

            panelToActivate
                .querySelector(".accordion-content")
                .setAttribute("aria-hidden", false);
        }
    }

}