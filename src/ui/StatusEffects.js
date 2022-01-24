import { itemBuffProps, GAME_WIDTH, GAME_HEIGHT } from "../services/services";
import atkSpeedImage from "../images/atkSpeed.png";

const skillCdColor = "grey";

const buffsContainerUI = {
  x: GAME_WIDTH - 220,
  y: GAME_HEIGHT - 85,
  w: 200,
  h: 75,
  color: "#FFC76B",
  isFill: false,
  shadowColor: "transparent",
  shadowBlur: 0,
  opacity: 0.4,
}

const buffUIProps = {
  x: buffsContainerUI.x + 10,
  y: buffsContainerUI.y - 10,
  w: 50,
  h: 50,
  color: "transparent",
  opacity: 1.0,
  shadowBlur: 20,
  isFill: false,
  statusEffectX: buffsContainerUI.x + 15,
  statusEffectY: buffsContainerUI.y + 10,
}

export default class StatusEffects {
  constructor(game) {
    this.game = game;

    this.atkSpeed = {
      value: 0.2,
      now: 0,
      then: 0,
      cd: 0,
      duration: 10,
      id: "atkSpeed",
      x: itemBuffProps.statusEffectX,
      y: itemBuffProps.statusEffectY,
      w: itemBuffProps.w,
      h: itemBuffProps.h,
      xPosText: itemBuffProps.statusEffectX + 5,
      yPosText: itemBuffProps.statusEffectY - 5,
      imageSrc: atkSpeedImage,
      image: new Image(),
      isApplied: false,
      opacity: itemBuffProps.opacity,
      isFill: itemBuffProps.isFill,
      color: skillCdColor,
      // shadowColor: "transparent",
      // shadowBlur: 0,
      // globalAlpha: 1.0,
      text: 0,
    };
    this.atkSpeed.image.src = this.atkSpeed.imageSrc;

    this.slowTime = {
      atkSpeed: 55,
      speed: 120,
      now: 0,
      then: 0,
      cd: 12,
      duration: 3,
      id: "slowTime",
      isApplied: false,
      text: 0,
      color: skillCdColor,
    };

    this.skills = [];
    this.skills.push(this.atkSpeed);
    this.skills.push(this.slowTime);
  }

  initialize() {
    ////tbd
  }

  update() {
    ///tbd
  }

}
