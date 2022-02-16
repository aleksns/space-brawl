export default class Projectile {
  constructor(game, gun, barrel) {
    this.game = game;

    this.gun = gun;
    this.barrel = barrel;
    this.x = this.barrel.x;
    this.y = this.barrel.y;

    this.destination = {
      x: this.barrel.destinationX,
      y: this.barrel.destinationY,
    };

    this.isAccelerationType = this.gun.isAccelerationType;

    this.vX = 0;
    this.vY = 0;
    this.dX = 0;
    this.dY = 0;

    this.visionRange = {
      x: 0,
      y: 0,
      r: 300,
      color: "green",
    };

    this.filter = "saturate(100%) brightness(100%)";

    this.lineJoin = "round";
    this.lineCap = "square";
    this.isPlayerOwned = undefined;
    this.isDead = undefined;
  }

  initialize() {
    this.isDead = false;
    if (this.isLaser) {
      this.x = this.barrel.x;
      this.y = this.barrel.y - this.h;
      return;
    }
    this.game.movement.calculateVectorsAndDistance(this);
    if (this.isAccelerationType) {
      this.game.movement.applyConstantAcceleration(this);
      this.game.movement.applyAcceleration(this);
    } else {
      this.game.movement.applyConstantSpeed(this);
    }

    if (this.game.stats.isGlobalSlowAll) {
      this.game.stats.decreaseObjectSpeed(this);
    }
  }

  update() {
    if (this.isLaser) {
      this.x = this.barrel.x;
      this.y = this.barrel.y - this.h;
      this.h = this.getLaserHeight();
      return;
    }
    if (this.isAccelerationType) {
      this.handleAccelerationType();
    } else {
      this.game.movement.applyVelocity(this);
    }

    this.removeIfOutsideScreen();
  }

  handleAccelerationType() {
    if (!this.game.stats.isGlobalSlowAll) {
      this.game.movement.calculateVectorsAndDistance(this);
    }
    this.game.movement.applyAcceleration(this);
    this.game.movement.applyFrictionAndVelocity(this);
  }

  setPlayerOwned(gun) {
    this.isPlayerOwned = true;
    this.setProjectileStats(this.isPlayerOwned, gun);
  }

  setEnemyOwned(gun) {
    this.isPlayerOwned = false;
    this.setProjectileStats(this.isPlayerOwned, gun);
  }

  removeIfOutsideScreen() {
    if (
      this.game.collision.isCollisionBorderUp(this, this.getOffstepY0()) ||
      this.game.collision.isCollisionBorderDown(this, this.getOffstepY1()) ||
      this.game.collision.isCollisionBorderLeft(this, this.getOffstepX0()) ||
      this.game.collision.isCollisionBorderRight(this, this.getOffstepX1())
    ) {
      this.setDead();
    }
  }

  getOffstepX0() {
    let offStepX0 = -this.game.gameBoard.allowedX.x0 - this.w;
    return offStepX0;
  }
  getOffstepX1() {
    let offStepX1 = -this.w;
    return offStepX1;
  }

  getOffstepY0() {
    let offStepY0 = -this.game.gameBoard.allowedY.y0 - this.h;
    return offStepY0;
  }
  getOffstepY1() {
    let offStepY1 = -this.h;
    return offStepY1;
  }

  getLaserHeight() {
    let h = this.gun.owner.y + this.gun.owner.h;
    return h;
  }

  setFilter(filterValue) {
    this.filter = filterValue;
  }

  setDead() {
    this.isDead = true;
  }
}
