import { colors, getDefaultPlayerProjectile, getDefaultEnemyProjectile } from "../services/services";
import Projectile from "./Projectile";

export class ProjectileDefault extends Projectile {
  constructor(game) {
    super(game);
    this.game = game;
    this.stats = this.game.stats;
    this.w = 0;
    this.h = 0;
    this.color = undefined;
    this.type = "default";
    this.damage = 0;
    this.opacity = 1.0;
    this.s = 0;
    this.isFill = undefined;

    this.shadowColor = "transparent";
    this.shadowBlur = 0;
  }

  setProjectileStats(isPlayerOwned, object) {
    if(isPlayerOwned) {
      this.setPlayerProjectileShape();
      this.setPlayerProjectileStats(object);
    }
    else {
      this.setEnemyProjectileShape();
      this.setEnemyProjectileStats(object);
    }
  }

  setPlayerProjectileShape() {
    this.w = getDefaultPlayerProjectile.w;
    this.h = getDefaultPlayerProjectile.h;
    this.color = getDefaultPlayerProjectile.color;
    this.isFill = getDefaultPlayerProjectile.isFill;
  }

  setPlayerProjectileStats(object) {
    this.damage = object.damage;
    this.s = getDefaultPlayerProjectile.s;
  }

  setEnemyProjectileShape() {
    this.w = getDefaultEnemyProjectile.w;
    this.h = getDefaultEnemyProjectile.h;
    this.color = getDefaultEnemyProjectile.color;
    this.isFill = getDefaultEnemyProjectile.isFill;
  }

  setEnemyProjectileStats(object) {
    this.damage = object.damage;
    this.s = getDefaultEnemyProjectile.s;
  }
}
