import Item from "./Item";
import { colors, getItemsStats, itemBuffConfig } from "../services/services";
import atkSpeedImage from "../images/atkSpeed.png";

const shadowColor = colors.blue;

export class AtkSpeed extends Item {
  constructor(game) {
    super(game);
    this.x = 0;
    this.y = 0;
    this.w = itemBuffConfig.width;
    this.h = itemBuffConfig.height;

    this.offStepY = -this.h;
    this.color = itemBuffConfig.color;
    this.opacity = itemBuffConfig.opacity;
    this.shadowColor = shadowColor;
    this.shadowBlur = itemBuffConfig.shadowBlur;
    this.s = itemBuffConfig.s;
    this.a = itemBuffConfig.a;
    this.isFill = itemBuffConfig.isFill;
    this.isInteractable = true;
    this.atkSpeedIncrease = getItemsStats.atkSpeedTier1;
    this.spawnRangeMinX = 0;
    this.spawnRangeMaxX = 0;
    this.imageSrc = atkSpeedImage;
    //this.effectType = "atkspeed";   for different effects to lay
  }

  onDeath() {
    this.game.init.addEffect(this, "defaultBuff");
  }

  applyBuff() {
    this.game.statusEffects.increaseAtkSpeed(this.atkSpeedIncrease);
  }

  setMinSpawnRange() {
    this.spawnRangeMinX = this.w;
    this.spawnRangeMaxX = this.game.collision.boardWidth - this.w;
  }
}
