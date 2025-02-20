import { canvas, ctx, NUM_GRID_X, NUM_GRID_Y, cell_size, cellSelector } from "./document.js";
import { block_positon, game_grid } from "./canvas.js";
// CLEARING THE CANVAS
export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// TESTING DRAWING ON THE CANVAS
const image = document.getElementById("source"); // silly image of blocky
const images = {
    tree: document.getElementById("source_2")// silly image of blocky
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

export function drawBorder(x, y) {
    ctx.strokeStyle = "green";
    ctx.strokeRect(cell_size.x * x, cell_size.y * y, cell_size.x, cell_size.y);

}

export function render_entire_grid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < game_grid.length; i++) {
        for (let j = 0; j < game_grid[i].length; j++) {
            if (game_grid[i][j] === 'lachie') {
                ctx.drawImage(image, cell_size.x * i, cell_size.y * j, cell_size.x, cell_size.y);
            } else if (game_grid[i][j] === 'tree') {
                ctx.drawImage(images.tree, cell_size.x * i, cell_size.y * j, cell_size.x, cell_size.y);
            }
        }
    }

    drawBorder(block_positon.x, block_positon.y);
}

