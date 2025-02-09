import { Item } from './item.js';

export class Armour extends Item {
    constructor(name, strength) {
        super(name, { isEquippable: true, itemType: "armour" });
        this.strength = strength;
    }
}
