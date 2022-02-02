import Item from "./Item";
import {
  getRandomInt,
  getRandomDecimal,
  getTrueBasedOnChance,
  GAME_WIDTH,
  GAME_HEIGHT,
} from "../services/services";
import bgImage from "../images/bg-stars.png";

const minWidth = 50;
const maxWidth = 300;
const minHeight = 50;
const maxHeight = 250;
const color = "#ffffff";
//s - speed, a - acceleration
const s = 4; //default 2
const a = s / 30;

export class BgElement extends Item {
  constructor(game) {
    super(game);
    this.w = GAME_WIDTH;
    this.h = GAME_HEIGHT;

    this.color = "transparent";
    this.opacity = 0;
    this.s = s;
    this.a = a;
    this.isFill = undefined;
    this.shadowColor = "transparent";
    this.shadowBlur = 0;
    this.spawnRangeMinX = 0;
    this.spawnRangeMaxX = 0;
    this.isInteractable = false;

    this.image = new Image();
    this.image.src = bgImage;
    this.isSpawnOnScreen = undefined;
  }

  updateItem() {
    
  }

  updateImage() {
    ///tbd
  }

  initializeItem() {
    this.setBackgroundShapeAndPosition();
  }

  setBackgroundShapeAndPosition() {
    this.isFill = false;
    this.opacity = 1.0;

    this.spawnRangeMinX = 0;
    this.spawnRangeMaxX = 0;

    this.setPosition();
  }

  setPosition() {
    if (this.game.bgElements.length == 0) {
      this.y = 0;
    } else {
      this.y = this.game.bgElements[0].y - this.game.bgElements[0].h + 30;
    }
  }
}
