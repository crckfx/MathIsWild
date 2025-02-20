import { canvas, ctx, getHtmlControls, NUM_GRID_X, NUM_GRID_Y, cell_size } from "./document.js";
import { clearCanvas, drawThingAtPosition, draw, clearThingAtPosition, drawBorder } from "./render.js";
import { handleKeyDown, handleKeyUp } from "./keyboard.js";
import {
    handlePointerDown_button,
    handlePointerUp_button,
    handlePointerDown_dpad,
    handlePointerUp,
    handlePointerMove
} from "./pointer.js";


export const game_grid = createGameGrid(NUM_GRID_X, NUM_GRID_Y);

console.log(game_grid)
export const block_positon = {
    x: 0,
    y: 0
};


function createGameGrid(cellsX, cellsY) {
    const game_grid = new Array(cellsX);
    for (let i = 0; i < game_grid.length; i++) {
        game_grid[i] = new Array(cellsY);
    }

    game_grid[5][4] = 'tree';
    game_grid[5][8] = 'tree';
    game_grid[10][6] = 'tree';

    return game_grid;
}

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
    console.log(`moved ${direction}.`);

    do_a_tick();

}

function release_dpad() {
    if (current_dpad_dir !== null) {
        HtmlControls.dpad[current_dpad_dir].classList.remove('active');
        console.log(`releasing ${current_dpad_dir}.`);
        current_dpad_dir = null;
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


function bindControls() {
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


    // Bind pointer down for each dpad button
    Object.entries(HtmlControls.dpad).forEach(([direction, element]) => {
        element.dataset.dpad = direction; // Add a custom attribute to identify the direction
        element.addEventListener('pointerdown', (event) => handlePointerDown_dpad(direction, event));
    });

    // Listen for pointerup and pointermove on the document
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointermove', handlePointerMove);

}




const HtmlControls = getHtmlControls();



bindControls();

function move_block_position_x(offset) {
    const newPos = block_positon.x + offset;

    if (newPos > NUM_GRID_X - 1 || newPos < 0) {
        return;
    }

    if (game_grid[newPos][block_positon.y] === 'tree') {
        return;
    }
    
    
    clearThingAtPosition(block_positon.x, block_positon.y);
    
    block_positon.x = newPos;
    drawThingAtPosition(block_positon.x, block_positon.y);
}
function move_block_position_y(offset) {
    const newPos = block_positon.y + offset;


    if (newPos > NUM_GRID_Y - 1 || newPos < 0) {
        return;
    }

    if (game_grid[block_positon.x][newPos] === 'tree') {
        return;
    }
    

    clearThingAtPosition(block_positon.x, block_positon.y);

    if (block_positon.y + offset > NUM_GRID_Y) {
        block_positon.y = NUM_GRID_Y;
    } else if (block_positon.y + offset < 0) {
        block_positon.y = 0;
    } else {
        block_positon.y += offset;
    }

    drawThingAtPosition(block_positon.x, block_positon.y);
}

function do_a_tick() {
    if (current_dpad_dir !== null) {
        switch (current_dpad_dir) {
            case 'left':
                move_block_position_x(-1);
                break;
            case 'right':
                move_block_position_x(1);
                break;
            case 'up':
                move_block_position_y(-1);
                // block_positon.y -= 1;
                break;
            case 'down':
                // block_positon.y += 1;
                move_block_position_y(1);
                break;
            default:
                console.log(`game: tick with no dpad dir!`);

        }

    }

    // if (buttonStates.B === true) {
    //     clearThingAtPosition(block_positon.x, block_positon.y);
    // } else if (buttonStates.A === true) {
    //     drawThingAtPosition(block_positon.x, block_positon.y);
    // } else {
    //     drawNothingAtPosition(block_positon.x, block_positon.y);
    // }

}

window.onload = () => {
    drawThingAtPosition(block_positon.x, block_positon.y);
}
