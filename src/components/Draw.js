import { Pulse } from "../effects/Pulse";
import { colors, GAME_WIDTH } from "../services/services";
import { HpBarPlayer } from "../ui/HpBarPlayer";
import { ThreatLevelBar } from "../ui/ThreatLevelBar";


const hitRegFilter = "saturate(50%) brightness(150%)";
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
    this.ctx5 = game.ctx5;

    this.skillsBar = this.game.skillsBar;
    this.hpBarPlayer = new HpBarPlayer(this.game);
    this.threatBar = new ThreatLevelBar(this.game);

    this.isDrawingAnimation = false;
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
    this.drawItem(this.hpBarPlayer.hpBarImageProps, this.ctx5);
    this.drawItem(this.threatBar.threatBarImageProps, this.ctx5);
  }

  // drawCurrentCutscene() {
  //   this.game.cutscenes.getCutsceneToDraw().draw(this.ctx);
  // }

  drawCutscene(cutscene) {
    cutscene.draw(this.ctx);
  }

  drawUI() {
    this.hpBarPlayer.draw(this.ctx4);
    this.threatBar.draw(this.ctx4);
    this.drawScore();

    this.skillsBar.draw(this.ctx4);
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
    this.ctx4.current.globalAlpha = item.textOpacity;
    this.ctx4.current.fillStyle = item.textColor;
    this.ctx4.current.font = `22px tahoma`;
    this.ctx4.current.fillText(
      item.text,
      item.textX,
      item.textY
    );
    this.ctx4.current.globalAlpha = 1.0;
  }

  drawItems() {
    for (let i = 0; i < this.game.items.length; i++) {
      this.drawItem(this.game.items[i], this.ctx);
    }
  }

  drawItem(item, ctx) {
    ctx.current.filter = item.filter;
    ctx.current.drawImage(item.image, item.x, item.y, item.w, item.h);
    ctx.current.filter = "none";
  }

  drawBgElements() {
    for (let i = 0; i < this.game.bgElements.length; i++) {
      this.drawBgElement(this.game.bgElements[i]);
    }
  }

  drawBgElement(element) {
    this.drawItem(element, this.ctx3);
  }

  drawPlayer() {
    if (this.game.player.isGotHit) {
      this.game.player.filter = hitRegFilter;
      this.game.player.isGotHit = false;
    }
    else {
      this.game.player.filter = "none";
    }

    this.drawItem(this.game.player, this.ctx);
  }

  drawEnemies() {
    for (let i = 0; i < this.game.enemies.length; i++) {
      this.drawEnemy(this.game.enemies[i]);
    }
  }

  drawEnemy(enemy) {
    if (enemy.isGotHit) {
      enemy.filter = hitRegFilter;
      enemy.isGotHit = false;
    }
    else {
      enemy.filter = "none";
    }
    this.drawItem(enemy, this.ctx);
    this.drawEnemyHpBar(enemy, this.ctx);
  }

  drawEnemyHpBar(enemy, ctx) {
    let remainingHPBar = enemy.health / enemy.maxHealth;
    let dW = enemy.w * remainingHPBar;
    let y = enemy.y + hpBarYOffset;

    ctx.current.beginPath();
    ctx.current.lineWidth = hpBarLineWidth;
    ctx.current.strokeStyle = "#ffffff";
    ctx.current.rect(enemy.x, y, enemy.w, hpBarHeight);
    ctx.current.stroke();
    ctx.current.closePath();

    ctx.current.beginPath();
    ctx.current.fillStyle = colors.red;
    ctx.current.rect(enemy.x, y, dW, hpBarHeight);
    ctx.current.fill();
    ctx.current.closePath();
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
      if(effect.isRect) {
        this.drawRect(effect, this.ctx2);
      }
    else {
    this.drawArc(effect, this.ctx2);
    }
  }

  drawRect(object, ctx) {
    ctx.current.shadowColor = object.shadowColor;
    ctx.current.shadowBlur = object.shadowBlur;
    ctx.current.globalAlpha = object.opacity;
    // ctx.current.lineJoin = object.lineJoin;
    // ctx.current.lineCap = object.lineCap;

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

    ctx.current.globalAlpha = 1.0;
  }

  drawArc(object, ctx) {
    ctx.current.shadowColor = object.shadowColor;
    ctx.current.shadowBlur = object.shadowBlur;
    ctx.current.globalAlpha = object.opacity;
    // ctx.current.lineJoin = object.lineJoin;
    // ctx.current.lineCap = object.lineCap;

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

    ctx.current.globalAlpha = 1.0;
  }
}
