function advance() {
    console.log("advance!");
}

const textView = document.querySelector('.game-text');
const inventoryView = document.querySelector('.game-inventory');

function showInventory() {
    console.log("show inventory");
    inventoryView.classList.add('visible');
    printLine('Inventory shown');
}

function hideInventory() {
    inventoryView.classList.remove('visible');
    printLine('Inventory hidden');
}

function printLine(text) {
    const newLine = document.createElement('div');
    newLine.textContent = text;
    textView.appendChild(newLine);
}