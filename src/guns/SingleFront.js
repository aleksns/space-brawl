import Gun from "./Gun";
import { colors, getGunsStats } from "../services/services";
import {
  getObjectCenterPosition,
  getSingleGunPosition,
  getDefaultPlayerProjectile,
} from "../services/services"; 

export class SingleFront extends Gun {
  constructor(game, owner) {
    super(game, owner);
    this.projectileType = "default";

    // p1 - start point of a projectile, p2 - end point
    // each barrel has its own start/end points

    this.barrel1 = {
      p1X: 0,
      p1Y: 0,
      p2X: 0,
      p2Y: 0
    }

    this.barrels = [
      this.barrel1
    ];

    this.dW = getDefaultPlayerProjectile.w; //offStep for a projectile, to make a better center position
  }

  getGunPositionP1(i) {
    var gunPositionP1 = {
      p1X: getSingleGunPosition(this.owner, this.dW)[i].x,
      p1Y: getSingleGunPosition(this.owner, this.dW)[i].y,
    }
    return gunPositionP1;
  }

  getGunPositionP2(i) {
    var gunPositionP2 = {
      p2X: this.barrels[i].p1X,
      p2Y: this.target.y,
    }
    return gunPositionP2;
  }

}
