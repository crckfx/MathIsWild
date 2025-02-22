import { draw, CAMERA_CELLS_X, CAMERA_CELLS_Y } from "./render.js";
import { NUM_GRID_X, NUM_GRID_Y, } from "./game.js";

export const panelCenter = document.getElementById('panel_center');
const panelLeft = document.getElementById('panel_left');
const panelRight = document.getElementById('panel_right');

export const canvas = document.getElementById('game_canv');
export const ctx = canvas.getContext("2d");

export const cellSelector = document.getElementById('cellSelector');


export const cell_size = getCellSize();
// declarations
const ASPECT_RATIO = 11 / 9;
const PADDING = 24;
const MAX_SIZE = {
    x: 1600,
    y: 1200
};





function getCellSize() {
    return {
        x: canvas.width / CAMERA_CELLS_X,
        y: canvas.height / CAMERA_CELLS_Y,
    }
}

// function to set the canvas size based on its parent (note - overflow:hidden protects against parent growth)
export function resize() {
    // use the container's dimensions to determine orientation
    const rect = panelCenter.getBoundingClientRect();
    let width, height;
    if (rect.width / rect.height < ASPECT_RATIO) {
        // vertical
        width = rect.width;
        height = rect.width / ASPECT_RATIO;
    } else {
        // horizontal
        height = rect.height;
        width = rect.height * ASPECT_RATIO;
    }
    // clamp size
    if (width > MAX_SIZE.x || height > MAX_SIZE.y) {
        width = MAX_SIZE.x;
        height = MAX_SIZE.y;
    }
    // subtract padding
    canvas.width = width - PADDING;
    canvas.height = height - PADDING;

    const newCellSize = getCellSize();
    cell_size.x = newCellSize.x;
    cell_size.y = newCellSize.y;

    draw();
}




export function getHtmlControls() {
    const HTMLcontrols = {
        dpad: {
            left: document.getElementById('dpad_left'),
            up: document.getElementById('dpad_up'),
            right: document.getElementById('dpad_right'),
            down: document.getElementById('dpad_down'),
        },
        buttons: {
            A: document.getElementById('control_A'),
            B: document.getElementById('control_B'),
            X: document.getElementById('control_X'),
            Y: document.getElementById('control_Y'),
        },
    };
    
    return HTMLcontrols;
}

