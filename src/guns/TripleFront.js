import Gun from "./Gun";
import {
  getTripleGunPosition,
  getDefaultPlayerProjectile,
} from "../services/services"; 

export class TripleFront extends Gun {
  constructor(game, owner) {
    super(game, owner);
    this.projectileType = "default";

    this.barrel1 = {
      x: 0,
      y: 0,
      destinationX: 0,
      destinationY: 0
    }

    this.barrel2 = {
      x: 0,
      y: 0,
      destinationX: 0,
      destinationY: 0
    }

    this.barrel3 = {
        x: 0,
        y: 0,
        destinationX: 0,
        destinationY: 0
      }

    this.barrels = [
      this.barrel1,
      this.barrel2,
      this.barrel3
    ]

    this.isAccelerationType = true;
    this.dW = getDefaultPlayerProjectile.w; //offStep for a projectile, to make centered position
  }

  getGunPosition(i) {
    var gunPosition = {
      x: getTripleGunPosition(this.owner, this.dW)[i].x,
      y: getTripleGunPosition(this.owner, this.dW)[i].y,
    }
    return gunPosition;
  }

  getGunDestination(i) {
    let y;
    if(this.owner.isPlayer) {
      y = this.playerFrontGunTarget.y;
    }
    else {
      y = this.enemyFrontGunTarget.y;
    }
        var gunPositionP2 = {
      destinationX: this.barrels[i].x,
      destinationY: y,
    }
    return gunPositionP2;
  }

}

