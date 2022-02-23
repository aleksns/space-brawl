import { colors, font } from "../services/services";
import Effect from "./Effect";

const textProps = {
  expXModifier: -0.4,
  expYModifier: -0.8,
  expColor: colors.uiOrangeDark,
  expFont: `22px ${font}`,

  expBossXModifier: 0.1,
  expBossYModifier: -4.5,
  expBossColor: colors.uiOrangeDark,
  expBossFont: `82px ${font}`,
  expBossOpacityModifier: 0.013,

  hpXModifier: 0.8,
  hpYModifier: -1.7,
  hpColor: colors.green,
  hpFont: `35px ${font}`,

  atkSpeedXModifier: 2.5,
  atkSpeedYModifier: -0.2,
  atkSpeedColor: colors.uiBlue,
  atkSpeedFont: `45px ${font}`,
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
      font: undefined,
    };

    this.isDead = false;
  }

  setProps(textID, text) {
    this.props.text = text;
    this.props.textX = this.game.playerTeam[0].x + this.game.playerTeam[0].w + this.offSet;
    this.props.textY = this.game.playerTeam[0].y + this.game.playerTeam[0].h / 2;

    switch (textID) {
      case "exp":
        this.xModifier = textProps.expXModifier;
        this.yModifier = textProps.expYModifier;
        this.props.textColor = textProps.expColor;
        this.props.font = textProps.expFont;
        break;
      case "expBoss":
        this.xModifier = textProps.expBossXModifier;
        this.yModifier = textProps.expBossYModifier;
        this.props.textColor = textProps.expBossColor;
        this.props.font = textProps.expBossFont;

        this.opacityModifier = textProps.expBossOpacityModifier;
        break;
      case "hp":
        this.xModifier = textProps.hpXModifier;
        this.yModifier = textProps.hpYModifier;
        this.props.textColor = textProps.hpColor;
        this.props.font = textProps.hpFont;
        break;
      case "atkSpeed":
        this.xModifier = textProps.atkSpeedXModifier;
        this.yModifier = textProps.atkSpeedYModifier;
        this.props.textColor = textProps.atkSpeedColor;
        this.props.font = textProps.atkSpeedFont;
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
    this.props.textX =
      this.game.playerTeam[0].x + this.game.playerTeam[0].w + this.offSet + this.xOffset;
    this.props.textY =
      this.game.playerTeam[0].y + this.game.playerTeam[0].h / 2 + this.yOffset;
  }

  setOpacityModifier(value) {
    this.opacityModifier = value;
  }
}
