
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
        this.moveLeft(object);
        break;
      case "right":
        this.moveRight(object);
        break;
      case "up":
        this.moveUp(object);
        break;
      case "down":
        this.moveDown(object);
        break;
      default:
        console.log("Error handling 'move' function in Movement class");
        break;
    }
    this.applyPhysics(object);
    this.game.collision.handleCollisionWithBorders(object);
  }

  moveUp(object) {
    if (object.vY > -object.s) {
        object.vY -= object.a;
    }
  }

  moveLeft(object) {
    if (object.vX > -object.s) {
        object.vX -= object.a;
    }
  }

  moveDown(object) {
    if (object.vY < object.s) {
        object.vY += object.a;
    }
  }

  moveRight(object) {
    if (object.vX < object.s) {
        object.vX += object.a;
    }
  }

  applyPhysics(object) {
    /* apply friction to velocity */
    object.vX *= object.f;
    object.x += object.vX;

    object.vY *= object.f;
    object.y += object.vY;
  }
}
