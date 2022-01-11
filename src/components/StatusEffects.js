import {
  getPlayerDefaultStats,
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

    this.statusEffects = [
      (this.atkSpeed = {
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
      }),
    ];  

    this.statusEffects[0].image.src = this.statusEffects[0].imageSrc;
    this.now = 0; //tbd
  }

  startTimers() {
    this.statusEffects[0].now = Date.now();
    this.now = Date.now(); //tbd
  }

  update() {
    //this.game.draw.drawStatusBar(this.statusEffectsBar);

    this.statusEffects[0].now = Date.now();
    let timePassed =
      (this.statusEffects[0].now - this.statusEffects[0].then) / 1000; //hardcoded get by index method
    //console.log(`atk.now - atk.then = ${(this.statusEffects[0].now - this.statusEffects[0].then) / 1000}`)
    if (timePassed >= getBuffsDuration.atkSpeed) {
      this.statusEffects[0].isApplied = false;
      this.setPlayerAtkSpeadToDefault();
    }
    if (this.statusEffects[0].isApplied == true) {
      let updatedText = getBuffsDuration.atkSpeed - timePassed;
      updatedText = Math.round((updatedText + Number.EPSILON) * 100) / 100;
      this.statusEffects[0].text = updatedText;
      this.game.draw.drawStatusEffect(this.statusEffects[0]); ///hardcoded again - index
    }
  }

  setPlayerAtkSpeadToDefault() {
    this.game.player.atkSpeed = getPlayerDefaultStats.atkSpeed;
  }

  restoreHealth(amount) {
    this.game.player.health += amount;
    if (this.game.player.health > this.game.player.maxHealth) {
      this.game.player.health = this.game.player.maxHealth;
    }
  }

  applyAtkSpeedStatusEffect(value) {
    this.statusEffects[0].then = this.statusEffects[0].now; //hardcoded index value
    this.statusEffects[0].isApplied = true;

    let newAtkSpeed = this.game.player.atkSpeed - value;
    newAtkSpeed = Math.round((newAtkSpeed + Number.EPSILON) * 100) / 100;
    this.game.player.atkSpeed = newAtkSpeed;
    if (this.isAtkSpeedCapReached()) {
      this.game.player.atkSpeed = this.game.player.atkSpeedCap;
    }
  }

  isAtkSpeedCapReached() {
    return this.game.player.atkSpeed <= this.game.player.atkSpeedCap;
  }
}
