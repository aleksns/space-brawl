import { getRandomInt, GAME_WIDTH, GAME_HEIGHT } from "../services/services";

import projectilePlayer from "../images/projectilePlayer.png";
import projectileEnemy from "../images/projectileEnemy.png";

export default class GameBoard {
  constructor(game) {
    this.game = game;
    this.width = GAME_WIDTH;
    this.height = GAME_HEIGHT;
    this.allowedX = { x0: 5, x1: this.width - 5 };
    this.allowedY = { y0: 50, y1: this.height - 5 };

    this.enemyAllowedX = { x0: 5, x1: this.width - 5 };
    this.enemyAllowedY = { y0: 50, y1: this.height / 2 };

    this.friction = 0.95;
    this.formationMargin = 15;

    this.projectileDefaultImgPlayer = new Image();
    this.projectileDefaultImgPlayer.src = projectilePlayer;

    this.projectileDefaultImgEnemey = new Image();
    this.projectileDefaultImgEnemey.src = projectileEnemy;
  }

  updateVisionRange(object) {
    object.visionRange.x = this.getCenterOfObject(object).x;
    object.visionRange.y = this.getCenterOfObject(object).y;
  }

  isInsideVisionRange(target, visionRangeOwner) {
    return this.game.collision.rectCircleColliding(target, visionRangeOwner);
  }

  getRandomCordsWithinBounds(object) {
    var cords = {
      x: getRandomInt(this.enemyAllowedX.x0, this.enemyAllowedX.x1 - object.w),
      y: getRandomInt(this.enemyAllowedY.y0, this.enemyAllowedY.y1 - object.h),
    };
    return cords;
  }

  setShipsInFormationLine(listOfShips) {
    //first, [ship0] cords are being set, to serve as the main link in the formation chain
    listOfShips[0].x = this.getFormationLineOutsideScreen(listOfShips[0]).x;
    listOfShips[0].y = this.getFormationLineOutsideScreen(listOfShips[0]).y;

    // [ship0] -> [ship1] -> [ship2] -> [ship3]. Distance between = width + margin. 1st ship (main link) already has cords set
    for (let i = 1; i < listOfShips.length; i++) {
      listOfShips[i].x =
        listOfShips[i - 1].x + listOfShips[i - 1].w + this.formationMargin;
      listOfShips[i].y = listOfShips[i - 1].y;
    }
  }

  getFormationLineOutsideScreen(ship) {
    var cords = {
      x: this.enemyAllowedX.x0,
      y: 0 - ship.h - this.formationMargin,
    };

    return cords;
  }

  getFormationLinePosX() {}

  getFormationTriangle() {}

  getCenterOfObject(object) {
    var center = {
      x: object.x + object.w / 2,
      y: object.y + object.h / 2,
    }
    return center;
  }
}
