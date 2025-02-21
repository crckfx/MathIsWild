import { getHtmlControls } from "./document.js";
import { do_a_tick } from "./game.js";

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
