import Gun from "./Gun";
import { colors, getGunsStats } from "../services/services";
import {
  getObjectCenterPosition,
  getTripleGunPosition,
  getDefaultPlayerProjectile,
} from "../services/services"; 

export class TripleFront extends Gun {
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

    this.barrel2 = {
      p1X: 0,
      p1Y: 0,
      p2X: 0,
      p2Y: 0
    }

    this.barrel3 = {
        p1X: 0,
        p1Y: 0,
        p2X: 0,
        p2Y: 0
      }

    this.barrels = [
      this.barrel1,
      this.barrel2,
      this.barrel3
    ]

    this.dW = getDefaultPlayerProjectile.w; //offStep for a projectile, to make a better center position
  }

  getGunPosition(i) {
    var gunPosition = {
      p1X: getTripleGunPosition(this.owner, this.dW)[i].x,
      p1Y: getTripleGunPosition(this.owner, this.dW)[i].y,
    }
    return gunPosition;
  }

}

