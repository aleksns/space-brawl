import UICanvas from "./UICanvas";
import { colors, GAME_WIDTH } from "../services/services";
import coin0Deg from "../images/animations-images/coin-images/coin0Deg.png";

const container = {
  x: GAME_WIDTH - 250,
  y: 50,
  margin: 15,
  marginSides: 50,
};

export class ScoreAndCoins extends UICanvas {
  constructor(game) {
    super(game);
    this.game = game;

    this.scoreProps = {
      text: "",
      textX: container.x,
      textY: container.y + container.margin,
      font: "20px tahoma",
      textOpacity: 1.0,
      textColor: colors.scoreColor,
    };

    this.coinsImageProps = {
      x: container.x,
      y: this.scoreProps.textY + container.margin,
      w: 20,
      h: 20,
      filter: "none",
      image: undefined,
      shadowColor: "yellow",
      shadowBlur: 5,
    };

    this.coinsImageProps.image = new Image();
    this.coinsImageProps.image.src = coin0Deg;

    this.coinsProps = {
      text: "",
      textX: this.coinsImageProps.x + this.coinsImageProps.w,
      textY: this.coinsImageProps.y + this.coinsImageProps.h,
      font: "bold 20px tahoma",
      textOpacity: 1.0,
      textColor: colors.uiOrange,
    };
  }

  update() {
    //
  }

  drawScoreAndCoinsText() {
    let score = "Score: " + this.game.progression.score;
    this.scoreProps.text = score;

    let coins = " " + this.game.progression.coinsPoints;
    this.coinsProps.text = coins;

    this.game.draw.drawText(this.scoreProps);
    this.game.draw.drawText(this.coinsProps);
  }

}
