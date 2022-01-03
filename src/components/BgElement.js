import { getRandomInt, getTrueBasedOnChance } from "../services/services";

const minWidth = 50;
const maxWidth = 300;
const minHeight = 50;
const maxHeight = 250;

export default class BgElement {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 0;

    this.vX = 0;
    this.vY = 0;

    this.f = 0.95;
    this.s = 8;
    this.a = this.s / 10;

    this.w = 0;
    this.h = 0;
    this.offStepY = 0;
    this.isFill = undefined;
    this.maxNumOfElements = 25;
    this.opacity = 0.1;
    this.direction = "down";
    this.color = "#ffffff";
    this.isSpawnOnScreen = undefined;
    this.isDead = false;
  }

  checkIsDead() {
    if (this.game.collision.isCollisionBorderDown(this, this.offStepY)) {
      console.log("set bg element to dead");
      this.isDead = true;
    }
  }

  setIsSpawnOnScreen(boolean) {
    this.isSpawnOnScreen = boolean;
  }

  update() {
    this.checkIsDead();
    this.game.movement.move(this);
  }

  randomize() {
    this.getRandomShape();
    let minX = 0 - (this.w / 2);
    let maxX = this.game.collision.boardWidth + (this.w / 2);
    let minY = 0 - (this.h + 50);
    let maxY;

    if (!this.isSpawnOnScreen) {
      maxY = 0 - (this.h + 25);
    } else {
      maxY = this.game.collision.boardHeight - (this.h / 2);
    }

    this.x = getRandomInt(minX, maxX);
    this.y = getRandomInt(minY, maxY);
  }

  // randomize() {
  //   this.getRandomShape();
  //   let minX;
  //   let maxX;

  //   let minX = (0 - (this.w / 2));
  //   let maxX = (this.game.collision.boardHeight + (this.w / 2));

  //   let minY = (0 - (this.h + 50));
  //   let maxY = (0 - (this.h + 25));

  //   this.x = getRandomInt(minX, maxX);
  //   this.y = getRandomInt(minY, maxY);
  // }

  getRandomShape() {
    this.w = getRandomInt(minWidth, maxWidth);
    this.h = getRandomInt(minHeight, maxHeight);
    this.offStepY = -this.h;
    this.isFill = getTrueBasedOnChance(50);
  }
}
