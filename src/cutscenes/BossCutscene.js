import Cutscene from "./Cutscene";
import {
  colors,
  GAME_WIDTH,
  GAME_HEIGHT,
  font,
  getRandomIntInclusive,
} from "../services/services";
import dialogWindow from "../images/dialogWindow.png";
import { dialog1, dialogs } from "../services/dialogs";

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

    this.nameToPrint = {
      text: "",
      textX: 0,
      textY: 0,
      textOpacity: 1.0,
      textColor: "#3498DB",
      font: `62px ${font}`,
    };

    this.replicToPrint = {
      text: "",
      textX: 0,
      textY: 0,
      textOpacity: 1.0,
      textColor: "#ffffff",
      font: `62px ${font}`,
      s: 0.05, //text print speed
      then: 0,
    };

    this.dialogsList = [];
    this.dialogsList = dialogs;
    this.currentDialog = undefined;

    this.isAnimationFinished = true;

    this.i = 0;
    this.j = 0;
    this.id = "bossCutscene";
  }

  drawText(ctx) {
    if (this.isAnimationFinished) {
      return;
    }

    let timePassed = (this.game.now - this.replicToPrint.then) / 1000;

    if (
      this.j < this.currentDialog[this.i].text.length &&
      timePassed >= this.replicToPrint.s
    ) {
      this.replicToPrint.text += this.currentDialog[this.i].text.charAt(this.j);
      this.j++;
      this.replicToPrint.then = this.game.now;
    }

    this.game.draw.drawObject(this.container, ctx);
    this.drawNameText();
    this.drawReplicText(ctx);

    if (timePassed >= 1 && this.isReplicFinished(this.i)) {
      this.setNewReplic();
    }

    if (timePassed >= 1 && this.i == this.currentDialog.length) {
      this.finishDialogsAndAnimation();
    }
  }

  drawNameText() {
    this.nameToPrint.text = this.currentDialog[this.i].name;
    this.nameToPrint.textX = this.container.x + margin.textSides;
    this.nameToPrint.textY = this.container.y + margin.textTop;
    this.game.draw.drawText(this.nameToPrint);
  }

  drawReplicText(ctx) {
    this.replicToPrint.textX =
      this.container.x +
      margin.textSides +
      ctx.current.measureText(this.nameToPrint.text).width;
    this.replicToPrint.textY = this.container.y + margin.textTop;
    this.game.draw.drawText(this.replicToPrint);
  }

  isReplicFinished(index) {
    return (
      this.replicToPrint.text.length >= this.currentDialog[index].text.length
    );
  }

  initializeCutscene() {
    this.isAnimationFinished = false;
    let index = getRandomIntInclusive(0, this.dialogsList.length - 1);
    this.currentDialog = this.dialogsList[index];
  }

  update() {
    //
  }

  setNewReplic() {
    this.replicToPrint.text = "";
    this.j = 0;
    this.i++;
    this.replicToPrint.then = 0;
  }

  finishDialogsAndAnimation() {
    this.isAnimationFinished = true;
    this.j = 0;
    this.i = 0;
    this.replicToPrint.text = "";
    this.replicToPrint.then = 0;
    this.setAnimationIsFinished();
  }

  draw(ctx) {
    if (this.isAnimationFinished) {
      return;
    }
    this.drawText(ctx);
  }
}
