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
      text: "0",
      opacity: 1.0,
    };
    this.laserProps.image = new Image();
    this.laserProps.image.src = laserImage;

    this.skillsBtns = [];
    this.skillsBtns.push(this.slowTimeProps);
    this.skillsBtns.push(this.shieldProps);
    this.skillsBtns.push(this.laserProps);
  }

  draw(ctx) {
    this.game.draw.drawItem(this.skillsBarContainerProps, ctx);

    this.drawSlowTimeIcon(ctx);

    this.game.draw.drawItem(this.shieldProps, ctx);
    this.game.draw.drawItem(this.laserProps, ctx);
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
    this.handleIconAndTextOpacity(this.slowTimeSkill, this.slowTimeProps, this.slowTimeCDProps);

    let updatedText =
      this.slowTimeSkill.cd - this.slowTimeSkill.remainingCD;
    updatedText = Math.round((updatedText + Number.EPSILON) * 1) / 1;

    this.slowTimeCDProps.text = updatedText;
  }

  updateShieldContainer() {
    this.handleIconAndTextOpacity(this.shieldSkill, this.shieldProps, this.shieldCDProps);

  }

  updateLaserContainer() {
    this.handleIconAndTextOpacity(this.laserSkill, this.laserProps, this.laserCDProps);

  }

  showOutlineIconTest(icon, ctx) {
    ctx.current.beginPath();
    ctx.current.rect(icon.x, icon.y, icon.w, icon.h);
      ctx.current.fillStyle = "green";
      ctx.current.strokeStyle = "green";
      ctx.current.stroke();
    ctx.current.closePath();
  }

  drawSlowTimeIcon(ctx) {
    //this.showOutlineIconTest(this.slowTimeProps, ctx);    //testing purpose

    this.game.draw.drawItem(this.slowTimeProps, ctx);
    if (!this.slowTimeSkill.isOnCD) {
      return;
    }
    this.drawSlowTimeCDText(ctx);
    this.drawSlowTimeCDBar(ctx);

  }

  drawSlowTimeCDText(ctx) {
    let offsetX = this.getTextWidth(this.slowTimeCDProps.text, ctx) / 2;
    this.slowTimeCDProps.textX = this.slowTimeProps.x + (this.slowTimeProps.w / 2) - offsetX;

    let offSetY = this.getTextHeight(this.slowTimeCDProps.text, ctx) / 2;
    this.slowTimeCDProps.textY = this.slowTimeProps.y + (this.slowTimeProps.h / 2) + offSetY;

    this.game.draw.drawText(this.slowTimeCDProps);
  }

  drawSlowTimeCDBar(ctx) {
    let remainingCD =
    this.slowTimeSkill.remainingCD / this.slowTimeSkill.cd;
    let dH = this.slowTimeProps.h * remainingCD;
    let y = this.slowTimeProps.y + this.slowTimeProps.h;

    ctx.current.globalAlpha = this.slowTimeCDProps.barOpacity;
    ctx.current.beginPath();
    ctx.current.fillStyle = "pink";
    ctx.current.rect(
      this.slowTimeProps.x,
      y,
      this.slowTimeProps.w,
      -dH
    );
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
    return this.game.collision.rectsColliding(
      this.skillsBarContainerProps,
      this.game.player
    );
  }

  getTextWidth(text, ctx) {
    let textWidth = ctx.current.measureText(text).width;
    return textWidth;
  }
   

  getTextHeight(text, ctx) {
    let textHeight = ctx.current.measureText(text).actualBoundingBoxAscent + 
    ctx.current.measureText(text).actualBoundingBoxDescent;

    return textHeight;
  }
}
