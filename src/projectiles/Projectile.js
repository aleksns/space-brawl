export default class Projectile {
  constructor(game) {
    this.game = game;
    this.ctx = game.ctx;

    this.x = 0;
    this.y = 0;

    this.dX = 0;
    this.dY = 0;

    this.vX = 0;
    this.vY = 0;
    this.dist = 0;

    this.isPlayerOwned = undefined;
    this.isDead = false;
  }

  update() {
    this.x += this.dX;
    this.y += this.dY;
    this.removeIfOutsideScreen();
  }

  setPlayerOwned(object) {
    this.isPlayerOwned = true;
    this.setProjectileStats(this.isPlayerOwned, object);
  }

  setEnemyOwned(object) {
    this.isPlayerOwned = false;
    this.setProjectileStats(this.isPlayerOwned, object);
  }

  launch(barrel) {
    this.calculateVectorsAndDistance(barrel);
    this.applySpeedModifier();
  }

  // p1X/Y - start position of the projectile.
  // p2X/Y - end position of the projectile.
  calculateVectorsAndDistance(barrel) {
    this.vX = barrel.p2X - barrel.p1X;
    this.vY = barrel.p2Y - barrel.p1Y;

    this.dist = Math.sqrt(this.vX * this.vX + this.vY * this.vY);

    this.vX = this.vX / this.dist;
    this.vY = this.vY / this.dist;

    this.x = barrel.p1X;
    this.y = barrel.p1Y;
  }

  applySpeedModifier() {
    this.dX = this.vX * this.s;
    this.dY = this.vY * this.s;
  }

  removeIfOutsideScreen() {
    if (this.game.collision.isCollisionWithAnyBorder(this, -50)) {
      this.setToRemove();
    }
  }

  setToRemove() {
    this.isDead = true;
  }
}
