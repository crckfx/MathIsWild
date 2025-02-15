// function to set the canvas size based on its parent (note - overflow:hidden protects against parent growth)
function resize() {
    const rect = panelCenter.getBoundingClientRect();
    let width, height;
    // console.log(rect);
    if (rect.width / rect.height < ASPECT_RATIO) {
        console.log(`vertical? ${rect.width / rect.height}`);
        width = rect.width;
        height = rect.width / ASPECT_RATIO;

    } else {
        console.log('horizontal');
        height = rect.height;
        width = rect.height * ASPECT_RATIO;
    }

    if (width > MAX_SIZE.x || height > MAX_SIZE.y) {
        width = MAX_SIZE.x;
        height = MAX_SIZE.y;
    }

    canvas.width = width - PADDING;
    canvas.height = height - PADDING;
}


function fire_dpad_event(direction) {
    current_dpad_dir = direction;
    console.log(`moved ${direction}.`);
}

function press_dpad(input) {
    fire_dpad_event(input);
}

function press_btn(input) {
    switch (input) {
        case 'X':
            clearCanvas();
            draw_blocklan();
            break;
        case 'Y':
            clearCanvas();
            break;
        case 'A':
            clearCanvas();
            break;
        case 'B':
            clearCanvas();
            break;
        case null:
            console.log(`sent null to press btn`);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw_blocklan() {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

function handleKeyDown(event) {
    const key = event.key.toLowerCase();
    if (key in keyboard) {
        event.preventDefault();
        if (keyboard[key] !== true) {
            // only handle if not already pressed
            console.log(`pog press ${key}`);
            keyboard[key] = true;
            fire_dpad_event(key);
        }
    }
}

function handleKeyUp(event) {
    const key = event.key.toLowerCase();
    if (key in keyboard) {
        if (keyboard[key] === true) {
            event.preventDefault();
            keyboard[key] = false;
            console.log(`pog release ${key}`);
        }
    }
}

function bindControls() {
    HTMLcontrols.dpad.left.addEventListener('pointerdown', () => press_dpad('left'));
    HTMLcontrols.dpad.up.addEventListener('pointerdown', () => press_dpad('up'));
    HTMLcontrols.dpad.right.addEventListener('pointerdown', () => press_dpad('right'));
    HTMLcontrols.dpad.down.addEventListener('pointerdown', () => press_dpad('down'));

    HTMLcontrols.buttons.A.addEventListener('pointerdown', () => press_btn('A'));
    HTMLcontrols.buttons.B.addEventListener('pointerdown', () => press_btn('B'));
    HTMLcontrols.buttons.X.addEventListener('pointerdown', () => press_btn('X'));
    HTMLcontrols.buttons.Y.addEventListener('pointerdown', () => press_btn('Y'));

    // Listen for all key presses / releases
    document.addEventListener('keydown', (event) => handleKeyDown(event));
    document.addEventListener('keyup', (event) => handleKeyUp(event));

}




// declarations
const ASPECT_RATIO = 4 / 3;
const PADDING = 24;
const MAX_SIZE = {
    x: 1024,
    y: 768
};

let current_dpad_dir = null;

const HTMLcontrols = {
    dpad: {
        left: document.getElementById('dpad_left'),
        up: document.getElementById('dpad_up'),
        right: document.getElementById('dpad_right'),
        down: document.getElementById('dpad_down'),
    },
    buttons: {
        A: document.getElementById('control_A'),
        B: document.getElementById('control_B'),
        X: document.getElementById('control_X'),
        Y: document.getElementById('control_Y'),
    },
};

const keys = {
    arrowleft: 'left',
    arrowup: 'up',
    arrowright: 'right',
    arrowdown: 'down',
    z: 'A',
    x: 'B',
    a: 'X',
    s: 'Y',
};

const keyboard = {
    arrowleft: false,
    arrowup: false,
    arrowright: false,
    arrowdown: false,
    z: false,
    x: false,
    a: false,
    s: false,
}



const panelCenter = document.getElementById('panel_center');
const panelLeft = document.getElementById('panel_left');
const panelRight = document.getElementById('panel_right');

const canvas = document.getElementById('game_canv');
const ctx = canvas.getContext("2d");
const image = document.getElementById("source");

const observer = new ResizeObserver(resize);
observer.observe(panelCenter);
bindControls();