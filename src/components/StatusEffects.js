import { getPlayerDefaultStats, getBuffsDuration } from "../services/services";

export default class StatusEffects {
  constructor(game) {
    this.game = game;

    this.statusEffects = [
      this.atkSpeed = {
        now: 0,
        //tbd
      }
    ]

    this.now = 0;   //tbd
  }

  startTimers() {
    this.statusEffects[0].now = Date.now();
    this.now = Date.now();      //tbd
  }

  updateBuffRemainingTime() {
    this.statusEffects[0].now = Date.now();
    let timePassed = (this.statusEffects[0].now - this.statusEffects[0].then) / 1000;   //hardcoded get by index method
    //console.log(`atk.now - atk.then = ${(this.statusEffects[0].now - this.statusEffects[0].then) / 1000}`)
    if (timePassed >= getBuffsDuration.atkSpeed) {
      this.setPlayerAtkSpeadToDefault();
    }
  }

  setPlayerAtkSpeadToDefault() {
    this.game.stats.player.atkSpeed = getPlayerDefaultStats.atkSpeed;
  }

  restoreHealth(amount) {
    this.game.player.health += amount;
    if (this.game.player.health > 100) {
      this.game.player.health = 100;
    }
  }

  increaseAtkSpeed(value) {
    this.statusEffects[0].then = this.statusEffects[0].now;   //hardcoded index value
    let newAtkSpeed = this.game.stats.player.atkSpeed - value;
    newAtkSpeed = Math.round((newAtkSpeed + Number.EPSILON) * 100) / 100;
    this.game.stats.player.atkSpeed = newAtkSpeed;
    if (this.isAtkSpeedCapReached()) {
      this.game.stats.player.atkSpeed = this.game.stats.player.atkSpeedCap;
    }
  }

  isAtkSpeedCapReached() {
    return (
      this.game.stats.player.atkSpeed <= this.game.stats.player.atkSpeedCap
    );
  }
}
