import Gun from "./Gun";
import {
  getDoubleGunPosition,
  getDefaultPlayerProjectile
} from "../services/services"; 

export class DoubleFront extends Gun {
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

    this.barrels = [
      this.barrel1,
      this.barrel2
    ];
    
    this.isAccelerationType = true;
  }

  getGunPosition(i) {
    var gunPosition = {
      x: getDoubleGunPosition(this.owner, this.dW)[i].x,
      y: getDoubleGunPosition(this.owner, this.dW)[i].y,
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

