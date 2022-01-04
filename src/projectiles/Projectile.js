import { getObjectCenterPosition, getCenteredPositionForProjectile } from "../services/services";

export default class Projectile {
  constructor(game, width, height, color, speed, type) {
    this.game = game;
    this.ctx = game.ctx;

    this.x = 0;
    this.y = 0;

    // p1 - start point of a projectile, p2 - end point
    this.p1 = {
      x: 0,
      y: 0,
    };

    this.p2 = {
      x: 0,
      y: 0,
    };

    this.dX = 0;
    this.dY = 0;

    this.vX = 0;
    this.vY = 0;
    this.dist = 0;

    this.w = width;
    this.h = height;
    this.color = color;
    this.type = type;

    this.isPlayerOwned = undefined;
    this.isDead = false;

    this.s = speed;
  }

  setPlayerOwned(ship) {
    this.isPlayerOwned = true;
    this.p1.x = getCenteredPositionForProjectile(ship, this).x;
    this.p1.y = getCenteredPositionForProjectile(ship, this).y;

    this.p2.x = this.p1.x;
    this.p2.y = 0;
    //change p2.x value if you need to fire in different angles

    this.calculateVectorsAndDistance();
    this.applySpeedModifier();
  }

  calculateVectorsAndDistance() {
    this.vX = this.p2.x - this.p1.x;
    this.vY = this.p2.y - this.p1.y;

    this.dist = Math.sqrt(this.vX * this.vX + this.vY * this.vY);

    this.vX = this.vX / this.dist;
    this.vY = this.vY / this.dist;

    this.x = this.p1.x;
    this.y = this.p1.y;
  }

  applySpeedModifier() {
    this.dX = this.vX * this.s;
    this.dY = this.vY * this.s;
  }

  setEnemyOwned(ship) {
    this.isPlayerOwned = false;

    this.p1.x = getCenteredPositionForProjectile(ship, this).x;
    this.p1.y = getCenteredPositionForProjectile(ship, this).y;

    this.p2.x = getObjectCenterPosition(this.game.player).x;
    this.p2.y = getObjectCenterPosition(this.game.player).y;

    this.calculateVectorsAndDistance();
    this.applySpeedModifier();
  }

  update() {
    this.x += this.dX;
    this.y += this.dY;
    this.removeIfOutsideScreen();
  }

  setTypeDefault() {
    // if (this.isPlayerOwned == true) {
    //   this.damage = this.game.stats.playerProjectilesDmg.default;
    // } else {
    //   this.damage = this.game.stats.enemyProjectilesDmg.default;
    // }
  }

  removeIfOutsideScreen() {
    if (this.game.collision.isCollisionWithAnyBorder(this, 0)) {
      this.setToRemove();
    }
  }

  setToRemove() {
    this.isDead = true;
  }
}
