import Effect from "./Effect";
import levelUp from "../images/levelUp.png";
import { GAME_WIDTH } from "../services/services";

const container = {
    w: 400,
    h: 300,
}
export class LevelUP extends Effect{
  constructor(game) {
    super(game);
    this.game = game;

    this.offStep = 25;
    this.opacityModifier = 0.008;

    this.props = {
      x: (GAME_WIDTH / 2) - (container.w / 2),
      y: 5,
      w: container.w,
      h: container.h,
      filter: `none`,
      image: undefined,
      opacity: 0.5,
    };
    this.props.image = new Image();
    this.props.image.src = levelUp;

    this.isDead = false;
  }

  drawEffect(ctx) {
    this.game.draw.drawObject(this.props, ctx);
  }

  updateEffect() {
    if (this.props.opacity <= 0) {
        this.isDead = true;
        return;
      }

    this.props.opacity += this.opacityModifier;
    if (this.props.opacity >= 1.0) {
        this.opacityModifier = -this.opacityModifier;
      }
  }

  setOpacity(value) {
    this.props.opacity = value;
  }
}
