const bigCirc = document.querySelector('.rt-ui.cycle');
const smallCirc = bigCirc.querySelector('.handle');

smallCirc.addEventListener('pointerdown', (event) => {
    clickOnSmallCirc(event);
})

const test_wave_guy = document.querySelector('.rt-ui.test');
const waveTester2 = document.getElementById("wavetester2");

waveTester2.addEventListener('input', () => {
    updatePositionsFromAngle(waveTester2.value, bigCirc.getBoundingClientRect().width/2);
})

// *******************************************************************************
// ******* small circle *******
// *******************************************************************************
function clickOnSmallCirc(event) {
    smallCirc.classList.add('touch');

    // Bind pointermove and pointerup to the document for drag-and-drop behavior
    document.addEventListener('pointermove', onHandleMove);
    document.addEventListener('pointerup', onHandleRelease);

    // Prevent default dragging behavior
    event.preventDefault();
}

function onHandleMove(event) {
    const rect = bigCirc.getBoundingClientRect();
    // assuming it's a circle
    const radius = rect.width / 2;
    // Pointer position relative to the parent
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;
    const dx = pointerX - radius;
    const dy = pointerY - radius;

    updateBothPositions(dx, dy, radius);
}

function onHandleRelease() {
    smallCirc.classList.remove('touch');
    // Remove the move and release listeners
    document.removeEventListener('pointermove', onHandleMove);
    document.removeEventListener('pointerup', onHandleRelease);
    console.log('Handle released');
}

// *******************************************************************************

// factor it up
function updateBothPositions(dx, dy, radius) {
    console.log(radius);
    // Calculate angle
    const angleDegrees = (Math.atan2(dy, dx) * (180 / Math.PI) + 90 + 360) % 360;
    const angleRadians = angleDegrees * (Math.PI / 180);
    // New position for the handle relative to the parent
    const handleX = radius + (radius * Math.cos(angleRadians - Math.PI / 2));
    const handleY = radius + (radius * Math.sin(angleRadians - Math.PI / 2));    
    // Update the handle's position
    smallCirc.style.left = `${handleX}px`;
    smallCirc.style.top = `${handleY}px`;    

    test_wave_guy.innerHTML = angleDegrees;
    waveTester2.value = angleDegrees;
}

function updatePositionsFromAngle(angleDegrees, radius) {
    //
    const angleRadians = angleDegrees * (Math.PI / 180);
    // New position for the handle relative to the parent
    const handleX = radius + (radius * Math.cos(angleRadians - Math.PI / 2));
    const handleY = radius + (radius * Math.sin(angleRadians - Math.PI / 2));    
    // Update the handle's position
    smallCirc.style.left = `${handleX}px`;
    smallCirc.style.top = `${handleY}px`;    

    test_wave_guy.innerHTML = angleDegrees;
    waveTester2.value = angleDegrees;
}

// init
// place the smallCirc at middle top of circle
updateBothPositions(0, -1, bigCirc.getBoundingClientRect().width/2); 

