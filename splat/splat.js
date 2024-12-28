let colourDiv = document.querySelector(".createColour")
let hexDecNum = document.querySelector(".hexDecNum")
let hexCode = ''
function gettingHexiDecimal() {
    const hexiCode = ['a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3', '4', '5', '6', '7', '8', '9']  
    let randomHexNumberOne = Math.floor(Math.random() * 15);
    let hexCodeOne = hexiCode[randomHexNumberOne];
    let randomHexNumberTwo = Math.floor(Math.random() * 15);
    let hexCodeTwo = hexiCode[randomHexNumberTwo];
    let randomHexNumberThree = Math.floor(Math.random() * 15);
    let hexCodeThree = hexiCode[randomHexNumberThree];
    let randomHexNumberFour = Math.floor(Math.random() * 15);
    let hexCodeFour = hexiCode[randomHexNumberFour];
    let randomHexNumberFive = Math.floor(Math.random() * 15);
    let hexCodeFive = hexiCode[randomHexNumberFive];
    let randomHexNumberSix = Math.floor(Math.random() * 15);
    let hexCodeSix = hexiCode[randomHexNumberSix]; 
    return "#" + hexCodeOne + hexCodeTwo + hexCodeThree + hexCodeFour + hexCodeFive + hexCodeSix;
}

const sect1 = document.querySelector('.sect1')
const sect2 = document.querySelector('.sect2')
const sect3 = document.querySelector('.sect3')
const sect4 = document.querySelector('.sect4')

// //Square One
let randomiseRowNumber1 = Math.floor(Math.random () * 6)
let randomiseColumnNumber1 = Math.floor(Math.random () * 11)
sect1.style.gridRowStart = randomiseRowNumber1
sect1.style.gridRowEnd = randomiseRowNumber1
sect1.style.gridColumnStart = randomiseColumnNumber1 
sect1.style.gridColumnEnd = randomiseColumnNumber1

// //Square Two
let randomiseRowNumber2 = Math.floor(Math.random () * 6)
let randomiseRowNumber2Plus = randomiseRowNumber2 + 1
let randomiseColumnNumber2 = Math.floor(Math.random () * 11)
let randomiseColumnNumber2Plus = randomiseColumnNumber2 + 1
sect2.style.gridRowStart = randomiseRowNumber2
sect2.style.gridRowEnd = randomiseRowNumber2Plus
sect2.style.gridColumnStart = randomiseColumnNumber2 
sect2.style.gridColumnEnd = randomiseColumnNumber2Plus

//Square Three
let randomiseRowNumber3 = Math.floor(Math.random () * 4)
let randomiseRowNumber3Plus = randomiseRowNumber3 + 2
let randomiseColumnNumber3 = Math.floor(Math.random () * 11)
let randomiseColumnNumber3Plus = randomiseColumnNumber3 + 2
sect3.style.gridRowStart = randomiseRowNumber3
sect3.style.gridRowEnd = randomiseRowNumber3Plus
sect3.style.gridColumnStart = randomiseColumnNumber3 
sect3.style.gridColumnEnd = randomiseColumnNumber3Plus

//Square Four
let randomiseRowNumber4 = Math.floor(Math.random () * 4)
let randomiseRowNumber4Plus = randomiseRowNumber4 + 2
let randomiseColumnNumber4 = Math.floor(Math.random () * 11)
let randomiseColumnNumber4Plus = randomiseColumnNumber4 + 2
sect4.style.gridRowStart = randomiseRowNumber4
sect4.style.gridRowEnd = randomiseRowNumber4Plus
sect4.style.gridColumnStart = randomiseColumnNumber4 
sect4.style.gridColumnEnd = randomiseColumnNumber4Plus

function randomColour() {
    hexCode = gettingHexiDecimal();
    colourDiv.style.backgroundColor = hexCode;
    hexDecNum.innerText = hexCode;
}

let colourSelector = document.querySelector(".H")
let hexOriginal = document.querySelector(".hexOriginal")
let hexOriginalLow = document.querySelector(".hexOriginalLow")
let hexOriginalHigh = document.querySelector(".hexOriginalHigh")
let hexOriginalComp = document.querySelector(".hexOriginalComp")
let hexOriginalCompLow = document.querySelector('.hexOriginalCompLow')
// let sectOne = document.querySelector('.sectOne')
// let sectTwo = document.querySelector('.sectTwo')
// let sectThree = document.querySelector('.sectThree')
// let grid = document.querySelector('.grid')

let r = 0;
let g = 0;
let b = 0;
let rgb = '';
let rComp = 0;
let gComp = 0;
let bComp = 0;
let rgbComp = '';

function updateColour() {
    let selectionColour = colourSelector.value;
    hexOriginal.style.backgroundColor = selectionColour;
    let lachie = hexOriginal.style.backgroundColor.match(/\d+/g);
    r = parseInt(lachie[0]);
    g = parseInt(lachie[1]);
    b = parseInt(lachie[2]);
    rgb = 'rgb(' + r + ', ' + g + ', ' + b + ')'

    hexOriginalHigh.style.backgroundColor = 'rgb(' + (r + 20) + ', ' + (g + 20) + ', ' + (b + 20) + ')'
    // sect1.style.backgroundColor = 'rgb(' + (r + 20) + ', ' + (g + 20) + ', ' + (b + 20) + ')'
    hexOriginalLow.style.backgroundColor = 'rgb(' + (r - 20) + ', ' + (g - 20) + ', ' + (b - 20) + ')'
    sect2.style.backgroundColor = 'rgb(' + (r - 20) + ', ' + (g - 20) + ', ' + (b - 20) + ')'
    hexOriginalComp.style.backgroundColor = 'rgb(' + (r) + ', ' + (g) + ', ' + (b) + ')'
    sect3.style.backgroundColor = 'rgb(' + (r) + ', ' + (g) + ', ' + (b) + ')'
    
    rComp = 255 - r;
    gComp = 255 - g;
    bComp = 255 - b;
    let compositeColour = hexOriginalComp.style.backgroundColor = 'rgb(' + rComp + ', ' + gComp + ', ' + bComp + ')';
    let compositeColourLow = hexOriginalCompLow.style.backgroundColor = 'rgb(' + (rComp - 20) + ', ' + (gComp - 20) + ', ' + (bComp - 20) + ')';
    
    if (r < 200 || g < 200 || b < 200) {
        hexOriginal.style.color = '#ffffff'
        hexOriginalLow.style.color = '#ffffff'
        hexOriginalHigh.style.color = '#ffffff'
    }
    else {
        hexOriginal.style.color = '#000'
        hexOriginalLow.style.color = '#000'
        hexOriginalHigh.style.color = '#000'
    }
    if (rComp > 200 || gComp > 200 || bComp > 200) {
        hexOriginalComp.style.color = '#000'
        hexOriginalCompLow.style.color = '#000'
    }
    else {
        hexOriginalComp.style.color = '#ffffff'
        hexOriginalCompLow.style.color = '#ffffff'
    }
    
    hexOriginal.innerText = rgb;
    hexOriginalComp.innerText = compositeColour
    hexOriginalCompLow.innerText = compositeColourLow
    sect1.style.backgroundColor = compositeColourLow
    sect4.style.backgroundColor = compositeColour
    hexOriginalLow.innerText = hexOriginalLow.style.backgroundColor
    hexOriginalHigh.innerText = hexOriginalHigh.style.backgroundColor
}
updateColour();
let hexOriginalResult = colourSelector.addEventListener('input', updateColour);

