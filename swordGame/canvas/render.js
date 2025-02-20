import { canvas, ctx, cell_size, cellSelector } from "./document.js";

import { game_grid, block_positon, characterIsFacing } from "./game.js";
import { extractSprites } from "./sprite.js";
// CLEARING THE CANVAS
export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// TESTING DRAWING ON THE CANVAS
const images = {
    blocklan: document.getElementById("image_blocky"), // silly image of blocky
    tree: document.getElementById("image_tree"),  // tree
    skelly: document.getElementById("image_skelly"),  // skelly
    spritesheet: document.getElementById("image_spritesheet"),  // sprites
    spriteTextures: extractSprites(document.getElementById("image_spritesheet")),
}


export function drawThingAtPosition(posX, posY) {
    if (game_grid[posX][posY] !== 'tree') {
        game_grid[posX][posY] = 'lachie';
    }
    render_entire_grid();
}
export function draw() {
    render_entire_grid();
}
export function clearThingAtPosition(posX, posY) {
    game_grid[posX][posY] = null;

    render_entire_grid();
}

// draw a border around a grid
export function drawBorder(x, y) {
    ctx.strokeStyle = "green";
    ctx.strokeRect(cell_size.x * x, cell_size.y * y, cell_size.x, cell_size.y);

}

export function render_entire_grid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < game_grid.length; i++) {
        for (let j = 0; j < game_grid[i].length; j++) {
            const cell = game_grid[i][j];
            if (cell === 'lachie') {
                ctx.drawImage(getSprite(characterIsFacing), cell_size.x * i, cell_size.y * j, cell_size.x, cell_size.y);
            } else if (cell === 'tree') {
                ctx.drawImage(images.tree, cell_size.x * i, cell_size.y * j, cell_size.x, cell_size.y);
            } else if (cell === 'skelly') {
                ctx.drawImage(images.skelly, cell_size.x * i, cell_size.y * j, cell_size.x, cell_size.y);
            } else if (cell === 'sprite_1') {
                // placeholder for a texture of the first sprite in an unpacked image
                // drawSprite(0, cell_size.x * i, cell_size.y * j, cell_size.x, cell_size.y);
                ctx.drawImage(images.spriteTextures[0], cell_size.x * i, cell_size.y * j, cell_size.x, cell_size.y);
            }
        }
    }

    drawBorder(block_positon.x, block_positon.y);
}

function getSprite(isFacing) {
    return images.spriteTextures[getSpriteIndex(isFacing)];
}

function getSpriteIndex(isFacing) {

    switch (isFacing) {
        case 'down': return 0;
        case 'left': return 8;
        case 'up': return 16;
        case 'right': return 24;
    }
}


window.onload = () => {
    drawThingAtPosition(block_positon.x, block_positon.y);
}
