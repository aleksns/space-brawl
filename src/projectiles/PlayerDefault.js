import { colors } from "../services/services";
import Projectile from "./Projectile";

 const projectilePlayerDefault = {
  w: 10,
  h: 10,
  color: "#47FFFB",
  speed: 20,
  isFill: true
}

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
    this.opacity = 1.0;
    this.isFill = projectilePlayerDefault.isFill;   //for test drawing purpose
  }
}
