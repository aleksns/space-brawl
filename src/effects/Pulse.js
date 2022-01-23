import Effect from "./Effect";
import {
  colors,
  getObjectCenterPosition,
  GAME_WIDTH,
} from "../services/services";

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
    super(game);

    this.object = object;
    this.x = getObjectCenterPosition(this.object).x - 105;
    this.y = getObjectCenterPosition(this.object).y;

    this.w = 240;
    this.h = 30;

    this.opacity = pulse.opacity;
    this.opacityModifier = pulse.opacityModifier;
    this.radius = pulse.radius;
    this.radiusModifier = pulse.radiusModifier;
    this.lineWidth = pulse.lineWidth;
    this.color = pulse.color;
    this.isFill = pulse.isFill; // fill or stroke boolean

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

  update() {
    if (!this.game.progression.isMaxThreatLevel) {
      this.setDead();
    }
    // if (this.opacity <= 0) {
    //     this.isDead = true;
    //     return;
    //   }

    if (this.opacity >= 0.5 || this.opacity <= 0.1) {
      this.opacityModifier = -this.opacityModifier;
    }

    if (this.radius >= 60 || this.radius <= 14) {
      this.radiusModifier = -this.radiusModifier;
      //this.radius = pulse.radius;
      //this.radiusModifier = -this.radiusModifier;
    }

    //   this.x = getObjectCenterPosition(this.object).x;
    //   this.y = getObjectCenterPosition(this.object).y;

    this.radius += this.radiusModifier;
    this.opacity += this.opacityModifier;
    this.opacity = Math.round((this.opacity + Number.EPSILON) * 100) / 100;

    //this.game.ctx2.current.setTransform(1, 0, 0, 1, 0, 0);
  }

  //   update() {
  //     if (this.opacity <= 0) {
  //       this.isDead = true;
  //       return;
  //     }

  //     if (this.opacity >= 0.8) {
  //       this.opacityModifier = -this.opacityModifier;
  //     }

  //     this.x = getObjectCenterPosition(this.object).x;
  //    this.y = getObjectCenterPosition(this.object).y;

  //     this.w += this.widthModifier;
  //     this.w += this.heightModifier;
  //     this.opacity += this.opacityModifier;
  //     this.opacity = Math.round((this.opacity + Number.EPSILON) * 100) / 100;
  //   }
}
