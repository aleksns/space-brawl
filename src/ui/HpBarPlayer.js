import UICanvas from "./UICanvas";
import { colors } from "../services/services";
import hpBarImage from "../images/hpBar.png";

//Hp bar image
const x = 5;  //hardcoded offStep from HP icon
const y = 5;
const width = 250;
const height = 35;
const color = colors.uiGreen;




export class HpBarPlayer extends UICanvas {
  constructor(game) {
    super(game);
    this.game = game;
     this.x = x;
     this.y = y;
    this.w = width;
    this.h = height;

    this.barProps = {
      x: 43,
      y: 5,
      color: color,
      isFill: true,
      w: width - 43,
    };

     this.color = "transparent";
    this.isFill = false;

    this.image = new Image();
    this.image.src = hpBarImage;
  }

  draw(ctx) {  
    let remainingHPBar = this.game.player.health / this.game.player.maxHealth;
    let dW = this.barProps.w * remainingHPBar;

    ctx.current.beginPath();
   // this.ctx.current.lineWidth = hpBarLineWidth;
    ctx.current.fillStyle = this.barProps.color;
    ctx.current.rect(this.barProps.x, this.barProps.y, dW, this.h)
    ctx.current.fill();
    ctx.current.closePath();
  }
}
