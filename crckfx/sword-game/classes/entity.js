
export class Entity {
    
    constructor(name, options) {
        this.name = name;
        this.maxHP = options.maxHP ? options.maxHP : 10 ;
        this.currentHP = this.maxHP;
        this.inventory = options.inventorySize ? Array(options.inventorySize) : Array(3);
        console.log(`created inventory size of ${this.inventory.length} for ${this.name}`);
        this.equippedWeapon = null;
        this.equippedArmour = null;

        if (options.startingInventory !== undefined) {
            options.startingInventory.forEach((item) => {
                console.log(`${this.name} was given ${item.name} at init`);
                this.addToInventory(item);
            })
        }
    }

    equipWeapon(weapon) {
        this.equippedWeapon = weapon;
    }
    equipArmour() {}

    setHP(value) {
        if (value > this.maxHP) {
            console.log(`HP out of bounds for ${this.name}`);
        }
        this.currentHP = value;
    }

    addToInventory(item) {
        for (let i=0; i<this.inventory.length; i++) {
            if (this.inventory[i] == undefined) {
                console.log(`free inv slot at position ${i}`);
                this.inventory[i] = item;
                return i; 
            }
        }
        console.error(`no free space in ${this.name} inventory`);
        return -1; // no free slot?

    }

    getInventory() {
        let inventoryString = "";
        for (let i=0; i<this.inventory.length; i++) {
            if (i===0) {
                inventoryString += `${this.name} inventory: \'`;
            }
            if (this.inventory[i] !== undefined && this.inventory[i] !== null) {
                // console.log(`free inv slot at position ${i}`);
                // this.inventory[i] = item;
                // return i; 
                inventoryString += `${this.inventory[i].name}, `;
            }
        }        
        inventoryString = inventoryString.slice(0, -2);
        inventoryString += "\'";
        return inventoryString;
    }

    getItemsInInventory() {
        let currentInventory = [];
        for (let i=0; i<this.inventory.length; i++) {
            if (this.inventory[i] !== undefined && this.inventory[i] !== null) {
                currentInventory.push(this.inventory[i]);
            }
        }
        return currentInventory;
    }

}