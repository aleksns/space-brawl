import { getRandomInt, GAME_HEIGHT } from "../services/services";

export default class Item {
  constructor(game) {
    this.game = game;

    this.x = 0;
    this.y = 0;
    this.vX = 0;
    this.vY = 0;
    this.f = 0.95;
    this.distance = 0;
    this.f = 0.95;

    this.itemBuffProps = {
      w: 50,
      h: 50,
      color: "transparent",
      opacity: 1.0,
      shadowBlur: 20,
      isFill: false,
      s: 6, // s - speed
      a: 0.2, /// a - acceleration (6/30)
    };

    this.cords = {
      p1X: 0,
      p1Y: 0,
      p2X: 0,
      p2Y: 0
    };

    this.filter = "none";
    this.isDead = false;
    this.isItem = true;
    this.isCheckSouthOutOfBorderOnly = true;
    this.isSlowSpeedApplied = this.game.stats.isGlobalSlowAll;
  }

  initialize() {
    this.initializeItem();
    this.initializeP2Cords();

    if(this.game.stats.isGlobalSlowAll) {
      this.s /= this.game.stats.slowModifiers.speedGlobal;
    }

    this.game.movement.setTrajectory(this);
  }

  update() {
    this.game.movement.applyVelocity(this);
    this.removeIfOutsideBorderDown();

    if (this.isInteractable && this.isPickedUpByPlayer()) {
        this.applyBuff();
        this.setDead();
        this.onDeath();
    }
  }

  initializeP2Cords() {
    this.cords.p1X = this.x;
    this.cords.p1Y = this.y;
    this.cords.p2X = this.x;
    this.cords.p2Y = GAME_HEIGHT + this.h;
  }

  setDead() {
    this.isDead = true;
  }

  removeIfOutsideBorderDown() {
    if (this.game.collision.isCollisionBorderDown(this, -this.h)) {
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
