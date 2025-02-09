
export class Entity {

    constructor(name, options) {
        this.name = name;
        this.maxHP = options.maxHP ? options.maxHP : 10;
        this.currentHP = this.maxHP;
        this.inventory = options.inventorySize ? Array(options.inventorySize) : Array(3);
        console.log(`created inventory size of ${this.inventory.length} for ${this.name}`);
        this.equippedWeapon = null;
        this.equippedArmour = null;
        this.equippedWeaponIndex = -1;
        this.equippedArmourIndex = -1;

        if (options.startingInventory !== undefined) {

            for (let i=0; i<options.startingInventory.length; i++) {
                // console.log(`${this.name} was given ${options.startingInventory[i].name} at init`);
                this.addToInventory(options.startingInventory[i]);
            }

            // options.startingInventory.forEach((item) => {
            //     console.log(`${this.name} was given ${item.name} at init`);
            //     this.addToInventory(item);
            // })
        }
    }

    // equip an item by inventory index
    equipInventoryItem(index) {
        const item = this.inventory[index];
        if (item.isEquippable) {
            switch (item.itemType) {
                case "weapon":
                    this.equipWeapon(item, index);
                    break;
                case "armour":
                    this.equipArmour(item, index);
                    break;
                default:
                    console.log('unhandled item type');
            }
            return item;
        }
        return null;
    }
    // equip an ACTUAL weapon object (could be obsolete?)
    equipWeapon(weapon, index) {
        this.equippedWeapon = weapon;
        this.equippedWeaponIndex = index;
        return weapon;
    }
    equipArmour(armour, index) {
        this.equippedArmour = armour;
        this.equippedArmourIndex = index;
        return armour;        
    }
    
    unequipWeapon() {
        const oldIndex = this.equippedWeaponIndex;
        this.equippedWeapon = null;
        return oldIndex;
    }
    
    unequipArmour() {
        const oldIndex = this.equippedArmourIndex;
        this.equippedArmour = null;
        return oldIndex;
    }

    setHP(value) {
        if (value > this.maxHP) {
            console.log(`HP out of bounds for ${this.name}`);
        }
        this.currentHP = value;
    }

    addToInventory(item) {
        for (let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i] == undefined) {
                // console.log(`free inv slot at position ${i}`);
                this.inventory[i] = item;
                item.isHeldBy = this;
                console.log(`item ${item.name} is held by ${item.isHeldBy.name}`);
                return i;
            }
        }
        console.error(`no free space in ${this.name} inventory`);
        return -1; // no free slot?

    }

    getInventory() {
        let inventoryString = "";
        for (let i = 0; i < this.inventory.length; i++) {
            if (i === 0) {
                inventoryString += `${this.name} inventory: \'`;
            }
            if (this.inventory[i] !== undefined && this.inventory[i] !== null) {
                inventoryString += `${this.inventory[i].name}, `;
            }
        }
        inventoryString = inventoryString.slice(0, -2);
        inventoryString += "\'";
        return inventoryString;
    }

    getItemsInInventory() {
        let currentInventory = [];
        for (let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i] !== undefined && this.inventory[i] !== null) {
                currentInventory.push(this.inventory[i]);
            }
        }
        return currentInventory;
    }



}