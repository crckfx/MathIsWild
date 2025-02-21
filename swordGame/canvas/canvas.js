import { canvas, getHtmlControls, cell_size, panelCenter, resize } from "./document.js";
import { draw } from "./render.js";

import { HtmlControls, bindControls } from "./controls.js";
import { do_a_tick, NUM_GRID_X, NUM_GRID_Y } from "./game.js";
import { extractSprites, images, textures, dummy_extractSprites, loadImage } from "./sprite.js";

async function dummy_init() {
    try {
        // fetch the resources
        images.backrooms = await loadImage('../../Images/monkey-laptop-backrooms.png');
        images.tree = await loadImage('../../Images/sprite/tree_1.png');
        images.blockie = await loadImage('../../Images/blocklan_mcghie.png');
        images.spriteDefault = await loadImage('../../Images/sprite/sprites_transparent.png');
        images.spriteRed = await loadImage('../../Images/sprite/sprites_transparent_red.png');
        images.spriteYellow = await loadImage('../../Images/sprite/sprites_transparent_yellow.png');
        images.cobblestone = await loadImage('../../Images/sprite/cobblestone.png');
        images.dirt = await loadImage('../../Images/sprite/dirt.png');


        // unpack the texture resources
        textures.spriteDefault = await dummy_extractSprites(images.spriteDefault);
        textures.spriteRed = await dummy_extractSprites(images.spriteRed);
        textures.spriteYellow = await dummy_extractSprites(images.spriteYellow);

        // assign pointer and keyboard listeners
        bindControls();

        // watch for resize on the canvas container
        const observer = new ResizeObserver(resize);
        observer.observe(panelCenter);

        // draw();
    } catch (error) {
        console.error('Failed to load image', error);
    }
}

window.onload = () => {
    dummy_init();
}
