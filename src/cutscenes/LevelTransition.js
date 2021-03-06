import Cutscene from "./Cutscene";
import { colors, GAME_WIDTH, GAME_HEIGHT, font } from "../services/services";

export class LevelTransition extends Cutscene {
  constructor(game) {
    super(game);
    this.container = {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2,
      margin: 100,
      marginSides: 0,
    };

    this.textProps = {
      x: this.container.x,
      y: this.container.y,
      text: "Level: ",
    };

    this.line1 = {
      startX: 0,
      startY: this.container.y - this.container.margin,
      endX: 0,
      endY: this.container.y - this.container.margin,
      destination: GAME_WIDTH - this.container.marginSides,
    };

    this.line2 = {
      startX: GAME_WIDTH,
      startY: this.container.y + this.container.margin,
      endX: GAME_WIDTH,
      endY: this.container.y + this.container.margin,
      destination: 0 + this.container.marginSides,
    };

    this.objectsWaypoints = [];
    this.objectsWaypoints.push(this.line1);
    this.objectsWaypoints.push(this.line2);

    this.calculateWaypoints = ((object) => {
        var waypoints = [];

        let obj = object;
    
        let dx = this.endX - obj.startX;
        let dy = this.endY - obj.startY;
    
        for (let j = 0; j <= this.numOfIterations; j++) {
          var x = obj.startX + (dx * j) / this.numOfIterations;
          var y = obj.startY + (dy * j) / this.numOfIterations;
          waypoints.push({ x: x, y: y });
        }
    
        this.objectsWaypoints.push(waypoints);
    });

    this.lineWidth = 7;
    this.numOfIterations = 25;   //was 30
    this.isAnimationFinished = false;

    this.objectsWaypoints.forEach((obj) => {
        this.calculateWaypoints(obj);
      });

    this.id = "levelTransition";    
  }

  initializeCutscene() {
    this.isAnimationFinished = false;

    this.line1.startX = 0;
    this.line1.startY = this.container.y - this.container.margin;
    this.line1.endX = 0;
    this.line1.endY = this.container.y - this.container.margin;

    this.line2.startX = GAME_WIDTH;
    this.line2.startY = this.container.y + this.container.margin;
    this.line2.endX = GAME_WIDTH;
    this.line2.endY = this.container.y + this.container.margin;
  }

  draw(ctx) {
    if (this.isAnimationFinished) {
      return;
    }
    this.drawText(ctx);

    this.lineIncrementLeftToRight(this.line1, ctx);
    this.lineIncrementRightToLeft(this.line2, ctx);
    this.objectsWaypoints.forEach((obj) => {
      this.drawLine(obj, ctx);
    });
  }

  drawText(ctx) {
    ctx.current.fillStyle = "#ffffff";
    ctx.current.font = `52px ${font}`;
    let text = this.textProps.text + this.getCurrentLevel();
    let offsetX = ctx.current.measureText(text).width;

    ctx.current.fillText(text, this.textProps.x - (offsetX / 2), this.textProps.y);
  }

  update() {
    //
  }

  lineIncrementLeftToRight(object) {
    if (object.endX < object.destination) {
      object.endX += this.numOfIterations;
    }
    if (object.endX >= object.destination) {
      object.startX += this.numOfIterations;
    }
    if (object.startX >= object.destination) {
      this.setAnimationIsFinished();
    }
  }

  lineIncrementRightToLeft(object) {
    if (object.endX > object.destination) {
      object.endX -= this.numOfIterations;
    }
    if (object.endX <= object.destination) {
      object.startX -= this.numOfIterations;
    }
    if (object.startX <= object.destination) {
      this.setAnimationIsFinished();
    }
  }

  drawLine(object, ctx) {
    ctx.current.lineWidth = this.lineWidth;
    ctx.current.lineCap = "round";
    ctx.current.beginPath();
    ctx.current.strokeStyle = colors.uiPurple;
    ctx.current.moveTo(object.startX, object.startY);
    ctx.current.lineTo(object.endX, object.endY);
    ctx.current.stroke();
    ctx.current.closePath();
  }
}
