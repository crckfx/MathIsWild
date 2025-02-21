import { canvas, ctx, cell_size, cellSelector } from "./document.js";

import { game_grid, block_positon, entities, player, doodads, NUM_GRID_X, NUM_GRID_Y } from "./game.js";

import { images, textures, getSpriteIndex } from "./sprite.js";
export const CAMERA_CELLS_X = 12;
export const CAMERA_CELLS_Y = 9;
const camera = {
    x: 0,
    y: 0
}
export function moveCamera(pos) {
    if (pos.x > camera.x + CAMERA_CELLS_X - 2) {
        if (camera.x + CAMERA_CELLS_X < NUM_GRID_X) {
            camera.x += 1;
            return;
            // console.log('camera to the right!?');
        }
    } else if (pos.x < camera.x + 1) {
        if (camera.x > 0) {
            camera.x -= 1;
            return;
            // console.log('camera to the left!?');
        }
    }

    if (pos.y > camera.y + CAMERA_CELLS_Y - 2) {
        if (camera.y + CAMERA_CELLS_Y < NUM_GRID_Y) {
            camera.y += 1;
            return;
            // console.log('camera to the down!?');
        }
    } else if (pos.y < camera.y + 1) {
        if (camera.y > 0) {
            camera.y -= 1;
            return;
            // console.log('camera to the up!?');
        }
    }

}

// CLEARING THE CANVAS
export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// DRAWING THE CANVAS
export function draw() {
    render_entire_grid();
}

// draw a border around a grid
export function drawBorder(x, y, colour = 'green') {
    ctx.strokeStyle = colour;
    ctx.strokeRect(cell_size.x * x, cell_size.y * y, cell_size.x, cell_size.y);
}

export function render_entire_grid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    moveCamera(player.position)
    
    for (let i=0; i<CAMERA_CELLS_X; i++) {
        for (let j=0; j<CAMERA_CELLS_Y; j++) {
            const cell = game_grid[i+camera.x][j+camera.y];
            if (cell.floor === 'stone') {
                ctx.drawImage(
                    images.cobblestone,
                    cell_size.x * (i - camera.x),
                    cell_size.y * (j - camera.y),
                    cell_size.x,
                    cell_size.y
                );
            } else if (cell.occupying === null) {
                // drawBorder(i, j, 'yellow');
            }
        }
    }
    
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

function isInCameraRange(cell) {
    if (cell.x < camera.x) return false;
    if (cell.y < camera.y) return false

    if (cell.x > camera.x + CAMERA_CELLS_X - 1) return false;
    if (cell.y > camera.y + CAMERA_CELLS_Y - 1) return false;

    return true;
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


