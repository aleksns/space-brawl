import { projectileEnemyDefault } from "../services/services";
import Projectile from "./Projectile";

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
  }
}
