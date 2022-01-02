import Effect from "./Effect";
import { colors, getObjectCenterPosition } from "../services/services";
import { explosionDefault } from "../services/effectsValues";

export class ExplosionDefault extends Effect {
  constructor(game, object) {
    super(
      game,
      object,
      "default"
    );

    this.x = object.x;
    this.y = object.y;

    this.opacity = explosionDefault.opacity;
    this.opacityModifier = explosionDefault.opacityModifier;
    this.radius = explosionDefault.radius;
    this.radiusModifier = explosionDefault.radiusModifier;
    this.lineWidth = explosionDefault.lineWidth;
    this.isFill = explosionDefault.isFill;   // fill or stroke boolean

    this.isPlaying = true;
  }

  play() {
    this.explosionDefault();
  }

  resetEffectValues() {
    this.opacity = explosionDefault.opacity;
    this.opacityModifier = explosionDefault.opacityModifier;
    this.radius = explosionDefault.radius;
    this.radiusModifier = explosionDefault.radiusModifier;
  }

  explosionDefault() {
    if(this.opacity <= 0) {
     this.isPlaying = false;
    return;
  }

  if (this.opacity >= 0.8) {
    this.opacityModifier = -this.opacityModifier;
  }
     let x = getObjectCenterPosition(this.object).x;
     let y = getObjectCenterPosition(this.object).y;

    //this.game.clearTheCanvas2();
    this.game.draw.drawArc(x, y, colors.red, this.radius, this.lineWidth, this.isFill, this.opacity);
    // this.ctx2.current.fillStyle =  colors.red;
    // this.ctx2.current.strokeStyle =  colors.red;
    // this.ctx2.current.globalAlpha = this.opacity;
    // this.ctx2.current.beginPath();
    // this.ctx2.current.arc(x, y, this.radius, 0, 2 * Math.PI);
    // this.ctx2.current.fill();
    // this.ctx2.current.closePath();

    this.radius += this.radiusModifier;
    this.opacity += this.opacityModifier;
    this.opacity = Math.round((this.opacity + Number.EPSILON) * 100) / 100;
}
}
