import { getDeadZoneDimensionForObject } from "../services/services";
import GameBoard from "./GameBoard";

export default class Collision {
  constructor(game) {
    this.game = game;
    this.gameBoard = new GameBoard();
    this.boardWidth = this.gameBoard.boardWidth; ///exists in services.
    this.boardHeight = this.gameBoard.boardHeight; ///exists in services

    this.allowedX = this.gameBoard.allowedX;
    this.allowedY = this.gameBoard.allowedY;

    this.enemyAllowedX = this.gameBoard.enemyAllowedX;
    this.enemyAllowedY = this.gameBoard.enemyAllowedY;
    console.log(">> Collison Constructor");
  }

  rectsColliding(r1, r2) {
    return !(
      r1.x > r2.x + r2.w ||
      r1.x + r1.w < r2.x ||
      r1.y > r2.y + r2.h ||
      r1.y + r1.h < r2.y
    );
  }

  handleCollisionWithBorders(object) {
    if (object.isPlayer) {
      this.handlePlayerBordersCollision(object);
    }
    if (!object.isPlayer) {
      this.handleEnemyBordersCollision(object);
    }
    // if (object.isItem && this.isCollisionBorderDown(object, -object.h)) {
    //   object.setDead();
    // }
  }

  /* Adjust player's position if collision is detected */

  handlePlayerBordersCollision(rect) {
    if (this.isCollisionBorderUp(rect, 0)) {
      rect.y = this.allowedY.y0;
    }
    if (this.isCollisionBorderDown(rect, 0)) {
      rect.y = this.allowedY.y1 - rect.h;
    }
    if (this.isCollisionBorderLeft(rect, 0)) {
      rect.x = this.allowedX.x0;
    }
    if (this.isCollisionBorderRight(rect, 0)) {
      rect.x = this.allowedX.x1 - rect.w;
    }
  }

  handleEnemyWithEnemyCollision(enemy1, enemy2) {
    return this.rectsColliding(enemy1, enemy2);
  }

  handleEnemyBordersCollision(rect) {
    let newRandomDirections = [];
    if (
      this.isCollisionBorderUp(rect, this.enemyAllowedY.y0) &&
      this.isNorthDirection(rect.direction)
    ) {
      newRandomDirections = this.getRandomOppositeDirections(
        this.getNorthDirections()
      );
      // rect.y = this.allowedY.y0; //// testing
    }
    if (
      this.isCollisionBorderDown(rect, this.enemyAllowedY.y1) &&
      this.isSouthDirection(rect.direction)
    ) {
      newRandomDirections = this.getRandomOppositeDirections(
        this.getSouthDirections()
      );
      // rect.y = this.allowedY.y1 - rect.h; //// testing
    }
    if (
      this.isCollisionBorderLeft(rect, rect.offStepX) &&
      this.isWestDirection(rect.direction)
    ) {
      newRandomDirections = this.getRandomOppositeDirections(
        this.getWestDirections()
      );
      // rect.x = this.allowedX.x0; //// testing
    }
    if (
      this.isCollisionBorderRight(rect, rect.offStepX) &&
      this.isEastDirection(rect.direction)
    ) {
      newRandomDirections = this.getRandomOppositeDirections(
        this.getEastDirections()
      );
      //rect.x = this.allowedX.x1 - rect.w;//// testing
    }
    //console.log(`COLLSION > newRandomDirections = ${JSON.stringify(newRandomDirections) }`)
    if (newRandomDirections.length != 0) {
      rect.setRandomDirectionFromList(newRandomDirections);
    }

    // this.handleEnemyOutOfBorders(rect);   //testing
  }

  isOutOfBorders(rect) {
    let deadDimension = getDeadZoneDimensionForObject(rect);
    return (
      rect.x <= deadDimension.x0 ||
      rect.x >= deadDimension.x1 ||
      rect.y <= deadDimension.y0 ||
      rect.y >= deadDimension.y1
    );
  }

  getRandomOppositeDirections(excluded) {
    let newDirections = ["N", "E", "S", "W", "NE", "SE", "SW", "NW"];
    //newDirections = directions;
    let excludedDirections = excluded;
    //console.log(`newDirections = ${newDirections}`);
    //console.log(`excludedDirections = ${excludedDirections}`);
    for (let i = 0; i < excludedDirections.length; i++) {
      let index = newDirections.indexOf(excludedDirections[i]);
      newDirections.splice(index, 1);
    }
    // console.log(`allowed newDirections = ${newDirections}`);
    return newDirections;
  }

  getNorthDirections() {
    var northDirections = ["NW", "N", "NE"];
    return northDirections;
  }
  getEastDirections() {
    var eastDirections = ["NE", "E", "SE"];
    return eastDirections;
  }
  getSouthDirections() {
    var southDirections = ["SE", "S", "SW"];
    return southDirections;
  }
  getWestDirections() {
    var westDirections = ["SW", "W", "NW"];
    return westDirections;
  }

  isNorthDirection(direction) {
    return direction == "NW" || direction == "N" || direction == "NE";
  }
  isEastDirection(direction) {
    return direction == "NE" || direction == "E" || direction == "SE";
  }
  isSouthDirection(direction) {
    return direction == "SE" || direction == "S" || direction == "SW";
  }
  isWestDirection(direction) {
    return direction == "SW" || direction == "W" || direction == "NW";
  }

  /* Rrectangle | Borders Collision functions */

  isCollisionWithAnyBorder(rect, offStep) {
    return (
      this.isCollisionBorderUp(rect, offStep) ||
      this.isCollisionBorderDown(rect, offStep) ||
      this.isCollisionBorderLeft(rect, offStep) ||
      this.isCollisionBorderRight(rect, offStep)
    );
  }

  isCollisionBorderUp(rect, offStep) {
    return rect.y <= this.allowedY.y0 + offStep;
  }

  isCollisionBorderDown(rect, offStep) {
    return rect.y + rect.h >= this.allowedY.y1 - offStep;
  }

  isCollisionBorderLeft(rect, offStep) {
    return rect.x <= this.allowedX.x0 + offStep;
  }

  isCollisionBorderRight(rect, offStep) {
    return rect.x + rect.w >= this.allowedX.x1 - offStep;
  }

  rectCircleColliding(rect, circle) {
    var distX = Math.abs(circle.x - rect.x - rect.w / 2);
    var distY = Math.abs(circle.y - rect.y - rect.h / 2);

    if (distX > rect.w / 2 + circle.r) {
      return false;
    }
    if (distY > rect.h / 2 + circle.r) {
      return false;
    }

    if (distX <= rect.w / 2) {
      return true;
    }
    if (distY <= rect.h / 2) {
      return true;
    }

    var dx = distX - rect.w / 2;
    var dy = distY - rect.h / 2;
    return dx * dx + dy * dy <= circle.r * circle.r;
  }
}
