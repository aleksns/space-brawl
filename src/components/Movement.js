export default class Movement {
  constructor(game) {
    this.game = game;
  }

  applyAcceleration(object) {
    if (Math.abs(object.vX) < object.s) {
      object.vX += object.dX;
    }
    if (Math.abs(object.vY) < object.s) {
      object.vY += object.dY;
    }
  }

  applyConstantSpeed(object) {
    object.vX += object.dX * object.s;
    object.vY += object.dY * object.s;
  }

  calculateVectorsAndDistance(object) {
    object.dX = object.destination.x - object.x;
    object.dY = object.destination.y - object.y;

    let distance = Math.sqrt(object.dX * object.dX + object.dY * object.dY);

    object.dX = object.dX / distance;
    object.dY = object.dY / distance;
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
    this.applyFrictionAndVelocity(object);

    if (isCheckSouthOutOfBorderOnly) {
      if (this.game.collision.isCollisionBorderDown(object, -object.h)) {
        object.setDead();
      }
    } else {
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

  applyFrictionAndVelocity(object) {
    object.vX *= this.game.gameBoard.friction;
    object.vY *= this.game.gameBoard.friction;
    this.applyVelocity(object);
  }

  applyVelocity(object) {
    object.x += object.vX;
    object.y += object.vY;
  }
}
