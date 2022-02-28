import {
  GAME_WIDTH,
  GAME_HEIGHT,
  colors
} from "../services/services";
import hpBarImage from "../images/hpBar.png";
import threatBarImage from "../images/threatLevelBar.png";
import levelBarImage from "../images/levelBar.png";

const barImageProps = {
  y: 5,
  w: 250,
  h: 30,
}
export default class UICanvas {
  constructor(game) {
    //this.game = game;

    /* HP Bar*/
    this.hpBarImgContainer = {
      x: 5,
      y: barImageProps.y,
      w: barImageProps.w,
      h: barImageProps.h,
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
      y: barImageProps.y,
      w: barImageProps.w,
      h: barImageProps.h,
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

    /* Level Img and Exp bar*/
    this.levelImgContainer = {
      x: 5,
      y: (this.hpBarImgContainer.y + this.hpBarImgContainer.h + 10),
      w: barImageProps.w,
      h: barImageProps.h + 10,
      filter: "none",
      image: undefined,
    };
    this.levelImgContainer.image = new Image();
    this.levelImgContainer.image.src = levelBarImage;

    this.levelBarPropsContainer = {
        x: this.levelImgContainer.x + 38,
        y: this.levelImgContainer.y + 9,
        w: this.levelImgContainer.w - 40,
        h: this.levelImgContainer.h - 17,
        filter: "none",
        color: colors.uiOrangeDark,
    };

    this.scorePropsContainer = {
      x: this.threatBarImgContainer.x,
      y: (barImageProps.y + barImageProps.h) + 20,
      font: "20px audiowide",
      color: "#ffffff",
    };


    this.opacity = 1.0;
    this.shadowColor = "transparent";
    this.shadowBlur = 0;
    }

}
