class Accordion {
    constructor(container, options) {
        // Store the container element
        this.container = container;

        // Default parameters for styling or behavior
        this.options = {
            rounding: "8px", // Border radius for panels
            gap: "4px", // Gap between panels
            animationDuration: "0.3s", // Transition duration for opening/closing
            ...options, // Allow user-provided options to override defaults
        };

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
    }
}
