import { getHtmlControls } from "./document.js";
import { do_a_tick } from "./game.js";
import { handleKeyDown, handleKeyUp } from "./keyboard.js";
import {
    handlePointerDown_button,
    handlePointerUp_button,
    handlePointerDown_dpad,
    handlePointerUp,
    handlePointerMove
} from "./pointer.js";
export const HtmlControls = getHtmlControls();

// function to translate keyboard events to the 'game'
export function fire_control_event(name, on) {
    switch (name) {
        // handle the dpad cases
        case 'left':
        case 'up':
        case 'right':
        case 'down':
            if (on) {
                press_dpad(name);

            } else {
                if (current_dpad_dir === name) {
                    release_dpad();
                }
            }
            break;
        // if not DPAD, assume we're dealing with a button
        default:
            on ? press_btn(name) : release_btn(name);
    }
}
// --------------------------------------------

// --------------------------------------------
// the dpad
export let current_dpad_dir = null;
export const buttonStates = {
    A: false,
    B: false,
    X: false,
    Y: false,
};

function press_dpad(direction) {
    if (current_dpad_dir !== null) {
        HtmlControls.dpad[current_dpad_dir].classList.remove('active');
    }
    current_dpad_dir = direction;
    HtmlControls.dpad[current_dpad_dir].classList.add('active');
    do_a_tick();

}

function release_dpad() {
    if (current_dpad_dir !== null) {
        HtmlControls.dpad[current_dpad_dir].classList.remove('active');
        current_dpad_dir = null;
        // console.log(`released ${current_dpad_dir}.`);
    }
}
// --------------------------------------------


// --------------------------------------------
// the buttons (ABXY)
// function to press a button
function press_btn(input) {
    console.log(`pressed ${input}.`);
    HtmlControls.buttons[input].classList.add('active');
    switch (input) {
        case 'X':
            // clearCanvas();
            buttonStates[input] = true;
            break;
        case 'A':
            buttonStates[input] = true;
            do_a_tick();
            break;
        case 'B':
            buttonStates[input] = true;
            do_a_tick();
            // clearCanvas();
            break;
        case 'Y':
            buttonStates[input] = true;
            break;
        default:
            console.log(`sent <default?> to press btn`);
    }


}
// function to release a button
function release_btn(input) {
    buttonStates[input] = false;
    HtmlControls.buttons[input].classList.remove('active');
    console.log(`released ${input}.`);
}
// --------------------------------------------


export function bindControls() {
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
