import Item from "./Item";
import { colors, getItemsStats, itemBuffConfig } from "../services/services";
import medkitImage from "../images/medkit.png";

const shadowColor = colors.red;

export class Medkit extends Item {
  constructor(game) { 
    super(game); 
    this.x = 0;
    this.y = 0;
    this.w = itemBuffConfig.w;
    this.h = itemBuffConfig.h;

    this.offStepY = -this.h;
    this.color = itemBuffConfig.color;
    this.opacity = itemBuffConfig.opacity;
    this.shadowColor = shadowColor;
    this.shadowBlur = itemBuffConfig.shadowBlur;
    this.s = itemBuffConfig.s;
    this.a = itemBuffConfig.a;
    this.isFill = itemBuffConfig.isFill;
    this.isInteractable = true;
    this.restoredHP = getItemsStats.medkitTier1;
    this.spawnRangeMinX = 0;
    this.spawnRangeMaxX = 0;
    this.imageSrc = medkitImage;
    //this.effectType = "medkit";   for different effects to play
  }

  onDeath() {
    this.game.init.addEffect(this, "defaultBuff");
  }

  setMinSpawnRange() {
    this.spawnRangeMinX = this.w;
    this.spawnRangeMaxX = this.game.collision.boardWidth - this.w;
  }

  applyBuff() {
    this.game.statusEffects.restoreHealth(this.restoredHP);
  }
}
