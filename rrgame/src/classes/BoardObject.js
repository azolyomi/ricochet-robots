import Tile from './TileObject';
import { POSSIBLE_TARGETS } from '../constants';

const DIRECTIONS = ["left", "right", "up", "down"];

export default class Board {
    constructor() {
        this.height = 16;
        this.width = 16;
        this.seenTargets = [];
        
        this.tiles = this.generateBaseBoard();
        this.generateWallsAndTargets();


        this.moveCount = 0;
        this.score = 0;
        this.currentTarget = this.pickTarget();

        this.tiles[4][4].setRobot('yellow');
        this.tiles[14][15].setRobot('red');
        this.tiles[8][4].setRobot('blue');
        this.tiles[10][11].setRobot('green');

        this.tiles[15][15].setTarget({type: 'navigator', color: 'red'});
    }

    resetMoveCount() {
        this.moveCount = 0;
    }

    pickTarget() {
        let index = Math.floor(Math.random() * POSSIBLE_TARGETS.length);
        let target = POSSIBLE_TARGETS[index];
        if (this.seenTargets.find(e => e.type === target.type && e.color === target.color)) {
            return this.pickTarget();
        }
        console.log(target);
        return target;
    }

    checkIfHasFoundTarget(i, j) {
        if (this.tiles[i][j].target?.type === this.currentTarget.type && this.tiles[i][j].target?.color === this.currentTarget.color && this.tiles[i][j].robot === this.currentTarget.color) this.hasFoundTarget();
    }

    hasFoundTarget() {
        console.log("YOU WON!");
        this.score++;
        this.moveCount = 0;
        this.seenTargets.push(this.currentTarget);
        this.currentTarget = this.pickTarget();
    }

    generateBaseBoard() {
        let t = [];
        for (let i=0; i<this.height; i++) {
            t.push([]);
            for (let j=0; j<this.width; j++) {
                let walls = {up: i === 0, right: j === this.width-1, down: i === this.height - 1, left: j === 0}
                t[i].push(new Tile(walls, {x: i, y: j}, null, null, null))
            }
        }
        t[7][7].setCenterTile()
        t[7][7].walls = {up: true, down: false, left: true, right: false};

        t[7][8].setCenterTile()
        t[7][8].walls = {up: true, down: false, left: false, right: true};

        t[8][7].setCenterTile()
        t[8][7].walls = {up: false, down: true, left: true, right: false};

        t[8][8].setCenterTile()
        t[8][8].walls = {up: false, down: true, left: false, right: true};

        return t;
    }

    generateWallsAndTargets() {

        let tempTargets = 
            POSSIBLE_TARGETS.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

        let possibleTargetLocations = [];

        for (let i=0; i<this.height; i++) {
            let seed1 = Math.floor(Math.random() * 8);
            let seed2 = Math.floor(Math.random() * 8 + 8);
            for (let j = 0; j<this.width; j++) {
                if (j === seed1 || j === seed2) {
                    this.tiles[i][j].makeRandomWall();
                    if (this.tiles[i][j].wallCount() >= 2 && !this.tiles[i][j].centerTile && !possibleTargetLocations.find(e => e.i === i && e.j === j)) possibleTargetLocations.push({i, j});
                }
            }
        }

        let targetLocations = [];
        for (let i=0; i<POSSIBLE_TARGETS.length; i++) {
            let rand = Math.floor(Math.random() * possibleTargetLocations.length);
            targetLocations.push(possibleTargetLocations[rand])
        }

        for (let x=0; x<targetLocations.length; x++) {
            this.tiles[targetLocations[x].i][targetLocations[x].j].setTarget(tempTargets[x]);
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
        this.moveCount++;
        this.tiles[i][j].robotOn(robot);
        this.checkIfHasFoundTarget(i, j);
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