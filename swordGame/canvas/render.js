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

export let isAnimating = false;  
const targetDuration = 0.2;  

function updateRenderCamera() {
    const distanceX = camera.x - renderCamera.x;
    const distanceY = camera.y - renderCamera.y;

    const speedX = Math.abs(distanceX) / (targetDuration * 60); 
    const speedY = Math.abs(distanceY) / (targetDuration * 60); 

    if (Math.abs(distanceX) > 0.1) {
        renderCamera.x += Math.sign(distanceX) * speedX;
    }

    if (Math.abs(distanceY) > 0.1) {
        renderCamera.y += Math.sign(distanceY) * speedY;
    }

    // check if renderCamera has reached its target
    if (Math.abs(renderCamera.x - camera.x) < 0.1 && Math.abs(renderCamera.y - camera.y) < 0.1) {
        renderCamera.x = camera.x;  
        renderCamera.y = camera.y;
        console.log("Render Camera has caught up to Game Camera.");

        playerDrawCount = (playerDrawCount + 1) % playerDrawCycle;

        isAnimating = false;
        // // here is where we WOULD rerun it for 'hold down', although previous attempts caused speed to accumulate
        // if (current_dpad_dir !== null) {
        //     do_a_tick();
        // }
    }
    render_entire_grid();
}

function animate() {
    if (isAnimating) {
        updateRenderCamera(); 
        requestAnimationFrame(animate); 
    }
}

export function startRenderCameraAnimation() {
    if (!isAnimating) {
        isAnimating = true; 
        requestAnimationFrame(animate); 
    }
}

// DRAWING THE CANVAS
export function draw(moved = false) {
    increment_draw_count();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;
    if (moved) {
        playerDrawCount = (playerDrawCount + 1) % playerDrawCycle;
        switch(player.isFacing) {
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
        // console.log('player draw count is ', playerDrawCount);
        // accept a direction? player has moved, camera has not
        
    }
    // if (moveCamera(player.position)) {
    // } 
    else {
        render_entire_grid();
    }



}




export function render_entire_grid() {
    // draw floors
    drawFloors();
    // draw doodads
    for (let i = 0; i < doodads.length; i++) {
        if (isInCameraRange(doodads[i]))
            drawDoodad(doodads[i]);
    }    
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
        cell.x > camera.x -1 ||
        cell.y > camera.y -1 ||
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
    for (let i = -1; i < CAMERA_CELLS_X + 1; i++) {
        for (let j = -1; j < CAMERA_CELLS_Y + 1; j++) {


            const cellX = i + camera.x;
            const cellY = j + camera.y;
            
            
            // Skip out-of-bounds cells
            if (cellX < 0 || cellX >= NUM_GRID_X || cellY < 0 || cellY >= NUM_GRID_Y) {
                drawFillCell('black',cellX - renderCamera.x, cellY - renderCamera.y);  // for the draw, still offset using the renderCam
                continue;
            }

            const cell = game_grid[cellX][cellY];
            switch (cell.floor) {
                case 'road':
                case 'grass':
                case 'grass2':
                case 'dirt':
                case 'sand':
                    drawMiscCell(textures[cell.floor], cellX - renderCamera.x, cellY - renderCamera.y);
                    break;
                case 'water':
                    drawMiscCell(textures[cell.floor][drawCount], cellX - renderCamera.x, cellY - renderCamera.y);
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