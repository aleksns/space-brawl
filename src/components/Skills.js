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
      value: 4,
      now: 0,
      then: 0,
      cd: 0,
      duration: 8,
      id: "atkSpeed",
      x: itemBuffProps.statusEffectX,
      y: itemBuffProps.statusEffectY,
      w: itemBuffProps.w,
      h: itemBuffProps.h,
      textX: itemBuffProps.statusEffectX + 5,
      textY: itemBuffProps.statusEffectY - 5,
      font: "22px tahoma",
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
      atkSpeedPlayer: 10,
      speedPlayer: 10,
      sProjPlayer: 10,
      atkSpeedGlobal: 55,
      speedGlobal: 120,
      duration: 3,
      cd: 6,
      remainingCD: 0,
      isApplied: false,
      isOnCD: false,
      then: 0,
      id: "slowTime",
    };

    this.shield = {
      duration: 4,
      cd: 9,
      remainingCD: 0,
      isApplied: false,
      isOnCD: false,
      then: 0,
      id: "shield",
    };

    this.laser = {
      duration: 8,
      cd: 30,
      remainingCD: 0,
      isApplied: false,
      isOnCD: false,
      then: 0,
      id: "laser",
    };

    this.skills = [];
    this.skills.push(this.atkSpeed);
    this.skills.push(this.slowTime);
    this.skills.push(this.shield);
    this.skills.push(this.laser);

    this.timeBeforeSlow = 0;
  }

  initialize() {
    this.game.stats.setNewSlowModifiers(this.slowTime);
  }

  updateTimersAfterPauseOff() {
    for (let i = 0; i < this.skills.length; i++) {
      this.skills[i].then += this.game.timeDifference;
    }
  }

  update() {
    this.updateSlowTimeSkill();
    this.updateLaserSkill();
    this.updateAtkSpeedSkill();
  }

  turnOnSlowTimeSkill() {
    let timePassed = (this.game.now - this.slowTime.then) / 1000;
    if (timePassed <= this.slowTime.cd || this.slowTime.isApplied) {
      return;
    }

    this.updateTimersBeforeSlowSkill();
    this.slowTime.then = this.game.now;
    this.slowTime.isApplied = true;
    this.game.stats.decreaseSpeedOfEverything();
  }

  turnOffSlowTimeSkill() {
    this.game.stats.increaseSpeedOfEverything();
    this.slowTime.isApplied = false;
    this.updateTimersAfterSlowSkill()
  }

  updateTimersBeforeSlowSkill() {
    this.timeBeforeSlow = this.game.now;
  }

  updateTimersAfterSlowSkill() {
    let slowTimeDifference =  this.game.now - this.timeBeforeSlow;
    for (let i = 0; i < this.skills.length; i++) {
      //this.skills[i].then += slowTimeDifference;    //toDo - assign diferent variable to CD calculation, to avoid reseting CD
    }
  }

  turnOnLaserSkill() {
    let timePassed = (this.game.now - this.laser.then) / 1000;
    if (timePassed <= this.laser.cd || this.laser.isApplied) {
      return;
    }
    this.laser.then = this.game.now;
    this.laser.isApplied = true;
    this.game.player.laserGun.resetLaser();
    this.game.player.isLaserOn = true;
  }

  turnOffLaserSkill() {
    this.laser.isApplied = false;
    this.game.player.isLaserOn = false;
    for (let i = 0; i < this.game.playerProjectiles.length; i++) {
      if (this.game.playerProjectiles[i].isLaser) {
        this.game.playerProjectiles[i].setDead();
      }
    }
  }

  turnOnShieldSkill() {
    console.log(`Shield has been activated`);
  }

  updateSkillRemainingCD(skill) {
    if (!skill.isOnCD && !skill.isApplied) {
      return;
    }
    skill.remainingCD = (this.game.now - skill.then) / 1000;
    if (skill.remainingCD <= skill.cd) {
      skill.isOnCD = true;
    } else {
      skill.isOnCD = false;
    }
  }
  ////

  updateAtkSpeedSkill() {
    if (!this.atkSpeed.isApplied) {
      return;
    }

    let timePassed = (this.game.now - this.atkSpeed.then) / 1000;
    if (
      timePassed >= this.atkSpeed.duration ||
      this.game.isGlobalActionRestricted
    ) {
      this.turnOffAtkSpeedSkill();
    }

    let updatedText = this.atkSpeed.duration - timePassed;
    updatedText = Math.round((updatedText + Number.EPSILON) * 100) / 100;
    this.atkSpeed.text = updatedText;
    this.game.draw.drawStatusEffect(this.atkSpeed);
  }

  updateSlowTimeSkill() {
    this.updateSkillRemainingCD(this.slowTime);
    if (!this.slowTime.isApplied) {
      return;
    }

    let timePassed = (this.game.now - this.slowTime.then) / 1000;

    if (
      timePassed >= this.slowTime.duration ||
      this.game.isGlobalActionRestricted
    ) {
      this.turnOffSlowTimeSkill();
    }
  }

  updateLaserSkill() {
    this.updateSkillRemainingCD(this.laser);

    if (!this.laser.isApplied) {
      return;
    }

    if(this.game.stats.isGlobalSlowAll) {
      return;
    }
    let timePassed = (this.game.now - this.laser.then) / 1000;
    this.changeLaserWidthDependingOnRemainingTime(timePassed);

    if (
      timePassed >= this.laser.duration ||
      this.game.isGlobalActionRestricted
    ) {
      this.turnOffLaserSkill();
    }
  }

  turnOnAtkSpeedSkill() {
    if (this.atkSpeed.isApplied) {
      this.atkSpeed.then = this.game.now;
      return;
    }
    this.atkSpeed.then = this.game.now;
    this.atkSpeed.isApplied = true;

    this.game.stats.increaseGunsAtkSpeed(
      this.game.playerGuns,
      this.atkSpeed.value
    );
  }

  turnOffAtkSpeedSkill() {
    this.atkSpeed.isApplied = false;
    this.game.stats.decreaseGunsAtkSpeed(
      this.game.playerGuns,
      this.atkSpeed.value
    );
  }

  restoreHealth(amount) {
    this.game.player.health += amount;
    if (this.game.player.health > this.game.player.maxHealth) {
      this.game.player.health = this.game.player.maxHealth;
    }
  }

  changeLaserWidthDependingOnRemainingTime(timePassed) {
    let remainingTime = this.laser.duration - timePassed;
    let remainingLaserW = remainingTime / this.laser.duration;
    let dW = this.game.player.laserGun.laserProjectile.dW * remainingLaserW;
    this.game.player.laserGun.laserProjectile.setLaserWidth(dW);
  }
}
