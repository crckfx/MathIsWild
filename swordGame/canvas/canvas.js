import { canvas, ctx, getHtmlControls, cell_size } from "./document.js";
import { clearCanvas, drawThingAtPosition, draw, clearThingAtPosition, drawBorder } from "./render.js";
import { handleKeyDown, handleKeyUp } from "./keyboard.js";
import {
    handlePointerDown_button,
    handlePointerUp_button,
    handlePointerDown_dpad,
    handlePointerUp,
    handlePointerMove
} from "./pointer.js";
import { HtmlControls } from "./controls.js";
import { do_a_tick, NUM_GRID_X, NUM_GRID_Y } from "./game.js";


function bindControls() {
    // Bind pointer down for each dpad button
    Object.entries(HtmlControls.dpad).forEach(([direction, element]) => {
        element.dataset.dpad = direction; // Add a custom attribute to identify the direction
        element.addEventListener('pointerdown', (event) => handlePointerDown_dpad(direction, event));
    });    
    // Bind pointer down for each button (ABXY)
    Object.entries(HtmlControls.buttons).forEach(([name, element]) => {
        element.dataset.buttons = name; // Add a custom attribute to identify the direction
        element.addEventListener('pointerdown', () => handlePointerDown_button(name));
        // assign the UP pointer events to 'outside of button' (doesn't catch properly for touch, but is workable)
        element.addEventListener('pointerup', () => handlePointerUp_button(name));
        element.addEventListener('pointerout', () => handlePointerUp_button(name));
        element.addEventListener('pointerleave', () => handlePointerUp_button(name));
        element.addEventListener('pointercancel', () => handlePointerUp_button(name));
        // disable right-click
        element.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });

    });
    // Listen for all key presses / releases
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Listen for pointerup and pointermove on the document
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointermove', handlePointerMove);

}


window.onload = () => {
    bindControls();
    drawThingAtPosition(0,0);
}



