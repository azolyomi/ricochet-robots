import Board from './BoardObject';

export default class Game {
    constructor(urlSlug) {
        this.board = new Board();
        this.score = 0;
        this.seenTiles = [];
    }
}