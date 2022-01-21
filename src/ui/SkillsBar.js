import UICanvas from "./UICanvas";
import { colors, GAME_HEIGHT } from "../services/services";
import skillsBarImage from "../images/skillsBar.png";
import skillTimeImage from "../images/skillTime.png";
import shieldImage from "../images/skillShield.png";
import laserImage from "../images/skillLaser.png";

const skillCdColor = "grey";

const container = {
  w: 95,
  h: 260,
  opacityVisible: "opacity(100%)",
  opacityHide: "opacity(30%)",
};
const skillIcons = {
  w: 60,
  h: 60,
  lineWidth: 0,
  lineCap: "round",
  lineJoin: "round",
  marginDown: 65,
  opacityVisible: "opacity(100%)",
  opacityHide: "opacity(15%)",
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
      filter: container.opacityVisible,
    };

    this.skillsBarContainerProps.image = new Image();
    this.skillsBarContainerProps.image.src = skillsBarImage;

    this.slowTimeProps = {
      x: skillsBarContainerProps.x + 18.5,
      y: skillsBarContainerProps.y + 37,
      w: skillIcons.w,
      h: skillIcons.h,
      filter: container.opacityVisible,
      image: undefined,
      id: "slowTime",
    };
    this.slowTimePropsText = {
      color: skillCdColor,
      xPosText: this.slowTimeProps.x + this.slowTimeProps.w / 2,
      yPosText: this.slowTimeProps.y + this.slowTimeProps.h / 2,
      text: "0",
      isTextOn: false,
    };
    this.slowTimeProps.image = new Image();
    this.slowTimeProps.image.src = skillTimeImage;

    this.shieldProps = {
      x: this.slowTimeProps.x,
      //y: skillsBarContainerProps.y + this.slowTimeProps.y + skillIcons.marginDown,
      y: this.slowTimeProps.y + skillIcons.marginDown,
      w: skillIcons.w,
      h: skillIcons.h,
      image: undefined,
      id: "shield",
    };
    this.shieldProps.image = new Image();
    this.shieldProps.image.src = shieldImage;

    this.laserProps = {
      x: this.slowTimeProps.x,
      //y: skillsBarContainerProps.y + this.shieldProps.y + skillIcons.marginDown,
      y: this.shieldProps.y + skillIcons.marginDown,
      w: skillIcons.w,
      h: skillIcons.h,
      image: undefined,
      id: "laser",
    };
    this.laserProps.image = new Image();
    this.laserProps.image.src = laserImage;

    this.skillsBtns = [];
    this.skillsBtns.push(this.slowTimeProps);
    this.skillsBtns.push(this.shieldProps);
    this.skillsBtns.push(this.laserProps);
  }

  update() {
    this.updateIcons();
  }

  draw(ctx) {
    this.game.draw.drawItem(this.skillsBarContainerProps, ctx);

    this.drawSlowTimeIcon(ctx);

    this.game.draw.drawItem(this.shieldProps, ctx);
    this.game.draw.drawItem(this.laserProps, ctx);
  }

  updateIcons() {
    if (this.isPlayerCollidingWithSkillsBar()) {
      this.applyHideOnSkillsBarAndIcons();
    } else {
       this.applyVisibleOnSkillsBarAndIcons();
    }
    if (this.slowTimePropsText.isTextOn) {
      this.slowTimeProps.filter = skillIcons.opacityHide;
    }

    // if(this.ShieldPropsText.isTextOn) {
    //   this.slowTimeProps.filter = container.opacityHide;
    // }

    // if(this.LaserPropsText.isTextOn) {
    //   this.slowTimeProps.filter = container.opacityHide;
    // }
  }

  drawSlowTimeIcon(ctx) {
    this.game.draw.drawItem(this.slowTimeProps, ctx);
    if (!this.slowTimePropsText.isTextOn) {
      return;
    }
    this.game.draw.drawText(this.slowTimePropsText);
  }

  slowTimeSkillUsed() {
    //this.slowTimeProps.filter = container.opacityHide;
    this.slowTimePropsText.isTextOn = true;
  }

  applyHideOnSkillsBarAndIcons() {
    this.skillsBarContainerProps.filter = container.opacityHide;
    this.slowTimeProps.filter = container.opacityHide;
    this.shieldProps.filter = container.opacityHide;
    this.laserProps.filter = container.opacityHide;
  }

  applyVisibleOnSkillsBarAndIcons() {
    this.skillsBarContainerProps.filter = container.opacityVisible;
    this.slowTimeProps.filter = container.opacityVisible;
    this.shieldProps.filter = container.opacityVisible;
    this.laserProps.filter = container.opacityVisible;
  }

  setSlowTimeText(value) {
    this.slowTimePropsText.text = value;
  }

  isPlayerCollidingWithSkillsBar() {
    return this.game.collision.rectsColliding(
      this.skillsBarContainerProps,
      this.game.player
    );
  }
}
