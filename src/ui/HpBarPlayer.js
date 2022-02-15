import UICanvas from "./UICanvas";

export class HpBarPlayer extends UICanvas {
  constructor(game) {
    super(game);
    this.game = game;

       this.hpBarImageProps = {
      x: this.hpBarImgContainer.x,
      y: this.hpBarImgContainer.y,
      w: this.hpBarImgContainer.w,
      h: this.hpBarImgContainer.h,
      image: this.hpBarImgContainer.image,
    }

    this.hpBarProps = {
      x: this.hpBarPropsContainer.x,
      y: this.hpBarPropsContainer.y,
      w: this.hpBarPropsContainer.w,
      h: this.hpBarPropsContainer.h,
      color: this.hpBarPropsContainer.color,
      isFill: this.hpBarPropsContainer.isFill,
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
