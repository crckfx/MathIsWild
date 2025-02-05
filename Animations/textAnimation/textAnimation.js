// ******************
// Get Element By ID
// ******************

// Text Input
const textInput = document.getElementById('textInput')
const textDisplay = document.getElementById('textDisplay')
const letterSpan = []

// Font Size
const fontSizeInput = document.getElementById('fontSizeInput')
const displayFontSize = document.getElementById('displayFontSize')

// Rotation
const rotationAmountInput = document.getElementById('rotationAmountInput')
const displayRotationAmount = document.getElementById('displayRotationAmount')

// Hover Colour
const colourPickerInput = document.getElementById('colourPickerInput')
const displayColorCode = document.getElementById('displayPickedColour')

// Skew
const skewInput = document.getElementById('skewInput')
const displaySkew = document.getElementById('displaySkew')

// Background Color
const bgColorInput = document.getElementById('bgColorInput');
const displayBgColor = document.getElementById('displayBgColor');
const noBgCheckbox = document.getElementById('noBgCheckbox');

// Opacity
const opacityInput = document.getElementById('opacityInput')
const displayOpacity = document.getElementById('displayOpacity')

// Border
const borderInput = document.getElementById('borderInput')
const displayBorder = document.getElementById('displayBorder')

// Spacing
const spacingInput = document.getElementById('spacingInput')
const displaySpacing = document.getElementById('displaySpacing')

// Scale
const scaleInput = document.getElementById('scaleInput');
const displayScale = document.getElementById('displayScale');

// Button
const letterSelector = document.getElementById('letterSelector');
const addStyleBtn = document.getElementById('addStyleBtn');

// ****************
// Event Listeners
// ****************

// Text Input
textInput.addEventListener('input', () => {
    const textResult = textInput.value
    textDisplay.innerHTML = ''
    letterSpan.length = 0
    for (let letter of textResult) {
        const span = document.createElement('span')
        span.textContent = letter
        span.classList.add('letter')
        textDisplay.appendChild(span)
        letterSpan.push(span)
    }
})

// Font Size
fontSizeInput.addEventListener('input', () => {
    displayFontSize.textContent = `${fontSizeInput.value}px`
    textDisplay.style.fontSize = `${fontSizeInput.value}px`
})

// Rotation
rotationAmountInput.addEventListener('input', () => {
    const rotationValue = rotationAmountInput.value
    displayRotationAmount.textContent = `${rotationValue}°`
    document.documentElement.style.setProperty('--rotation-angle', `${rotationValue}deg`)
})

// Hover Colour
colourPickerInput.addEventListener('input', () => {
    const hexColor = colourPickerInput.value
    displayColorCode.textContent = hexColor;
    document.documentElement.style.setProperty('--hover-color', hexColor)
})

// Skew
skewInput.addEventListener('input', () => {
    const skewValue = skewInput.value
    displaySkew.textContent = `${skewValue}°`
    document.documentElement.style.setProperty('--hover-skew', `${skewValue}deg`)
})

// Background Colour 
bgColorInput.addEventListener('input', () => {
    const bgColor = bgColorInput.value;
    displayBgColor.textContent = bgColor;
    if (!noBgCheckbox.checked) {
        document.documentElement.style.setProperty('--hover-bg', bgColor);
    }
});

// Toggle "No Background" option
noBgCheckbox.addEventListener('change', () => {
    if (noBgCheckbox.checked) {
        document.documentElement.style.setProperty('--hover-bg', 'transparent');
    } else {
        document.documentElement.style.setProperty('--hover-bg', bgColorInput.value);
    }
});

// Opacity
opacityInput.addEventListener('input', () => {
    const opacityValue = opacityInput.value
    displayOpacity.textContent = opacityValue
    document.documentElement.style.setProperty('--hover-opacity', opacityValue)
})

// Border
borderInput.addEventListener('input', () => {
    const borderValue = borderInput.value
    displayBorder.textContent = `${borderValue}px`
    document.documentElement.style.setProperty('--hover-border', `${borderValue}px solid black`)
})

// Letter Spacing
spacingInput.addEventListener('input', () => {
    const spacingValue = spacingInput.value
    displaySpacing.textContent = `${spacingValue}px`
    document.documentElement.style.setProperty('--hover-spacing', `${spacingValue}px`)
})

// Scale
scaleInput.addEventListener('input', () => {
    const scaleValue = scaleInput.value;
    displayScale.textContent = `${scaleValue}x`;
    document.documentElement.style.setProperty('--hover-scale', scaleValue);
});

// *************
// Set Defaults
// *************
textDisplay.style.fontSize = `${fontSizeInput.value}px`
document.documentElement.style.setProperty('--rotation-angle', `${rotationAmountInput.value}deg`)

// Function to populate the letter selector
function updateLetterSelector() {
    letterSelector.innerHTML = ''; // Clear previous options
    for (let i = 0; i < letterSpan.length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Letter ${i + 1}: "${letterSpan[i].textContent}"`;
        letterSelector.appendChild(option);
    }
}

// Update text and refresh selector
textInput.addEventListener('input', () => {
    textDisplay.innerHTML = '';
    letterSpan.length = 0;

    const textResult = textInput.value;

    for (let letter of textResult) {
        const span = document.createElement('span');
        span.textContent = letter;
        span.classList.add('letter');
        textDisplay.appendChild(span);
        letterSpan.push(span);
    }

    updateLetterSelector(); // Refresh the dropdown with new letters
});

// Apply styles to the selected letter
addStyleBtn.addEventListener('click', () => {
    const selectedIndex = letterSelector.value;
    const selectedLetter = letterSpan[selectedIndex];

    if (selectedLetter) {
        // Apply hover-specific CSS variables only to the selected letter
        selectedLetter.style.setProperty('--hover-scale', getComputedStyle(document.documentElement).getPropertyValue('--hover-scale') || '1');
        selectedLetter.style.setProperty('--rotation-angle', getComputedStyle(document.documentElement).getPropertyValue('--rotation-angle') || '0deg');
        selectedLetter.style.setProperty('--hover-skew', getComputedStyle(document.documentElement).getPropertyValue('--hover-skew') || '0deg');
        selectedLetter.style.setProperty('--hover-color', getComputedStyle(document.documentElement).getPropertyValue('--hover-color') || 'black');
        selectedLetter.style.setProperty('--hover-bg', getComputedStyle(document.documentElement).getPropertyValue('--hover-bg') || 'none');
        selectedLetter.style.setProperty('--hover-opacity', getComputedStyle(document.documentElement).getPropertyValue('--hover-opacity') || '1');
        selectedLetter.style.setProperty('--hover-border', getComputedStyle(document.documentElement).getPropertyValue('--hover-border') || 'none');
        selectedLetter.style.setProperty('--hover-spacing', getComputedStyle(document.documentElement).getPropertyValue('--hover-spacing') || '0px');
    }
});

