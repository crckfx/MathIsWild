import { current_dpad_dir, fire_control_event } from "./controls.js";
import { canvas, ctx, cell_size, cellSelector } from "./document.js";

import { game_grid, block_positon, entities, player, doodads, NUM_GRID_X, NUM_GRID_Y, do_a_tick } from "./game.js";

import { images, textures, getSpriteIndex } from "./sprite.js";


export const camera = {
    x: 0,
    y: 0
};

export const renderCamera = {
    x: 0,
    y: 0
};

// KEEPING TRACK OF THE TEXTURE SHIFTING?
const drawCycleCount = 3;
let drawCount = 0;

const playerDrawCycle = 4;
let playerDrawCount = 0;

function increment_draw_count() {
    drawCount = (drawCount + 1) % drawCycleCount;
}


export const CAMERA_CELLS_X = 11;
export const CAMERA_CELLS_Y = 9;
export const CAMERA_PADDING = 2;
const speed = 0.005;

export let isAnimating = false;

function updateRenderCamera(dt) {
    // console.log('dt is: ', dt)
    elapsed += dt;
    const distanceX = camera.x - renderCamera.x;
    const distanceY = camera.y - renderCamera.y;

    const dtSpeed = speed * dt;

    if (Math.abs(distanceX) > 0.1) {
        renderCamera.x += Math.sign(distanceX) * dtSpeed;
    }

    if (Math.abs(distanceY) > 0.1) {
        renderCamera.y += Math.sign(distanceY) * dtSpeed;
    }

    // check if renderCamera has reached its target
    if (Math.abs(renderCamera.x - camera.x) <= 0.1 && Math.abs(renderCamera.y - camera.y) <= 0.1) {
        renderCamera.x = camera.x;
        renderCamera.y = camera.y;
        console.log("Render Camera has caught up to Game Camera.");

        playerDrawCount = (playerDrawCount + 1) % playerDrawCycle;

        isAnimating = false;
        console.log('elapsed is', elapsed);
        // elapsed = 0;
        // // here is where we WOULD rerun it for 'hold down', although previous attempts caused speed to accumulate
        // // update: speed accumulation seems fixed - the approach below worked and felt the same on both 60 and 144 
        if (current_dpad_dir !== null) {
            console.log('retrigger?');
            setTimeout(do_a_tick, 70); // if some number of ms after the last frame is found, the control is down, we do a rollover "hold" tick
        }
    }

}

let then = 0;
function animate(now) {
    if (isAnimating) {
        let deltaTime = now - then;
        then = now;
        updateRenderCamera(deltaTime);
        render_entire_grid();
        requestAnimationFrame(animate);
    }
}
let elapsed = 0;
export function startRenderCameraAnimation() {
    if (!isAnimating) {
        console.log('starting animation');
        isAnimating = true;
        then = performance.now(); // always set to the last performance then loop on that
        elapsed = 0;
        animate(0);
    }
}

// DRAWING THE CANVAS
export function draw(moved = false) {
    increment_draw_count();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;
    if (moved) {
        playerDrawCount = (playerDrawCount + 1) % playerDrawCycle;
        switch (player.isFacing) {
            case 'left':
                camera.x--;
                startRenderCameraAnimation();
                break;
            case 'right':
                camera.x++;
                startRenderCameraAnimation();
                break;
            case 'up':
                camera.y--;
                startRenderCameraAnimation();
                break;
            case 'down':
                camera.y++;
                startRenderCameraAnimation();
                break;
        }
    } else {
        render_entire_grid();
    }



}




export function render_entire_grid() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw floors - uses an image now :)
    drawFloors();
    // draw occupants - currently only does doodads
    drawOccupants();
    // draw entities
    for (const key in entities) {
        if (isInCameraRange(entities[key].position))
            drawEntity(entities[key]);
    }
    // draw player
    drawPlayer();

}

// function to check 
function isInCameraRange(cell) {
    return (
        cell.x > camera.x - 1 ||
        cell.y > camera.y - 1 ||
        cell.x < camera.x + CAMERA_CELLS_X ||
        cell.y < camera.y + CAMERA_CELLS_Y
    );
}


function drawPlayer() {
    let index = getSpriteIndex(player.isFacing);

    if (isAnimating) index += playerDrawCount; // use a running index if animating. todo: improve me

    // do not shift the player; shift the floor? 
    // because both camera and player update their position instantly, we keep the player still when the camera moves
    ctx.drawImage(
        textures.spriteDefault[index],
        cell_size.x * (player.position.x - camera.x),
        cell_size.y * (player.position.y - camera.y),
        cell_size.x, cell_size.y
    );
}

export function drawEntity(entity) {
    ctx.drawImage(
        entity.getEntitySprite(),
        cell_size.x * (entity.position.x - renderCamera.x),
        cell_size.y * (entity.position.y - renderCamera.y),
        cell_size.x,
        cell_size.y
    );
    if (entity.hasAlert) {
        if (!isAnimating) {
            drawBorder(entity.position.x - renderCamera.x, entity.position.y - renderCamera.y, "red");

        }
    }

}

function drawDoodad(doodad) {
    if (doodad.type === 'tree') {
        ctx.drawImage(
            images.tree,
            cell_size.x * (doodad.x - renderCamera.x),
            cell_size.y * (doodad.y - renderCamera.y),
            cell_size.x,
            cell_size.y
        );
    }

}


function drawFloors() {

    const sourceX = camera.x * FLOOR_CELL_PIXELS - FLOOR_CELL_PIXELS;
    const sourceY = camera.y * FLOOR_CELL_PIXELS - FLOOR_CELL_PIXELS;
    const sourceWidth = (CAMERA_CELLS_X + 2) * FLOOR_CELL_PIXELS;
    const sourceHeight = (CAMERA_CELLS_Y + 2) * FLOOR_CELL_PIXELS;

    // Destination positioning based on renderCamera
    const destX = -((renderCamera.x - camera.x) * cell_size.x) - cell_size.x;
    const destY = -((renderCamera.y - camera.y) * cell_size.y) - cell_size.y;
    const destWidth = sourceWidth * (cell_size.x / FLOOR_CELL_PIXELS);
    const destHeight = sourceHeight * (cell_size.y / FLOOR_CELL_PIXELS);

    // Draw the floor background slice
    ctx.drawImage(images.gameMap, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

}

function drawOccupants() {

    // everything from here SHOULD theoretically get removed, and replaced with a "draw a rect slice of the background image, scaled up"
    for (let i = -1; i < CAMERA_CELLS_X + 1; i++) {
        for (let j = -1; j < CAMERA_CELLS_Y + 1; j++) {
            const cellX = i + camera.x;
            const cellY = j + camera.y;
            // Skip out-of-bounds cells, we draw the black insurance rect upstream now
            if (cellX < 0 || cellX >= NUM_GRID_X || cellY < 0 || cellY >= NUM_GRID_Y) {
                continue;
            }

            const cell = game_grid[cellX][cellY];
            switch (cell.occupant) {
                case 'tree':
                    ctx.drawImage(
                        images.tree,
                        cell_size.x * (cellX - renderCamera.x),
                        cell_size.y * (cellY - renderCamera.y),
                        cell_size.x,
                        cell_size.y
                    );
                    break;

                case 'water':
                    drawMiscCell(textures['water'][drawCount], cellX - renderCamera.x, cellY - renderCamera.y);
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

// draw a border around a grid
export function drawBorder(x, y, colour = 'green') {
    ctx.strokeStyle = colour;
    ctx.strokeRect(cell_size.x * x, cell_size.y * y, cell_size.x, cell_size.y);
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


// CLEARING THE CANVAS
export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}



export const FLOOR_CELL_PIXELS = 16;
export async function getMapBackground() {
    // get the pixel sizes for the map
    const mapWidthPx = FLOOR_CELL_PIXELS * NUM_GRID_X;
    const mapHeightPx = FLOOR_CELL_PIXELS * NUM_GRID_Y;
    // Create an offscreen canvas for each sprite
    const mapCanvas = document.createElement('canvas');
    mapCanvas.width = mapWidthPx;
    mapCanvas.height = mapHeightPx;
    const mapCtx = mapCanvas.getContext('2d');
    mapCtx.imageSmoothingEnabled = false;

    // loop over the entire game grid
    for (let i = 0; i < NUM_GRID_X; i++) {
        for (let j = 0; j < NUM_GRID_Y; j++) {
            const cell = game_grid[i][j];
            switch (cell.floor) {
                case 'road':
                case 'grass':
                case 'grass2':
                case 'dirt':
                case 'sand':
                    mapCtx.drawImage(
                        textures[cell.floor],
                        FLOOR_CELL_PIXELS * (i),
                        FLOOR_CELL_PIXELS * (j),
                        FLOOR_CELL_PIXELS,
                        FLOOR_CELL_PIXELS,
                        // 0, 0, cell_size.x, cell_size.y    // Draw full size to the offscreen canvas

                    );
                    break;
                case 'water':
                    mapCtx.fillStyle = 'blue';
                    mapCtx.fillRect(
                        FLOOR_CELL_PIXELS * (i),
                        FLOOR_CELL_PIXELS * (j),
                        FLOOR_CELL_PIXELS,
                        FLOOR_CELL_PIXELS
                    );
                    break;
            }
        }
    }
    return mapCanvas;
}