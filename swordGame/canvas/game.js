import { current_dpad_dir, HtmlControls } from "./controls.js";
import { draw } from "./render.js";
import { getSpriteIndex, images, textures } from "./sprite.js";

export const block_positon = {
    x: 0,
    y: 0
};
export const NUM_GRID_X = 24;
export const NUM_GRID_Y = 24;

export const camera = {
    x: 0,
    y: 0
};


export const doodads = [
    // // left wall trees
    // { type: 'tree', x: 0, y: 0 },
    // { type: 'tree', x: 0, y: 1 },
    // { type: 'tree', x: 0, y: 2 },
    // { type: 'tree', x: 0, y: 3 },
    // // put an entity in this space
    // { type: 'tree', x: 0, y: 5 },
    // { type: 'tree', x: 0, y: 6 },
    // { type: 'tree', x: 0, y: 7 },
    // // top wall
    // { type: 'tree', x: 0, y: 0 },
    // { type: 'tree', x: 1, y: 0 },
    // { type: 'tree', x: 2, y: 0 },
    // { type: 'tree', x: 3, y: 0 },
    // { type: 'tree', x: 4, y: 0 },
    // // right wall
    // { type: 'tree', x: 16, y: 0 },
    // { type: 'tree', x: 17, y: 0 },
    // { type: 'tree', x: 17, y: 1 },
    // { type: 'tree', x: 17, y: 2 },


    // //
    // { type: 'tree', x: 5, y: 4 },
    // { type: 'tree', x: 5, y: 8 },
    // { type: 'tree', x: 10, y: 6 },
]

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
                occupying: null,
            }

        }
    }
    // game_grid[1][1].occupying = 'lachie';




    // for (let i = 0; i < doodads.length; i++) {
    //     const d = doodads[i];
    //     if (d.type === 'tree') {
    //         // game_grid[d.x][d.y] = 'tree';
    //         if (d.x > -1 && d.x < NUM_GRID_X && d.y > -1 && d.y < NUM_GRID_Y) {
    //             game_grid[d.x][d.y].occupying = 'tree';
    //         }
    //     }
    // }

    // for (const key in entities) {
    //     const e = entities[key];
    //     const x = e.position.x;
    //     const y = e.position.y;
    //     if (x > -1 && x < NUM_GRID_X && y > -1 && y < NUM_GRID_Y) {
    //         game_grid[x][y].occupying = e.name;
    //     }

    // }
    // game_grid[8][1] = 'gary';
    // game_grid[9][1] = 'harold';
    // game_grid[10][5] = 'fred';

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
                // player.position.y -= 1;
                break;
            case 'down':
                // player.position.y += 1;
                move_block_position_y(1);
                break;
            default:
                console.log(`game: tick with no dpad dir!`);
        }
    }
}


function move_block_position_x(offset) {
    const newPos = player.position.x + offset;
    (newPos > player.position.x) ? player.isFacing = 'right' : player.isFacing = 'left';
    game_grid[player.position.x][player.position.y].occupying = null;
    // catch out of bounds
    if (position_is_in_bounds(newPos, 0, NUM_GRID_X - 1)) {

        if (!cell_is_occupied(game_grid[newPos][player.position.y])) {
            player.position.x = newPos;                                   // set guy's new x position
            check_all_lines_of_sight();
        } else {
            console.log(`cell occupied at [${newPos}][${player.position.y}] - ${game_grid[newPos][player.position.y].occupying}`);
        }
    }
    game_grid[player.position.x][player.position.y].occupying = 'lachie';
    draw();
}

function move_block_position_y(offset) {
    const newPos = player.position.y + offset;

    (newPos > player.position.y) ? player.isFacing = 'down' : player.isFacing = 'up';
    game_grid[player.position.x][player.position.y].occupying = null;
    if (position_is_in_bounds(newPos, 0, NUM_GRID_Y - 1)) {             // catch out of bounds
        if (!cell_is_occupied(game_grid[player.position.x][newPos])) {    // catch collisions
            player.position.y = newPos;                                   // update position if no obstacles found
            check_all_lines_of_sight();
        } else {
            console.log(`cell occupied at [${player.position.x}][${newPos}] - ${game_grid[player.position.x][newPos].occupying}`);
        }
    }
    game_grid[player.position.x][player.position.y].occupying = 'lachie';
    draw();
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
    if (cell.occupying !== null) return true;
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


const map_1 = {
    floor:
    `   GGGGGGGdrrddGGGGGGdswwww
        GGggggddrrddggggggdswwww
        Ggggggdrrrdgggggggdswwww
        Ggggggdrrddgggggggdsswww
        Ggggggdrrddgggggggsswwww
        Ggggggdrrdddgggggggsswww
        Ggggggdrrrddggggggssswww
        Ggwwggddrrddggggggssssww
        ggwwwgddrrddggggggssssww
        ggwwggddrrddgggggggsssww
        gggggddrrrddggggggggssww
        gggggddrrddggggggggggssw
        gggggddrrddgggggggggggsw
        gggggddrrddgggggsgddddss
        gggggdrrddgggggsssddddds
        gggggdrrddgggsssssssddds
        gggggdrrddgggswwswwsssss
        gggggdrrddggsswwswwwwwww
        gggggdrrddggswwwswwwwwww
        gggggdrrGdggsswwswwwssww
        gggggGrGGdggswwwswwssssw
        gggggGrGGdggswwwswwsssww
        gggggGrGddggswwwssssswww
        gggggGwGdgggsswwwwwwwwws`,
    occupants: 
    `   TTTT....................
        T.......03..............
        T.......................
        T...P...........T.......
        2..............TTT......
        T..............TTT......
        T...............T.......
        T.......................
        T.......................
        ........................
        ........................
        ........1...............
        ....T......T............
        ...............T........
        ..T........T............
        .....T..TT..............
        .....T..TT..............
        .....T..TT..............
        .....T...T..............
        .....T...T..............
        .....T..TT..............
        .....T.TT...............
        .....T.T................
        .....T.T................
        .....TET................`,
    cameraStart: {
        x: 0,
        y: 3
    }
};

// Mapping of characters to floor types
const tileMap = {
    'g': 'grass',
    'G': 'grass2',
    'd': 'dirt',
    'r': 'road',
    's': 'sand',
    'w': 'water',
};
const occupantMap = {
    'T': 'tree',
    'W': 'water',
    'P': 'lachie',
    '.': null,
    '0': 'gary',
    '1': 'fred',
    '2': 'george',
    '3': 'harold',
};

// Decode the map into (x, y) positions
function parseFloorMap(mapString) {
    const rows = mapString.trim().split("\n");
    const parsedMap = [];

    for (let y = 0; y < rows.length; y++) {
        const row = rows[y].trim();

        for (let x = 0; x < row.length; x++) {
            parsedMap.push({ x, y, tile: tileMap[row[x]] || 'unknown' });
        }
    }

    return parsedMap;
}

// Apply parsed data to the existing game_grid
function applyFloorToGameGrid(game_grid, parsedFloorMap) {
    for (const { x, y, tile } of parsedFloorMap) {
        if (game_grid[x] && game_grid[x][y]) {
            game_grid[x][y].floor = tile;  // Apply floor type
            if (tile === 'water') {
                // add doodad here?
                const num = doodads.push({ type: 'water', x: x, y: y });
                game_grid[x][y].occupying = doodads[num-1].type;
            }
        }
    }
}


// Decode the map into (x, y) positions
function parseOccupantMap(mapString) {
    const rows = mapString.trim().split("\n");
    const parsedMap = [];

    for (let y = 0; y < rows.length; y++) {
        const row = rows[y].trim();
        
        for (let x = 0; x < row.length; x++) {
            parsedMap.push({ x: x, y: y, type: occupantMap[row[x]] || null });
        }
    }

    return parsedMap;
}

// note : "type" is becoming maybe a terrible name
function applyOccupantsToGameGrid(game_grid, parsedOccupantMap) {
    for (const { x, y, type } of parsedOccupantMap) {
        if (game_grid[x] && game_grid[x][y]) {
            if (type === 'lachie') {
                const oldCell = game_grid[player.position.x][player.position.y];
                const cell = game_grid[x][y];
                if (oldCell.occupying === 'lachie') {
                    oldCell.occupying = null;
                }
                player.position.x = x;
                player.position.y = y;
                cell.occupying = 'lachie';
            }
            if (type === 'gary' || type === 'fred' || type === 'george' || type === 'harold') {
                console.log('GOT an entity BACK');
                const e = entities[type];
                // remove entity occupation from a previous cell
                game_grid[e.position.x][e.position.y].occupying = null;
                // set new position
                e.position.x = x;
                e.position.y = y;
                game_grid[x][y].occupying = e.name;

            } else if (type === 'tree') {
                const num = doodads.push({ type: 'tree', x: x, y: y });
                game_grid[x][y].occupying = doodads[num-1].type;
            } else {
                game_grid[x][y].occupying = type;  // Apply floor type
            }
        }
    }
}

// Example usage:
const parsedOccupantMap = parseOccupantMap(map_1.occupants);
applyOccupantsToGameGrid(game_grid, parsedOccupantMap);
const parsedFloorMap = parseFloorMap(map_1.floor);
applyFloorToGameGrid(game_grid, parsedFloorMap);