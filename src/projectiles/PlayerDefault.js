import { colors, getDefaultPlayerProjectile } from "../services/services";
import Projectile from "./Projectile";

export class PlayerDefault extends Projectile {
  constructor(game) {
    super(
      game,
      getDefaultPlayerProjectile.w,
      getDefaultPlayerProjectile.h,
      getDefaultPlayerProjectile.color,
      getDefaultPlayerProjectile.speed,
      "default"
    );
    this.damage = this.game.stats.playerProjectilesDmg.default;
    this.opacity = 1.0;
    this.isFill = getDefaultPlayerProjectile.isFill;
    this.shadowColor = "transparent";
    this.shadowBlur = 0;
  }
}
