import { Item } from './item.js';

export class Weapon extends Item {
    constructor(name, damage) {
        super(name, { isEquippable: true, itemType: "weapon" });
        this.damage = damage;
    }
}
