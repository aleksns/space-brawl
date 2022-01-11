import UICanvas from "./UICanvas";
import { colors, GAME_WIDTH, GAME_HEIGHT } from "../services/services";
import hpBarImage from "../images/threatLevelBar.png";

//Hp bar image
const threatBarImageProps = {
  x: GAME_WIDTH - 255,
  y: 5,
  w: 250,
  h: 35,
  color: "transparent",
  isFill: false,
};

const threatBarProps = {
  x: threatBarImageProps.x + 38,
  y: 5,
  w: threatBarImageProps.w - 43,
  h: threatBarImageProps.h - 5,
  color: colors.uiRedDark,
  isFill: true,
};


export class ThreatLevelBar extends UICanvas {
  constructor(game) {
    super(game);
    this.game = game;

    //this.hpImage = new Image();
   // this.hpImage.src = hpBarImage;
    this.threatBarImageProps = {
      x: threatBarImageProps.x,
      y: threatBarImageProps.y,
      w: threatBarImageProps.w,
      h: threatBarImageProps.h,
      color: threatBarImageProps.color,
      isFill: threatBarImageProps.isFill,
      image: undefined,
    }

    this.threatBarImageProps.image = new Image();
    this.threatBarImageProps.image.src = hpBarImage;

    this.threatBarProps = {
      x: threatBarProps.x,
      y: threatBarProps.y,
      w: threatBarProps.w,
      h: threatBarProps.h,
      color: threatBarProps.color,
      isFill: threatBarProps.isFill,
    };
    
    this.isPulseOn = false;
  }

  // pulse() {


  //   if (this.opacity >= 0.8 || this.opacity <= 0.1) {
  //     this.opacityModifier = -this.opacityModifier;
  //   }
  //   if(this.lineWidth >= 25 || this.lineWidth <= 5) {
  //       this.lineWidthModifier = -this.lineWidthModifier;
  //   }

  // }

  // update() {
  //   if(this.game.progression.isMaxThreatLevel) {
  //     this.game.init.addEffect(this, "pulse");
  //   }
  // }

  draw(ctx) {  
    if(this.game.progression.isMaxThreatLevel && this.isPulseOn == false) {
      this.game.init.addEffect(this.threatBarImageProps, "pulse");
      this.isPulseOn = true;
    }
    if(!this.game.progression.isMaxThreatLevel) {
      this.isPulseOn = false;
    }
    let remainingThreatBar = this.game.progression.threatLevel / this.game.progression.maxThreatLevel;
    let dW = this.threatBarProps.w * remainingThreatBar;

    ctx.current.beginPath();
   // this.ctx.current.lineWidth = hpBarLineWidth;
    ctx.current.fillStyle = this.threatBarProps.color;
    ctx.current.rect(this.threatBarProps.x, this.threatBarProps.y, dW, this.threatBarProps.h)
    ctx.current.fill();
    ctx.current.closePath();
  }
}
