const POSSIBLE_ROBOTS = ['yellow', 'blue', 'red', 'green', 'silver'];
const ROBOT_WALLS = {
    up: true,
    right: true,
    down: true,
    left: true
}
export default class Tile {
    constructor 
    (
        walls, 
        pos = {x: null, y: null},
        robot = null,
        target = null, 
        color = null,
    ) {
        this.robot = this.parseRobot(robot);
        this.target = target;
        this.cached_walls = walls;
        this.walls = this.robot ? ROBOT_WALLS : walls;
        this.color = color;
        this.pos = pos;
    }

    setRobot(robot) {
        if (this.parseRobot(robot)) this.robot = robot;
    }

    parseRobot(robot) {
        return (POSSIBLE_ROBOTS.includes(robot) ? robot : null);
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
        this.walls = this.cached_walls;
        let robot = this.robot;
        this.robot = null;
        return robot;
    }
    robotOn(robot) {
        this.walls = ROBOT_WALLS;
        this.robot = robot;
    }

    setColor(c) {
        this.color = c;
    }
}