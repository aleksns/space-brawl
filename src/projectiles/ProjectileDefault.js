import Projectile from "./Projectile";

export class ProjectileDefault extends Projectile {
  constructor(game, gun, barrel) {
    super(game, gun, barrel);
    this.game = game;
    this.w = 0;
    this.h = 0;
    this.color = undefined;
    this.explosionColor = undefined;
    this.type = "explosionSmall";
    this.damage = 0;
    this.opacity = 1.0;
    this.s = 0;
    this.a = 0;
    this.isFill = undefined;
    this.isLaser = false;
    this.image = undefined;
  }

  setProjectileStats(isPlayerOwned) {
    this.w = this.gun.projectileW;
    this.h = this.gun.projectileH;
    this.image = this.gun.projectileImage;

    this.damage = this.gun.damage;
    this.s = this.gun.projectileSpeed;
    this.a = this.gun.projectileAcceleration;

    if(isPlayerOwned) {
      this.explosionColor = "orange";
    }
    else {
      this.explosionColor = "red";
    }
  }
}
