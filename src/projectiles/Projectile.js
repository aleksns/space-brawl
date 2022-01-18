export default class Projectile {
  constructor(game, gun, barrel) {
    this.game = game;
    this.gun = gun;
    this.barrel = barrel;

    this.x = 0;
    this.y = 0;
    this.vX = 0;
    this.vY = 0;
    this.f = 0.95;
    this.distance = 0;

    this.cords = {
      p1X: this.barrel.p1X,
      p1Y: this.barrel.p1Y,
      p2X: this.barrel.p2X,
      p2Y: this.barrel.p2Y
    };

    this.isSlowSpeedApplied = this.gun.owner.isSlowSpeedApplied;
    this.isPlayerOwned = undefined;
    this.isDead = false;
  }

  update() {
   // console.log(`vX = ${this.vX}, vY = ${this.vY}`)
    this.game.movement.applyVelocity(this);

    //this.game.movement.moveTest(this);
    this.removeIfOutsideScreen();
  }

  initialize() {
    this.game.movement.setTrajectory(this);
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
    if (this.game.collision.isCollisionWithAnyBorder(this, -50)) {
      this.setDead();
    }
  }

  setDead() {
    this.isDead = true;
  }
}
