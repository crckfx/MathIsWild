import { canvas, ctx, cell_size, cellSelector } from "./document.js";

import { game_grid, block_positon, entities, player, doodads, NUM_GRID_X, NUM_GRID_Y, camera } from "./game.js";

import { images, textures, getSpriteIndex } from "./sprite.js";
export const CAMERA_CELLS_X = 12;
export const CAMERA_CELLS_Y = 9;
export const CAMERA_PADDING = 2;

export function moveCamera(pos) {
    if (pos.x > camera.x + CAMERA_CELLS_X - 1 - CAMERA_PADDING) {
        if (camera.x + CAMERA_CELLS_X < NUM_GRID_X) {
            camera.x += 1;
            // console.log('camera to the right!?');
            return;
        }
    } else if (pos.x < camera.x + CAMERA_PADDING) {
        if (camera.x > 0) {
            camera.x -= 1;
            // console.log('camera to the left!?');
            return;
        }
    }

    if (pos.y > camera.y + CAMERA_CELLS_Y - 1 - CAMERA_PADDING) {
        if (camera.y + CAMERA_CELLS_Y < NUM_GRID_Y) {
            camera.y += 1;
            // console.log('camera to the down!?');
            return;
        }
    } else if (pos.y < camera.y + CAMERA_PADDING) {
        if (camera.y > 0) {
            camera.y -= 1;
            // console.log('camera to the up!?');
            return;
        }
    }

}
// CLEARING THE CANVAS
export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// KEEPING TRACK OF THE TEXTURE SHIFTING?
const drawCycleCount = 3;
let drawCount = 0;
function increment_draw_count() {
    drawCount = (drawCount + 1) % drawCycleCount;
}

// DRAWING THE CANVAS
export function draw() {
    increment_draw_count();
    render_entire_grid();
}

// draw a border around a grid
export function drawBorder(x, y, colour = 'green') {
    ctx.strokeStyle = colour;
    ctx.strokeRect(cell_size.x * x, cell_size.y * y, cell_size.x, cell_size.y);
}

export function render_entire_grid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(`draw: drawCount is ${drawCount}`);
    ctx.imageSmoothingEnabled = false;

    moveCamera(player.position);

    drawFloors();

    drawPlayer();



    for (const key in entities) {
        if (isInCameraRange(entities[key].position))
            drawEntity(entities[key]);
    }

    for (let i = 0; i < doodads.length; i++) {
        if (isInCameraRange(doodads[i]))
            drawDoodad(doodads[i]);
    }
}

// function to check 
function isInCameraRange(cell) {
    return !(
        cell.x < camera.x ||
        cell.y < camera.y ||
        cell.x > camera.x + CAMERA_CELLS_X - 1 ||
        cell.y > camera.y + CAMERA_CELLS_Y - 1
    );
}


function getPlayerSprite(isFacing) {
    return textures.spriteDefault[getSpriteIndex(isFacing)];
}

function drawPlayer() {
    // ctx.drawImage(getPlayerSprite(player.isFacing), cell_size.x * player.position.x, cell_size.y * player.position.y, cell_size.x, cell_size.y);
    ctx.drawImage(
        getPlayerSprite(player.isFacing),
        cell_size.x * (player.position.x - camera.x),
        cell_size.y * (player.position.y - camera.y),
        cell_size.x, cell_size.y
    );
}

export function drawEntity(entity) {
    ctx.drawImage(
        entity.getEntitySprite(),
        cell_size.x * (entity.position.x - camera.x),
        cell_size.y * (entity.position.y - camera.y),
        cell_size.x,
        cell_size.y
    );
    if (entity.hasAlert) {
        drawBorder(entity.position.x - camera.x, entity.position.y - camera.y, "red");
    }

}

function drawDoodad(doodad) {
    if (doodad.type === 'tree') {
        ctx.drawImage(
            images.tree,
            cell_size.x * (doodad.x - camera.x),
            cell_size.y * (doodad.y - camera.y),
            cell_size.x,
            cell_size.y
        );
    }

}


function drawFloors() {
    for (let i = 0; i < CAMERA_CELLS_X; i++) {
        for (let j = 0; j < CAMERA_CELLS_Y; j++) {
            const cell = game_grid[i + camera.x][j + camera.y];
            switch (cell.floor) {
                case 'road':
                case 'grass':
                case 'grass2':
                case 'dirt':
                case 'sand':
                    // drawMiscCell(textures[cell.floor], i, j);
                    // if (textures[cell.floor] === undefined) {
                    //     // console.log(cell.floor);
                    // }
                    drawMiscCell(textures[cell.floor], i, j);
                    // console.log(textures[cell.floor]);
                    break;
                case 'water':
                    drawMiscCell(textures[cell.floor][drawCount], i, j);
                    break;
            }
        }
    }
}

function drawMiscCell(image, x, y) {
    ctx.drawImage(
        image,
        cell_size.x * (x),
        cell_size.y * (y),
        cell_size.x,
        cell_size.y
    );
}
function drawFillCell(colour, x, y) {
    ctx.fillStyle = colour;
    ctx.strokeStyle = colour;

    // ctx.strokeWidth = 4;
    ctx.fillRect(
        cell_size.x * (x),
        cell_size.y * (y),
        cell_size.x,
        cell_size.y
    );
}