import Item from "./Item";
import { colors, getItemsStats } from "../services/services";
import medkitImage from "../images/medkit.png";

const shadowColor = colors.red;

export class Medkit extends Item {
  constructor(game) { 
    super(game); 
    this.w = this.itemBuffProps.w;
    this.h = this.itemBuffProps.h;

    this.offStepY = -this.h;
    this.color = this.itemBuffProps.color;
    this.opacity = this.itemBuffProps.opacity;
    this.shadowColor = shadowColor;
    this.shadowBlur = this.itemBuffProps.shadowBlur;
    this.s = this.itemBuffProps.s;
    //this.a = this.itemBuffProps.a;
    this.isFill = this.itemBuffProps.isFill;
    this.isInteractable = true;
    this.restoredHP = getItemsStats.medkitTier1;
    this.spawnRangeMinX = 0;
    this.spawnRangeMaxX = 0;

    this.image = new Image();
    this.image.src = medkitImage;
    this.isSpawnOnInit = false;
    //this.effectType = "medkit";   for different effects to play
  }

  initializeItem() {
    this.randomize();
  }

  onDeath() {
    this.game.init.addEffect(this, "defaultBuff");
  }

  applyBuff() {
    this.game.skills.restoreHealth(this.restoredHP);
  }

  setMinSpawnRange() {
    this.spawnRangeMinX = this.w;
    this.spawnRangeMaxX = this.game.gameBoard.width - this.w;
  }
}
