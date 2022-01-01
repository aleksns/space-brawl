import "../App.css";

export default class Draw {
  constructor(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.ctx2 = game.ctx2;

    this.animationOpacity = 0.1;
    this.animationRadius = 10;
  }

  playerGotHitAnimation() {

    //MAKE IT WORK BASED ON TIME - THEN / NOW, just like with projectiles
    this.animationOpacity = 0.1;
    this.animationRadius = 10;
  
      this.game.clearTheCanvas2();
      this.ctx2.current.fillStyle =  "#FF62EC";
      this.ctx2.current.strokeStyle =  "#FF62EC";
      this.ctx2.current.globalAlpha = this.animationOpacity;
      this.ctx2.current.beginPath();
      this.ctx2.current.arc(this.game.player.x, this.game.player.y, this.animationRadius, 0, 2 * Math.PI);
      this.ctx2.current.fill();
      this.ctx2.current.closePath();
  
      this.animationRadius += 1.6;
      this.animationOpacity += 0.05;
      this.animationOpacity = Math.round((this.animationOpacity + Number.EPSILON) * 100) / 100;
  
      if (this.animationOpacity >= 0.4) {
        this.animationOpacity = this.animationOpacity * -1;
      }

  }

  drawAll() {
    this.drawPlayer();
    this.drawEnemies();
    this.drawProjectiles();
  }

  drawPlayer() {
    this.game.player.draw();
  }

  drawEnemies() {
    for (let i = 0; i < this.game.enemies.length; i++) {
      this.game.enemies[i].draw();
    }
  }

  drawProjectiles() {
    for (let i = 0; i < this.game.projectiles.length; i++) {
      this.game.projectiles[i].draw();
    }
  }

  drawObject(object, color, isFill) {
   // this.ctx.current.globalAlpha = 1.0;
    this.ctx.current.beginPath();
    this.ctx.current.rect(object.x, object.y, object.w, object.h);
    if (isFill) {
      this.ctx.current.fillStyle = color;
      this.ctx.current.fill();
    } else {
      this.ctx.current.strokeStyle = color;
      this.ctx.current.stroke();
    }
    this.ctx.current.closePath();
  }
}
