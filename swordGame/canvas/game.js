import { current_dpad_dir, HtmlControls } from "./controls.js";
import { clearCanvas, drawThingAtPosition, draw, clearThingAtPosition, drawBorder } from "./render.js";
export const block_positon = {
    x: 0,
    y: 0
};
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

    game_grid[8][1] = 'skelly';
    // game_grid[8][2] = 'sprite_1';

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

export let characterIsFacing = 'down';

function move_block_position_x(offset) {
    const newPos = block_positon.x + offset;
    if (newPos > NUM_GRID_X - 1 || newPos < 0) return;          // deny move through edge of grid
    if (game_grid[newPos][block_positon.y] === 'tree') return;  // deny move though 'trees'
    if (game_grid[newPos][block_positon.y] === 'skelly') return;  // deny move though 'trees'
    if (game_grid[newPos][block_positon.y] === 'sprite_1') return;  // deny move though 'trees'
    clearThingAtPosition(block_positon.x, block_positon.y);     // remove guy from old position
    if (newPos > block_positon.x) {
        characterIsFacing = 'right';
    } else {
        characterIsFacing = 'left';
    }
    block_positon.x = newPos;                                   // set guy's new x position
    drawThingAtPosition(block_positon.x, block_positon.y);      // render new position 

}
function move_block_position_y(offset) {
    const newPos = block_positon.y + offset;
    if (newPos > NUM_GRID_Y - 1 || newPos < 0) return;
    if (game_grid[block_positon.x][newPos] === 'tree') return;
    if (game_grid[block_positon.x][newPos] === 'skelly') return;
    if (game_grid[block_positon.x][newPos] === 'sprite_1') return;
    clearThingAtPosition(block_positon.x, block_positon.y);
    if (newPos > block_positon.y) {
        characterIsFacing = 'down';
    } else {
        characterIsFacing = 'up';
    }    
    block_positon.y = newPos;                                   // set guy's new x position
    drawThingAtPosition(block_positon.x, block_positon.y);
}
