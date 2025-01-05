// adapted from https://codepen.io/kevinpowell/pen/NWOgVga
//          and https://keithjgrant.com/posts/2023/04/transitioning-to-height-auto/

const accordion3 = document.querySelector(".accordion-3");

accordion3.addEventListener("click", (e) => {
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
