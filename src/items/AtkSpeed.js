import Item from "./Item";
import { colors } from "../services/services";
import atkSpeedImage from "../images/atkSpeed.png";

const shadowColor = colors.blue;

export class AtkSpeed extends Item {
  constructor(game) {
    super(game);
    this.w = this.itemBuffProps.w;
    this.h = this.itemBuffProps.h;

    this.color = this.itemBuffProps.color;
    this.opacity = this.itemBuffProps.opacity;
    this.shadowColor = shadowColor;
    this.shadowBlur = this.itemBuffProps.shadowBlur;
    this.s = this.itemBuffProps.s;
    this.a = this.itemBuffProps.a;
    this.isFill = this.itemBuffProps.isFill;
    this.isInteractable = true;
    this.spawnRangeMinX = 0;
    this.spawnRangeMaxX = 0;

    this.visionRange = {
      x: 0,
      y: 0,
      r: this.itemBuffProps.visionRange,
      color: "green",
    };

    this.image = new Image();
    this.image.src = atkSpeedImage;
    this.isSpawnOnScreen = false;
    //this.effectType = "atkspeed";   for different effects to lay
  }

  updateImage() {
    ///tbd
  }

  initializeItem() {
    this.randomize();
  }

  onDeath() {
    this.game.init.addEffect(this, "defaultBuff");
  }

  applyEffect() {
    this.game.skills.turnOnAtkSpeedSkill();
  }

}
