import Effect from "./Effect";
import { colors } from "../services/services";

export const buffDefault = {
  opacity: 0.1,
  opacityModifier: 0.10,
  radius: 10,
  radiusModifier: 6,
  lineWidth: 6,
  color: colors.green,
  isFill: true,
};

export class BuffDefault extends Effect {
  constructor(game, object) {
    super(game, object);
    this.object = object;
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
    this.isRect = false;
  }

  drawEffect(ctx) {
   this.game.draw.drawArc(this, ctx);

  }

  updateEffect() {
    console.log(`updating BUFF`)
    if (this.opacity <= 0) {
      this.isDead = true;
      return;
    }

    if (this.opacity >= 0.6) {
      this.opacityModifier = -this.opacityModifier;
    }

    this.x = this.game.gameBoard.getCenterOfObject(this.object).x;
    this.y = this.game.gameBoard.getCenterOfObject(this.object).y;

    this.radius += this.radiusModifier;
    this.opacity += this.opacityModifier;
    this.opacity = Math.round((this.opacity + Number.EPSILON) * 100) / 100;
  }
}
