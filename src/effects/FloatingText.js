import { colors, font } from "../services/services";
import Effect from "./Effect";

const textProps = {
  expColor: colors.uiOrangeDark,
  expXModifier: -0.4,
  expYModifier: -0.8,

  hpColor: colors.green,
  hpXModifier: 0.8,
  hpYModifier: -1.7,
};
export class FloatingText extends Effect {
  constructor(game) {
    super(game);
    this.game = game;

    this.offSet = 15;
    this.opacityModifier = 0.015;
    this.xModifier = 0;
    this.yModifier = 0;

    this.xOffset = 0;
    this.yOffset = 0;

    this.props = {
      text: "",
      textX: 0,
      textY: 0,
      textOpacity: 0.6,
      textColor: undefined,
      font: `22px ${font}`,
    };

    this.isDead = false;
  }

  setProps(textID, text) {
    this.props.text = text;
    this.props.textX = (this.game.player.x + this.game.player.w) + this.offSet;
    this.props.textY = this.game.player.y + (this.game.player.h / 2);

    switch (textID) {
      case "exp":
        this.props.textColor = textProps.expColor;
        this.xModifier = textProps.expXModifier;
        this.yModifier = textProps.expYModifier;
        break;
      case "hp":
        this.props.textColor = textProps.hpColor;
        this.xModifier = textProps.hpXModifier;
        this.yModifier = textProps.hpYModifier;
        break;
      default:
        console.log("Error handling `setProps` function in FloatingText class");
        break;
    }
  }

  drawEffect(ctx) {
    if (this.props.textOpacity <= 0) {
      return;
    }

    this.game.draw.drawText(this.props);
  }

  updateEffect() {
    if (this.props.textOpacity <= 0) {
      this.isDead = true;
      return;
    }

    this.updateTextPosition();
    this.xOffset += this.xModifier;
    this.yOffset += this.yModifier;

    this.props.textOpacity += this.opacityModifier;
    if (this.props.textOpacity >= 1.0) {
      this.opacityModifier = -this.opacityModifier;
    } 
  }

  updateTextPosition() {
    this.props.textX = (this.game.player.x + this.game.player.w) + this.offSet + this.xOffset;
    this.props.textY = this.game.player.y + (this.game.player.h / 2) + this.yOffset;
  }

  setOpacityModifier(value) {
    this.opacityModifier = value;
  }
}
