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
const s = 2;
const a = s / 10;

export class BgElement extends Item {
  constructor(game) {
    super(game);
    this.x = 0;
    this.y = 0;
    this.w = GAME_WIDTH;
    this.h = GAME_HEIGHT;

    this.offStepX = 0;
    this.offStepY = 0;
    this.color = "transparent";
   // this.color = "#020B5A";
    this.opacity = 0;
    this.s = s;
    this.a = a;
    this.isFill = undefined;
    this.shadowColor = "transparent";
    this.shadowBlur = 0;
    this.spawnRangeMinX = 0;
    this.spawnRangeMaxX = 0;
    this.isInteractable = false;
    this.imageSrc = bgImage;
    this.image = new Image();
    this.image.src = this.imageSrc;
    }

  setBackgroundShapeAndPosition() {
    // this.w = GAME_WIDTH;
    // this.h = GAME_HEIGHT;
    // this.w = GAME_WIDTH;
    // this.h = GAME_HEIGHT + 20;
    this.isFill = false;
    this.opacity = 1.0;

    this.spawnRangeMinX = 0;
    this.spawnRangeMaxX = 0;

    this.setPosition();
    //this.setUpmostPosition();
  }

  setPosition() {
    //this.y = 0 - this.h;
    if (this.game.bgElements.length == 0) {
      this.y = 0;
    } else {
      this.y = this.game.bgElements[0].y - this.game.bgElements[0].h + 30;
    }
  }

}
