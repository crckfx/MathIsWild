export class Item {
    constructor(name, { isEquippable = false, itemType = "misc"} = {}) {
        this.name = name;
        this.itemType = itemType;          // mandatory
        this.isEquippable = isEquippable;  // true for weapons + armour, false for most items
        // this.damage = damage;              // Only relevant for weapons, but set here for consistency
        this.isHeldBy = null;              // Assuming items can be held by entities
        this.isConsumable = false;         //
    }
}
