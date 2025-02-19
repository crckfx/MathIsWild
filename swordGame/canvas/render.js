import { canvas, ctx } from "./document.js";
// CLEARING THE CANVAS
export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// TESTING DRAWING ON THE CANVAS
const image = document.getElementById("source"); // silly image of blocky
export function draw_blocklan() {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

