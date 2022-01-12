import { getRandomInt } from "../services/services";

export default class Item {
  constructor(game) {
    this.game = game;

    this.vX = 0;
    this.vY = 0;

    this.f = 0.95;
    this.direction = "S";
    this.isDead = false;
    this.isSpawnOnInit = undefined;
    //this.isPlayer = false;
    this.isItem = true;
    this.isOutOfBordersAllowed = true;
  }

  update() {
    this.game.movement.move(this, this.isOutOfBordersAllowed);
    //this.isTimeToRemove();
    if (this.isInteractable && this.isPickedUpByPlayer()) {
        this.applyBuff();
        this.onDeath();
    }
  }

  setDead() {
    this.isDead = true;
  }

  isTimeToRemove() {
    if (this.game.collision.isCollisionBorderDown(this, -this.h)) {
      //this.isDead = true;
      this.setDead();
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

  randomize() {
    this.setMinSpawnRange();
    this.setRandomPosition();
  }
}
