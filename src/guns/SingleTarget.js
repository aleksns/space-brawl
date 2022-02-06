import Gun from "./Gun";
import {
  getSingleGunPosition,
  getDefaultPlayerProjectile,
} from "../services/services";

export class SingleTarget extends Gun {
  constructor(game, owner) {
    super(game, owner);
    this.projectileType = "default";

    this.barrel1 = {
      x: 0,
      y: 0,
      destinationX: 0,
      destinationY: 0,
    };

    this.barrels = [
      this.barrel1
    ];

    this.atkSpeed = 0;
    
    if(this.owner.isPlayer) {
      this.atkSpeed = 1;
    }
    else {
      this.atkSpeed = -1;
    }

    this.isAccelerationType = false;
  }

  getGunPosition(i) {
    var gunPositionP1 = {
      x: getSingleGunPosition(this.owner, this.dW)[i].x,
      y: getSingleGunPosition(this.owner, this.dW)[i].y,
    }
    return gunPositionP1;
  }

  getGunDestination(i) {
    var gunPositionP2 = {
      destinationX: this.game.gameBoard.getCenterOfObject(this.target).x,
      destinationY: this.game.gameBoard.getCenterOfObject(this.target).y,
    }
    return gunPositionP2;
  }
}
