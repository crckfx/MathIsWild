import { canvas, ctx, cell_size, cellSelector, images } from "./document.js";

import { game_grid, block_positon, characterIsFacing, gary, harold, fred } from "./game.js";

import { getSpriteIndex } from "./sprite.js";
// CLEARING THE CANVAS
export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
export function drawBorder(x, y, colour = 'green') {
    ctx.strokeStyle = colour;
    ctx.strokeRect(cell_size.x * x, cell_size.y * y, cell_size.x, cell_size.y);

}

export function render_entire_grid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < game_grid.length; i++) {
        for (let j = 0; j < game_grid[i].length; j++) {
            const cell = game_grid[i][j];
            if (cell === 'lachie') {
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(getSprite(characterIsFacing), cell_size.x * i, cell_size.y * j, cell_size.x, cell_size.y);
            } else if (cell === 'gary') {
                // ctx.drawImage(getSprite_Red(gary.isFacing), cell_size.x * i, cell_size.y * j, cell_size.x, cell_size.y);
                drawEntity(gary);
            } else if (cell === 'harold') {
                // ctx.drawImage(getSprite_Red(gary.isFacing), cell_size.x * i, cell_size.y * j, cell_size.x, cell_size.y);
                drawEntity(harold);
            } else if (cell === 'fred') {
                // ctx.drawImage(getSprite_Red(gary.isFacing), cell_size.x * i, cell_size.y * j, cell_size.x, cell_size.y);
                drawEntity(fred);
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


export function drawEntity(entity) {
    // console.log(`entity is facing ${entity.getFacing()}`)
    // console.log(`entity sprite is ${entity.getEntitySprite()}`)
    ctx.drawImage(entity.getEntitySprite(), cell_size.x * entity.position.x, cell_size.y * entity.position.y, cell_size.x, cell_size.y);
    if (entity.hasAlert) {
        drawBorder(entity.position.x, entity.position.y, "red");
    }

}

window.onload = () => {
    drawThingAtPosition(block_positon.x, block_positon.y);
}
