import { current_dpad_dir, HtmlControls } from "./controls.js";
import { handlePointerDown_dpad } from "./pointer.js";
import { clearCanvas, drawThingAtPosition, draw, clearThingAtPosition, drawBorder } from "./render.js";
export const block_positon = {
    x: 0,
    y: 0
};
import { canvas, ctx, getHtmlControls, cell_size } from "./document.js";
export const NUM_GRID_X = 12;
export const NUM_GRID_Y = 9;

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


export const game_grid = createGameGrid(NUM_GRID_X, NUM_GRID_Y);

export function do_a_tick() {
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

