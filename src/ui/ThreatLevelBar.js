import UICanvas from "./UICanvas";

export class ThreatLevelBar extends UICanvas {
  constructor(game) {
    super(game);
    this.game = game;

    this.threatBarImageProps = {
      x: this.threatBarImgContainer.x,
      y: this.threatBarImgContainer.y,
      w: this.threatBarImgContainer.w,
      h: this.threatBarImgContainer.h,
      image: this.threatBarImgContainer.image,
    }

    this.threatBarProps = {
      x: this.threatBarPropsContainer.x,
      y: this.threatBarPropsContainer.y,
      w: this.threatBarPropsContainer.w,
      h: this.threatBarPropsContainer.h,
      color: this.threatBarPropsContainer.color,
      isFill: this.threatBarPropsContainer.isFill,
    };
    
    this.isPulseOn = false;
  }

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
