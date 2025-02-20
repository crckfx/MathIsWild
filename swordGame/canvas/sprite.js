const SPRITE_SIZE = 16;
const SPRITES_PER_ROW = 4;
const SPRITE_COUNT = 8 * SPRITES_PER_ROW; // Total number of sprites (4 columns, 8 rows)

// Cache for storing sprite textures
const spriteTextures = [];

export function extractSprites(spriteSheet) {
    for (let i = 0; i < SPRITE_COUNT; i++) {
        const sx = (i % SPRITES_PER_ROW) * SPRITE_SIZE;
        const sy = Math.floor(i / SPRITES_PER_ROW) * SPRITE_SIZE;

        // Create an offscreen canvas for each sprite
        const spriteCanvas = document.createElement('canvas');
        spriteCanvas.width = SPRITE_SIZE;
        spriteCanvas.height = SPRITE_SIZE;

        const spriteCtx = spriteCanvas.getContext('2d');
        spriteCtx.webkitImageSmoothingEnabled = false;
        spriteCtx.mozImageSmoothingEnabled = false;
        spriteCtx.imageSmoothingEnabled = false;
        // Draw the sprite onto the offscreen canvas
        spriteCtx.drawImage(
            spriteSheet,
            sx, sy, SPRITE_SIZE, SPRITE_SIZE,  // Source rectangle from sprite sheet
            0, 0, SPRITE_SIZE, SPRITE_SIZE    // Draw full size to the offscreen canvas
        );

        spriteTextures.push(spriteCanvas);
    }

    return spriteTextures;
}