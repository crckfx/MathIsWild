// Function to extract all CSS variables for a given theme
function getCSSVariablesForTheme(theme) {
    // Temporarily apply the theme class
    document.documentElement.className = theme;
    const variables = {};
    const styles = getComputedStyle(document.documentElement);
    // Iterate over all properties and extract custom properties (variables)
    for (let i = 0; i < styles.length; i++) {
        const property = styles[i];
        if (property.startsWith('--color-')) {
            // console.log(`adding ${property}`);
            variables[property] = styles.getPropertyValue(property).trim();
        }
    }
    // Reset the theme class to avoid side effects
    document.documentElement.className = '';
    return variables;
}

// function to find the children (colours) and set their backgrounds inline
function displayPalette(p, c) {
    const keys = Object.keys(c).reverse(); // Reverse the key order    
    for (const key of keys) {
        console.log(`key: ${key}, value: ${c[key]}`);

        const card = document.createElement('div');
        card.classList.add('card');

        const colourSpan = document.createElement('div');
        colourSpan.classList.add('colour');
        colourSpan.classList.add(`${key}`);
        colourSpan.style.backgroundColor = c[key];
        // colourSpan.innerHTML = `<code>${key}</code>`;

        const nameDisplay = document.createElement('div');
        nameDisplay.classList.add('display');
        nameDisplay.classList.add('name');
        nameDisplay.innerHTML = key;
        
        const hexDisplay = document.createElement('span');
        hexDisplay.classList.add('display');
        hexDisplay.classList.add('hex');
        hexDisplay.innerHTML = c[key];
        colourSpan.appendChild(hexDisplay);

        card.appendChild(colourSpan);
        card.appendChild(nameDisplay);
        p.appendChild(card);
    }
}

// get the "palette" containers
const paletteLight = document.querySelector('.palette.light');
const paletteDark = document.querySelector('.palette.dark');

// Get colors for both themes
const lightColors = getCSSVariablesForTheme('theme-light');
const darkColors = getCSSVariablesForTheme('theme-dark');

// fix the theme back to normal as soon as we're done
applySavedTheme(); // assumes this is declare/defined elsewhere

// Now you can apply these colors dynamically
displayPalette(paletteLight, lightColors);
displayPalette(paletteDark, darkColors);