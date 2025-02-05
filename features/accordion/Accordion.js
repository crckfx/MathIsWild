class Accordion {
    constructor(container, options) {
        // Store the container element
        this.container = container;
        this.panels = container.querySelectorAll('.accordion-panel');


        // Default parameters for styling or behavior
        this.options = {
            scrollOnExpand: true,
            mainRounding: "8px", // Border radius for panels
            contentRounding: "0px", // Border radius for panels
            gap: "2px", // Gap between panels
            animationDuration: "0.5s", // Transition duration for opening/closing
            ...options, // Allow user-provided options to override defaults
        };

        this.container.style.setProperty("gap", this.options.gap);
        this.container.style.setProperty("border-radius", this.options.mainRounding);
        // this.container.style.setProperty("transition", `grid-template-rows: ${this.options.animationDuration}`);
        this.panels.forEach((panel) => {
            console.log(panel);
            panel.style.borderRadius = this.options.panelRounding;
            const header = panel.querySelector(".accordion-trigger");
            const content = panel.querySelector(".accordion-content");
            // console.log(`animation duration is ${this.options.animationDuration}`);
            content.style.transition = `grid-template-rows ${this.options.animationDuration}`;
            
        }) 

        // Initialize the accordion behavior
        this.init();
    }

    init() {
        // Attach a click listener to the accordion
        this.container.addEventListener("click", (e) => {
            const trigger = e.target.closest(".accordion-trigger");
            if (!trigger) return; // Ignore clicks outside the trigger

            const panel = trigger.closest(".accordion-panel");
            this.toggle(panel);
        });

    }

    toggle(panel) {
        const header = panel.querySelector(".accordion-trigger");
        const content = panel.querySelector(".accordion-content");

        // Check the current state
        const isExpanded = header.getAttribute("aria-expanded") === "true";

        // Toggle the state
        header.setAttribute("aria-expanded", !isExpanded);
        content.setAttribute("aria-hidden", isExpanded);

        // experimental: scroll to fit panel
        // this is kind of crude (fires after transition), but "nearest" seems to filter nicely
        if (this.options.scrollOnExpand === true) {
            content.addEventListener("transitionend", function handler(event) {
                if (event.propertyName === "grid-template-rows") {
                    // console.log('transition end');
                    panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
                    content.removeEventListener("transitionend", handler);
                }
            });        
        }
    }
}
