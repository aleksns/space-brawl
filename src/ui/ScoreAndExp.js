import UICanvas from "./UICanvas";
import { colors, GAME_WIDTH } from "../services/services";

export class ScoreAndExp extends UICanvas {
  constructor(game) {
    super(game);
    this.game = game;

    this.scoreProps = {
      text: "",
      textX: this.scorePropsContainer.x,
      textY: this.scorePropsContainer.y,
      font: this.scorePropsContainer.font,
      textOpacity: 1.0,
      textColor: this.scorePropsContainer.color,
    };

    this.coinImageProps = {
      x: this.coinImgContainer.x,
      y: this.coinImgContainer.y,
      w: this.coinImgContainer.w,
      h: this.coinImgContainer.h,
      filter: this.coinImgContainer.filter,
      image: this.coinImgContainer.image,
      shadowColor: this.coinImgContainer.shadowColor,
      shadowBlur: this.coinImgContainer.shadowBlur,
    };

    this.expBarProps = {
        x: this.expBarPropsContainer.x,
        y: this.expBarPropsContainer.y,
        w: this.expBarPropsContainer.w,
        h: this.expBarPropsContainer.h,
        color: this.expBarPropsContainer.color,
    };
  }

  update() {
    //
  }

  drawScoreAndExpBar(ctx) {
    let score = "Score: " + this.game.progression.score;
    this.scoreProps.text = score;

    this.game.draw.drawText(this.scoreProps);
    this.game.draw.drawText(this.scoreProps);
    this.drawExpBar(ctx);

    ////test////
    this.game.ctx4.current.globalAlpha = 1.0;
    this.game.ctx4.current.fillStyle = "#ffffff";
    this.game.ctx4.current.font = "20px tahoma";
    this.game.ctx4.current.fillText(
      `Wave: ${this.game.script.currentLvl.i + 1}`,
      5,
      100
    );
  }

  drawExpBar(ctx) {
    let remainingExpBar = this.game.progression.expPoints / this.game.progression.maxExpPoints;
    let dW = this.expBarProps.w * remainingExpBar;

    ctx.current.beginPath();
    ctx.current.lineWidth = 0.5;
    ctx.current.strokeStyle = "orange";
    ctx.current.rect(this.expBarProps.x, this.expBarProps.y, this.expBarProps.w, this.expBarProps.h);
    ctx.current.stroke();
    ctx.current.closePath();

    ctx.current.beginPath();
    ctx.current.fillStyle = this.expBarProps.color;
    ctx.current.rect(this.expBarProps.x, this.expBarProps.y, dW, this.expBarProps.h);
    ctx.current.fill();
    ctx.current.closePath();
  }
}
