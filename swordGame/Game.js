import { Item } from './classes/item.js';
import { Entity } from './classes/entity.js';
import { Weapon } from './classes/weapon.js';
import { Armour } from './classes/armour.js';

export class Game {
    constructor(gameContainer) {
        this.gameContainer = gameContainer;

        this.entities = [];
        this.weapons = [];
        this.items = [];
        this.player = null;

        this.UI = this.init_UI();
        this.init_World();
    }

    // --- BIND UI ---
    init_UI() {
        const gameControls = document.querySelector('.game-controls');
        const playerStatsView = document.getElementById('playerStats');
        const inventoryView = this.gameContainer.querySelector('.game-inventory');


        // ---------------------------------------------
        // --- create a UI to hand back to game ---
        const UI = {

            inventoryView: this.gameContainer.querySelector('.game-inventory'),
            textView: this.gameContainer.querySelector('.game-text'),

            btn_showInventory: document.getElementById('show-inventory'),
            btn_hideInventory: document.getElementById('hide-inventory'),
            playerStats: {
                view: playerStatsView,
                hp: playerStatsView.querySelector('.hp'),
                name: playerStatsView.querySelector('.name'),
            },
            playerInv: {
                view: inventoryView.querySelector('.slots'),
                slots: [],
            },

            playerGear: {
                armour: document.getElementById('gear-armour').querySelector('.slot'),
                weapon: document.getElementById('gear-weapon').querySelector('.slot'),
            },
        };
  
        // ---------------------------------------------
        // --- bind actions before returning ---
        //
        // inventory show/hide
        UI.btn_showInventory.onclick = () => this.showInventory();
        UI.btn_hideInventory.onclick = () => this.hideInventory();
        // gear slot right clicks
        UI.playerGear.armour.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            this.rightClickPlayerEquippedArmourSlot();
        });
        
        UI.playerGear.weapon.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            this.rightClickPlayerEquippedWeaponSlot();
        });  
        
        // todo: use a for loop here, eg.:
        // console.log('-*-*-*-*-*-*-*-*-*-*-*-*');
        // for (const key in UI.playerGear) {
        //     console.log(UI.playerGear[key]);
        // }
        // console.log('-*-*-*-*-*-*-*-*-*-*-*-*');

        // finally, return the UI object
        return UI;
        // todo: break me (UI) off into a class, an instance of which would look very similar to the object we are returning here
        // ---------------------------------------------
    }

    // --- INIT WORLD ---
    init_World() {
        this.initPlayer(
            this.createEntity('Dang', {
                maxHP: 44,
                inventorySize: 7,
                startingInventory: [
                    this.createWeapon('Wooden Club', 2),
                    this.createWeapon('Axe', 3),
                    this.createItem('Apple'),
                    this.createArmour('Chain Mail', 5),
                ],
            })
        );




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


        this.updatePlayerUI();
    }


    printLine(input) {
        const newLine = document.createElement('div');
        newLine.innerHTML = input;
        this.UI.textView.appendChild(newLine);
    }

    showInventory() {
        this.UI.inventoryView.classList.add('visible');
        
    }

    hideInventory() {
        this.UI.inventoryView.classList.remove('visible');
    }

    // ---------------------------------------------
    // --- creating objects ---
    // these 'create' functions return their entity to instantiate 'up' to the Game
    //
    // entity creation
    createEntity(name, options) {
        const entity = new Entity(name, options);
        this.entities.push(entity);
        this.printLine(`Initialised new entity ${this.formatEntityName(entity)}.`);
        // this.printLine(`Initialised new entity '${this.entities[index].name}'`); // proof of concept
        return entity;
        // return this.entities[index];
    }

    // item creation
    createItem(name, options) {
        const newItem = new Item(name, options);
        this.items.push(newItem);
        return newItem;
    }

    createWeapon(name, damage) {
        const newWeapon = new Weapon(name, damage);
        this.weapons.push(newWeapon);
        this.printLine(`Initialised new weapon ${this.formatItemName(newWeapon)} with damage ${newWeapon.damage}.`);
        return newWeapon;
    }

    createArmour(name, strength) {
        const newArmour = new Armour(name, strength);
        this.printLine(`Initialised new armour ${this.formatItemName(newArmour)} with strength ${newArmour.strength}`);
        return newArmour;
    }
    // ---------------------------------------------



    // --- player (UI layer) --- 
    initPlayer(entity) {
        this.player = entity;
        // this.printLine(this.player.getInventory());     // prove that the inventory has been inited
        // make the UI inventory the same as player's
        for (let i = 0; i < this.player.inventory.length; i++) {
            const slot = document.createElement('div');
            slot.classList.add('slot');
            this.UI.playerInv.slots.push(slot);
            this.UI.playerInv.view.appendChild(slot);
        }
        this.printLine(`Now playing as ${this.formatEntityName(this.player)}.`);
        this.drawPlayerInventory();
        // this.printLine(`Player inventory length is ${this.player.inventory.length}`);
    }

    drawPlayerInventory() {
        const slots = this.UI.playerInv.slots;
        // generate the slots based on player inventory max size (probably not optimal)
        for (let i = 0; i < slots.length; i++) {
            const slot_DOM = slots[i];
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

            if (item.isEquippable) {
                // if ()

                for (let i = 0; i < this.player.inventory.length; i++) {
                    if (this.player.inventory[i] && this.player.inventory[i].itemType === item.itemType) this.UI.playerInv.slots[i].classList.remove('equipped');
                }
                switch (item.itemType) {
                    case "weapon":
                        this.printLine(`${this.formatEntityName(this.player)} has equipped ${this.formatStringWithClass("weapon", "weaponDescription")} ${this.formatItemName(this.player.equippedWeapon)}.`);
                        this.UI.playerGear.weapon.innerHTML = this.player.equippedWeapon.name;
                        this.UI.playerGear.weapon.classList.add('equipped');
                        break;
                    case "armour":
                        this.printLine(`${this.formatEntityName(this.player)} has equipped ${this.formatStringWithClass("armour", "armourDescription")} ${this.formatItemName(this.player.equippedArmour)}.`);
                        this.UI.playerGear.armour.innerHTML = this.player.equippedArmour.name;
                        this.UI.playerGear.armour.classList.add('equipped');
                        break;
                    default:
                        this.printLine(`uhhh unhandled? ${this.formatEntityName(this.player)} has equipped ${this.formatItemName(item)}?`);
                }
                // this.printLine(`${this.formatEntityName(this.player)} has equipped ${item.itemType} ${this.formatItemName(item)}.`);


                this.UI.playerInv.slots[index].classList.add('equipped');   // style the player inventory item
            } else if (item.isConsumable) {
                this.printLine(`${this.player.name} tries to eat the ${item.name}.`);
            }
        }

    }

    rightClickPlayerEquippedWeaponSlot() {
        if (this.player.equippedWeapon !== null) {
            // console.log(`le click le weapon slot`);

            const oldItem = this.player.equippedWeapon;
            const oldIndex = this.player.unequipWeapon(); // store the returned old
            this.UI.playerGear.weapon.classList.remove('equipped');
            this.UI.playerGear.weapon.innerHTML = "";
            this.UI.playerInv.slots[oldIndex].classList.remove('equipped');
            this.printLine(`${this.formatEntityName(this.player)} has removed weapon ${this.formatItemName(oldItem)}.`);

        }
    }


    rightClickPlayerEquippedArmourSlot() {
        if (this.player.equippedArmour !== null) {
            console.log(`le click le armour slot`);
            const oldItem = this.player.equippedArmour;
            const oldIndex = this.player.unequipArmour();
            this.UI.playerInv.slots[oldIndex].classList.remove('equipped');
            this.UI.playerGear.armour.classList.remove('equipped');
            this.UI.playerGear.armour.innerHTML = "";
            this.printLine(`${this.formatEntityName(this.player)} has removed armour ${this.formatItemName(oldItem)}.`);

        }
    }

    rightClickPlayerGearSlot(key) {
        if (this.player.equippedArmour !== null) {
            // good?
            console.log(`le click le  slot`);

            // not
            const oldItem = this.player.equippedArmour;
            const oldIndex = this.player.unequipArmour();
            this.UI.playerInv.slots[oldIndex].classList.remove('equipped');
            this.UI.playerGear.armour.classList.remove('equipped');
            this.UI.playerGear.armour.innerHTML = "";
            this.printLine(`${this.formatEntityName(this.player)} has removed armour ${this.formatItemName(oldItem)}.`);

        }        
    }

    updatePlayerUI() {
        const health = this.player.currentHP;
        // this.playerStatsView.querySelector('.hp').innerHTML = `${health} / ${this.player.maxHP}`;
        this.UI.playerStats.hp.innerHTML = `${health} / ${this.player.maxHP}`;
    }


    // --------------------------------------
    // --- UI Coloured String Formatting ---
    formatEntityName(entity) {
        const formattedName = `<span class="entity">${entity.name}</span>`;
        return formattedName;
    }

    formatItemName(item) {
        const formattedName = `<span class="${item.itemType}">${item.name}</span>`;
        return formattedName;
    }

    formatStringWithClass(string, className) {
        const formattedString = `<span class="${className}">${string}</span>`;
        return formattedString;
    }


}

