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


function fire_control_event(code) {
    switch (code) {
        case 'left':
        case 'up':
        case 'right':
        case 'down':
            fire_dpad_event(code);
            // console.log(`moved ${code}.`);
            break;
        case null:
            release_dpad();
            break;
        default:
            press_btn(code);

    }
}

function fire_dpad_event(direction) {
    if (current_dpad_dir !== null) {
        HTMLcontrols.dpad[current_dpad_dir].classList.remove('active');
    }
    current_dpad_dir = direction;
    HTMLcontrols.dpad[current_dpad_dir].classList.add('active');
    console.log(`moved ${direction}.`);
}

function release_dpad() {
    if (current_dpad_dir !== null) {
        HTMLcontrols.dpad[current_dpad_dir].classList.remove('active');
        console.log(`releasing ${current_dpad_dir}.`);
        current_dpad_dir = null;
    }
}



function press_btn(input) {
    console.log(`pressed ${input}.`);
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
        // only handle if not already pressed
        if (keyboard[key] !== true) {
            keyboard[key] = true;
            // fire_dpad_event(keys[key]);
            fire_control_event(keys[key]);
        }
    }
}

function handleKeyUp(event) {
    const key = event.key.toLowerCase();
    if (key in keyboard) {
        // only handle if already pressed
        if (keyboard[key] === true) {
            event.preventDefault();
            keyboard[key] = false;
            fire_control_event(null);

        }
    }
}

function bindControls() {
    HTMLcontrols.dpad.left.addEventListener('pointerdown', () => fire_dpad_event('left'));
    HTMLcontrols.dpad.up.addEventListener('pointerdown', () => fire_dpad_event('up'));
    HTMLcontrols.dpad.right.addEventListener('pointerdown', () => fire_dpad_event('right'));
    HTMLcontrols.dpad.down.addEventListener('pointerdown', () => fire_dpad_event('down'));
    
    HTMLcontrols.buttons.A.addEventListener('pointerdown', () => press_btn('A'));
    HTMLcontrols.buttons.B.addEventListener('pointerdown', () => press_btn('B'));
    HTMLcontrols.buttons.X.addEventListener('pointerdown', () => press_btn('X'));
    HTMLcontrols.buttons.Y.addEventListener('pointerdown', () => press_btn('Y'));
    
    
    HTMLcontrols.dpad.left.addEventListener('pointerup', () => release_dpad());
    HTMLcontrols.dpad.up.addEventListener('pointerup', () => release_dpad());
    HTMLcontrols.dpad.right.addEventListener('pointerup', () => release_dpad());
    HTMLcontrols.dpad.down.addEventListener('pointerup', () => release_dpad());
    
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