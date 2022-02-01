import { getRandomInt, GAME_HEIGHT } from "../services/services";

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
      s: 6, // s - speed
      a: 0.2, /// a - acceleration (6/30)
      visionRange: 70,
    };

    this.itemCoinProps = {
      w: 25,
      h: 25,
      color: "transparent",
      opacity: 1.0,
      shadowBlur: 20,
      isFill: false,
      s: 1.6,
      a: 0.05,
      visionRange: 140,
    };

    this.destination = {
      x: 0,
      y: 0
    };

    this.filter = "none";
    this.isDead = false;
    this.isItem = true;
    this.isCheckSouthOutOfBorderOnly = true;
    this.isSlowSpeedApplied = this.game.stats.isGlobalSlowAll;
  }

  initialize() {
    this.initializeItem();
    this.setDestinationCords();

    if(this.game.stats.isGlobalSlowAll) {
      this.s /= this.game.stats.slowModifiers.speedGlobal;
    }

    this.game.movement.calculateVectorsAndDistance(this);
  }

  update() {
    this.updateImage();
    this.updateItem();

    if(this.isInteractable) {
    this.game.gameBoard.updateVisionRange(this);
    this.updateDestinationCords();
    this.handleItemMove();
    this.drawVisionRange();
    }
    else {
      this.handleBgElementMove();
    }

    this.game.movement.moveSouth(this);

    if (this.isInteractable && this.isPickedUpByPlayer()) {
        this.applyEffect();
        this.setDead();
        this.onDeath();
    }

    this.removeIfOutsideBorderDown();
  }

  handleItemMove() {
    if (this.game.gameBoard.isInsideVisionRange(this.game.player, this.visionRange)) {
      this.game.movement.calculateVectorsAndDistance(this);
      this.game.movement.accelerateObject(this);
      this.game.ctx.current.strokeStyle = "orange";
    } else {
      this.game.ctx.current.strokeStyle = "green";
    }

    this.game.movement.applyFrictionAndVelocity(this);
  }

  handleBgElementMove() {
    this.game.movement.applyVelocity(this);
  }

  updateDestinationCords() {
    this.destination.x = this.game.gameBoard.getCenterOfObject(this.game.player).x; //hardcoded for testing
    this.destination.y = this.game.gameBoard.getCenterOfObject(this.game.player).y; //hardcoded for testing
  }

  setDestinationCords() {
    this.destination.x = this.x;
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
    if (this.game.collision.isCollisionBorderDown(this, this.h)) {
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

    this.x = getRandomInt(minX, maxX);
    this.y = getRandomInt(minY, maxY);
  }

  randomize() {
    this.setMinSpawnRange();
    this.setRandomPosition();
  }
}
