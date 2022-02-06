const POSSIBLE_ROBOTS = ['yellow', 'blue', 'red', 'green', 'silver'];
const POSSIBLE_TARGET_TYPES = ['moon', 'saturn', 'navigator', 'triangle_star'];
const POSSIBLE_TARGET_COLORS = ['yellow', 'blue', 'red', 'green'];

export default class Tile {
    constructor 
    (
        walls, 
        pos = {x: null, y: null},
        robot = null,
        target = {type: null, color: null}, 
        color = null,
    ) {
        this.robot = this.parseRobot(robot);
        this.target = target;
        this.walls = walls;
        this.color = color;
        this.pos = pos;
        this.selected = false;
    }

    makeRandomWall() {
        let dirs = ["up", "right", "down", "left"];
        let count = 0;
        for (let i = 0; i <dirs.length; ++i) {
            if (this.walls[dirs[i]]) ++count;
        }
        if (count === 0) {
            let rand = Math.floor(Math.random() * 4);
            this.walls[dirs[rand]] = true;
            ++count;
        }
        if (count === 1) {
            let rand = Math.floor(Math.random() * 2);
            if (this.walls.up || this.walls.down) {
                this.walls[rand === 0 ? "left" : "right"] = true;
            } else {
                this.walls[rand === 0 ? "up" : "down"] = true;
            }
        }
    }

    setSelected(bool) {
        this.selected = bool;
    }

    setRobot(robot) {
        if (this.parseRobot(robot)) this.robot = robot;
    }

    setTarget(target) {
        if (this.parseTarget(target)) this.target = target;
    }

    parseRobot(robot) {
        return (POSSIBLE_ROBOTS.includes(robot) ? robot : null);
    }

    parseTarget(target) {
        return (POSSIBLE_TARGET_TYPES.includes(target.type) && POSSIBLE_TARGET_COLORS.includes(target.color));
    }

    canMove(dir) {
        return !(this.walls[dir]);
    }
    canBeMovedTo(toDir) {
        return !(this.walls[this.fromDir(toDir)] || this.robot);
    }

    fromDir(toDir) {
        if (toDir === "up") return "down";
        if (toDir === "down") return "up";
        if (toDir === "right") return "left";
        if (toDir === "left") return "right";
        return false;
    }

    robotOff() {
        let robot = this.robot;
        this.robot = null;
        return robot;
    }
    robotOn(robot) {
        this.robot = robot;
    }

    setColor(c) {
        this.color = c;
    }
}