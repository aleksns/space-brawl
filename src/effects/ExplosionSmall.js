import Effect from "./Effect";
import { colors } from "../services/services";

export const explosionSmall = {
  opacity: 0.1,
  opacityModifier: 0.1,
  radius: 2,
  radiusModifier: 1.5,
  lineWidth: 3,
  color: colors.uiOrange,
  isFill: false,
};

export class ExplosionSmall extends Effect {
  constructor(game, object) {
    super(game);
    this.object = object;
    this.x = 0;
    this.y = 0;

    this.opacity = explosionSmall.opacity;
    this.opacityModifier = explosionSmall.opacityModifier;
    this.radius = explosionSmall.radius;
    this.radiusModifier = explosionSmall.radiusModifier;
    this.lineWidth = explosionSmall.lineWidth;
    this.color = object.explosionColor;
    this.isFill = explosionSmall.isFill; // fill or stroke boolean
    
    this.isDead = false;
    this.isRect = false;
  }
  
  drawEffect(ctx) {
    this.game.draw.drawArc(this, ctx);
  }

  updateEffect() {
    if (this.opacity <= 0) {
      this.isDead = true;
      return;
    }

    if (this.opacity >= 0.8) {
      this.opacityModifier = -this.opacityModifier;
    }

    // this.x = this.game.gameBoard.getCenterOfObject(this.object).x;
    // this.y = this.game.gameBoard.getCenterOfObject(this.object).y;
    this.x = this.object.x;
    this.y = this.object.y;

    this.radius += this.radiusModifier;
    this.opacity += this.opacityModifier;
    this.opacity = Math.round((this.opacity + Number.EPSILON) * 100) / 100;
  }
}
