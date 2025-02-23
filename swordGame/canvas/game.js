import { current_dpad_dir, HtmlControls } from "./controls.js";
import { draw, camera, isAnimating } from "./render.js";
import { getSpriteIndex, images, textures } from "./sprite.js";

export const block_positon = {
    x: 0,
    y: 0
};
export const NUM_GRID_X = 24;
export const NUM_GRID_Y = 24;



export const doodads = [];

function createEntity(name = 'unnamed_entity', x = 0, y = 0, facing = 'down', range = 5, texture = 'spriteDefault') {
    const entity = {
        name: name,
        position: {
            x: x,
            y: y
        },
        hasAlert: false,
        isFacing: facing,
        sightRange: range,
        texture: texture,
        getEntitySprite: function () {
            return textures[texture][getSpriteIndex(this.isFacing)];
        },
    }
    // console.log(entity.name);
    return entity;
}

export const entities = {

    gary: createEntity('gary', 8, 1, 'down', 3, 'spriteRed'),
    fred: createEntity('fred', 10, 5, 'up', 5, 'spriteYellow'),
    george: createEntity('george', 0, 4, 'right', 5, 'spriteRed'),
    harold: createEntity('harold', 9, 1, 'down', 5, 'spriteYellow'),


}


function createGameGrid(cellsX, cellsY) {
    const game_grid = new Array(cellsX);
    for (let i = 0; i < game_grid.length; i++) {
        game_grid[i] = new Array(cellsY);
    }


    for (let i = 0; i < NUM_GRID_X; i++) {
        for (let j = 0; j < NUM_GRID_Y; j++) {
            game_grid[i][j] = {
                floor: null,
                occupant: null,
            }

        }
    }
    // game_grid[1][1].occupant = 'lachie';





    return game_grid;
}

export const game_grid = createGameGrid(NUM_GRID_X, NUM_GRID_Y);




export function do_a_tick() {
    let moved = false;
    if (current_dpad_dir !== null && isAnimating === false) {
        switch (current_dpad_dir) {
            case 'left':
                moved = move_block_position_x(-1);
                break;
            case 'right':
                moved = move_block_position_x(1);
                break;
            case 'up':
                moved = move_block_position_y(-1);
                // player.position.y -= 1;
                break;
            case 'down':
                // player.position.y += 1;
                moved = move_block_position_y(1);
                break;
            default:
                console.log(`game: tick with no dpad dir!`);
        }
        draw(moved);
    }
}


function move_block_position_x(offset) {
    let moved = false;
    const newPos = player.position.x + offset;
    (newPos > player.position.x) ? player.isFacing = 'right' : player.isFacing = 'left';
    game_grid[player.position.x][player.position.y].occupant = null;
    // catch out of bounds
    if (position_is_in_bounds(newPos, 0, NUM_GRID_X - 1)) {

        if (!cell_is_occupied(game_grid[newPos][player.position.y])) {
            player.position.x = newPos;                                   // set guy's new x position
            check_all_lines_of_sight();
            moved = true;
            // camera.x += offset;
        } else {
            console.log(`cell occupied at [${newPos}][${player.position.y}] - ${game_grid[newPos][player.position.y].occupant}`);
        }
    }
    game_grid[player.position.x][player.position.y].occupant = 'lachie';
    // draw(moved);
    return moved;
}

function move_block_position_y(offset) {
    let moved = false;
    const newPos = player.position.y + offset;

    (newPos > player.position.y) ? player.isFacing = 'down' : player.isFacing = 'up';
    game_grid[player.position.x][player.position.y].occupant = null;
    if (position_is_in_bounds(newPos, 0, NUM_GRID_Y - 1)) {             // catch out of bounds
        if (!cell_is_occupied(game_grid[player.position.x][newPos])) {    // catch collisions
            player.position.y = newPos;                                   // update position if no obstacles found
            moved = true;
            // camera.y += offset;
            check_all_lines_of_sight();
        } else {
            console.log(`cell occupied at [${player.position.x}][${newPos}] - ${game_grid[player.position.x][newPos].occupant}`);
        }
    }
    game_grid[player.position.x][player.position.y].occupant = 'lachie';
    // draw(moved);
    return moved;
}

function check_all_lines_of_sight() {
    const px = player.position.x;
    const py = player.position.y;
    for (const key in entities) {
        entities[key].hasAlert = check_cell_is_in_line_of_sight(px, py, entities[key]);
    }
}

function position_is_in_bounds(pos, min, max) {
    if (pos < min || pos > max) return false;
    return true;
}

function cell_is_occupied(cell) {
    // console.log(`cell is ${cell}`);
    if (cell.occupant !== null) return true;
    // if (cell === 'tree') return true;  // deny move though 'trees'
    // if (cell === 'gary') return true;  // deny move though 'skellington'
    // if (cell === 'harold') return true;  // deny move though 'skellington'
    // if (cell === 'fred') return true;  // deny move though 'skellington'
    // if (cell === 'sprite_1') return true;  // deny move though 'sprite'    
    return false;

}


// ------------------------------------------------------
// LINE OF SIGHT
function get_line_of_sight(entity) {
    let orientation = null;
    let range = null;
    switch (entity.isFacing) {
        case 'up':
            orientation = 'vertical';
            range = -entity.sightRange;
            break;
        case 'down':
            orientation = 'vertical';
            range = entity.sightRange;
            break;
        case 'left':
            orientation = 'horizontal';
            range = -entity.sightRange;
            break;
        case 'right':
            orientation = 'horizontal';
            range = entity.sightRange;
            break;
    }

    return {
        orientation: orientation,
        range: range,
    }
}

function check_cell_is_in_line_of_sight(cellX, cellY, viewer) {
    let v, cell;
    const line = get_line_of_sight(viewer);
    if (line.orientation === 'vertical') {
        if (cellX !== viewer.position.x) return false;
        v = viewer.position.y;
        cell = cellY;
    } else {
        if (cellY !== viewer.position.y) return false;
        v = viewer.position.x;
        cell = cellX;
    }
    return check_single_axis(line.range, v, cell);
}

function check_single_axis(range, viewer, cell) {
    let start, stop;
    if (range > 0) {
        start = viewer + 1;
        stop = viewer + 1 + range;
    } else {
        start = viewer + range;
        stop = viewer;
    }
    for (let i = start; i < stop; i++) {
        if (i === cell) return true;
    }
    return false;
}
// ------------------------------------------------------
export const player = {
    name: 'lachie',
    position: {
        x: 1,
        y: 1
    },
    isFacing: 'down',
}


