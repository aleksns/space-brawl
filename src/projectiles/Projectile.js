export default class Projectile {
  constructor(game, gun, barrel) {
    this.game = game;
    this.gun = gun;
    this.barrel = barrel;

    this.x = this.barrel.x;
    this.y = this.barrel.y;
    this.vX = 0;
    this.vY = 0;
    this.dX = 0;
    this.dY = 0;
    this.offStep = -100;

    this.destination = {
      x: this.barrel.destinationX,
      y: this.barrel.destinationY,
    };

    this.visionRange = {
      x: 0,
      y: 0,
      r: 300,
      color: "green",
    };
    this.isAccelerationType = this.gun.isAccelerationType;
    this.lineJoin = "round";
    this.lineCap = "square";
    this.isSlowSpeedApplied = this.gun.owner.isSlowSpeedApplied;
    this.isPlayerOwned = undefined;
    this.isDead = false;
  }

  initialize() {
    this.game.movement.calculateVectorsAndDistance(this);
    if (this.isAccelerationType) {
      this.game.movement.applyAcceleration(this);
    } else {
      this.game.movement.applyConstantSpeed(this);
    } 
  }

  update() {
    if (this.isAccelerationType) {
      this.handleAccelerationType();
    } else {
      this.game.movement.applyVelocity(this);
    }

    this.removeIfOutsideScreen();
  }

  handleAccelerationType() {
    this.game.movement.calculateVectorsAndDistance(this);
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
