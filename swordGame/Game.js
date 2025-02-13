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

            currentMenu: null,

            inventoryView: this.gameContainer.querySelector('.game-inventory'),
            textView: this.gameContainer.querySelector('.game-text'),
            menuContainer: document.getElementById('menu-container'),
            targetMenuView: document.getElementById('target-menu'),
            hamMenuView: document.getElementById('ham-menu'),


            btn_ham: document.getElementById('ham-button'),

            btn_showInventory: document.getElementById('show-inventory'),
            btn_hideInventory: document.getElementById('hide-inventory'),
            btn_setTarget: document.getElementById('set-target'),
            btn_playerAttack: document.getElementById('player-attack'),

            playerStats: {
                view: playerStatsView,
                hp: playerStatsView.querySelector('.hp'),
                name: playerStatsView.querySelector('.name'),
                currentWeapon: playerStatsView.querySelector('.currentWeapon'),
                currentArmour: playerStatsView.querySelector('.currentArmour'),
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
        UI.btn_ham.onclick = () => this.handleMenuSwitch(UI.hamMenuView, UI.btn_ham);  // inventory show
        UI.btn_setTarget.onclick = () => this.handleMenuSwitch(UI.targetMenuView, UI.btn_setTarget);  // inventory show
        //  = () => this.toggleTargetMenu();   // set target menu show/hide
        
        UI.btn_showInventory.onclick = () => this.showInventory();  // inventory show
        UI.btn_hideInventory.onclick = () => this.hideInventory();  // inventory hide
        UI.btn_playerAttack.onclick = () => this.player_attack();    // player attack
        // UI.btn_playerAttack.onclick = () => this.entityAttack(this.player, this.getTargetList(this.player)[0]);

        // gear slot right clicks
        UI.playerGear.armour.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            this.rightClickPlayerEquippedArmourSlot();
        });
        UI.playerGear.weapon.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            this.rightClickPlayerEquippedWeaponSlot();
        });

        // // todo: use a for loop here, eg.:
        // console.log('-*-*-*-*-*-*-*-*-*-*-*-*');
        // for (const key in UI.playerGear) {
        //     console.log(UI.playerGear[key]);
        //     console.log(key);
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
                    this.createItem('Apple', {
                        isConsumable: true,
                    }),
                    this.createArmour('Chain Mail', 5),
                ],
            })
        );




        // init some dummy weapons into the world
        this.createItem('Apple', {});

        // init some dummy weapons into the world
        this.createWeapon('Sword', 5);
        this.createWeapon('Dagger', 4);

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
        newLine.scrollIntoView();
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

    // function to "use" inventory slot
    rightClickPlayerInventorySlot(index) {
        const item = this.player.inventory[index];
        if (item !== null) {
            // style all catch-all for
            
            if (item.isEquippable) {
                const result = this.player.equipInventoryItem(index);
                if (result === null) return;  // exit if nothing was equipped
                // if ()

                for (let i = 0; i < this.player.inventory.length; i++) {
                    if (this.player.inventory[i] && this.player.inventory[i].itemType === item.itemType) this.UI.playerInv.slots[i].classList.remove('equipped');
                }
                switch (item.itemType) {
                    case "weapon":
                        this.printLine(`${this.formatEntityName(this.player)} has equipped ${this.formatStringWithClass("weapon", "weaponDescription")} ${this.formatItemName(this.player.equippedWeapon)}.`);
                        this.UI.playerGear.weapon.innerHTML = this.player.equippedWeapon.name;
                        this.UI.playerGear.weapon.classList.add('equipped');
                        this.updatePlayerUI();
                        break;
                    case "armour":
                        this.printLine(`${this.formatEntityName(this.player)} has equipped ${this.formatStringWithClass("armour", "armourDescription")} ${this.formatItemName(this.player.equippedArmour)}.`);
                        this.UI.playerGear.armour.innerHTML = this.player.equippedArmour.name;
                        this.UI.playerGear.armour.classList.add('equipped');
                        this.updatePlayerUI();
                        break;
                    default:
                        this.printLine(`uhhh unhandled? ${this.formatEntityName(this.player)} has equipped ${this.formatItemName(item)}?`);
                }
                // this.printLine(`${this.formatEntityName(this.player)} has equipped ${item.itemType} ${this.formatItemName(item)}.`);


                this.UI.playerInv.slots[index].classList.add('equipped');   // style the player inventory item
            } else if (item.isConsumable) {
                this.printLine(`${this.formatEntityName(this.player)} tries to eat the ${this.formatItemName(item)}, but the feature is not yet implemented.`);
            }
        }

    }

    // 
    rightClickPlayerEquippedWeaponSlot() {
        if (this.player.equippedWeapon !== null) {
            const oldItem = this.player.equippedWeapon;     // store the old item
            const oldIndex = this.player.unequipWeapon(); // store the *returned* old weapon index
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
        // const health = this.player.currentHP;
        // this.playerStatsView.querySelector('.hp').innerHTML = `${health} / ${this.player.maxHP}`;
        this.UI.playerStats.hp.innerHTML = `${this.player.currentHP} / ${this.player.maxHP}`;
        this.UI.playerStats.name.innerHTML = `${this.player.name}`;
        this.UI.playerStats.currentArmour.innerHTML = this.player.equippedArmour !== null ? this.player.equippedArmour.name : "none";
        this.UI.playerStats.currentWeapon.innerHTML = this.player.equippedWeapon !== null ? this.player.equippedWeapon.name : 'none';
        this.drawTargetMenu();
    }


    // --------------------------------------
    // --- UI Coloured String Formatting ---
    formatEntityName(entity) {
        let formattedName;
        if (entity === this.player) {
            formattedName = `<span class="player">${entity.name}</span>`;
        } else {
            formattedName = `<span class="entity">${entity.name}</span>`;
        }
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


    getTargetList(entity) {
        const list = [];
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i] !== entity && this.entities[i].isAlive === true) {
                list.push(this.entities[i]);
            }
        }    
        return list;
    }

    drawTargetMenu() {
        const list = this.getTargetList(this.player);
        console.log('---- list ----');
        console.log(list);
        console.log('---- /list ----');
        this.UI.targetMenuView.innerHTML = "<h2>Target Menu</h2>";
        for (let i = 0; i < list.length; i++) {
            const entity = list[i];
            const option = document.createElement('button');
            console.log(`drawing target menu for ${entity.name}`);
            console.log(entity);
            option.onclick = () => {
                this.setPlayerTarget(entity);
                this.closeMenu(this.UI.currentMenu);
            };
            // option.classList.add('')
            option.innerHTML = entity.name;
            // option
            this.UI.targetMenuView.appendChild(option);
        }
    }
    
    styleSomeMenu(menu, anchor) {
        // Get the button and container positions
        const containerRect = this.UI.textView.getBoundingClientRect();
        const btnRect = anchor.getBoundingClientRect();
    
        // Calculate the available space below and above the button
        const spaceBelow = containerRect.bottom - btnRect.bottom; // Space from button bottom to container bottom
        const spaceAbove = btnRect.top - containerRect.top; // Space from button top to container top
    
        // Define the position for the menu
        let left = btnRect.left - containerRect.left;
    
        // Decide whether to show the menu above or below the button
        if (spaceBelow >= spaceAbove) {
            // Position the menu below the button (top of menu aligns with bottom of button)
            menu.style.top = `${btnRect.bottom - containerRect.top}px`;
            menu.style.bottom = ""; // Clear any previous bottom setting
        } else {
            // Position the menu above the button (bottom of menu aligns with top of button)
            // menu.style.bottom = `${containerRect.bottom - btnRect.top}px`;
            menu.style.bottom = '0px';
            menu.style.top = ""; // Clear any previous top setting
        }
    
        // Apply the horizontal position (left)
        menu.style.left = `${left}px`;
    
        // Ensure the menu does not overflow the right side of the container
        const menuRect = menu.getBoundingClientRect(); // Get the menu's actual size after positioning
        const overflowRight = (menuRect.left + menuRect.width) - containerRect.right;
    
        if (overflowRight > 0) {
            // Shift the menu to the left to prevent overflow
            left -= overflowRight;
            menu.style.left = `${left}px`;
        }
    }
    

    openMenu(menu, button) {
        this.styleSomeMenu(this.UI.menuContainer, button);
        this.UI.currentMenu = menu;
        menu.classList.add('visible');
        this.UI.menuContainer.classList.add('visible');
    }

    closeMenu(menu) {
        this.UI.currentMenu = null;
        menu.classList.remove('visible');
    }

    handleMenuSwitch(menu, button) {
        // handle 'toggle open' the targeted menu
        if (this.UI.currentMenu === null) {
            this.openMenu(menu, button);
            return;
        }

        if (this.UI.currentMenu === menu) {
            // handle 'toggle closed' the (currently open) targeted menu
            this.closeMenu(menu);
            this.UI.menuContainer.classList.remove('visible');
            return;
        } else {
            this.closeMenu(this.UI.currentMenu);
            this.openMenu(menu, button);
            return;
        }
            
        
        
    }

    
    

    setPlayerTarget(target) {
        this.player.setTarget(target);
        if (this.player.currentTarget !== null) {
            this.printLine(`${this.formatEntityName(this.player)} is targeting ${this.formatStringWithClass(this.player.currentTarget.name, 'hostile')}.`);
            this.UI.btn_playerAttack.innerHTML = `attack ${target.name}`;
            this.UI.targetMenuView.classList.remove('visible');
        } else {
            this.UI.btn_playerAttack.innerHTML = `attack`;
        }
    }

    player_attack() {
        this.entityAttack(this.player);
    }

    entityAttack(attacker, target = null) {
        // handle targeting if target is provided
        if (target !== null) {
            console.log(`bonus target named ${target.name}`);
            attacker.setTarget(target);
        }

        // get a damage reading from the attacker
        const attackResult = attacker.attack();
        // use the result 
        if (attackResult.success) {
            // console.log(`${attacker.name} attacked ${attackResult.target.name} with damage ${attackResult.damage}`);
            const killedTarget = attackResult.target.takeDamage(attackResult.damage);
            this.printLine(`${this.formatEntityName(attacker)} attacks ${this.formatEntityName(attackResult.target)} for ${attackResult.damage} damage. (${attackResult.target.currentHP} / ${attackResult.target.maxHP})`);
            // check if the target dies
            if (killedTarget) {
                this.printLine(`${this.formatEntityName(attackResult.target)} has died!`);
                this.setPlayerTarget(null);
                this.drawTargetMenu();
            }
        } else if (attackResult.target === undefined) {
            // console.log('yeah handled the no target case');
            this.printLine(`${this.formatEntityName(attacker)} tries to attack nobody.`);
        } else {
            console.error('unhandled attack result case');
        }
    }



}

