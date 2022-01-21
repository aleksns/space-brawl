import UICanvas from "./UICanvas";
import { colors, GAME_HEIGHT } from "../services/services";
import skillsBarImage from "../images/skillsBar.png";
import skillTimeImage from "../images/skillTime.png";
import shieldImage from "../images/skillShield.png";
import laserImage from "../images/skillLaser.png";

const container = {
  w: 95,
  h: 260,
  opacity: "opacity(100%)",
  opacityVisible: "opacity(100%)",
  opacityHide: "opacity(30%)",
};
const skillIcons = {
  w: 55,
  h: 55,
  lineWidth: 0,
  lineCap: "round",
  lineJoin: "round",
};

const skillsBarContainerProps = {
  x: 5,
  y: GAME_HEIGHT / 2 - container.h / 2,
  w: container.w,
  h: container.h,
  color: "transparent",
  isFill: false,
};

export class SkillsBar extends UICanvas {
  constructor(game) {
    super(game);
    this.game = game;

    this.skillsBarContainerProps = {
      x: skillsBarContainerProps.x,
      y: skillsBarContainerProps.y,
      w: skillsBarContainerProps.w,
      h: skillsBarContainerProps.h,
      color: skillsBarContainerProps.color,
      isFill: skillsBarContainerProps.isFill,
      image: undefined,
      opacity: "opacity(100%)",
    };

    this.skillsBarContainerProps.image = new Image();
    this.skillsBarContainerProps.image.src = skillsBarImage;

    this.slowTimeProps = {
      x: skillsBarContainerProps.x + 20.5,
      y: skillsBarContainerProps.y + 38,
      w: skillIcons.w,
      h: skillIcons.h,
      image: undefined,
    };
    this.slowTimeProps.image = new Image();
    this.slowTimeProps.image.src = skillTimeImage;

    this.shieldProps = {
      x: skillsBarContainerProps.x + 20,
      y: skillsBarContainerProps.y + 106,
      w: skillIcons.w,
      h: skillIcons.h,
      image: undefined,
    };
    this.shieldProps.image = new Image();
    this.shieldProps.image.src = shieldImage;

    this.laserProps = {
      x: skillsBarContainerProps.x + 20.5,
      y: skillsBarContainerProps.y + 171,
      w: skillIcons.w,
      h: skillIcons.h,
      image: undefined,
    };
    this.laserProps.image = new Image();
    this.laserProps.image.src = laserImage;
  }

  update(ctx) {
    //
  }

  draw(ctx) {
    if (
      this.game.collision.rectsColliding(
        this.skillsBarContainerProps,
        this.game.player
      )
    ) {
      this.skillsBarContainerProps.opacity = container.opacityHide;
    } else {
      this.skillsBarContainerProps.opacity = container.opacityVisible;
    }

    ctx.current.filter = this.skillsBarContainerProps.opacity;
    this.game.draw.drawItem(this.skillsBarContainerProps, ctx);

    this.game.draw.drawItem(this.slowTimeProps, ctx);
    this.game.draw.drawItem(this.shieldProps, ctx);
    this.game.draw.drawItem(this.laserProps, ctx);

    ctx.current.filter = "none";
  }
}
