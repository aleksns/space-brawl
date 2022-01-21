import { itemBuffConfig } from "../services/services";
import atkSpeedImage from "../images/atkSpeed.png";

export default class Skills {
  constructor(game) {
    this.game = game;

    this.atkSpeed = {
      value: 0.2,
      now: 0,
      then: 0,
      cd: 0,
      duration: 10,
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
    this.atkSpeed.image.src = this.atkSpeed.imageSrc;

    this.slowTime = {
      atkSpeed: 55,
      speed: 120,
      now: 0,
      then: 0,
      cd: 12,
      duration: 3,
      id: "slowTime",
      isApplied: false,
      text: 0,
    };

    this.skills = [];
    this.skills.push(this.atkSpeed);
    this.skills.push(this.slowTime);

    this.now = 0; //tbd
  }

  startTimers() {
    //this.atkSpeed.now = Date.now();
    this.now = Date.now(); //tbd
  }

  update() {
    this.updateAtkSpeedStatusEffect();
    this.updateSlowTimeStatusEffect();
  }

  updateAtkSpeedStatusEffect() {
    this.atkSpeed.now = Date.now();
    if (!this.atkSpeed.isApplied) {
      return;
    }
    let timePassed = (this.atkSpeed.now - this.atkSpeed.then) / 1000;
    if (timePassed >= this.atkSpeed.duration) {
      this.restorePlayerAtkSpeed();
      this.atkSpeed.isApplied = false;
    }

    let updatedText = this.atkSpeed.duration - timePassed;
    updatedText = Math.round((updatedText + Number.EPSILON) * 100) / 100;
    this.atkSpeed.text = updatedText;
    this.game.draw.drawStatusEffect(this.atkSpeed);
  }

  updateSlowTimeStatusEffect() {
    this.slowTime.now = Date.now();
    if (!this.slowTime.isApplied) {
      return;
    }
    let timePassed = (this.slowTime.now - this.slowTime.then) / 1000;
    if (timePassed >= this.slowTime.duration) {
      this.game.stats.restoreSpeedOfEverything();
      this.slowTime.isApplied = false;
    }

    let updatedText = this.slowTime.duration - timePassed;
    updatedText = Math.round((updatedText + Number.EPSILON) * 100) / 100;
    this.slowTime.text = updatedText;
    //this.game.draw.drawStatusEffect(this.slowTime);
  }

  applySlowTimeStatusEffect() {
    this.slowTime.then = this.slowTime.now;
    this.slowTime.isApplied = true;
    this.game.stats.slowEverything();
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
