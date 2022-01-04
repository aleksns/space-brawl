import Item from "./Item";
import {
  getRandomInt,
  getRandomDecimal,
  getTrueBasedOnChance,
} from "../services/services";

const minWidth = 50;
const maxWidth = 300;
const minHeight = 50;
const maxHeight = 250;
const color = "#ffffff";
//s - speed, a - acceleration
const s = 8;
const a = s / 10;

export class BgElement extends Item {
  constructor(game) {
    super(game);
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;

    this.offStepX = 0;
    this.offStepY = 0;
    this.color = color;
    this.opacity = 0;
    this.s = s;
    this.a = a;
    this.isFill = undefined;
    this.shadowColor = "transparent";
    this.shadowBlur = 0;
    this.spawnRangeMinX = 0;
    this.spawnRangeMaxX = 0;
    this.isInteractable = false;
  }

  setRandomShape() {
    this.w = getRandomInt(minWidth, maxWidth);
    this.h = getRandomInt(minHeight, maxHeight);
    this.isFill = getTrueBasedOnChance(50);
    this.opacity = getRandomDecimal(0.05, 0.3);
  }

  setMinSpawnRange() {
  this.spawnRangeMinX = 0 - (this.w / 2);
  this.spawnRangeMaxX = this.game.collision.boardWidth + this.w / 2;
  }

}
