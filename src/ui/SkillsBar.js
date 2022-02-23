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
  iconOpacityVisible: "opacity(100%)",
  iconOpacityHide: "opacity(30%)",
};
const skillIcons = {
  w: 55,
  h: 45,
  lineWidth: 0,
  lineCap: "round",
  lineJoin: "round",
  marginDown: 65,
  iconOpacityVisible: "opacity(100%)",
  iconOpacityHide: "opacity(15%)",
  barOpacityVisible: 0.5,
  barOpacityHide: 0.1,
  textOpacityVisible: 1.0,
  textOpacityHide: 0.3,
  textColor: "white",
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

    this.slowTimeSkill = this.game.skills.slowTime;
    this.shieldSkill = this.game.skills.shield;
    this.laserSkill = this.game.skills.laser;

    this.skillsBarContainerProps = {
      x: skillsBarContainerProps.x,
      y: skillsBarContainerProps.y,
      w: skillsBarContainerProps.w,
      h: skillsBarContainerProps.h,
      color: skillsBarContainerProps.color,
      isFill: skillsBarContainerProps.isFill,
      image: undefined,
      filter: container.iconOpacityVisible,
    };

    this.skillsBarContainerProps.image = new Image();
    this.skillsBarContainerProps.image.src = skillsBarImage;

    // icon props
    this.slowTimeProps = {
      x: skillsBarContainerProps.x + 20,
      y: skillsBarContainerProps.y + 43,
      w: skillIcons.w,
      h: skillIcons.h,
      filter: container.iconOpacityVisible,
      image: undefined,
      id: "slowTime",
    };

    // CD bar and CD text props
    this.slowTimeCDProps = {
      color: skillCdColor,
      x: this.slowTimeProps.x + 1,
      y: this.slowTimeProps.y + 5,
      w: this.slowTimeProps.w - 4,
      h: this.slowTimeProps.h - 14,
      textX: 0,
      textY: 0,
      textColor: skillIcons.textColor,
      textOpacity: 1.0,
      text: "",
      barOpacity: 1.0,
      font: "22px tahoma",
    };
    this.slowTimeProps.image = new Image();
    this.slowTimeProps.image.src = skillTimeImage;

    //icon props
    this.shieldProps = {
      x: this.slowTimeProps.x,
      y: this.slowTimeProps.y + skillIcons.marginDown,
      w: skillIcons.w,
      h: skillIcons.h,
      image: undefined,
      id: "shield",
    };

    //CD bar and CD text Props
    this.shieldCDProps = {
      color: skillCdColor,
      x: this.shieldProps.x + 1,
      y: this.shieldProps.y + 5,
      w: this.shieldProps.w - 4,
      h: this.shieldProps.h - 14,
      textX: 0,
      textY: 0,
      textColor: skillIcons.textColor,
      textOpacity: 1.0,
      text: "",
      barOpacity: 1.0,
      font: "22px tahoma",
    };
    this.shieldProps.image = new Image();
    this.shieldProps.image.src = shieldImage;

    //icon props
    this.laserProps = {
      x: this.slowTimeProps.x,
      y: this.shieldProps.y + skillIcons.marginDown,
      w: skillIcons.w,
      h: skillIcons.h,
      image: undefined,
      id: "laser",
    };

    //CD bar and CD text props
    this.laserCDProps = {
      color: skillCdColor,
      x: this.laserProps.x + 5.5,
      y: this.laserProps.y,
      w: 50,
      h: 50,
      textX: 0,
      textY: 0,
      textColor: skillIcons.textColor,
      textOpacity: 1.0,
      text: "",
      barOpacity: 1.0,
      font: "22px tahoma",
    };
    this.laserProps.image = new Image();
    this.laserProps.image.src = laserImage;

    this.skillsBtns = [];
    this.skillsBtns.push(this.slowTimeProps);
    this.skillsBtns.push(this.shieldProps);
    this.skillsBtns.push(this.laserProps);
  }

  draw(ctx) {
    this.game.draw.drawObject(this.skillsBarContainerProps, ctx);

    this.drawSkillIconAndCD(ctx, this.slowTimeSkill, this.slowTimeProps, this.slowTimeCDProps);
    this.drawSkillIconAndCD(ctx, this.laserSkill, this.laserProps, this.laserCDProps);
    this.drawSkillIconAndCD(ctx, this.shieldSkill, this.shieldProps, this.shieldCDProps);
  }

  update() {
    this.updateSkillsBarContainer();
    this.updateSlowTimeContainer();
    this.updateShieldContainer();
    this.updateLaserContainer();
  }

  updateSkillsBarContainer() {
    if (this.isPlayerCollidingWithSkillsBar()) {
      this.skillsBarContainerProps.filter = container.iconOpacityHide;
    } else {
      this.skillsBarContainerProps.filter = container.iconOpacityVisible;
    }
  }

  updateSlowTimeContainer() {
    this.handleIconAndTextOpacity(
      this.slowTimeSkill,
      this.slowTimeProps,
      this.slowTimeCDProps
    );

    this.updateCDText(this.slowTimeSkill, this.slowTimeCDProps);
  }

  updateShieldContainer() {
    this.handleIconAndTextOpacity(
      this.shieldSkill,
      this.shieldProps,
      this.shieldCDProps
    );
    this.updateCDText(this.shieldSkill, this.shieldCDProps);
  }

  updateLaserContainer() {
    this.handleIconAndTextOpacity(
      this.laserSkill,
      this.laserProps,
      this.laserCDProps
    );
    this.updateCDText(this.laserSkill, this.laserCDProps);
  }

  updateCDText(skill, cdProps) {
    let text = skill.cd - skill.remainingCD;
    text = Math.round((text + Number.EPSILON) * 1) / 1;

    cdProps.text = text;
  }

  // showOutlineIconTest(icon, ctx) {
  //   ctx.current.beginPath();
  //   ctx.current.rect(icon.x, icon.y, icon.w, icon.h);
  //   ctx.current.fillStyle = "green";
  //   ctx.current.strokeStyle = "green";
  //   ctx.current.stroke();
  //   ctx.current.closePath();
  // }

  drawSkillIconAndCD(ctx, skill, skillProps, cdProps) {
    this.game.draw.drawObject(skillProps, ctx);
    if (!skill.isOnCD) {
      return;
    }

    this.drawCDText(ctx, skillProps, cdProps);
    this.drawCDBar(ctx, skill, skillProps, cdProps);
  }

  drawCDText(ctx, skillProps, cdProps) {
    let offsetX = this.getTextWidth(cdProps.text, ctx) / 2;
    cdProps.textX = skillProps.x + skillProps.w / 2 - offsetX;

    let offSetY = this.getTextHeight(cdProps.text, ctx) / 2;
    cdProps.textY = skillProps.y + skillProps.h / 2 + offSetY;

    this.game.draw.drawText(cdProps);
  }

  drawCDBar(ctx, skill, skillProps, cdProps) {
    let remainingCD = skill.remainingCD / skill.cd;
    let dH = skillProps.h * remainingCD;
    let y = skillProps.y + skillProps.h;

    ctx.current.globalAlpha = cdProps.barOpacity;
    ctx.current.beginPath();
    ctx.current.fillStyle = "#ffffff";
    ctx.current.rect(skillProps.x, y, skillProps.w, -dH);
    ctx.current.fill();
    ctx.current.closePath();
    ctx.current.globalAlpha = 1.0;
  }

  handleIconAndTextOpacity(skill, icon, iconCD) {
    if (this.isPlayerCollidingWithSkillsBar()) {
      if (skill.isOnCD) {
        iconCD.barOpacity = skillIcons.barOpacityHide;
        iconCD.textOpacity = skillIcons.textOpacityHide;
      } else {
        iconCD.barOpacity = skillIcons.barOpacityVisible;
        iconCD.textOpacity = skillIcons.textOpacityVisible;
      }
      icon.filter = skillIcons.iconOpacityHide;
    } else {
      if (skill.isOnCD) {
        icon.filter = skillIcons.iconOpacityHide;
      } else {
        icon.filter = skillIcons.iconOpacityVisible;
      }
      iconCD.barOpacity = skillIcons.barOpacityVisible;
      iconCD.textOpacity = skillIcons.textOpacityVisible;
    }
  }

  isPlayerCollidingWithSkillsBar() {
    return this.game.gameBoard.collision.rectsColliding(
      this.skillsBarContainerProps,
      this.game.playerTeam[0]
    );
  }

  getTextWidth(text, ctx) {
    let textWidth = ctx.current.measureText(text).width;
    return textWidth;
  }

  getTextHeight(text, ctx) {
    let textHeight =
      ctx.current.measureText(text).actualBoundingBoxAscent +
      ctx.current.measureText(text).actualBoundingBoxDescent;

    return textHeight;
  }
}
