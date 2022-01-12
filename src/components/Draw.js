import { Pulse } from "../effects/Pulse";
import { colors, getStatusEffectsBar, GAME_WIDTH } from "../services/services";
import { HpBarPlayer } from "../ui/HpBarPlayer";
import { ThreatLevelBar } from "../ui/ThreatLevelBar";

const textColor = getStatusEffectsBar.color;

const hpBarHeight = 5;
const hpBarLineWidth = 0.5;
const hpBarYOffset = -20;

export default class Draw {
  constructor(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.ctx2 = game.ctx2;
    this.ctx3 = game.ctx3;
    this.ctx4 = game.ctx4;

    this.hpBarPlayer = new HpBarPlayer(this.game);
    this.threatBar = new ThreatLevelBar(this.game);
  }

  updateUICanvas() {
    this.threatBar.update();
    //this.newEffect.update();
  }

  drawAll() {
    this.drawBgElements();
    this.drawProjectiles();
    this.drawEffects();
    this.drawItems();

    this.drawPlayer();
    this.drawEnemies();

    this.drawUI();
  }

  drawUIOnInit() {
    this.drawItem(this.hpBarPlayer.hpBarImageProps, this.ctx4);
    this.drawItem(this.threatBar.threatBarImageProps, this.ctx4);
  }

  drawLevelCutscene() {
    this.game.levelTransition.draw(this.ctx);
  }

  drawUI() {
    this.hpBarPlayer.draw(this.ctx);
    this.threatBar.draw(this.ctx);
    this.drawScore();

    //this.levelTransition.draw(this.ctx);
  }

  drawScore() {
    ///combine with draw text (status effects method)
    var score = "Score: " + this.game.score;
    this.ctx.current.fillStyle = colors.scoreColor;
    this.ctx.current.font = `bold 20px tahoma`;
    this.ctx.current.fillText(
      score,
      GAME_WIDTH - 250, // hardcoded, change later
      65
    );
  }

  drawStatusEffect(item) {
    this.ctx.current.drawImage(item.image, item.x, item.y, item.w, item.h);
    this.drawText(item);
  }

  drawText(item) {
    this.ctx.current.fillStyle = textColor;
    this.ctx.current.font = `22px tahoma`;
    this.ctx.current.fillText(
      item.text,
      item.xPosText, // hardcoded, change later
      item.yPosText
    );
  }

  drawItems() {
    for (let i = 0; i < this.game.items.length; i++) {
      this.drawRect(this.game.items[i], this.ctx);
      this.drawItem(this.game.items[i], this.ctx);
    }
  }

  drawItem(item, ctx) {
    //this.drawRect(item, ctx);
    ctx.current.drawImage(item.image, item.x, item.y, item.w, item.h);
  }

  drawBgElements() {
    for (let i = 0; i < this.game.bgElements.length; i++) {
      this.drawBgElement(this.game.bgElements[i]);
    }
  }

  drawBgElement(element) {
    //this.drawRect(element, this.ctx3);
    this.drawItem(element, this.ctx3);
  }

  drawPlayer() {
    if (this.game.player.isGotHit) {
      this.ctx.current.filter = "saturate(50%) brightness(150%)";
      this.game.player.isGotHit = false;
    }

    this.drawRect(this.game.player, this.ctx);
    this.drawItem(this.game.player, this.ctx);
    this.ctx.current.filter = "none";
  }

  drawEnemies() {
    //this.ctx.current.drawImage(this.img, 600, 300, 200, 95);
    for (let i = 0; i < this.game.enemies.length; i++) {
      this.drawEnemy(this.game.enemies[i]);
    }
  }

  drawEnemy(enemy) {
    if (enemy.isGotHit) {
      this.ctx.current.filter = "saturate(50%) brightness(150%)";
      enemy.isGotHit = false;
    }
    this.drawRect(enemy, this.ctx);
    this.drawItem(enemy, this.ctx);
    this.ctx.current.filter = "none";
    this.drawEnemyHpBar(enemy);
  }

  drawEnemyHpBar(enemy) {
    let remainingHPBar = enemy.health / enemy.maxHealth;
    let dW = enemy.w * remainingHPBar;
    let y = enemy.y + hpBarYOffset;

    this.ctx.current.beginPath();
    this.ctx.current.lineWidth = hpBarLineWidth;
    this.ctx.current.strokeStyle = "#ffffff";
    this.ctx.current.rect(enemy.x, y, enemy.w, hpBarHeight);
    this.ctx.current.stroke();
    this.ctx.current.closePath();

    this.ctx.current.beginPath();
    this.ctx.current.fillStyle = colors.red;
    this.ctx.current.rect(enemy.x, y, dW, hpBarHeight);
    this.ctx.current.fill();
    this.ctx.current.closePath();
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
    //   if(effect.isRect) {
    //     this.drawRect(effect, this.ctx2);
    //   }
    // else {
    this.drawArc(effect, this.ctx2);
    //}
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
