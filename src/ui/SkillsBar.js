import UICanvas from "./UICanvas";
import { colors } from "../services/services";
import skillsBarImage from "../images/skillsBar.png";

//Hp bar image
const skillsBarImageProps = {
  x: 5,
  y: 250,
  w: 80,
  h: 250,
  color: "transparent",
  isFill: false,
};

const skillsBarProps = {
  x: skillsBarImageProps.x + 38,
  y: 5,
  w: skillsBarImageProps.w - 43,
  h: skillsBarImageProps.h - 5,
  color: colors.uiGreen,
  isFill: true,
};

export class SkillsBar extends UICanvas {
  constructor(game) {
    super(game);
    this.game = game;

    this.skillsBarImageProps = {
      x: skillsBarImageProps.x,
      y: skillsBarImageProps.y,
      w: skillsBarImageProps.w,
      h: skillsBarImageProps.h,
      color: skillsBarImageProps.color,
      isFill: skillsBarImageProps.isFill,
      opacityDefault: "opacity(100%)",
      opacityHide: "opacity(30%)",
      image: undefined,
    };

    this.skillsBarImageProps.image = new Image();
    this.skillsBarImageProps.image.src = skillsBarImage;

    this.skillsBarProps = {
      x: skillsBarProps.x,
      y: skillsBarProps.y,
      w: skillsBarProps.w,
      h: skillsBarProps.h,
      color: skillsBarProps.color,
      isFill: skillsBarProps.isFill,
    };
  }

  update(ctx) {
    //
  }

  draw(ctx) {
    if (
      this.game.collision.rectsColliding(
        this.skillsBarImageProps,
        this.game.player
      )
    ) {
      ctx.current.filter = this.skillsBarImageProps.opacityHide;
    }
    else {
        ctx.current.filter = this.skillsBarImageProps.opacityDefault;  
    }

    this.game.draw.drawItem(this.skillsBarImageProps, ctx);

    ctx.current.filter = "none";
  }
}
