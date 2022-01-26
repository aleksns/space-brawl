import Cutscene from "./Cutscene";
import { colors, GAME_WIDTH, GAME_HEIGHT } from "../services/services";
import dialogWindow from "../images/dialogWindow.png";

const margin = {
sides: 50,
textSides: 80,
textTop: 200,
}
export class BossCutscene extends Cutscene {
  constructor(game) {
    super(game);

    this.container = {
      x: margin.sides,
      y: GAME_HEIGHT / 2,
      w: GAME_WIDTH / 1.1,
      h: GAME_HEIGHT / 2,
      sides: margin.sides,
      image: undefined,
    };
    this.container.image = new Image();
    this.container.image.src = dialogWindow;

    this.textProps = {
      x: this.container.x,
      y: this.container.y,
      name: "Boss: ",
      textFull: "I will ALIENTERATE you!",
      text: "",
      speed: 20,
      i: 0,
      then: 0
    };

    this.isAnimationFinished = true;

    this.then = 0;
    this.id = "bossCutscene";      
  }

  drawText(ctx) {
    if(this.isAnimationFinished) {
      return;
    }
    ctx.current.fillStyle = "#ffffff";
    ctx.current.font = `bold 72px tahoma`;

    if(this.textProps.i < this.textProps.textFull.length) {
      let timePassed = (this.game.now - this.textProps.then) / 1000;
      if (timePassed >= 0.1) {
        this.textProps.text += this.textProps.textFull.charAt(this.textProps.i);
        this.textProps.i++;
  
        this.textProps.then = this.game.now;
      }
    }
    
    let text = this.textProps.text;
    let offsetX = this.container.x + margin.textSides;
    let offsetY = this.container.y + margin.textTop;

    this.game.draw.drawItem(this.container, ctx);
    ctx.current.fillText(text, offsetX, offsetY);

    let timePassed2 = (this.game.now - this.textProps.then) / 1000;

    if (timePassed2 >= 3 && this.isReplicFinished()) {
      this.textProps.then = this.game.now;
      this.isAnimationFinished = true;
      this.setAnimationIsFinished();
    }
  }

  isReplicFinished() {
    return this.textProps.text.length >= this.textProps.textFull.length;
  }

  initializeCutscene() {
    this.isAnimationFinished = false;
  }

  update() {
    //
  }

  draw(ctx) {
    if (this.isAnimationFinished) {
      return;
    }
    this.drawText(ctx);
  }
}
