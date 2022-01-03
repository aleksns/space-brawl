import { getRandomInt } from "../services/services";

export default class Item {
  constructor(game) {
    this.game = game;

    this.vX = 0;
    this.vY = 0;

    this.f = 0.95;
    this.direction = "down";
    this.isDead = false;
    this.isSpawnOutsideScreen = undefined;
  }

  isTimeToRemove() {
    if (this.game.collision.isCollisionBorderDown(this, this.offStepY)) {
      this.isDead = true;
    }
  }

  setIsSpawnOutsideScreen(boolean) {
    this.isSpawnOutsideScreen = boolean;
  }

  setRandomPosition() {
    let minX = 0 - this.w / 2;
    let maxX = this.game.collision.boardWidth + this.w / 2;
    let minY = 0 - (this.h + 50);
    let maxY;

    if (this.isSpawnOutsideScreen) {
      maxY = 0 - (this.h + 25);
    } else {
      maxY = this.game.collision.boardHeight - this.h / 2;
    }

    this.x = getRandomInt(minX, maxX);
    this.y = getRandomInt(minY, maxY);
  }

  update() {
    this.isTimeToRemove();
    this.game.movement.move(this);
  }

  randomize() {
    this.setRandomShape();
    this.setRandomPosition();
    this.setOffStepY(); // to make an item get removed upon going fully off screen
  }
}
