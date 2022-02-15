import Item from "./Item";

export class Coin extends Item {
  constructor(game) {
    super(game);
    this.w = this.itemCoinProps.w;
    this.h = this.itemCoinProps.h;

    this.color = this.itemCoinProps.color;
    this.opacity = this.itemCoinProps.opacity;
    this.shadowColor = "yellow";
    this.shadowBlur = this.itemCoinProps.shadowBlur;
    this.s = this.itemCoinProps.s;
    this.a = this.itemCoinProps.a;
    this.isFill = this.itemCoinProps.isFill;
    this.isInteractable = true;

    this.spawnRangeMinX = 0;
    this.spawnRangeMaxX = 0;

    this.image = this.game.animations.coinAnimation.image;
    this.isSpawnOnScreen = true;
    this.value = 0; ///tbd

    this.visionRange = {
      x: 0,
      y: 0,
      r: this.itemCoinProps.visionRange,
      color: "green",
    };
  }

  updateImage() {
    this.image = this.game.animations.coinAnimation.image;
  }

  initializeItem() {
    //
  }

  onDeath() {
    this.game.init.addEffect(this, "defaultBuff");
  }

  applyEffect() {
   this.game.progression.increaseExp(this.value);
  }

  setMinSpawnRange() {
    this.spawnRangeMinX = this.w;
    this.spawnRangeMaxX = this.game.gameBoard.width - this.w;
  }
}
