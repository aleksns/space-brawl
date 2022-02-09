import Effect from "./Effect";
import { colors } from "../services/services";

export const pulse = {
  opacity: 0.2,
  opacityModifier: 0.05,
  radius: 15,
  radiusModifier: 2,
  lineWidth: 6,
  color: colors.uiRed,
  isFill: true,
};

export class Pulse extends Effect {
  constructor(game, object) {
    super(game, object);
    this.object = object;
    this.x = this.game.gameBoard.getCenterOfObject(this.object).x - 105;
    this.y = this.game.gameBoard.getCenterOfObject(this.object).y;

    this.w = 240;
    this.h = 30;

    this.opacity = pulse.opacity;
    this.opacityModifier = pulse.opacityModifier;
    this.radius = pulse.radius;
    this.radiusModifier = pulse.radiusModifier;
    this.lineWidth = pulse.lineWidth;
    this.color = pulse.color;
    this.isFill = pulse.isFill;

    this.angle = 0;
    this.scale = 1;

    this.anchorX = this.x;
    this.anchorY = this.y;

    this.scaledX = this.anchorX - this.anchorX * this.scale;
    this.scaledY = this.anchorY - this.anchorY * this.scale;
    this.isDead = false;
    this.isRect = false;
  }

  setDead() {
    this.isDead = true;
  }

  updateScale() {
    this.angle += Math.PI / 220;
    this.scale = 0.5 + Math.abs(Math.cos(this.angle));
  }

  drawEffect(ctx) {
    this.game.draw.drawArc(this, ctx);
  }

  updateEffect() {
    if (!this.game.progression.isMaxThreatLevel) {
      this.setDead();
    }

    if (this.opacity >= 0.5 || this.opacity <= 0.1) {
      this.opacityModifier = -this.opacityModifier;
    }

    if (this.radius >= 60 || this.radius <= 14) {
      this.radiusModifier = -this.radiusModifier;
    }

    this.radius += this.radiusModifier;
    this.opacity += this.opacityModifier;
    this.opacity = Math.round((this.opacity + Number.EPSILON) * 100) / 100;
  }
}
