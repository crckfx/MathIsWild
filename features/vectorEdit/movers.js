

// ---------------------------------- 
// ok we are grabbing by id now so the names are a bit confusing

// but we will make a new generic function with all included

function makeCustomResizableDiv(element) {
    // get the elements
    // const element = document.getElementById(id);
    const parent = element.parentElement;
    const resizers = element.querySelectorAll('.resizer');
    const neighbour = parent.querySelector('.neighbour');
    if (neighbour) {
        console.log(neighbour);
    }

    const minimum_size = 20;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    let max_x = 0;
    let max_y = 0;


    for (let i = 0; i < resizers.length; i++) {
        const currentResizer = resizers[i];
        currentResizer.addEventListener('pointerdown', function (e) {
            e.preventDefault()

            original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
            original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
            original_x = element.getBoundingClientRect().left - parent.getBoundingClientRect().left;
            original_y = element.getBoundingClientRect().top - parent.getBoundingClientRect().top;
            original_mouse_x = e.pageX;
            original_mouse_y = e.pageY;
            max_x = parent.getBoundingClientRect().right - parent.getBoundingClientRect().left;
            max_y = parent.getBoundingClientRect().bottom - parent.getBoundingClientRect().top;
            window.addEventListener('pointermove', resize);
            window.addEventListener('pointerup', stopResize);
            window.addEventListener('pointercancel', stopResize);
        })

        function resize(e) {
            // horizontal resize
            if (currentResizer.classList.contains('right')) {
                const width = original_width + (e.pageX - original_mouse_x);
                const right = checkEdgeMax(width, original_x, max_x);
                if (right !== null) {
                    element.style.width = right + 'px';
                }
            } else if (currentResizer.classList.contains('left')) {
                const width = original_width - (e.pageX - original_mouse_x);
                const left = checkEdgeMin(width, e.pageX, original_x, original_mouse_x);
                if (left !== null) {
                    element.style.width = left.length + 'px';
                    element.style.left = left.offset + 'px';
                }
            }
            // vertical resize
            if (currentResizer.classList.contains('bottom')) {
                const height = original_height + (e.pageY - original_mouse_y);
                const bottom = checkEdgeMax(height, original_y, max_y);
                if (bottom !== null) {
                    element.style.height = bottom + 'px';
                }
            } else if (currentResizer.classList.contains('top')) {
                const height = original_height - (e.pageY - original_mouse_y);
                const top = checkEdgeMin(height, e.pageY, original_y, original_mouse_y);
                if (top !== null) {
                    element.style.height = top.length + 'px';
                    element.style.top = top.offset + 'px';
                }
            }
            // position
            if (currentResizer.classList.contains('pos')) {
                const y = checkPosition(original_height, e.pageY, original_y, original_mouse_y, max_y);
                element.style.top = y + 'px';
                const x = checkPosition(original_width, e.pageX, original_x, original_mouse_x, max_x);
                element.style.left = x + 'px';
            }

            if (neighbour) {
                updateNeighbour(neighbour, element, parent);
            }

        }

        function stopResize() {
            window.removeEventListener('pointermove', resize);
        }
    }

    if (neighbour) {
        updateNeighbour(neighbour, element, parent);
    }
}


function checkEdgeMax(length, origCoord, max) {
    const minimum_size = 20;
    // max edge
    if (length > minimum_size) {
        // check a right position
        const posNew = origCoord + length;
        if (posNew > max) {
            // exceeding, make an adjusted width
            const exc = posNew - max;
            const adj = length - exc;
            return adj;
        } else {
            // not exceeding, all clear
            return length;
        }
    }
    return null;
}

function checkEdgeMin(length, pageCoord, origCoord, origMouseCoord) {
    const minimum_size = 20;
    // min edge
    if (length > minimum_size) {
        const posNew = origCoord + (pageCoord - origMouseCoord);
        if (posNew < 0) {
            // exceeding
            const adj = length + posNew;
            return {
                offset: 0,
                length: adj
            }
        } else {
            // all clear
            return {
                offset: posNew,
                length: length
            }
        }
    }
    return null;
}

function checkPosition(length, pageCoord, origCoord, origMouseCoord, max) {
    const posNew = origCoord + (pageCoord - origMouseCoord);
    if (posNew < 0) {
        return 0;
    } else if (posNew + length > max) {
        return max - length;
    } else {

        return posNew;
    }
}

function updateNeighbour(neighbour, brother, parent) {
    const rect = brother.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    if (neighbour.classList.contains('bottom')) {
        //c
        // console.log('vertical neighbour '+ rect.bottom);
        neighbour.style.top = rect.bottom - rect.top + 'px';
        const height = parentRect.bottom - rect.bottom;
        neighbour.style.height = height + 'px';

    }
    if (neighbour.classList.contains('right')) {
        // console.log('horizontal neighbour');
        neighbour.style.left = rect.right - rect.left + 'px';
        const width = parentRect.right - rect.right;
        neighbour.style.width = width + 'px';
    }
}
