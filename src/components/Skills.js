import { itemBuffProps, GAME_WIDTH, GAME_HEIGHT } from "../services/services";
import atkSpeedImage from "../images/atkSpeed.png";

const skillCdColor = "grey";

const buffsContainerUI = {
  x: GAME_WIDTH - 220,
  y: GAME_HEIGHT - 85,
  w: 200,
  h: 75,
  color: "#FFC76B",
  isFill: false,
  shadowColor: "transparent",
  shadowBlur: 0,
  opacity: 0.4,
};

const buffUIProps = {
  x: buffsContainerUI.x + 10,
  y: buffsContainerUI.y - 10,
  w: 50,
  h: 50,
  color: "transparent",
  opacity: 1.0,
  shadowBlur: 20,
  isFill: false,
  statusEffectX: buffsContainerUI.x + 15,
  statusEffectY: buffsContainerUI.y + 10,
};

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
      x: itemBuffProps.statusEffectX,
      y: itemBuffProps.statusEffectY,
      w: itemBuffProps.w,
      h: itemBuffProps.h,
      textX: itemBuffProps.statusEffectX + 5,
      textY: itemBuffProps.statusEffectY - 5,
      imageSrc: atkSpeedImage,
      image: new Image(),
      isApplied: false,
      opacity: itemBuffProps.opacity,
      isFill: itemBuffProps.isFill,
      color: skillCdColor,
      // shadowColor: "transparent",
      // shadowBlur: 0,
      // globalAlpha: 1.0,
      text: 0,
    };
    this.atkSpeed.image.src = this.atkSpeed.imageSrc;

    this.slowTime = {
      atkSpeed: 55,
      speed: 120,
      duration: 3,
      cd: 12,
      remainingCD: 0,
      isApplied: false,
      isOnCD: false,
      now: 0,
      then: 0,
      id: "slowTime",
    };

    this.shield = {
      duration: 4,
      cd: 9,
      remainingCD: 0,
      isApplied: false,
      isOnCD: false,
      now: 0,
      then: 0,
      id: "shield",
    };

    this.laser = {
      duration: 5,
      cd: 10,
      remainingCD: 0,
      isApplied: false,
      isOnCD: false,
      now: 0,
      then: 0,
      id: "laser",
    };

    this.skills = [];
    this.skills.push(this.atkSpeed);
    this.skills.push(this.slowTime);
    this.skills.push(this.shield);
    this.skills.push(this.laser);

    this.now = 0;
  }

  startTimers() {
    //this.atkSpeed.now = Date.now();
    this.now = Date.now(); //tbd
    //this.slowTime.then = this.now;
  }

  update() {
    this.now = Date.now();
    this.updateAtkSpeedStatusEffect();
    this.updateSlowTimeStatusEffect();
  }

  useSlowTimeSkill() {
    let timePassed = (this.now - this.slowTime.then) / 1000;
    if (timePassed <= this.slowTime.cd || this.slowTime.isApplied) {
      return;
    }
    this.applySlowTimeStatusEffect();
  }

  useShieldSkill() {
    //this.applySlowTimeStatusEffect();
    console.log(`Shield has been activated`);
  }

  useLaserSkill() {
    //this.applySlowTimeStatusEffect();
    console.log(`Laser has been activated`);
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

    this.updateSlowTimeRemainingCD();

    if (!this.slowTime.isApplied) {
      return;
    }
    let timePassed = (this.slowTime.now - this.slowTime.then) / 1000;
    if (timePassed >= this.slowTime.duration) {
      this.game.stats.restoreSpeedOfEverything();
      this.slowTime.isApplied = false;
    }
  }

  updateSlowTimeRemainingCD() {
    if (!this.slowTime.isOnCD && !this.slowTime.isApplied) {
      return;
    }
    this.slowTime.remainingCD = (this.now - this.slowTime.then) / 1000;
    if (this.slowTime.remainingCD <= this.slowTime.cd) {
      this.slowTime.isOnCD = true;
    } else {
      this.slowTime.isOnCD = false;
    }
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
