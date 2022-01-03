import { colors } from "../services/services";

export default class Draw {
  constructor(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.ctx2 = game.ctx2;
  }

  drawAll() {
    this.drawPlayer();
    this.drawEnemies();
    this.drawProjectiles();

    this.drawEffects();
  }


  drawEffects() {
    for(let i = 0; i < this.game.effects.length; i++) {
      this.game.effects[i].play();
    }
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
    for (let i = 0; i < this.game.enemyProjectiles.length; i++) {
      //this.game.enemyProjectiles[i].draw();
      this.drawObject(this.game.enemyProjectiles[i], this.game.enemyProjectiles[i].currentColor, true);
    }

    for (let i = 0; i < this.game.playerProjectiles.length; i++) {
      //this.game.playerProjectiles[i].draw();
     this.drawObject(this.game.playerProjectiles[i], this.game.playerProjectiles[i].currentColor, true);
    }
  }

  // draw() {
  //     this.game.draw.drawObject(this, this.currentColor, true);
  // }

  drawTest(object, color, isFill) {
    //console.log(`object.vX = ${object.vX} AND object.vY = ${object.vY}`)
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

  drawArc(x, y, color, radius, lineWidth, isFill, opacity) { 
    this.ctx2.current.globalAlpha = opacity;
    this.ctx2.current.beginPath();
    this.ctx2.current.arc(x, y, radius, 0, 2 * Math.PI);

    if(isFill) {
      this.ctx2.current.fillStyle =  color;
      this.ctx2.current.fill();
    }
    else {
      this.ctx2.current.lineWidth = lineWidth;
      this.ctx2.current.strokeStyle =  color;
      this.ctx2.current.stroke();
    }
    
    this.ctx2.current.closePath();
  }

  // drawArc(x, y, color, radius, isFill, opacity) { 
  //   this.ctx2.current.globalAlpha = opacity;
  //   this.ctx2.current.beginPath();
  //   this.ctx2.current.arc(x, y, radius, 0, 2 * Math.PI);

  //   if(isFill) {
  //     this.ctx2.current.fillStyle =  color;
  //     this.ctx2.current.fill();
  //   }
  //   else {
  //     this.ctx2.current.strokeStyle =  color;
  //     this.ctx2.current.stroke();
  //   }
    
  //   this.ctx2.current.closePath();
  // }
}
