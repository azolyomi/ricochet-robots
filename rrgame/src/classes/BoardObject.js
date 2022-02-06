import Tile from './TileObject';

const DIRECTIONS = ["left", "right", "up", "down"];

export default class Board {
    constructor() {
        this.height = 16;
        this.width = 16;
        
        this.tiles = this.generateBaseBoard();
        this.generateWalls();

        this.tiles[4][4].setRobot('yellow');

        this.tiles[4][8].setRobot('red');
    }

    generateBaseBoard() {
        let t = [];
        for (let i=0; i<this.height; i++) {
            t.push([]);
            for (let j=0; j<this.width; j++) {
                let walls;
                if (Math.floor((i + 1) / 2) === 4 && Math.floor((j+1) / 2) === 4) walls = {up: true, down: true, left: true, right: true}
                else walls = {up: i === 0, right: j === this.width-1, down: i === this.height - 1, left: j === 0}
                t[i].push(new Tile(walls, {x: i, y: j}, null, null, null))
            }
        }
        return t;
    }

    generateWalls() {

        for (let i=0; i<this.height; i++) {
            let seed1 = Math.floor(Math.random() * 8);
            let seed2 = Math.floor(Math.random() * 8 + 8);
            for (let j = 0; j<this.width; j++) {
                if (j == seed1 || j == seed2) this.tiles[i][j].makeRandomWall();
            }
        }
    }


    moveRobot(xpos, ypos, direction) {
        if (!(this.tiles[xpos][ypos].robot)) return false;
        if (!(DIRECTIONS.includes(direction))) return false;

        console.log("trying to move...");

        let i=xpos, j=ypos, inext = xpos, jnext = ypos;
        let robot = this.tiles[i][j].robotOff();
        while (this.tiles[i][j].canMove(direction)) {
            if (direction === "up") inext--;
            else if (direction === "down") inext++;
            else if (direction === "right") jnext++;
            else jnext--;

            if (this.tiles[inext][jnext]?.canBeMovedTo(direction)) {
                i = inext;
                j = jnext;
            }
            else break;
        }
        this.tiles[i][j].robotOn(robot);
        return this.tiles[i][j];
    }

    calcDir(from, to) {
        let a = from.pos.x === to.pos.x;
        let b = from.pos.y === to.pos.y;
        if (a && b) return false;
        if (a) {
            if (from.pos.y > to.pos.y) return "left";
            return "right"
        }
        else if (b) {
            if (from.pos.x > to.pos.x) return "up";
            return "down"
        }
        return false;
        
    }

    

    get dimensions() {
        return (this.height, this.width);
    }
}