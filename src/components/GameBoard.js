import {
  getRandomInt,
  GAME_WIDTH,
  GAME_HEIGHT,
  getTrueBasedOnChance,
} from "../services/services";

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

  setShipsInFormationLine(listOfShips, margin) {
    listOfShips[0].x =
      GAME_WIDTH / 2 - this.getFormationOffSet(listOfShips, margin);
    listOfShips[0].y = -listOfShips[0].h;

    for (let i = 1; i < listOfShips.length; i++) {
      listOfShips[i].x = listOfShips[i - 1].x + listOfShips[i - 1].w + margin;
      listOfShips[i].y = listOfShips[i - 1].y;
    }
  }

  getFormationOffSet(listOfShips, margin) {
    let shipW = listOfShips[0].w;
    let offset = (listOfShips.length * shipW + listOfShips.length * margin) / 2;
    return offset;
  }

  setEnemyOutBordersPosition(ship) {
    let spawnEastOrWest = Math.floor(Math.random() * 100);
    let spawnNorth = Math.floor(Math.random() * 100);

    //East or West spawn
    if (spawnEastOrWest >= spawnNorth) {
      let isWest = getTrueBasedOnChance(50);
      if (isWest == true) {
        ship.x = getRandomInt(-ship.w * 2, -ship.w);
      } else {
        ship.x = getRandomInt(GAME_WIDTH + ship.w, GAME_WIDTH + ship.w * 2);
      }
      ship.y = getRandomInt(-ship.h, GAME_HEIGHT / 2);
    }

    // North spawn
    else {
      ship.x = getRandomInt(ship.w, GAME_WIDTH - ship.w);
      ship.y = getRandomInt(-ship.h * 2, -ship.h);
    }
  }

  isOnTheGameBoard(ship) {
    return (
      ship.x >= this.enemyAllowedX.x0 &&
      ship.x <= this.enemyAllowedX.x1 - ship.w &&
      ship.y >= this.enemyAllowedY.y0 &&
      ship.y <= this.enemyAllowedY.y1
    );
  }

  setEmptyPositionForT5Enemies() {
    for (let i = 0; i < this.game.enemies.length - 1; i++) {
      for (let j = i + 1; j < this.game.enemies.length; j++) {
        if (
          this.game.collision.rectsColliding(
            this.game.enemies[i],
            this.game.enemies[j]
          ) &&
          this.game.enemies[i].id == "t5" &&
          this.game.enemies[j].id == "t5"
        ) {
          this.game.enemies[i].x =
            this.game.gameBoard.getPositionOutsideNorthBoard(
              this.game.enemies[i]
            ).x;
          this.game.enemies[i].y =
            this.game.gameBoard.getPositionOutsideNorthBoard(
              this.game.enemies[i]
            ).y;
        }
      }
    }
  }

  getEmptyPositionOnBoard(ship) {
    for (let i = 0; i < this.game.enemies.length; i++) {
      while (this.game.collision.rectsColliding(ship, this.game.enemies[i])) {
        ship.x = getRandomInt(
          this.enemyAllowedX.x0,
          this.enemyAllowedX.x1 - ship.w
        );
        ship.y = getRandomInt(this.allowedY.y0, GAME_HEIGHT / 2.5);
      }
    }
  }

  getEmptyPositionOutsideNorthBoard(ship) {
    for (let i = 0; i < this.game.enemies.length; i++) {
      while (this.game.collision.rectsColliding(ship, this.game.enemies[i])) {
        ship.x = this.getPositionOutsideNorthBoard(ship).x;
        ship.y = this.getPositionOutsideNorthBoard(ship).y;
      }
    }
  }

  getPositionOutsideNorthBoard(ship) {
    var position = {
      x: getRandomInt(this.enemyAllowedX.x0, this.enemyAllowedX.x1 - ship.w),
      y: getRandomInt(-ship.h, -ship.h),
    };
    return position;
  }

  getFormationLinePosX() {}

  getFormationTriangle() {}

  getCenterOfObject(object) {
    var center = {
      x: object.x + object.w / 2,
      y: object.y + object.h / 2,
    };
    return center;
  }
}
