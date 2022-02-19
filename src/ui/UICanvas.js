import {
  GAME_WIDTH,
  GAME_HEIGHT,
  colors
} from "../services/services";
import hpBarImage from "../images/hpBar.png";
import threatBarImage from "../images/threatLevelBar.png";
import coin0Deg from "../images/animations-images/coin-images/coin0Deg.png";

const threatAndHpContainer = {
  y: 5,
  w: 250,
  h: 35,
}
export default class UICanvas {
  constructor(game) {
    //this.game = game;

    /* HP Bar*/
    this.hpBarImgContainer = {
      x: 5,
      y: threatAndHpContainer.y,
      w: threatAndHpContainer.w,
      h: threatAndHpContainer.h,
      image: undefined,
    }
    this.hpBarImgContainer.image = new Image();
    this.hpBarImgContainer.image.src = hpBarImage;

    this.hpBarPropsContainer = {
      x: this.hpBarImgContainer.x + 38,
      y: this.hpBarImgContainer.y + 5,
      w: this.hpBarImgContainer.w - 43,
      h: this.hpBarImgContainer.h - 5,
      color: colors.uiGreen,
      isFill: true,
    }

    /* Threat Lvl Bar*/
    this.threatBarImgContainer = {
      x: GAME_WIDTH - 255,
      y: threatAndHpContainer.y,
      w: threatAndHpContainer.w,
      h: threatAndHpContainer.h,
      image: undefined,
    };
    this.threatBarImgContainer.image = new Image();
    this.threatBarImgContainer.image.src = threatBarImage;
    
    this.threatBarPropsContainer = {
      x: this.threatBarImgContainer.x + 38,
      y: this.threatBarImgContainer.y + 5,
      w: this.threatBarImgContainer.w - 43,
      h: this.threatBarImgContainer.h - 5,
      color: colors.uiRedDark,
      isFill: true,
    };

    /* Coin Img and Exp bar*/
    this.coinImgContainer = {
      x: this.hpBarImgContainer.x + 3,
      y: (this.hpBarImgContainer.y + this.hpBarImgContainer.h + 10),
      w: this.hpBarImgContainer.w * 0.1,
      h: 20,
      filter: "none",
      image: undefined,
      shadowColor: "yellow",
      shadowBlur: 5,
    };
    this.coinImgContainer.image = new Image();
    this.coinImgContainer.image.src = coin0Deg;

    this.expBarPropsContainer = {
        // x: (this.coinImgContainer.x + this.coinImgContainer.w) + 6,
        // y: this.coinImgContainer.y + (this.coinImgContainer.h / 2) - 3.5,
        // w: (this.hpBarImgContainer.w * 0.9) - 8,
        // h: 7,
        // color: colors.uiOrange
        x: 5,
        y: GAME_HEIGHT - 12,
        w: GAME_WIDTH - 10,
        h: 5,
        color: colors.uiOrange
    };

    this.scorePropsContainer = {
      x: this.threatBarImgContainer.x,
      y: (threatAndHpContainer.y + threatAndHpContainer.h) + 20,
      font: "20px tahoma",
      color: colors.scoreColor,
    };


    this.opacity = 1.0;
    this.shadowColor = "transparent";
    this.shadowBlur = 0;
    }

}
