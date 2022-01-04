import { getRandomInt } from "../services/services";

export default class Item {
  constructor(game) {
    this.game = game;

    this.vX = 0;
    this.vY = 0;

    this.f = 0.95;
    this.direction = "down";
    this.isDead = false;
    this.isSpawnOnInit = undefined;

    this.now = 0;
  }

  update() {
    this.isTimeToRemove();
    if (this.isInteractable) {
      if (this.isPickedUpByPlayer()) {
        this.applyBuff();
        this.playPickedUpEffect();
      }
    }
    this.game.movement.move(this);
  }

  isTimeToRemove() {
    //if (this.game.collision.isCollisionBorderDown(this, this.offStepY)) {
      if (this.game.collision.isCollisionBorderDown(this, -this.h)) {
      this.isDead = true;
    }
  }

  isPickedUpByPlayer() {
    if (
      this.game.collision.rectsColliding(this, this.game.player) &&
      !this.isDead
    ) {
      this.isDead = true;
      return true;
    }
  }

  setIsSpawnOnInit(boolean) {
    this.isSpawnOnInit = boolean;
  }

  setRandomPosition() {
    let minX = this.spawnRangeMinX;
    let maxX = this.spawnRangeMaxX;
    let minY = 0 - (this.h + 50);
    let maxY;

    if (!this.isSpawnOnInit) {
      maxY = 0 - (this.h + 25);
    } else {
      maxY = this.game.collision.boardHeight - this.h / 2;
    }

    this.x = getRandomInt(minX, maxX);
    this.y = getRandomInt(minY, maxY);
  }

  // setRandomPosition() {
  //   let minX = 0 - this.w / 2;
  //   let maxX = this.game.collision.boardWidth + this.w / 2;
  //   let minY = 0 - (this.h + 50);
  //   let maxY;

  //   if (this.isSpawnOnInit) {
  //     maxY = 0 - (this.h + 25);
  //   } else {
  //     maxY = this.game.collision.boardHeight - this.h / 2;
  //   }

  //   this.x = getRandomInt(minX, maxX);
  //   this.y = getRandomInt(minY, maxY);
  // }


  randomize() {
    //this.setRandomShape();
    this.setMinSpawnRange();
    this.setRandomPosition();
   // this.setOffStep();  // offstep is a negative width/height
  }
}
