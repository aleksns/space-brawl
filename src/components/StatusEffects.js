import {
  itemBuffConfig,
  getStatusEffectsBar,
  getBuffsDuration,
} from "../services/services";
import atkSpeedImage from "../images/atkSpeed.png";

export default class StatusEffects {
  constructor(game) {
    this.game = game;

    this.statusEffectsBar = {
      w: getStatusEffectsBar.w,
      h: getStatusEffectsBar.h,
      x: getStatusEffectsBar.x,
      y: getStatusEffectsBar.y,
      color: getStatusEffectsBar.color,
      isFill: getStatusEffectsBar.isFill,
      shadowColor: getStatusEffectsBar.shadowColor,
      shadowBlur: getStatusEffectsBar.shadowBlur,
      opacity: getStatusEffectsBar.opacity,
      text: "Active effects",
    };

    this.atkSpeed = {
      value: 0.2,
      now: 0,
      id: "atkSpeed",
      x: itemBuffConfig.statusEffectX,
      y: itemBuffConfig.statusEffectY,
      w: itemBuffConfig.w,
      h: itemBuffConfig.h,
      xPosText: itemBuffConfig.statusEffectX + 5,
      yPosText: itemBuffConfig.statusEffectY - 5,
      imageSrc: atkSpeedImage,
      image: new Image(),
      isApplied: false,
      opacity: itemBuffConfig.opacity,
      isFill: itemBuffConfig.isFill,
      color: "transparent",
      shadowColor: "transparent",
      shadowBlur: 0,
      globalAlpha: 1.0,
      text: 0,
    };

    this.statusEffects = [];
    this.statusEffects.push(this.atkSpeed);

    this.statusEffects[0].image.src = this.statusEffects[0].imageSrc;
    this.now = 0; //tbd
  }

  startTimers() {
    this.statusEffects[0].now = Date.now();
    this.now = Date.now(); //tbd
  }

  update() {
    this.atkSpeed.now = Date.now();
    let timePassed = (this.atkSpeed.now - this.atkSpeed.then) / 1000;
    if (timePassed >= getBuffsDuration.atkSpeed && this.atkSpeed.isApplied) {
      this.atkSpeed.isApplied = false;
      this.restorePlayerAtkSpeed();
    }
    if (this.isAtkSpeedBuffApplied()) {
      let updatedText = getBuffsDuration.atkSpeed - timePassed;
      updatedText = Math.round((updatedText + Number.EPSILON) * 100) / 100;
      this.atkSpeed.text = updatedText;
      this.game.draw.drawStatusEffect(this.atkSpeed);
    }
  }

  isAtkSpeedBuffApplied() {
    return this.atkSpeed.isApplied;
  }

  restorePlayerAtkSpeed() {
    this.game.stats.player.atkSpeed /= this.atkSpeed.value;
    this.game.player.updateSpeedStats();
  }

  restoreHealth(amount) {
    this.game.player.health += amount;
    if (this.game.player.health > this.game.player.maxHealth) {
      this.game.player.health = this.game.player.maxHealth;
    }
  }

  applyAtkSpeedStatusEffect() {
    this.atkSpeed.then = this.atkSpeed.now;
    this.atkSpeed.isApplied = true;

    let newAtkSpeed = this.game.stats.player.atkSpeed * this.atkSpeed.value;
    newAtkSpeed = Math.round((newAtkSpeed + Number.EPSILON) * 100) / 100;
    this.game.stats.player.atkSpeed = newAtkSpeed;

    if (this.isAtkSpeedCapReached()) {
      this.game.stats.player.atkSpeed = this.game.stats.player.atkSpeedCap;
    }
    this.game.player.updateSpeedStats();
  }

  isAtkSpeedCapReached() {
    return (
      this.game.stats.player.atkSpeed <= this.game.stats.player.atkSpeedCap
    );
  }
}
