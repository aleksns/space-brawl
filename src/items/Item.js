import { getRandomIntInclusive, GAME_HEIGHT } from "../services/services";

export default class Item {
  constructor(game) {
    this.game = game;

    this.x = 0;
    this.y = 0;
    this.vX = 0;
    this.vY = 0;
    this.dX = 0;
    this.dY = 0;

    this.itemBuffProps = {
      w: 50,
      h: 50,
      color: "transparent",
      opacity: 1.0,
      shadowBlur: 20,
      isFill: false,
      s: 4, // s - speed
      a: 0.2, /// a - acceleration (6/30)
      visionRange: 70,
    };

    this.itemCoinProps = {
      w: 20,
      h: 20,
      color: "transparent",
      opacity: 1.0,
      shadowBlur: 5,
      isFill: false,
      s: 4,
      a: 0.05,
      visionRange: 140,
    };

    this.destination = {
      x: 0,
      y: 0,
    };

    this.offStep = undefined;

    this.filter = "none";
    this.isDead = false;
    this.isItem = true;
    this.isCheckSouthOutOfBorderOnly = true;
  }

  initialize() {
    this.initializeItem();
    this.offStep = -this.h;
    this.setDestinationCords();

    this.game.movement.calculateVectorsAndDistance(this);
    this.game.movement.applyConstantSpeed(this);

    if (this.game.stats.isGlobalSlowAll) {
      this.game.stats.decreaseObjectSpeed(this);
    }
  }

  update() {
    this.updateImage();

    if (this.isInteractable) {
      this.moveInteractableItem();
    } else {
      this.game.movement.applyVelocity(this);
    }

    if (this.isInteractable && this.isPickedUpByPlayer()) {
      this.applyEffect();
      this.setDead();
      this.onDeath();
    }

    this.removeIfOutsideBorderDown();
    //this.drawVisionRange();  
  }

  moveInteractableItem() {
    this.game.gameBoard.updateVisionRange(this);

    if (this.isPlayerInsideVisionRange()) {
      this.moveItemToPlayer();
    }
    else {
      this.game.movement.moveSouth(this);
    }

    this.game.movement.applyFrictionAndVelocity(this);
  }

  moveItemToPlayer() {
    //if (this.isPlayerInsideVisionRange()) {
      this.updateDestinationCords();
      this.game.movement.calculateVectorsAndDistance(this);
      this.game.movement.applyAcceleration(this);
      //this.game.ctx.current.strokeStyle = "orange";
   // } else {
      //this.game.ctx.current.strokeStyle = "green";
  // }
  }

  isPlayerInsideVisionRange() {
    let boolean = this.game.gameBoard.isInsideVisionRange(
      this.game.player,
      this.visionRange
    );
    return boolean;
  }

  updateDestinationCords() {
    this.destination.x = this.game.gameBoard.getCenterOfObject(
      this.game.player
    ).x;
    this.destination.y = this.game.gameBoard.getCenterOfObject(
      this.game.player
    ).y;
  }

  setDestinationCords() {
    //this.destination.x = this.x;
    this.destination.x = this.game.gameBoard.getCenterOfObject(this).x;
    this.destination.y = GAME_HEIGHT + this.h;
  }

  drawVisionRange() {
    this.game.ctx.current.lineWidth = 3;
    this.game.ctx.current.beginPath();
    this.game.ctx.current.arc(
      this.visionRange.x,
      this.visionRange.y,
      this.visionRange.r,
      0,
      2 * Math.PI
    );
    this.game.ctx.current.stroke();
    this.game.ctx.current.closePath();
  }

  setDead() {
    this.isDead = true;
  }

  removeIfOutsideBorderDown() {
    if (this.game.collision.isCollisionBorderDown(this, this.offStep)) {
      this.setDead();
    }
  }

  isPickedUpByPlayer() {
    if (
      this.game.collision.rectsColliding(this, this.game.player) &&
      !this.isDead
    ) {
      return true;
    }
  }

  setIsSpawnOnScreen(boolean) {
    this.isSpawnOnScreen = boolean;
  }

  initializeCoin(object) {
    this.setPosition(object);
    this.value = object.itemToDrop.value;
    //this.value = 50;
  }

  setPosition(object) {
    this.x = this.game.gameBoard.getCenterOfObject(object).x;
    this.y = this.game.gameBoard.getCenterOfObject(object).y;
  }

  setRandomPosition() {
    let minX = this.spawnRangeMinX;
    let maxX = this.spawnRangeMaxX;
    let minY = 0 - (this.h + 50);
    let maxY;

    if (!this.isSpawnOnScreen) {
      maxY = 0 - (this.h + 25);
    } else {
      maxY = this.game.gameBoard.height - this.h / 2;
    }

    this.x = getRandomIntInclusive(minX, maxX);
    this.y = getRandomIntInclusive(minY, maxY);
  }

  randomize() {
    this.setMinSpawnRange();
    this.setRandomPosition();
  }
}
