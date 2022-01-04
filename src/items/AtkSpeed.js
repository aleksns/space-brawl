import Item from "./Item";
import {
  colors,
  getRandomInt,
  getRandomDecimal,
  getTrueBasedOnChance,
} from "../services/services";

const width = 50;
const height = 50;
const color = "transparent";
//s - speed, a - acceleration
const s = 1;
const a = s / 10;

export class AtkSpeed extends Item {
  constructor(game) {
    super(game);
    this.x = 0;
    this.y = 0;
    this.w = width;
    this.h = height;

    this.offStepY = -this.h;
    this.color = color;
    this.opacity = 1.0;
    this.shadowColor = color;
    this.shadowBlur = 20;
    this.s = s;
    this.a = a;
    this.isFill = false;
    this.isInteractable = true;
    this.atkSpeedIncrease = 0.09;
    //this.effectType = "atkspeed";   for different effects to lay
  }

  applyBuff() {
    this.game.statusEffects.increaseAtkSpeed(this.atkSpeedIncrease);
  }

  spawnMedkit() {
    this.x = 300;
    this.y = 10;
  }

  playPickedUpEffect() {
    this.game.init.addEffect(this, "defaultBuff")
  }

}
