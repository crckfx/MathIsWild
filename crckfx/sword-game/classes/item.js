
export class Item {
    
    constructor(name, options) {
        this.name = name;
        this.itemType = "misc"
        this.damage = options.damage ? options.damage : 0;
        this.isHeldBy = null;
        this.isEquippable = options.isEquippable? options.isEquippable : false;
    }

        
}