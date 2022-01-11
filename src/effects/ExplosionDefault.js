import Effect from "./Effect";
import { colors, getObjectCenterPosition } from "../services/services";

export const explosionDefault = {
  opacity: 0.1,
  opacityModifier: 0.10,
  radius: 15,
  radiusModifier: 7,
  lineWidth: 6,
  color: colors.red,
  isFill: false,
};

export class ExplosionDefault extends Effect {
  constructor(game, object) {
    super(game, object, "default");

    this.x = 0;
    this.y = 0;

    this.opacity = explosionDefault.opacity;
    this.opacityModifier = explosionDefault.opacityModifier;
    this.radius = explosionDefault.radius;
    this.radiusModifier = explosionDefault.radiusModifier;
    this.lineWidth = explosionDefault.lineWidth;
    this.color = explosionDefault.color;
    this.isFill = explosionDefault.isFill; // fill or stroke boolean
    
    this.isDead = false;
    this.isRect = false;
  }

  update() {
    if (this.opacity <= 0) {
      this.isDead = true;
      return;
    }

    if (this.opacity >= 0.8) {
      this.opacityModifier = -this.opacityModifier;
    }

    this.x = getObjectCenterPosition(this.object).x;
    this.y = getObjectCenterPosition(this.object).y;

    this.radius += this.radiusModifier;
    this.opacity += this.opacityModifier;
    this.opacity = Math.round((this.opacity + Number.EPSILON) * 100) / 100;
  }
}
