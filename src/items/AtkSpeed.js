import Item from "./Item";
import { colors } from "../services/services";
import atkSpeedImage from "../images/atkSpeed.png";

const shadowColor = colors.blue;

export class AtkSpeed extends Item {
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
    //this.a = itemBuffProps.a;
    this.isFill = this.itemBuffProps.isFill;
    this.isInteractable = true;
    this.spawnRangeMinX = 0;
    this.spawnRangeMaxX = 0;

    this.image = new Image();
    this.image.src = atkSpeedImage;
    this.isSpawnOnInit = false;
    //this.effectType = "atkspeed";   for different effects to lay
  }

  initializeItem() {
    
    this.randomize();
  }

  onDeath() {
    this.game.init.addEffect(this, "defaultBuff");
  }

  applyBuff() {
    this.game.skills.applyAtkSpeedStatusEffect();
  }

  setMinSpawnRange() {
    this.spawnRangeMinX = this.w;
    this.spawnRangeMaxX = this.game.gameBoard.width - this.w;
  }
}
