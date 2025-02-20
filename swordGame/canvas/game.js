import { current_dpad_dir, HtmlControls } from "./controls.js";
import { clearCanvas, drawThingAtPosition, draw, clearThingAtPosition, drawBorder, drawEntity } from "./render.js";
import { images } from "./document.js";
import { getSpriteIndex } from "./sprite.js";

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

    game_grid[0][0] = 'lachie';

    game_grid[5][4] = 'tree';
    game_grid[5][8] = 'tree';
    game_grid[10][6] = 'tree';

    game_grid[8][1] = 'gary';
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

    // if (buttonStates.B === true) clearThingAtPosition(block_positon.x, block_positon.y);

}

export let characterIsFacing = 'down';

function move_block_position_x(offset) {
    const newPos = block_positon.x + offset;

    if (newPos > block_positon.x) {
        characterIsFacing = 'right';
    } else {
        characterIsFacing = 'left';
    }

    clearThingAtPosition(block_positon.x, block_positon.y);     // remove guy from old position

    // catch out of bounds
    if (position_is_in_bounds(newPos, 0, NUM_GRID_X - 1)) {
        if (!cell_is_occupied(game_grid[newPos][block_positon.y])) {
            block_positon.x = newPos;                                   // set guy's new x position
            const line = get_line_of_sight(gary.isFacing);
            gary.hasAlert = check_cell_is_in_line_of_sight(block_positon.x, block_positon.y, gary.position.x, gary.position.y, line.orientation, line.range);

        }
    }
    drawThingAtPosition(block_positon.x, block_positon.y);      // render new position 

}



function move_block_position_y(offset) {
    const newPos = block_positon.y + offset;

    if (newPos > block_positon.y) {
        characterIsFacing = 'down';
    } else {
        characterIsFacing = 'up';
    }
    clearThingAtPosition(block_positon.x, block_positon.y);


    if (position_is_in_bounds(newPos, 0, NUM_GRID_Y - 1)) {             // catch out of bounds
        if (!cell_is_occupied(game_grid[block_positon.x][newPos])) {    // catch collisions
            block_positon.y = newPos;                                   // update position if no obstacles found
            const line = get_line_of_sight(gary.isFacing);
            gary.hasAlert = check_cell_is_in_line_of_sight(block_positon.x, block_positon.y, gary.position.x, gary.position.y, line.orientation, line.range);

        }
    }


    drawThingAtPosition(block_positon.x, block_positon.y);
}


function position_is_in_bounds(pos, min, max) {
    if (pos < min || pos > max) return false;
    return true;
}

function cell_is_occupied(cell) {
    // console.log(`cell is ${cell}`);
    if (cell === 'tree') return true;  // deny move though 'trees'
    if (cell === 'gary') return true;  // deny move though 'skellington'
    if (cell === 'sprite_1') return true;  // deny move though 'sprite'    
    return false;

}

export const gary = {
    position: {
        x: 8,
        y: 1
    },
    isFacing: 'down',
    getEntitySprite: function() {
        // console.log(`uhhh is facing ${this.isFacing}`);
        return images.spriteTextures_red[getSpriteIndex(this.isFacing)];
    },
    hasAlert: false,

}

function get_line_of_sight(isFacing) {
    let orientation = null;
    let range = null;
    switch (isFacing) {
        case 'up':
            orientation = 'vertical';
            range = -5;
            break;
        case 'left':
            orientation = 'horizontal';
            range = -5;
            break;
        case 'right':
            orientation = 'horizontal';
            range = 5;
            break;
        case 'down':
            orientation = 'vertical';
            range = 5;
            break;
    }
    return {
        orientation: orientation,
        range: range,
    }
}

function check_cell_is_in_line_of_sight(posX, posY, viewerX, viewerY, orientation, range) {

    let viewer, cell;

    if (orientation === 'vertical') {
        if (posX !== viewerX) return false;
        viewer = viewerY;
        cell = posY;

    } else {
    if (posY !== viewerY) return false;
        viewer = viewerX;
        cell = posX;
    }

    return check_single_axis(range, viewer, cell);

}

function check_single_axis(range, viewer, cell) {
    let start, stop;
    if (range > 0) {
        start = viewer + 1;
        stop = viewer + 1 + range;
    } else {
        start = viewer - 1 - range;
        stop = viewer - 1;
    }


    // stride down
    for (let i = start; i < stop; i++) {
        if (i === cell) return true;
    }

    return false;

}