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
      colorDefault: this.threatBarPropsContainer.color,
    };
    
    this.isPulseOn = false;
    this.saturation = 100;
    this.satModifier = -0.5;
    this.satMax = 100;
    this.satMin = 70;

    this.lightness = 50;
    this.lightModifier = -0.5;
    this.lightMax = 50;
    this.lightMin = 30;

    
  }

  draw(ctx) {  
    if(this.game.progression.isMaxThreatLevel && this.isPulseOn == false) {
      this.game.init.addEffect(this.threatBarImageProps, "pulse");
      this.isPulseOn = true;
    }

    let remainingThreatBar = this.game.progression.threatLevel / this.game.progression.maxThreatLevel;
    let dW = this.threatBarProps.w * remainingThreatBar;

    ctx.current.beginPath();


    if(this.game.progression.isMaxThreatLevel) {   
      this.saturation += this.satModifier;
      if(this.saturation <= this.satMin || this.saturation >= this.satMax) {
        this.satModifier = -this.satModifier;
      }
      this.lightness += this.lightModifier;
      if(this.lightness <= this.lightMin || this.lightness >= this.lightMax) {
        this.lightModifier = -this.lightModifier;
      }
      this.threatBarProps.color = `hsl(${0},${this.saturation}%,${this.lightness}%)`
    }
    else {
      this.threatBarProps.color = this.threatBarProps.colorDefault;
    }


    ctx.current.fillStyle = this.threatBarProps.color;
    ctx.current.rect(this.threatBarProps.x, this.threatBarProps.y, dW, this.threatBarProps.h)
    ctx.current.fill();
    ctx.current.closePath();
  }
}
