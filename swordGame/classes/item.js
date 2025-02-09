export class Item {
    constructor(name, { isEquippable = false, itemType = "misc", damage = 0 } = {}) {
        this.name = name;
        this.isEquippable = isEquippable;  // Equippable is true for weapons, false for most items
        this.itemType = itemType;          // All items, weapon or not, have an itemType
        this.damage = damage;              // Only relevant for weapons, but set here for consistency
        this.isHeldBy = null;              // Assuming items can be held by entities
    }
}
