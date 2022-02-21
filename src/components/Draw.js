import { Pulse } from "../effects/Pulse";
import { colors, GAME_WIDTH } from "../services/services";
import { HpBarPlayer } from "../ui/HpBarPlayer";
import { LevelAndScore } from "../ui/LevelAndScore";
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
    this.levelAndScore = this.game.levelAndScore;
    // projectile filters
    this.brightnessNum = 100;
    this.saturationNum = 100;
    this.brightnessModifier = 1;
    this.saturationModifier = -1.5;
    this.brightnessMin = 100;
    this.brightnessMax = 130;
    this.saturationMin = 60;
    this.saturationMax = 100;
    this.filter = `saturate(${this.saturationNum}%) brightness(${this.brightnessNum}%)`;
  }

  drawAll() {
    this.drawBgElements();
    this.drawProjectiles();
    this.drawItems();

    this.drawPlayer();
    this.drawEnemies();


    ///test
    this.ctx.current.beginPath();
    this.ctx.current.rect(
      this.game.player.destination.x,
      this.game.player.destination.y,
      this.game.player.destination.w,
      this.game.player.destination.h
    );
      this.ctx.current.strokeStyle = "green";
      this.ctx.current.stroke();
    this.ctx.current.closePath();
      ///test


    if (this.game.isGlobalActionRestricted) {
      return;
    }
    this.drawEffects();
    this.drawUI(this.ctx);
  }

  drawUIOnInit() {
    this.drawObject(this.hpBarPlayer.hpBarImageProps, this.ctx5);
    this.drawObject(this.threatBar.threatBarImageProps, this.ctx5);
    //this.drawObject(this.levelAndScore.levelImageProps, this.ctx5);
  }

  drawCutscene(cutscene, ctx) {
    cutscene.draw(ctx);
  }

  drawUI() {
    this.hpBarPlayer.draw(this.ctx4);
    this.threatBar.draw(this.ctx4);
    this.levelAndScore.draw(this.ctx4);
    this.skillsBar.draw(this.ctx4);
  }

  drawStatusEffect(item) {
    this.ctx.current.drawImage(item.image, item.x, item.y, item.w, item.h);
    this.drawText(item);
  }

  drawText(item) {
    this.ctx4.current.globalAlpha = item.textOpacity;
    this.ctx4.current.fillStyle = item.textColor;
    this.ctx4.current.font = item.font;
    this.ctx4.current.fillText(item.text, item.textX, item.textY);
    this.ctx4.current.globalAlpha = 1.0;
  }

  drawItems() {
    for (let i = 0; i < this.game.items.length; i++) {
      this.drawObject(this.game.items[i], this.ctx);
    }
    for (let i = 0; i < this.game.coins.length; i++) {
      this.drawObject(this.game.coins[i], this.ctx);
    }
  }

  drawObject(object, ctx) {
    if (object.shadowBlur != null && object.shadowColor != null) {
      ctx.current.shadowColor = object.shadowColor;
      ctx.current.shadowBlur = object.shadowBlur;
    }

    ctx.current.filter = object.filter;
    ctx.current.globalAlpha = object.opacity;
    ctx.current.drawImage(object.image, object.x, object.y, object.w, object.h);
    ctx.current.filter = "none";

    if (object.shadowBlur != null && object.shadowColor != null) {
      ctx.current.shadowColor = "none";
      ctx.current.shadowBlur = 0;
    }
  }

  drawBgElements() {
    for (let i = 0; i < this.game.bgElements.length; i++) {
      this.drawBgElement(this.game.bgElements[i]);
    }
  }

  drawBgElement(element) {
    this.drawObject(element, this.ctx3);
  }

  drawPlayer() {
    if (this.game.player.isGotHit) {
      this.game.player.filter = hitRegFilter;
      this.game.player.isGotHit = false;
    } else {
      this.game.player.filter = "none";
    }

    this.drawObject(this.game.player, this.ctx);

    // this.ctx.current.lineWidth = 12;
    // this.ctx.current.beginPath();
    // this.ctx.current.rect(this.game.player.x, this.game.player.y, this.game.player.w, this.game.player.h);
    //   this.ctx.current.strokeStyle = "green";
    //   this.ctx.current.stroke();
    // this.ctx.current.closePath();

    if (this.game.player.isShieldOn) {
      this.drawObject(this.game.player.shieldOrb.props, this.ctx);
    }
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
    } else {
      enemy.filter = "none";
    }
    this.drawObject(enemy, this.ctx);
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
    this.updateFilter();
    for (let i = 0; i < this.game.enemyProjectiles.length; i++) {
      this.game.enemyProjectiles[i].setFilter(this.filter);
      this.drawObject(this.game.enemyProjectiles[i], this.ctx);
    }
    for (let i = 0; i < this.game.playerProjectiles.length; i++) {
      this.game.playerProjectiles[i].setFilter(this.filter);
      this.drawObject(this.game.playerProjectiles[i], this.ctx);
    }
  }

  drawEffects() {
    // if(this.game.isGlobalActionRestricted) {
    //   return;
    // }
    for (let i = 0; i < this.game.effects.length; i++) {
      //this.drawEffect(this.game.effects[i]);
      this.game.effects[i].draw(this.ctx2);
    }
  }

  drawRect(object, ctx) {
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

  drawVisionRange(visionRange) {
    this.ctx.current.strokeStyle = visionRange.color;
    this.ctx.current.lineWidth = 3;
    this.ctx.current.beginPath();
    this.ctx.current.arc(
      visionRange.x,
      visionRange.y,
      visionRange.r,
      0,
      2 * Math.PI
    );
    this.ctx.current.stroke();
    this.ctx.current.closePath();
  }

  updateFilter() {
    this.brightnessNum += this.brightnessModifier;
    this.saturationNum += this.saturationModifier;

    if (
      this.brightnessNum >= this.brightnessMax ||
      this.brightnessNum < this.brightnessMin
    ) {
      this.brightnessModifier = -this.brightnessModifier;
    }

    if (
      this.saturationNum >= this.saturationMax ||
      this.saturationNum < this.saturationMin
    ) {
      this.saturationModifier = -this.saturationModifier;
    }

    this.filter = `saturate(${this.saturationNum}%) brightness(${this.brightnessNum}%)`;
  }
}
