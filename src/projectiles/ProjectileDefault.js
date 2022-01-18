import { colors, getDefaultPlayerProjectile, getDefaultEnemyProjectile } from "../services/services";
import Projectile from "./Projectile";

export class ProjectileDefault extends Projectile {
  constructor(game, gun, barrel) {
    super(game, gun, barrel);
    this.game = game;
    this.stats = this.game.stats;
    this.w = 0;
    this.h = 0;
    this.color = undefined;
    this.type = "default";
    this.damage = 0;
    this.opacity = 1.0;
    this.s = 0;
    this.sModifier = 0;
    this.a = 0;
    this.isFill = undefined;
    this.shadowColor = "transparent";
    this.shadowBlur = 0;
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
    this.isFill = getDefaultPlayerProjectile.isFill;
  }

  setPlayerProjectileStats() {
    this.damage = this.gun.owner.damage;
    this.s = this.gun.owner.projectileSpeedModifier;

  }

  setEnemyProjectileShape() {
    this.w = getDefaultEnemyProjectile.w;
    this.h = getDefaultEnemyProjectile.h;
    this.color = getDefaultEnemyProjectile.color;
    this.isFill = getDefaultEnemyProjectile.isFill;
  }

  setEnemyProjectileStats() {
    this.damage = this.gun.owner.damage;
    this.s = this.gun.owner.projectileSpeedModifier;
  }
}
