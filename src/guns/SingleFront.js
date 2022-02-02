import Gun from "./Gun";
import {
  getSingleGunPosition,
  getDefaultPlayerProjectile,
} from "../services/services"; 

export class SingleFront extends Gun {
  constructor(game, owner) {
    super(game, owner);
    this.projectileType = "default";

    this.barrel1 = {
      x: 0,
      y: 0,
      destinationX: 0,
      destinationY: 0
    }

    this.barrels = [
      this.barrel1
    ];

    this.isAccelerationType = true;
    this.dW = getDefaultPlayerProjectile.w; //offStep for a projectile, to make centered position
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
      destinationX: this.barrels[i].x,
      destinationY: this.target.y,
    }
    return gunPositionP2;
  }

}
