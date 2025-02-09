import { Item } from './classes/item.js';
import { Entity } from './classes/entity.js';
import { Weapon } from './classes/weapon.js';
import { Armour } from './classes/armour.js';

export class Game {

    constructor(gameContainer) {
        this.gameContainer = gameContainer;
        this.textView = gameContainer.querySelector('.game-text');
        this.inventoryView = gameContainer.querySelector('.game-inventory');
        this.inventorySlots = [];
        this.inventorySlotsView = this.inventoryView.querySelector('.slots');
        this.inventoryGearSlots = {
            weapon: document.getElementById('gear-weapon').querySelector('.slot'),
            armour: document.getElementById('gear-armour').querySelector('.slot'),

        }
        this.entities = [];
        this.weapons = [];
        this.items = [];
        this.player = null;

        this.initWorld();

    }

    initWorld() {
        this.initPlayer(
            this.createEntity('Dang', {
                maxHP: 30,
                inventorySize: 6,
                startingInventory: [
                    this.createWeapon('Wooden Club', 2),
                    this.createWeapon('Axe', 3),
                    this.createItem('Apple'),
                    this.createArmour('Chain Mail', 5),
                ],
            })
        );

        this.inventoryGearSlots['armour'].addEventListener("contextmenu", (event) => {
            event.preventDefault();
            this.rightClickPlayerEquippedArmourSlot();
        });

        this.inventoryGearSlots['weapon'].addEventListener("contextmenu", (event) => {
            event.preventDefault();
            this.rightClickPlayerEquippedWeaponSlot();
        });


        // init some dummy weapons into the world
        this.createItem('Apple', {});

        // init some dummy weapons into the world
        this.createWeapon('Sword', 3);
        this.createWeapon('Dagger', 2);

        this.createArmour('Hat', 2);

        // init some dummy entities into the world
        this.createEntity('George', {
            inventorySize: 4,
            startingInventory: [this.createWeapon('Special Dagger', 2)],
        });
        this.createEntity('Harold', {
            startingInventory: [this.createWeapon('Special Dagger', 2)],
        });
        this.createEntity('Fred', {
            maxHP: 20,
        });

    }


    printLine(text) {
        const newLine = document.createElement('div');
        newLine.innerHTML = text;
        this.textView.appendChild(newLine);
    }

    showInventory() {
        this.inventoryView.classList.add('visible');
    }

    hideInventory() {
        this.inventoryView.classList.remove('visible');
    }

    createEntity(name, options) {
        const entity = new Entity(name, options);
        // let index = this.entities.push(entity) - 1;

        this.entities.push(entity);
        this.printLine(`Initialised new entity ${this.formatEntityName(entity)}.`);
        // this.printLine(`Initialised new entity '${this.entities[index].name}'`); // proof of concept
        return entity;
        // return this.entities[index];
    }

    // --- item creation --- 
    createItem(name, options) {
        const newItem = new Item(name, options);
        this.items.push(newItem);
        return newItem;
    }

    createWeapon(name, damage) {
        const newWeapon = new Weapon(name, damage);
        this.weapons.push(newWeapon);
        this.printLine(`Initialised new weapon '${this.formatItemName(newWeapon)}' with damage ${newWeapon.damage}.`);
        return newWeapon;
    }

    createArmour(name, strength) {
        const newArmour = new Armour(name, strength);
        this.printLine(`Initialised new armour '${this.formatItemName(newArmour)}' with strength ${newArmour.strength}`);
        return newArmour;
    }




    // --- player (UI layer) --- 
    initPlayer(player) {
        this.player = player;
        // this.printLine(this.player.getInventory());     // prove that the inventory has been inited
        // make the UI inventory the same as player's
        for (let i = 0; i < this.player.inventory.length; i++) {
            const slot = document.createElement('div');
            slot.classList.add('slot');
            this.inventorySlots.push(slot);
            this.inventorySlotsView.appendChild(slot);
        }

        this.drawPlayerInventory();
        this.printLine(`Now playing as ${this.formatEntityName(this.player)}.`);
        // this.printLine(`Player inventory length is ${this.player.inventory.length}`);
    }



    drawPlayerInventory() {
        // generate the slots based on player inventory max size (probably not optimal)
        for (let i = 0; i < this.player.inventory.length; i++) {
            const slot_DOM = this.inventorySlots[i];
            if (this.player.inventory[i] !== undefined && this.player.inventory[i] !== null) {
                slot_DOM.innerHTML = this.player.inventory[i].name;   // set the item name
                slot_DOM.classList.add('occupied');

                slot_DOM.addEventListener("contextmenu", (event) => {
                    event.preventDefault(); // Prevents the default right-click menu
                    this.rightClickPlayerInventorySlot(i);

                });
            } else {
                slot_DOM.innerHTML = "";
            }
        }

    }

    rightClickPlayerInventorySlot(index) {
        // console.log(`right click on le slot ${index}`);


        if (this.player.inventory[index] !== null) {
            const item = this.player.equipInventoryItem(index);

            if (item === null) return;  // exit if nothing was equipped
            // style all catch-all for
            for (let i = 0; i < this.player.inventory.length; i++) {
                if (this.player.inventory[i] && this.player.inventory[i].itemType === item.itemType) this.inventorySlots[i].classList.remove('equipped');
            }
            switch (item.itemType) {
                case "weapon":
                    this.printLine(`${this.formatEntityName(this.player)} has equipped weapon ${this.formatItemName(this.player.equippedWeapon)}.`);
                    this.inventoryGearSlots.weapon.innerHTML = this.player.equippedWeapon.name;
                    this.inventoryGearSlots.weapon.classList.add('equipped');
                    break;
                case "armour":
                    this.printLine(`${this.formatEntityName(this.player)} has equipped armour ${this.formatItemName(this.player.equippedArmour)}.`);
                    this.inventoryGearSlots.armour.innerHTML = this.player.equippedArmour.name;
                    this.inventoryGearSlots.armour.classList.add('equipped');
                    break;
                default:
                    this.printLine(`uhhh unhandled? ${this.formatEntityName(this.player)} has equipped ${this.formatItemName(item)}?`);
            }
            // this.printLine(`${this.formatEntityName(this.player)} has equipped ${item.itemType} ${this.formatItemName(item)}.`);


            this.inventorySlots[index].classList.add('equipped');   // style the player inventory item
        }


    }

    rightClickPlayerEquippedWeaponSlot() {
        if (this.player.equippedWeapon !== null) {
            console.log(`le click le weapon slot`);
            const oldItem = this.player.equippedWeapon;
            const oldIndex = this.player.unequipWeapon();
            this.inventoryGearSlots.weapon.classList.remove('equipped');
            this.inventoryGearSlots.weapon.innerHTML = "";
            this.inventorySlots[oldIndex].classList.remove('equipped');
            // look up old item in this.player.inventory
            this.printLine(`${this.formatEntityName(this.player)} has removed weapon ${this.formatItemName(oldItem)}.`);

        }
    }


    rightClickPlayerEquippedArmourSlot() {
        if (this.player.equippedArmour !== null) {
            console.log(`le click le armour slot`);
            const oldItem = this.player.equippedArmour;
            const oldIndex = this.player.unequipArmour();
            this.inventorySlots[oldIndex].classList.remove('equipped');
            this.inventoryGearSlots.armour.classList.remove('equipped');
            this.inventoryGearSlots.armour.innerHTML = "";
            this.printLine(`${this.formatEntityName(this.player)} has removed armour ${this.formatItemName(oldItem)}.`);

        }
    }


    formatEntityName(entity) {
        const formattedName = `<span class="entity">${entity.name}</span>`;
        return formattedName;
    }

    formatItemName(item) {
        const formattedName = `<span class="weapon">${item.name}</span>`;
        return formattedName;
    }


}

