// map.js 
// handles loading of map from text string. 
// it seems cool to store a map as a text file. here, we don't fetch a text file or anything - we just store it as a text string.

// 
// define floor signifiers
export const tileMap = {
    'g': 'grass',
    'G': 'grass2',
    'd': 'dirt',
    'r': 'road',
    's': 'sand',
    'w': 'water',
};
// define occupant signifiers
export const occupantMap = {
    'T': 'tree',
    'W': 'water',
    'P': 'lachie',
    '.': null,
    '0': 'gary',
    '1': 'fred',
    '2': 'george',
    '3': 'harold',
};
import { doodads, entities, player } from "./game.js";

export const map_1 = {
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
        x: -1,
        y: -1
    }
};

// Decode the map into (x, y) positions
export function parseFloorMap(mapString) {
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
export function applyFloorToGameGrid(game_grid, parsedFloorMap) {
    for (const { x, y, tile } of parsedFloorMap) {
        if (game_grid[x] && game_grid[x][y]) {
            game_grid[x][y].floor = tile;  // Apply floor type
            if (tile === 'water') {
                // add doodad here?
                const num = doodads.push({ type: 'water', x: x, y: y });
                game_grid[x][y].occupant = doodads[num-1].type;
            }
        }
    }
}


// Decode the map into (x, y) positions
export function parseOccupantMap(mapString) {
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
export function applyOccupantsToGameGrid(game_grid, parsedOccupantMap) {
    for (const { x, y, type } of parsedOccupantMap) {
        if (game_grid[x] && game_grid[x][y]) {
            if (type === 'lachie') {
                const oldCell = game_grid[player.position.x][player.position.y];
                const cell = game_grid[x][y];
                if (oldCell.occupant === 'lachie') {
                    oldCell.occupant = null;
                }
                player.position.x = x;
                player.position.y = y;
                cell.occupant = 'lachie';
            }
            if (type === 'gary' || type === 'fred' || type === 'george' || type === 'harold') {
                // console.log('GOT an entity BACK');
                const e = entities[type];
                // remove entity occupation from a previous cell
                const cell = game_grid[e.position.x][e.position.y];
                if (cell.occupant !== null) {
                    console.error(`something went WRONG applying ${e.name} to cell [${x}][${y}], it is already occupied by ${cell.occupant}`);
                } else {

                    game_grid[e.position.x][e.position.y].occupant = null;
                    // set new position
                    e.position.x = x;
                    e.position.y = y;
                    game_grid[x][y].occupant = e.name;
                }

            } else if (type === 'tree') {
                const num = doodads.push({ type: 'tree', x: x, y: y });
                game_grid[x][y].occupant = doodads[num-1].type;
            } else {
                game_grid[x][y].occupant = type;  // Apply floor type
            }
        }
    }
}
