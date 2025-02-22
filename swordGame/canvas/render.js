import { canvas, ctx, cell_size, cellSelector } from "./document.js";

import { game_grid, block_positon, entities, player, doodads, NUM_GRID_X, NUM_GRID_Y } from "./game.js";

import { images, textures, getSpriteIndex } from "./sprite.js";


export const camera = {
    x: 0,
    y: 0
};

export const renderCamera = {
    x: 0,
    y: 0
};
let isAnimating = false;  // Control flag to check if we should animate
const targetDuration = 0.5;  // Time in seconds to catch up to camera

// KEEPING TRACK OF THE TEXTURE SHIFTING?
const drawCycleCount = 3;
let drawCount = 0;
function increment_draw_count() {
    drawCount = (drawCount + 1) % drawCycleCount;
}


export const CAMERA_CELLS_X = 12;
export const CAMERA_CELLS_Y = 9;
export const CAMERA_PADDING = 2;

export function moveCamera(pos) {
    if (pos.x > camera.x + CAMERA_CELLS_X - 1 - CAMERA_PADDING) {
        if (camera.x + CAMERA_CELLS_X < NUM_GRID_X) {
            camera.x += 1;
            // console.log('camera to the right!?');
            return true;
        }
    } else if (pos.x < camera.x + CAMERA_PADDING) {
        if (camera.x > 0) {
            camera.x -= 1;
            // console.log('camera to the left!?');
            return true;
        }
    }

    if (pos.y > camera.y + CAMERA_CELLS_Y - 1 - CAMERA_PADDING) {
        if (camera.y + CAMERA_CELLS_Y < NUM_GRID_Y) {
            camera.y += 1;
            // console.log('camera to the down!?');
            return true;
        }
    } else if (pos.y < camera.y + CAMERA_PADDING) {
        if (camera.y > 0) {
            camera.y -= 1;
            // console.log('camera to the up!?');
            return true;
        }
    }

    return false;
}


function updateRenderCamera() {
    const distanceX = camera.x - renderCamera.x;
    const distanceY = camera.y - renderCamera.y;

    // Calculate the speed to move per frame along each axis
    const speedX = Math.abs(distanceX) / (targetDuration * 60); // targetDuration is in seconds, assuming 60 FPS
    const speedY = Math.abs(distanceY) / (targetDuration * 60); // Same for Y axis

    // Move renderCamera toward the camera position along the X axis
    if (Math.abs(distanceX) > 0.1) {
        renderCamera.x += Math.sign(distanceX) * speedX;
    }

    // Move renderCamera toward the camera position along the Y axis
    if (Math.abs(distanceY) > 0.1) {
        renderCamera.y += Math.sign(distanceY) * speedY;
    }

    // Check if renderCamera has reached the target
    if (Math.abs(renderCamera.x - camera.x) < 0.1 && Math.abs(renderCamera.y - camera.y) < 0.1) {
        renderCamera.x = camera.x;  // Ensure renderCamera is exactly aligned
        renderCamera.y = camera.y;
        console.log("Render Camera has caught up to Game Camera.");

        // Stop animation by disabling the flag
        isAnimating = false;
    }
    render_entire_grid();
}

function animate() {
    if (isAnimating) {
        updateRenderCamera(); // Update render camera position
        requestAnimationFrame(animate); // Continue animation loop only if animating
    }
}

export function startRenderCameraAnimation() {
    if (!isAnimating) {
        isAnimating = true; // Start the animation
        animate(); // Start the animation loop
    }
}

// DRAWING THE CANVAS
export function draw() {
    increment_draw_count();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;
    if (moveCamera(player.position)) {
        startRenderCameraAnimation();
    } else {
        render_entire_grid();
    }

    // moveCamera(player.position);
    // render_entire_grid();

}




export function render_entire_grid() {
    // draw floors
    drawFloors();
    // draw doodads
    for (let i = 0; i < doodads.length; i++) {
        if (isInCameraRange(doodads[i]))
            drawDoodad(doodads[i]);
    }    
    // draw player
    drawPlayer();
    // draw entities
    for (const key in entities) {
        if (isInCameraRange(entities[key].position))
            drawEntity(entities[key]);
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


function drawPlayer() {
    ctx.drawImage(
        textures.spriteDefault[getSpriteIndex(player.isFacing)],
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
        drawBorder(entity.position.x - renderCamera.x, entity.position.y - renderCamera.y, "red");
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
                    drawMiscCell(textures[cell.floor], i + camera.x - renderCamera.x, j + camera.y - renderCamera.y);
                    // console.log(textures[cell.floor]);
                    break;
                case 'water':
                    drawMiscCell(textures[cell.floor][drawCount], i + camera.x - renderCamera.x, j + camera.y - renderCamera.y);
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