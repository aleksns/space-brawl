import Effect from "./Effect";
import { colors, getObjectCenterPosition } from "../services/services";

export const buffDefault = {
  opacity: 0.1,
  opacityModifier: 0.10,
  radius: 15,
  radiusModifier: 10,
  lineWidth: 6,
  color: colors.green,
  isFill: true,
};

export class BuffDefault extends Effect {
  constructor(game, object) {
    super(game, object, "defaultBuff");

    this.x = 0;
    this.y = 0;

    this.opacity = buffDefault.opacity;
    this.opacityModifier = buffDefault.opacityModifier;
    this.radius = buffDefault.radius;
    this.radiusModifier = buffDefault.radiusModifier;
    this.lineWidth = buffDefault.lineWidth;
    this.color = buffDefault.color;
    this.isFill = buffDefault.isFill; // fill or stroke boolean
    this.isDead = false;
  }

  update() {
    if (this.opacity <= 0) {
      this.isDead = true;
      return;
    }

    if (this.opacity >= 0.6) {
      this.opacityModifier = -this.opacityModifier;
    }

    this.x = getObjectCenterPosition(this.object).x;
    this.y = getObjectCenterPosition(this.object).y;

    this.radius += this.radiusModifier;
    this.opacity += this.opacityModifier;
    this.opacity = Math.round((this.opacity + Number.EPSILON) * 100) / 100;
  }
}
