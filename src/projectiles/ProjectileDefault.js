import { colors, getDefaultPlayerProjectile, getDefaultEnemyProjectile } from "../services/services";
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
    if(isPlayerOwned) {
      this.setPlayerProjectileShape();
      this.setPlayerProjectileStats();
    }
    else {
      this.setEnemyProjectileShape();
      this.setEnemyProjectileStats();
    }
  }

  setPlayerProjectileShape() {
    this.w = getDefaultPlayerProjectile.w;
    this.h = getDefaultPlayerProjectile.h;
    this.color = getDefaultPlayerProjectile.color;
    this.explosionColor = "orange";
    this.isFill = getDefaultPlayerProjectile.isFill;
    //this.image = this.game.media.projectileYellowConeImg;
    this.image = this.gun.projectileImage;
  }

  setPlayerProjectileStats() {
    this.damage = this.gun.damage;
    this.s = this.gun.projectileSpeed;
    this.a = this.gun.projectileAcceleration;
  }

  setEnemyProjectileShape() {
    // this.w = getDefaultEnemyProjectile.w;
    // this.h = getDefaultEnemyProjectile.h;
    this.w = 150;
    this.h = 150;
    this.color = getDefaultEnemyProjectile.color;
    this.explosionColor = "red";
    this.isFill = getDefaultEnemyProjectile.isFill;
    //this.image = this.game.media.projectileArcRedImg;
    this.image = this.gun.projectileImage;
  }

  setEnemyProjectileStats() {
    this.damage = this.gun.damage;
    this.s = this.gun.projectileSpeed;
    this.a = this.gun.projectileAcceleration;
  }
}
