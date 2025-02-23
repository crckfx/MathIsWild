import { canvas, getHtmlControls, cell_size, panelCenter, resize } from "./document.js";
import { camera, CAMERA_CELLS_X, CAMERA_CELLS_Y, draw, renderCamera } from "./render.js";

import { HtmlControls, bindControls } from "./controls.js";
import { do_a_tick, NUM_GRID_X, NUM_GRID_Y, game_grid, doodads, entities, player } from "./game.js";
import { extractSprites, images, textures, loadImage, extract_single_sprite } from "./sprite.js";
import { map_1, parseFloorMap, parseOccupantMap, applyFloorToGameGrid, applyOccupantsToGameGrid, getMapBackground, getMapOccupants } from "./map.js";

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
            await extract_single_sprite(images.manyTextures, 12, 8),

        ];
        textures.sand = await extract_single_sprite(images.manyTextures, 1, 6);


        // do the map!
        const parsedOccupantMap = parseOccupantMap(map_1.occupants);
        applyOccupantsToGameGrid(game_grid, parsedOccupantMap);
        const parsedFloorMap = parseFloorMap(map_1.floor);
        applyFloorToGameGrid(game_grid, parsedFloorMap);
        const mapCanvas = await getMapBackground(game_grid);
        images.gameMap = mapCanvas;
        
        const mapOccupantCanvases = [
            await getMapOccupants(game_grid, 0),
            await getMapOccupants(game_grid, 1),
            await getMapOccupants(game_grid, 2),
            await getMapOccupants(game_grid, 1),
        ];

        textures.gameOccupants = mapOccupantCanvases;

        
        // var link = document.createElement('a');
        // link.download = 'filename_0.png';
        // link.href = mapOccupantCanvases[0].toDataURL();
        // link.click();
        

        // console.log(`you want to use ${player.name} to center ${camera.x}, ${camera.y}
        //             to coords ${player.position.x}, ${player.position.y}
        //             using ${(CAMERA_CELLS_X-1)/2}, ${ (CAMERA_CELLS_Y-1)/2} for middles
        //             and ${player.position.x - ((CAMERA_CELLS_X-1)/2)} and ${player.position.y - ((CAMERA_CELLS_Y-1)/2)}
        //     `);
        camera.x = map_1.cameraStart.x;
        camera.y = map_1.cameraStart.y;
        renderCamera.x = map_1.cameraStart.x;
        renderCamera.y = map_1.cameraStart.y;

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



