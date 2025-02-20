import { render_entire_grid } from "./render.js";

const panelCenter = document.getElementById('panel_center');
const panelLeft = document.getElementById('panel_left');
const panelRight = document.getElementById('panel_right');

export const canvas = document.getElementById('game_canv');
export const ctx = canvas.getContext("2d");
export const cellSelector = document.getElementById('cellSelector');

export const NUM_GRID_X = 12;
export const NUM_GRID_Y = 9;
export const cell_size = getCellSize();

const observer = new ResizeObserver(resize);
observer.observe(panelCenter);


function getCellSize() {
    return {
        x: canvas.width / NUM_GRID_X,
        y: canvas.height / NUM_GRID_Y,
    }
}

// function to set the canvas size based on its parent (note - overflow:hidden protects against parent growth)
function resize() {
    const rect = panelCenter.getBoundingClientRect();
    let width, height;
    // console.log(rect);
    if (rect.width / rect.height < ASPECT_RATIO) {
        console.log(`vertical? ${rect.width / rect.height}`);
        width = rect.width;
        height = rect.width / ASPECT_RATIO;

    } else {
        console.log('horizontal');
        height = rect.height;
        width = rect.height * ASPECT_RATIO;
    }

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

    render_entire_grid();
}


// declarations
const ASPECT_RATIO = 4 / 3;
const PADDING = 24;
const MAX_SIZE = {
    x: 1600,
    y: 1200
};


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