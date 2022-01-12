export default class Movement {
  constructor(game) {
    this.game = game;
    this.boardWidth = game.boardWidth;
    this.boardHeight = game.boardHeight;
  }

  // export const directions = ["N", "E", "S", "W", "NE", "SE", "SW", "NW"];
  move(object, isOutOfBordersAllowed) {
    switch (object.direction) {
      case "N":
        this.moveNorth(object);
        break;
      case "E":
        this.moveEast(object);
        break;
      case "S":
        this.moveSouth(object);
        break;
      case "W":
        this.moveWest(object);
        break;

      case "NE":
        this.moveNorthEast(object);
        break;
      case "SE":
        this.moveSouthEast(object);
        break;
      case "SW":
        this.moveSouthWest(object);
        break;
      case "NW":
        this.moveNorthWest(object);
        break;

      default:
        //console.log("Error handling 'move' function in Movement class");
        break;
    }
    this.applyPhysics(object);
    if(!isOutOfBordersAllowed) {
      this.game.collision.handleCollisionWithBorders(object);
    }  
  }

  moveNorth(object) {
    if (object.vY > -object.s) {
      object.vY -= object.a;
    }
  }

  moveEast(object) {
    if (object.vX < object.s) {
      object.vX += object.a;
    }
  }

  moveSouth(object) {
    if (object.vY < object.s) {
      object.vY += object.a;
    }
  }

  moveWest(object) {
    if (object.vX > -object.s) {
      object.vX -= object.a;
    }
  }


  moveNorthEast(object) {
    if (object.vY > -object.s) {
      object.vY -= object.a;
      object.vX += object.a;
    }
  }

  moveSouthEast(object) {
    if (object.vX < object.s) {
      object.vX += object.a;
      object.vY += object.a;
    }
  }

  moveSouthWest(object) {
    if (object.vY < object.s) {
      object.vY += object.a;
      object.xY -= object.a;
    }
  }

  moveNorthWest(object) {
    if (object.vX > -object.s) {
      object.vX -= object.a;
      object.vY -= object.a;
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
