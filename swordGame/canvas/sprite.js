const SPRITE_SIZE = 16;
const SPRITES_PER_ROW = 4;
const SPRITE_COUNT = 8 * SPRITES_PER_ROW; // Total number of sprites (4 columns, 8 rows)

export function extractSprites(spriteSheet) {
    // Cache for storing sprite textures
    const spriteTextures = [];
    for (let i = 0; i < SPRITE_COUNT; i++) {
        const sx = (i % SPRITES_PER_ROW) * SPRITE_SIZE;
        const sy = Math.floor(i / SPRITES_PER_ROW) * SPRITE_SIZE;

        // Create an offscreen canvas for each sprite
        const spriteCanvas = document.createElement('canvas');
        spriteCanvas.width = SPRITE_SIZE;
        spriteCanvas.height = SPRITE_SIZE;

        const spriteCtx = spriteCanvas.getContext('2d');
        // spriteCtx.webkitImageSmoothingEnabled = false;
        // spriteCtx.mozImageSmoothingEnabled = false;
        // spriteCtx.imageSmoothingEnabled = false;
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


export function getSpriteIndex(isFacing) {

    switch (isFacing) {
        case 'down': return 0;
        case 'left': return 8;
        case 'up': return 16;
        case 'right': return 24;
    }
}


export async function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img); // resolves when image is loaded
        img.onerror = reject; // rejects on error
        img.src = url;
    });
}

export const images = {};
export const textures = {};

export async function dummy_extractSprites(spriteSheet) {
    const SPRITE_SIZE = 16;
    const SPRITES_PER_ROW = 4;
    const SPRITE_COUNT = 8 * SPRITES_PER_ROW; // Total number of sprites (4 columns, 8 rows)
    
    // Cache for storing sprite textures
    const spriteTextures = [];
    for (let i = 0; i < SPRITE_COUNT; i++) {
        const sx = (i % SPRITES_PER_ROW) * SPRITE_SIZE;
        const sy = Math.floor(i / SPRITES_PER_ROW) * SPRITE_SIZE;

        // Create an offscreen canvas for each sprite
        const spriteCanvas = document.createElement('canvas');
        spriteCanvas.width = SPRITE_SIZE;
        spriteCanvas.height = SPRITE_SIZE;

        const spriteCtx = spriteCanvas.getContext('2d');
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