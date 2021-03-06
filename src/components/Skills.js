import { itemBuffProps, GAME_WIDTH, GAME_HEIGHT, font } from "../services/services";
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
      value: 2,
      now: 0,
      then: 0,
      cd: 0,
      duration: 8,
      id: "atkSpeed",
      x: itemBuffProps.statusEffectX,
      y: itemBuffProps.statusEffectY,
      w: itemBuffProps.w,
      h: itemBuffProps.h,
      textX: itemBuffProps.statusEffectX + 18,
      textY: itemBuffProps.statusEffectY - 5,
      font: `22px ${font}`,
      imageSrc: atkSpeedImage,
      image: new Image(),
      isApplied: false,
      opacity: itemBuffProps.opacity,
      isFill: itemBuffProps.isFill,
      color: skillCdColor,
      text: 0,
    };
    this.atkSpeed.image.src = this.atkSpeed.imageSrc;

    this.slowTime = {
      atkSpeedPlayer: 2,
      speedPlayer: 5,
      sProjPlayer: 5,
      atkSpeedGlobal: 55,
      speedGlobal: 120,
      duration: 3,
      cd: 9,
      remainingCD: 0,
      isApplied: false,
      isOnCD: false,
      then: 0,
      id: "slowTime",
    };

    this.shield = {
      duration: 5,
      cd: 10,
      remainingCD: 0,
      isApplied: false,
      isOnCD: false,
      then: 0,
      id: "shield",
    };

    this.laser = {
      duration: 4,
      cd: 14,
      remainingCD: 0,
      isApplied: false,
      isOnCD: false,
      then: 0,
      id: "laser",
    };

    this.skills = [];
    //this.skills.push(this.atkSpeed);
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
    this.updateShieldSkill();
    this.updateAtkSpeedSkill();
  }

  turnOnSlowTimeSkill() {
    let timePassed = (this.game.now - this.slowTime.then) / 1000;
    if (timePassed <= this.slowTime.cd || this.slowTime.isApplied) {
      return;
    }

    this.slowTime.then = this.game.now;
    this.slowTime.isApplied = true;
    this.game.stats.decreaseSpeedOfEverything();
  }

  turnOffSlowTimeSkill() {
    this.game.stats.increaseSpeedOfEverything();
    this.slowTime.isApplied = false;
    this.game.init.updateTimers();
    this.game.playerTeam[0].resetVelocity();
  }

  updateTimersBeforeSlowSkill() {
    this.timeBeforeSlow = this.game.now;
  }

  updateTimersAfterSlowSkill() {
    let slowTimeDifference = this.game.now - this.timeBeforeSlow;
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
    this.game.playerTeam[0].laserGun.resetLaser();
    this.game.playerTeam[0].isLaserOn = true;
  }

  turnOffLaserSkill() {
    this.laser.isApplied = false;
    this.game.playerTeam[0].isLaserOn = false;
    for (let i = 0; i < this.game.playerProjectiles.length; i++) {
      if (this.game.playerProjectiles[i].isLaser) {
        this.game.playerProjectiles[i].setDead();
      }
    }
  }

  turnOnShieldSkill() {
    let timePassed = (this.game.now - this.shield.then) / 1000;
    if (timePassed <= this.shield.cd || this.shield.isApplied) {
      return;
    }
    this.shield.then = this.game.now;
    this.shield.isApplied = true;
    this.game.playerTeam[0].isShieldOn = true;
  }

  turnOffShieldSkill() {
    this.shield.isApplied = false;
    this.game.playerTeam[0].isShieldOn = false;
    this.game.playerTeam[0].shieldOrb.reset();
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
    updatedText = Math.round((updatedText + Number.EPSILON));
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

    let timePassed = (this.game.now - this.laser.then) / 1000;
    this.changeLaserWidthDependingOnRemainingTime(timePassed);

    if (
      timePassed >= this.laser.duration ||
      this.game.isGlobalActionRestricted
    ) {
      this.turnOffLaserSkill();
    }
  }

  updateShieldSkill() {
    this.updateSkillRemainingCD(this.shield);

    if (!this.shield.isApplied) {
      return;
    }

    let timePassed = (this.game.now - this.shield.then) / 1000;
    if (timePassed >= this.shield.duration / 2) {
      this.changeShieldDependingOnRemainingTime(timePassed);
    }

    if (
      timePassed >= this.shield.duration ||
      this.game.isGlobalActionRestricted
    ) {
      this.turnOffShieldSkill();
    }
  }

  turnOnAtkSpeedSkill() {
    let text = `+ ${this.atkSpeed.value}00% ATK Speed`;
    this.game.init.addFloatingTextEffect("atkSpeed", text);

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

  resetAllSkillsCD() {
    for (let i = 0; i < this.skills.length; i++) {
      this.skills[i].remainingCD = 0;
      this.skills[i].then = 0;
      this.skills[i].isOnCD = false;
    }
  }

  turnOffAllSkills() {
    if (this.slowTime.isApplied) {
      this.turnOffSlowTimeSkill();
    }

    if (this.shield.isApplied) {
      this.turnOffShieldSkill();
    }

    if (this.atkSpeed.isApplied) {
      this.turnOffAtkSpeedSkill();
    }

    if (this.laser.isApplied) {
      this.turnOffLaserSkill();
    }
  }

  restoreHealth(amount) {
    this.game.playerTeam[0].health += amount;
    if (this.game.playerTeam[0].health > this.game.playerTeam[0].maxHealth) {
      this.game.playerTeam[0].health = this.game.playerTeam[0].maxHealth;
    }

    let text = `+ ${amount} HP`;
    this.game.init.addFloatingTextEffect("hp", text);
  }

  changeLaserWidthDependingOnRemainingTime(timePassed) {
    let remainingTime = this.laser.duration - timePassed;
    let remainingLaserW = remainingTime / this.laser.duration;
    let dW = this.game.playerTeam[0].laserGun.laserProjectile.dW * remainingLaserW;
    this.game.playerTeam[0].laserGun.laserProjectile.setLaserWidth(dW);
  }

  changeShieldDependingOnRemainingTime(timePassed) {
    let remainingTime = this.shield.duration - timePassed;
    let remainingShieldTime = remainingTime / this.shield.duration;
    let o = this.game.playerTeam[0].shieldOrb.props.opacityMax * remainingShieldTime;
    this.game.playerTeam[0].shieldOrb.setOpacity(o);
  }
}
