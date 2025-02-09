
export class Weapon {
    
    constructor(name, damage) {
        this.name = name;
        this.itemType = "weapon",
        this.damage = damage;
        this.isHeldBy = null;
        this.isEquippable = true;
    }

        
}