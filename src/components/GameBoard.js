import {
  getRandomIntInclusive,
  GAME_WIDTH,
  GAME_HEIGHT,
} from "../services/services";
import Collision from "./Collision";

export default class GameBoard {
  constructor(game) {
    this.game = game;

    this.allowedX = { x0: 5, x1: GAME_WIDTH - 5 };
    this.allowedY = { y0: 50, y1: GAME_HEIGHT - 5 };

    this.enemyAllowedX = { x0: 5, x1: GAME_WIDTH - 5 };
    this.enemyAllowedY = { y0: 50, y1: GAME_HEIGHT / 2 };

    this.friction = 0.95;
    this.collision = new Collision(this.game, this);
  }

  updateVisionRange(object) {
    object.visionRange.x = this.getCenterOfObject(object).x;
    object.visionRange.y = this.getCenterOfObject(object).y;
  }

  isInsideVisionRange(target, visionRangeOwner) {
    return this.collision.rectCircleColliding(target, visionRangeOwner);
  }

  getRandomCordsWithinBounds(object) {
    var cords = {
      x: getRandomIntInclusive(this.enemyAllowedX.x0, this.enemyAllowedX.x1 - object.w),
      y: getRandomIntInclusive(this.enemyAllowedY.y0, this.enemyAllowedY.y1 - object.h),
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
    let diceThrow = Math.random();

    //West spawn
    if (diceThrow <= 0.33) {
      ship.x = getRandomIntInclusive(-ship.w * 2, -ship.w);
      ship.y = getRandomIntInclusive(-ship.h, GAME_HEIGHT / 2);
    } 
    //East spawn
    if (diceThrow > 0.33 && diceThrow < 0.66) {
      ship.x = getRandomIntInclusive(GAME_WIDTH + ship.w, GAME_WIDTH + ship.w * 2);
      ship.y = getRandomIntInclusive(-ship.h, GAME_HEIGHT / 2);
    } 
     // North spawn
    if (diceThrow >= 0.66) {
      ship.x = getRandomIntInclusive(ship.w, GAME_WIDTH - ship.w);
      ship.y = getRandomIntInclusive(-ship.h * 2, -ship.h);
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

  setDestinationOnBoardCords(ship) {
    ship.destination.x = getRandomIntInclusive(
      this.enemyAllowedX.x0 + ship.w,
      this.enemyAllowedX.x1 - ship.w
    );
    ship.destination.y = getRandomIntInclusive(
      this.enemyAllowedY.y0 + ship.h,
      this.enemyAllowedY.y1 - ship.h
    );
  }

  setEmptyPositionForT5Enemies() {
    for (let i = 0; i < this.game.enemies.length - 1; i++) {
      for (let j = i + 1; j < this.game.enemies.length; j++) {
        if (
          this.collision.rectsColliding(
            this.game.enemies[i],
            this.game.enemies[j]
          ) &&
          this.game.enemies[i].id == "t5" &&
          this.game.enemies[j].id == "t5"
        ) {
          this.game.enemies[i].x =
            this.getPositionOutsideNorthBoard(
              this.game.enemies[i]
            ).x;
          this.game.enemies[i].y =
            this.getPositionOutsideNorthBoard(
              this.game.enemies[i]
            ).y;
        }
      }
    }
  }

  getEmptyPositionOnBoard(ship) {
    for (let i = 0; i < this.game.enemies.length; i++) {
      while (this.collision.rectsColliding(ship, this.game.enemies[i])) {
        ship.x = getRandomIntInclusive(
          this.enemyAllowedX.x0,
          this.enemyAllowedX.x1 - ship.w
        );
        ship.y = getRandomIntInclusive(this.allowedY.y0, GAME_HEIGHT / 2.5);
      }
    }
  }

  getEmptyPositionOutsideNorthBoard(ship) {
    for (let i = 0; i < this.game.enemies.length; i++) {
      while (this.collision.rectsColliding(ship, this.game.enemies[i])) {
        ship.x = this.getPositionOutsideNorthBoard(ship).x;
        ship.y = this.getPositionOutsideNorthBoard(ship).y;
      }
    }
  }

  getPositionOutsideNorthBoard(ship) {
    var position = {
      x: getRandomIntInclusive(this.enemyAllowedX.x0, this.enemyAllowedX.x1 - ship.w),
      y: getRandomIntInclusive(-ship.h, -ship.h),
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
