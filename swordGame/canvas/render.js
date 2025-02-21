import { canvas, ctx, cell_size, cellSelector } from "./document.js";

import { game_grid, block_positon, entities, player } from "./game.js";

import { images, textures, getSpriteIndex } from "./sprite.js";

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

    for (let i = 0; i < game_grid.length; i++) {
        for (let j = 0; j < game_grid[i].length; j++) {
            const cell = game_grid[i][j];
            
            if (cell === 'tree') {
                ctx.drawImage(images.tree, cell_size.x * i, cell_size.y * j, cell_size.x, cell_size.y);
            } else if (cell === 'skelly') {
                ctx.drawImage(images.skelly, cell_size.x * i, cell_size.y * j, cell_size.x, cell_size.y);
            } 
        }
    }
    drawPlayer();
    
    for (const key in entities) {
        drawEntity(entities[key]);
    }
}

function getPlayerSprite(isFacing) {
    return textures.spriteDefault[getSpriteIndex(isFacing)];
}

function drawPlayer() {
    ctx.drawImage(getPlayerSprite(player.isFacing), cell_size.x * player.position.x, cell_size.y * player.position.y, cell_size.x, cell_size.y);
}

export function drawEntity(entity) {
    ctx.drawImage(entity.getEntitySprite(), cell_size.x * entity.position.x, cell_size.y * entity.position.y, cell_size.x, cell_size.y);
    if (entity.hasAlert) {
        drawBorder(entity.position.x, entity.position.y, "red");
    }

}

