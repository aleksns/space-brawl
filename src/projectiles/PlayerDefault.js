import { projectilePlayerDefault } from "../services/services";
import Projectile from "./Projectile";

export class PlayerDefault extends Projectile {
  constructor(game) {
    super(
      game,
      projectilePlayerDefault.w,
      projectilePlayerDefault.h,
      projectilePlayerDefault.color,
      projectilePlayerDefault.speed,
      "default"
    );
  }
}
