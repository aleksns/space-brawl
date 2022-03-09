import UICanvas from "./UICanvas";

const container = {
  iconOpacityVisible: "opacity(100%)",
  iconOpacityHide: "opacity(30%)",
  barOpacityVisible: 1.0,
  barOpacityHide: 0.08,
  textOpacityVisible: 1.0,
  textOpacityHide: 0.3,
}
export class LevelAndScore extends UICanvas {
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

    this.levelImageProps = {
      x: this.levelImgContainer.x,
      y: this.levelImgContainer.y,
      w: this.levelImgContainer.w,
      h: this.levelImgContainer.h,
      filter: this.levelImgContainer.filter,
      image: this.levelImgContainer.image,
    };

    this.levelNumProps = {
      color: "green",
      x: this.levelImageProps.x + 5.5,
      y: this.levelImageProps.y + 2,
      w: this.levelImageProps.w * 0.15,
      h: this.levelImageProps.h * 0.9,
      textX: 0,
      textY: 0,
      textColor: "#ffffff",
      textOpacity: 1.0,
      text: "1",
      font: "19px audiowide",
      textHeight: 14,
    };

    this.expBarProps = {
      x: this.levelBarPropsContainer.x,
      y: this.levelBarPropsContainer.y,
      w: this.levelBarPropsContainer.w,
      h: this.levelBarPropsContainer.h,
      color: this.levelBarPropsContainer.color,
      opacity: 1.0,
    };

    
  }

  update() {
    this.updateLevelText();
    this.updateLevelBarContainer();
  }

  draw(ctx) {
    this.drawScore();
    this.drawLevelIconAndBar(ctx);
    this.drawLevelText(ctx);
  }

  drawScore() {
    let score = "Score: " + this.game.progression.score;
    this.scoreProps.text = score;
    this.game.draw.drawText(this.scoreProps);
  }

  drawLevelIconAndBar(ctx) {
    this.drawExpBar(ctx);
    this.game.draw.drawObject(this.levelImageProps, ctx);
  }

  drawExpBar(ctx) {
    let remainingExpBar =
      this.game.progression.expPoints / this.game.progression.maxExpPoints;
    let dW = this.expBarProps.w * remainingExpBar;

    ctx.current.beginPath();

    ctx.current.fillStyle = this.expBarProps.color;
    ctx.current.globalAlpha = this.expBarProps.opacity;
    ctx.current.rect(
      this.expBarProps.x,
      this.expBarProps.y,
      dW,
      this.expBarProps.h
    );
    ctx.current.fill();
    ctx.current.closePath();
    ctx.current.globalAlpha = 1.0;
  }

  drawLevelText(ctx) {
    let offsetX = this.getTextWidth(this.levelNumProps.text, ctx) / 2;
    this.levelNumProps.textX =
      this.levelNumProps.x + this.levelNumProps.w / 2 - offsetX;

    let offSetY = this.levelNumProps.textHeight / 2;
    this.levelNumProps.textY = 
      this.levelNumProps.y + (this.levelNumProps.h / 2) + offSetY;

    this.game.draw.drawText(this.levelNumProps);
  }

  updateLevelText() {
    let text = this.game.progression.playerLevel;
    this.levelNumProps.text = text;
  }

  updateLevelBarContainer() {
    if (this.isPlayerCollidingWithLevelBar()) {
      this.levelImageProps.filter = container.iconOpacityHide;
      this.levelNumProps.textOpacity = container.textOpacityHide;
      this.expBarProps.opacity = container.barOpacityHide;
    } else {
      this.levelImageProps.filter = container.iconOpacityVisible;
      this.levelNumProps.textOpacity = container.textOpacityVisible;
      this.expBarProps.opacity = container.barOpacityVisible;
    }
  }

  getTextWidth(text, ctx) {
    let textWidth = ctx.current.measureText(text).width;
    return textWidth;
  }

  isPlayerCollidingWithLevelBar() {
    return this.game.gameBoard.collision.rectsColliding(
      this.levelImageProps,
      this.game.playerTeam[0]
    );
  }

}
