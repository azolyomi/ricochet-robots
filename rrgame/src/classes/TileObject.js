export default class Tile {
    constructor(walls=null, target=null, color=null) {
        this.target = target;
        let w = walls ?? [false, false, false, false];
        this.walls = w;
        this.color = color;
    }

    setColor(c) {
        this.color = c;
    }
}