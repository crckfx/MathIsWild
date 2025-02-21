import { canvas, getHtmlControls, cell_size, panelCenter, resize } from "./document.js";
import { draw } from "./render.js";

import { HtmlControls, bindControls } from "./controls.js";
import { do_a_tick, NUM_GRID_X, NUM_GRID_Y } from "./game.js";
import { extractSprites, images, textures, loadImage, extract_single_sprite } from "./sprite.js";

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


        images.manyTextures = await loadImage('../../Images/sprite/Textures-16.png');


        // unpack the texture resources
        textures.spriteDefault = await extractSprites(images.spriteDefault);
        textures.spriteRed = await extractSprites(images.spriteRed);
        textures.spriteYellow = await extractSprites(images.spriteYellow);

        textures.road = await extract_single_sprite(images.manyTextures, 3, 2);
        textures.grass = await extract_single_sprite(images.manyTextures, 3, 15, 16);
        textures.grass2 = await extract_single_sprite(images.manyTextures, 2, 15, 16);
        textures.dirt = await extract_single_sprite(images.manyTextures, 1, 30);
        textures.water = [
            await extract_single_sprite(images.manyTextures, 11, 8),
            await extract_single_sprite(images.manyTextures, 12, 8),
            await extract_single_sprite(images.manyTextures, 13, 8),

        ];
        textures.sand = await extract_single_sprite(images.manyTextures, 1, 6);

        // assign pointer and keyboard listeners
        bindControls();
        // watch for resize on the canvas container
        const observer = new ResizeObserver(resize);
        observer.observe(panelCenter);

    } catch (error) {
        console.error('Failed to load image', error);
    }
}

window.onload = () => {
    dummy_init();
}
