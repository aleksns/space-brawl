import Cutscene from "./Cutscene";
import { colors, GAME_WIDTH, GAME_HEIGHT } from "../services/services";
import dialogWindow from "../images/dialogWindow.png";

const margin = {
  sides: 50,
  textSides: 100,
  textTop: 200,
};
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
      text: "",
      s: 0.05, //s - speed
      then: 0,
    };

    this.replic1 = {
      name: "Boss: ",
      text: "I WILL EAT YOUR BRAINS!",
    };

    this.replic2 = {
      name: "Player: ",
      text: "I don't have them!",
    };

    this.replic3 = {
      name: "Boss: ",
      text: "*Angry alien noises*",
    };

    this.dialogs = [];
    this.dialogs.push(this.replic1);
    this.dialogs.push(this.replic2);
    this.dialogs.push(this.replic3);

    this.isAnimationFinished = true;

    this.i = 0;
    this.j = 0;
    this.then = 0;
    this.id = "bossCutscene";
  }

  drawText(ctx) {
    for (let i = 1; i <= this.dialogs.size; i++) {
    }

    if (this.isAnimationFinished) {
      return;
    }

    let timePassed = (this.game.now - this.textProps.then) / 1000;

    if (this.j < this.dialogs[this.i].text.length && timePassed >= this.textProps.s) {
      this.textProps.text += this.dialogs[this.i].text.charAt(this.j);
      this.j++;
      this.textProps.then = this.game.now;
    }

    this.game.draw.drawObject(this.container, ctx);
    let name = this.dialogs[this.i].name;
    let offsetX = this.container.x + margin.textSides;
    let offsetY = this.container.y + margin.textTop;
    ctx.current.fillStyle = "#3498DB";
    ctx.current.font = `bold 62px tahoma`;
    ctx.current.fillText(name, offsetX, offsetY);

    let text = this.textProps.text;
    let offsetX2 = this.container.x + margin.textSides + ctx.current.measureText(name).width;
    let offsetY2 = this.container.y + margin.textTop;
    ctx.current.fillStyle = "#ffffff";
    ctx.current.font = `bold 62px tahoma`;
    ctx.current.fillText(text, offsetX2, offsetY2);


    if (timePassed >= 1.5 && this.isReplicFinished(this.i)) {
      this.setNewReplic();
    }

    if(timePassed >= 1.5 && this.i == this.dialogs.length) {
      this.finishDialogsAndAnimation();
    }
  }

  isReplicFinished(index) {
    return this.textProps.text.length >= this.dialogs[index].text.length;
  }

  initializeCutscene() {
    this.isAnimationFinished = false;
  }

  update() {
    //
  }

  setNewReplic() {
    this.textProps.text = "";
    this.j = 0;
    this.i ++;
    this.textProps.then = 0;
  }

  finishDialogsAndAnimation() {
    this.isAnimationFinished = true;
    this.j = 0;
    this.i = 0;
    this.textProps.text = "";
    this.textProps.then = 0;
    this.setAnimationIsFinished();
  }

  draw(ctx) {
    if (this.isAnimationFinished) {
      return;
    }
    this.drawText(ctx);
  }
}
