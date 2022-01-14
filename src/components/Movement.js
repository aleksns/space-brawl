export default class Movement {
  constructor(game) {
    this.game = game;
    this.boardWidth = game.boardWidth;
    this.boardHeight = game.boardHeight;
  }

  applyVelocity(object) {
    object.x += object.vX;
    object.y += object.vY;
  }

  setTrajectory(object) {
    this.calculateVectorsAndDistance(object);
    this.applySpeedModifier(object);
  }

  //calculate vectors and distance between two objects, where p1 - start position and p2 - end position
  calculateVectorsAndDistance(object) {
    object.vX = object.cords.p2X - object.cords.p1X;
    object.vY = object.cords.p2Y - object.cords.p1Y;

    object.distance = Math.sqrt(object.vX * object.vX + object.vY * object.vY);

    object.vX = object.vX / object.distance;
    object.vY = object.vY / object.distance;

    object.x = object.cords.p1X;
    object.y = object.cords.p1Y;
  }

  applySpeedModifier(object) {
    object.vX = object.vX * object.s;
    object.vY = object.vY * object.s;
  }

  move(object, isCheckSouthOutOfBorderOnly) {
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
    
    if (isCheckSouthOutOfBorderOnly) {
      if (this.game.collision.isCollisionBorderDown(object, -object.h)) {
        object.setDead();
      }
    } else {
      this.game.collision.handleCollisionWithBorders(object);
    }
  }

  moveNorth(object) {
    if (object.vY < object.s) {
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
    if (object.vX < object.s) {
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
    object.vY *= object.f;

    this.applyVelocity(object);
  }
}
