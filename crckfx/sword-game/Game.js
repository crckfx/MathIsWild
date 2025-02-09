import { Item } from './classes/item.js';
import { Entity } from './classes/entity.js';
import { Weapon } from './classes/weapon.js';

export class Game {

    constructor(gameContainer) {
        this.gameContainer = gameContainer;
        this.textView = gameContainer.querySelector('.game-text');
        this.inventoryView = gameContainer.querySelector('.game-inventory');
        this.inventorySlots = [];
        this.inventorySlotsView = this.inventoryView.querySelector('.slots');
        this.inventoryGearSlots = {
            weapon: document.getElementById('gear-weapon'),
            armour: document.getElementById('gear-armour'),

        }
        this.entities = [];
        this.weapons = [];
        this.items = [];
        this.player = null;
        
        
        // init some dummy weapons into the world
        this.initItem('Apple', {});

        // init some dummy weapons into the world
        this.initWeapon('Sword', 3);
        this.initWeapon('Dagger', 2);

        // init some dummy entities into the world
        this.initEntity('George', { 
            inventorySize: 4, 
            startingInventory: [this.initWeapon('Special Dagger', 2)],
        });
        this.initEntity('Harold', {
            startingInventory: [this.initWeapon('Special Dagger', 2)],
        });
        this.initEntity('Fred', {
            maxHP: 20,
        });

        


        this.initPlayer(
            this.initEntity('Dang', {
                maxHP: 30,
                inventorySize: 6,
                startingInventory: [
                    this.initWeapon('Wooden Club', 2),
                    this.initWeapon('Axe', 3),
                    this.initItem('Apple', {}),
                ],
            })            
        );


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

    initEntity(name, options) {
        const entity = new Entity(name, options);
        // let index = this.entities.push(entity) - 1;
        
        this.entities.push(new Entity(name, options));
        this.printLine(`Initialised new entity '${name}'`);
        // this.printLine(`Initialised new entity '${this.entities[index].name}'`); // proof of concept
        return entity;
        // return this.entities[index];
    }

    initWeapon(name, damage) {
        const newWeapon = new Weapon(name, damage);
        this.weapons.push(newWeapon);
        this.printLine(`Initialised new weapon '${this.formatItemName(newWeapon)}' with damage ${newWeapon.damage}`);
        return newWeapon;
    }
    
    initItem(name, options) {
        const newItem = new Item(name, options);
        this.weapons.push(newItem);
        return newItem;
    }


    initPlayer(player) {

        this.player = player;

        this.printLine(this.player.getInventory());     // prove that the inventory has been inited
        
        // make the UI inventory the same as player's
        for (let i=0; i<this.player.inventory.length; i++) {
            const slot = document.createElement('div');
            slot.classList.add('slot');
            this.inventorySlots.push(slot);
            this.inventorySlotsView.appendChild(slot);
        }


        this.drawPlayerInventory();
        
        this.printLine(`Now playing as ${this.formatEntityName(this.player)}, inventory length is "${this.player.inventory.length}"`);
    }

    

    drawPlayerInventory() {
        // obsolete for now?
        const currentInventory = this.player.getItemsInInventory();
        // console.log(currentInventory);


        // set all the 
        for (let i=0; i<this.player.inventory.length; i++) {
            const slot_DOM = this.inventorySlots[i];
            if (this.player.inventory[i] !== undefined && this.player.inventory[i] !== null) {
                slot_DOM.innerHTML = this.player.inventory[i].name;   // set the item name
                slot_DOM.classList.add('occupied');

                slot_DOM.addEventListener("contextmenu", (event) => {
                    event.preventDefault(); // Prevents the default right-click menu
                    console.log(`right click on le slot ${i}`);
    
                    if (this.player.equipInventoryItem(i)) {
                        this.drawPlayerInventory();
                    };
    
                });                
            } else {
                slot_DOM.innerHTML = "";
            }
        }

        if (this.player.equippedWeapon !== null) {
            this.inventoryGearSlots.weapon.querySelector('.slot').innerHTML = this.player.equippedWeapon.name;
            this.printLine(`${this.formatEntityName(this.player)} equipped ${this.formatItemName(this.player.equippedWeapon)}`)
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

