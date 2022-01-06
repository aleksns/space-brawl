import { colors, getHPColor, getStatusEffectsBar } from "../services/services";
const textColor = getStatusEffectsBar.color;

const hpBarHeight = 5;
const hpBarLineWidth = 0.5;
const hpBarYPos = -20;

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

    //this.drawStatusEffects();
  }

  drawStatusEffect(item) {
    console.log(`drawStatusEffect`);
    var image = new Image();
    image.src = item.image;
    this.drawRect(item, this.ctx);
    this.ctx.current.drawImage(image, item.x, item.y, item.w, item.h);
    this.drawText(item);
  }

  // drawStatusBar(item) {
  //   this.drawRect(item, this.ctx);
  //   this.drawText(item);
  // }

  drawText(item) {
    this.ctx.current.fillStyle = textColor;
    this.ctx.current.font = `22px tahoma`;
    this.ctx.current.fillText(
      item.text,
      item.x + 5, // hardcoded, change later
      item.y - 5
    );
  }

  drawItems() {
    for (let i = 0; i < this.game.items.length; i++) {
      this.drawItem(this.game.items[i]);
    }
  }

  drawItem(item) {
    this.drawRect(item, this.ctx);
    var image = new Image();
    image.src = item.imageSrc;
    this.ctx.current.drawImage(image, item.x, item.y, item.w, item.h);
  }

  drawBgElements() {
    for (let i = 0; i < this.game.bgElements.length; i++) {
      this.drawBgElement(this.game.bgElements[i]);
    }
  }

  drawBgElement(element) {
    this.drawRect(element, this.ctx3);
  }

  // drawPlayer() {
  //   if (this.game.player.isGotHit) {
  //     //this.game.player.color = this.game.player.colorHitReg;
  //     this.game.player.isGotHit = false;
  //   } else {
  //     this.game.player.color = this.game.player.colorDefault; ///change later on a variable
  //   }
  //   this.drawItem(this.game.player);
  //   this.drawRect(this.game.player, this.ctx);
  // }

  drawPlayer() {
    if (this.game.player.isGotHit) {
      this.ctx.current.filter = "saturate(0%) brightness(150%)";
      this.game.player.isGotHit = false;
    }

    this.drawItem(this.game.player);
    this.ctx.current.filter = "none";
  }

  drawEnemies() {
    for (let i = 0; i < this.game.enemies.length; i++) {
      this.drawEnemy(this.game.enemies[i]);
    }
  }

  drawEnemy(enemy) {
    if (enemy.isGotHit) {
      this.ctx.current.filter = "saturate(50%) brightness(150%)";
      enemy.isGotHit = false;
    }
    this.drawItem(enemy);                   
    this.ctx.current.filter = "none";
    this.drawEnemyHpBar(enemy);
  }

  drawEnemyHpBar(enemy) {
    let remainingHPBar = enemy.health / enemy.maxHealth;
    let dW = enemy.w * remainingHPBar;
    let y = enemy.y + hpBarYPos;

    this.ctx.current.beginPath();
    this.ctx.current.lineWidth = hpBarLineWidth;
    this.ctx.current.strokeStyle = "#ffffff";
    this.ctx.current.rect(enemy.x, y, enemy.w, hpBarHeight)
    this.ctx.current.stroke();
    this.ctx.current.closePath();

    this.ctx.current.beginPath();
    this.ctx.current.fillStyle = colors.red;
    this.ctx.current.rect(enemy.x, y, dW, hpBarHeight)
    this.ctx.current.fill();
    this.ctx.current.closePath();
  }

  // drawEnemy(enemy) {
  //   if (enemy.isGotHit) {
  //     enemy.color = colors.colorHitReg;
  //     enemy.isGotHit = false;
  //   } else {
  //     enemy.color = enemy.colorDefault;
  //   }
  //   this.drawItem(enemy);
  //   this.drawRect(enemy, this.ctx);
  // }

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
