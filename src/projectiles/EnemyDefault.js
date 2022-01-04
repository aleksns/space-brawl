import { colors } from "../services/services";
import Projectile from "./Projectile";

const projectileEnemyDefault = {
  w: 10,
  h: 10,
  color: colors.red,
  speed: 5,
  isFill: true
}
export class EnemyDefault extends Projectile {
  constructor(game) {
    super(
      game,
      projectileEnemyDefault.w,
      projectileEnemyDefault.h,
      projectileEnemyDefault.color,
      projectileEnemyDefault.speed,
      "default"
    );
    this.damage = this.game.stats.enemyProjectilesDmg.default;
    this.opacity = 1.0;
    this.isFill = projectileEnemyDefault.isFill;
    this.shadowColor = "transparent";
    this.shadowBlur = 0;
  }
}
