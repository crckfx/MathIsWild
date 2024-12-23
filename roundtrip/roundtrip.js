const bigCirc = document.querySelector('.rt-ui.cycle');
const smallCirc = bigCirc.querySelector('.handle');
// bigCirc.addEventListener('click', (event) => {
//     touchOnBigCircle(event);
// });
smallCirc.addEventListener('pointerdown', (event) => {
    clickOnSmallCirc(event);
})




function touchOnBigCircle(event) {
    const rect = bigCirc.getBoundingClientRect();

    // Center of the parent circle
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // Click position relative to the parent
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const dx = clickX - cx;
    const dy = clickY - cy;

    // Calculate angle
    const angleDegrees = (Math.atan2(dy, dx) * (180 / Math.PI) + 90 + 360) % 360;
    const angleRadians = angleDegrees * (Math.PI / 180);

    // Radius for positioning the handle
    const radius = rect.width / 2;

    // New position for the handle relative to the parent
    const handleX = cx + radius * Math.cos(angleRadians - Math.PI / 2);
    const handleY = cy + radius * Math.sin(angleRadians - Math.PI / 2);

    // Update the handle's position
    smallCirc.style.left = `${handleX}px`;
    smallCirc.style.top = `${handleY}px`;

    // console.log(`Angle: ${angleDegrees.toFixed(2)} degrees`);    
}


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

    // Center of the parent circle
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // Pointer position relative to the parent
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;

    const dx = pointerX - cx;
    const dy = pointerY - cy;

    // Calculate angle
    const angleDegrees = (Math.atan2(dy, dx) * (180 / Math.PI) + 90 + 360) % 360;
    const angleRadians = angleDegrees * (Math.PI / 180);

    // Radius for positioning the handle
    const radius = rect.width / 2;

    // New position for the handle relative to the parent
    const handleX = cx + radius * Math.cos(angleRadians - Math.PI / 2);
    const handleY = cy + radius * Math.sin(angleRadians - Math.PI / 2);

    // Update the handle's position
    smallCirc.style.left = `${handleX}px`;
    smallCirc.style.top = `${handleY}px`;

    // console.log(`Dragging - Angle: ${angleDegrees.toFixed(2)} degrees`);
}

function onHandleRelease() {
    smallCirc.classList.remove('touch');

    // Remove the move and release listeners
    document.removeEventListener('pointermove', onHandleMove);
    document.removeEventListener('pointerup', onHandleRelease);

    console.log('Handle released');
}