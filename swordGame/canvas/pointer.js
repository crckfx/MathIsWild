import { fire_keyboard_event, press_dpad, release_dpad, current_dpad_dir } from "./canvas.js";
// --- DPAD POINTERS ---
let dpadPointerId = null; // Track the active pointer ID
// (specific) this pointerDOWN handler is assigned to the DPAD elements (paths) only
export function handlePointerDown_dpad(direction, event) {
    if (dpadPointerId === null) { // Only set if no active pointer
        dpadPointerId = event.pointerId; // assign the new pointer as the dpad's active one
        press_dpad(direction);
        
    }
}
// the (general) pointerUP handler checks ALL 'ups' against the dpadPointerId
export function handlePointerUp(event) {
    if (dpadPointerId === event.pointerId) { // Only release if the same pointer
        release_dpad();
        dpadPointerId = null; // Clear the active pointer
    }
}
// the (general) pointer MOVE handler checks ALL 'moves' against the dpadPointerId
export function handlePointerMove(event) {
    if (dpadPointerId === event.pointerId) { // Only track movements for the active pointer
        const target = document.elementFromPoint(event.clientX, event.clientY);
        if (target && target.dataset.dpad) { // Ensure it's a valid dpad button
            const direction = target.dataset.dpad;
            if (direction !== current_dpad_dir) { // Change direction if it's different
                press_dpad(direction);
            }
        }
    }
}
// --- BUTTON POINTERS ---
const buttonStates = {
    A: false,
    B: false,
    X: false,
    Y: false,
};
// DOWN handler, assigned only to the buttons
export function handlePointerDown_button(name) {
    if (buttonStates[name] !== true) {
        buttonStates[name] = true;
        fire_keyboard_event(name, true);
        // press_btn(name);
    }
}
// UP handler, assigned only to the buttons
export function handlePointerUp_button(name) {
    if (buttonStates[name] === true) {
        buttonStates[name] = false;
        fire_keyboard_event(name, false);
        // release_btn(name);
    }
}

