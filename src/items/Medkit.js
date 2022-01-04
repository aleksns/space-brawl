import Item from "./Item";
import {
  colors,
  getRandomInt,
  getRandomDecimal,
  getTrueBasedOnChance,
} from "../services/services";

const width = 50;
const height = 50;
const color = "transparent"
//s - speed, a - acceleration
const s = 1;
const a = s / 10;

export class Medkit extends Item {
  constructor(game) {
    super(game);
    this.x = 0;
    this.y = 0;
    this.w = width;
    this.h = height;

    this.offStepY = -this.h;
    this.color = color;;
    this.opacity = 1.0;
    this.shadowColor = color;
    this.shadowBlur = 20;
    this.s = s;
    this.a = a;
    this.isFill = false;
    this.isInteractable = true;
    this.restoredHP = 25;
    this.spawnRangeMinX = 0;
    this.spawnRangeMaxX = 0;
    //this.effectType = "medkit";   for different effects to lay
  }

  setMinSpawnRange() {
    this.spawnRangeMinX = this.w / 2;
    this.spawnRangeMaxX = this.game.collision.boardWidth - this.w / 2;
    }

  applyBuff() {
    this.game.statusEffects.restoreHealth(this.restoredHP);
  }

  playPickedUpEffect() {
    this.game.init.addEffect(this, "defaultBuff")
  }

}
