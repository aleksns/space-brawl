import UICanvas from "./UICanvas";
import { colors } from "../services/services";
import hpBarImage from "../images/hpBar.png";

//Hp bar image
const hpBarImageProps = {
  x: 5,
  y: 5,
  w: 250,
  h: 35,
  color: "transparent",
  isFill: false,
};

const hpBarProps = {
  x: hpBarImageProps.x + 38,
  y: 5,
  w: hpBarImageProps.w - 43,
  h: hpBarImageProps.h - 5,
  color: colors.uiGreen,
  isFill: true,
};


export class HpBarPlayer extends UICanvas {
  constructor(game) {
    super(game);
    this.game = game;

    //this.hpImage = new Image();
   // this.hpImage.src = hpBarImage;
    this.hpBarImageProps = {
      x: hpBarImageProps.x,
      y: hpBarImageProps.y,
      w: hpBarImageProps.w,
      h: hpBarImageProps.h,
      color: hpBarImageProps.color,
      isFill: hpBarImageProps.isFill,
      image: undefined,
    }

    this.hpBarImageProps.image = new Image();
    this.hpBarImageProps.image.src = hpBarImage;

    this.hpBarProps = {
      x: hpBarProps.x,
      y: hpBarProps.y,
      w: hpBarProps.w,
      h: hpBarProps.h,
      color: hpBarProps.color,
      isFill: hpBarProps.isFill,
    };
    
  }

  update() {
    //
  }

  draw(ctx) {  
    let remainingHPBar = this.game.player.health / this.game.player.maxHealth;
    let dW = this.hpBarProps.w * remainingHPBar;

    ctx.current.beginPath();
   // this.ctx.current.lineWidth = hpBarLineWidth;
    ctx.current.fillStyle = this.hpBarProps.color;
    ctx.current.rect(this.hpBarProps.x, this.hpBarProps.y, dW, this.hpBarProps.h)
    ctx.current.fill();
    ctx.current.closePath();
  }
}
