
// svg-container
// editableSVG
// "code-form"
const svgContainer = document.querySelector('.svg-container');
const editableSVG = document.querySelector('.editableSVG');
const codeForm = document.querySelector('.code-form');
// const mover = document.querySelector('.mover');
const svgCtrls = {
    VBW: document.querySelector('.vb-width'),
    VBH: document.querySelector('.vb-height'),
}

console.log(svgContainer);
console.log(editableSVG);
// console.log(mover);
console.log(codeForm);


codeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitCodeForm();
});

function submitCodeForm() {
    console.log('code form submitted');
    // const formattedShader = readShaderFromForm();   // format the form to make sure it works idk lol
    const formattedFormData = readFormData(codeForm);

    console.log(formattedFormData);
    editableSVG.innerHTML = formattedFormData;
}

function readFormData(form) {
    // get data from the form
    const formData = new FormData(form);

    // Extract the 'stuff' field value from formData
    const code = formData.get('stuff');
    // Replace newlines with actual newlines for console logging
    const formattedCode = code.trim().replace(/(?:\r\n|\r|\n)/g, '\n');
    // console.log(formattedCode);
    // reloadFragShader(formattedShader);
    return formattedCode;
}

svgCtrls.VBW.addEventListener('input', changeViewboxSize);
svgCtrls.VBH.addEventListener('input', changeViewboxSize);

function changeViewboxSize() {
    const newWidth = svgCtrls.VBW.value;
    const newHeight = svgCtrls.VBH.value;
    console.log(`width: ${newWidth}, height: ${newHeight}`);
    editableSVG.setAttribute('viewBox', `0 0 ${newWidth} ${newHeight}`);
}

function resizeResizeableForWindow(element) {
    const parent = element.parentElement;
    const pRect = parent.getBoundingClientRect();
    const neighbour = parent.querySelector('.neighbour');
    const rectBrother = element.getBoundingClientRect();
    const rectNeighbour = neighbour.getBoundingClientRect();

    const one = rectBrother.top - rectBrother.bottom;
    const pHeight = pRect.bottom - pRect.top;
    console.log(`pHeight is ${pHeight}`);
    // ahhh trying to resize to fit based on existing ratio here

}
// **********************************************************
// ---------------------------------------------------------
// maybe try strip out resizables below
// ---------------------------------------------------------
// **********************************************************


// ---------------------------------- 
// ok we are grabbing by id now so the names are a bit confusing

// but we will make a new generic function with all included
const minimum_size = 100;


function makeCustomResizableDiv(element) {
    // get the elements
    // const element = document.getElementById(id);
    const parent = element.parentElement;
    const resizers = element.querySelectorAll('.resizer');
    const neighbour = parent.querySelector('.neighbour');
    const separator = parent.querySelector('.separator');
    const NEIGHBOURS_MIN_HEIGHT = 100;
    let original_height = 0;
    let original_y = 0;
    let original_mouse_y = 0;
    let max_y = 0;

    for (let i = 0; i < resizers.length; i++) {
        const currentResizer = resizers[i];
        currentResizer.addEventListener('pointerdown', function (e) {
            e.preventDefault()

            original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
            original_y = element.getBoundingClientRect().top - parent.getBoundingClientRect().top;
            original_mouse_y = e.pageY;
            max_y = parent.getBoundingClientRect().bottom - parent.getBoundingClientRect().top - NEIGHBOURS_MIN_HEIGHT; // 
            window.addEventListener('pointermove', resize);
            window.addEventListener('pointerup', stopResize);
            window.addEventListener('pointercancel', stopResize);
        })

        function resize(e) {
            // vertical resize
            if (currentResizer.classList.contains('bottom')) {
                const height = original_height + (e.pageY - original_mouse_y);
                const bottom = checkEdgeMax(height, original_y, max_y);
                if (bottom !== null) {
                    element.style.height = bottom + 'px';
                    updateSeparator(separator, bottom);

                    
                }
            }
            if (neighbour)
                updateNeighbour(neighbour, element, parent);


        }

        function stopResize() {
            window.removeEventListener('pointermove', resize);
        }
    }

    if (neighbour) {
        updateNeighbour(neighbour, element, parent);
    }
    window.addEventListener('resize', () => resizeResizeableForWindow(element));
    window.addEventListener('DOMContentLoaded', () => changeViewboxSize());

}


function checkEdgeMax(length, origCoord, max) {
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
        neighbour.style.top = rect.bottom - rect.top + 'px';
        const height = parentRect.bottom - rect.bottom;
        neighbour.style.height = height + 'px';
    }

}

function updateSeparator(separator, y) {
    // console.log(`move ${separator} to ${y}`);
    separator.style.top = `${y-2}px`; 
}