export class Game {
    
    constructor(gameContainer) {
        this.gameContainer = gameContainer;
        this.textView = gameContainer.querySelector('.game-text');
        this.inventoryView = gameContainer.querySelector('.game-inventory');
        this.players = [];
    }

    printLine(text) {
        const newLine = document.createElement('div');
        newLine.textContent = text;
        this.textView.appendChild(newLine);
    }    

    showInventory() {
        console.log("show inventory");
        inventoryView.classList.add('visible');
        this.printLine('Inventory shown');
    }
    
    hideInventory() {
        inventoryView.classList.remove('visible');
        this.printLine('Inventory hidden');
    }

}