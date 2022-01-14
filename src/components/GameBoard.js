import { getRandomInt, GAME_WIDTH, GAME_HEIGHT } from "../services/services";

// const GAME_WIDTH = window.innerWidth;
// const GAME_HEIGHT = window.innerHeight;

export default class GameBoard {
  constructor() {
    this.boardWidth = GAME_WIDTH;
    this.boardHeight = GAME_HEIGHT;
    this.allowedX = {x0: 5, x1: this.boardWidth - 5}
    this.allowedY = {y0: 50, y1: this.boardHeight - 5}

    this.enemyAllowedX = {x0: 5, x1: this.boardWidth - 5}
    this.enemyAllowedY = {y0: 50, y1: this.boardHeight / 2}
  }

  getRandomCordsWithinBounds(object) {
    var cords = {
      x: getRandomInt(
        this.enemyAllowedX.x0,
        this.enemyAllowedX.x1 - object.w
      ),
      y: getRandomInt(
        this.enemyAllowedY.y0,
        this.enemyAllowedY.y1 - object.h
      ),
    };
    return cords;
  }

}
