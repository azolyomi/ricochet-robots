import Tile from './TileObject';

export default class Board {
    constructor() {
        this.height = 16;
        this.width = 16;
        let t = [];
        for (let i=0; i<this.height; i++) {
            for (let j=0; j<this.width; j++) {
                t.push(new Tile())
            }
        }
        this.tiles = t;
    }

    get dimensions() {
        return (this.height, this.width);
    }
}