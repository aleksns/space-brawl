import "../App.css";

export default class Movement {
  constructor(game) {
    this.game = game;
    this.boardWidth = game.boardWidth;
    this.boardHeight = game.boardHeight;
    this.allowedX = this.game.allowedX;
    this.allowedY = this.game.allowedY;
  }


  move(object) {
    switch (object.direction) {
      case "left":
        this.moveLeft(object, object.a);
        break;
      case "right":
        this.moveRight(object, object.a);
        break;
      case "up":
        this.moveUp(object, object.a);
        break;
      case "down":
        this.moveDown(object, object.a);
        break;
      default:
        console.log("Error handling 'move' function in Movement class");
        break;
    }
  }

  moveUp(object, acceleration) {
    if (object.vY > -object.s) {
        object.vY -= acceleration;
    }
  }

  moveLeft(object, acceleration) {
    if (object.vX > -object.s) {
        object.vX -= acceleration;
    }
  }

  moveDown(object, acceleration) {
    if (object.vY < object.s) {
        object.vY += acceleration;
    }
  }

  moveRight(object, acceleration) {
    if (object.vX < object.s) {
        object.vX += acceleration;
    }
  }
}
