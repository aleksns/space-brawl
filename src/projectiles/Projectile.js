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
    this.offStep = -100;

    this.visionRange = {
      x: 0,
      y: 0,
      r: 300,
      color: "green",
    };

    this.lineJoin = "round";
    this.lineCap = "square";
    //this.isSlowSpeedApplied = false;
    this.isPlayerOwned = undefined;
    this.isDead = false;
  }

  initialize() {
    if (this.isLaserType) {
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
    if (this.isLaserType) {
      this.x = this.barrel.x;
      this.y = this.barrel.y - this.h;
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
    if (this.game.collision.isCollisionWithAnyBorder(this, this.offStep)) {
      this.setDead();
    }
  }

  setDead() {
    this.isDead = true;
  }
}
