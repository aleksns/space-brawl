import { colors, getHPColor } from "../services/services";
import medkit from "../images/medkit.png";

export default class Draw {
  constructor(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.ctx2 = game.ctx2;
    this.ctx3 = game.ctx3;
  }

  drawAll() {
    this.drawBgElements();
    this.drawItems();
    this.drawPlayer();
    this.drawEnemies();
    this.drawProjectiles();
    this.drawEffects();
  }

  drawItems() {
    for (let i = 0; i < this.game.items.length; i++) {
      this.drawItem(this.game.items[i]);
    }
  }

  drawItem(item) {
    this.drawRect(item, this.ctx);
    var img = new Image();
    img.src = medkit;
    // this.ctx.current.shadowColor = 'red';
    // this.ctx.current.shadowBlur = 20;

    this.ctx.current.drawImage(img, item.x, item.y, item.w, item.h);
    //this.ctx.current.shadowBlur = 0;
  }

  drawBgElements() {
    for (let i = 0; i < this.game.bgElements.length; i++) {
      this.drawBgElement(this.game.bgElements[i]);
    }
  }

  drawBgElement(element) {
    this.drawRect(element, this.ctx3);
  }

  drawPlayer() {
    if (this.game.player.isGotHit) {
      this.game.player.color = colors.red;
      this.game.player.isGotHit = false;
    } else {
      this.game.player.color = "#5baac9"; ///change later on a variable
    }
    this.drawRect(this.game.player, this.ctx);
  }

  drawEnemies() {
    for (let i = 0; i < this.game.enemies.length; i++) {
      this.drawEnemy(this.game.enemies[i]);
    }
  }

  drawEnemy(enemy) {
    if (enemy.isGotHit) {
      enemy.color = colors.hitRegColor;
      enemy.isGotHit = false;
    } else {
      enemy.color = getHPColor(enemy.health);
    }
    this.drawRect(enemy, this.ctx);
  }

  drawProjectiles() {
    for (let i = 0; i < this.game.enemyProjectiles.length; i++) {
      this.drawRect(this.game.enemyProjectiles[i], this.ctx);
    }
    for (let i = 0; i < this.game.playerProjectiles.length; i++) {
      this.drawRect(this.game.playerProjectiles[i], this.ctx);
    }
  }

  drawEffects() {
    for (let i = 0; i < this.game.effects.length; i++) {
      this.drawEffect(this.game.effects[i]);
    }
  }

  drawEffect(effect) {
    this.drawArc(effect, this.ctx2);
  }

  drawRect(object, ctx) {
    ctx.current.shadowColor = object.shadowColor;
    ctx.current.shadowBlur = object.shadowBlur;
    ctx.current.globalAlpha = object.opacity;
    
    ctx.current.beginPath();
    ctx.current.rect(object.x, object.y, object.w, object.h);
    if (object.isFill) {
      ctx.current.fillStyle = object.color;
      ctx.current.fill();
    } else {
      ctx.current.strokeStyle = object.color;
      ctx.current.stroke();
    }
    ctx.current.closePath();
  }

  drawArc(object, ctx) {
    ctx.current.shadowColor = object.shadowColor;
    ctx.current.shadowBlur = object.shadowBlur;
    ctx.current.globalAlpha = object.opacity;

    ctx.current.beginPath();
    ctx.current.arc(object.x, object.y, object.radius, 0, 2 * Math.PI);

    if (object.isFill) {
      ctx.current.fillStyle = object.color;
      ctx.current.fill();
    } else {
      ctx.current.lineWidth = object.lineWidth;
      ctx.current.strokeStyle = object.color;
      ctx.current.stroke();
    }

    ctx.current.closePath();
  }
}
