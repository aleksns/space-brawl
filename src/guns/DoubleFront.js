import Gun from "./Gun";
import {
  getDoubleGunPosition,
  getDefaultPlayerProjectile,
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

    this.atkSpeed = 0;
    
    if(this.owner.isPlayer) {
      this.atkSpeed = 3;
    }
    else {
      this.atkSpeed = -2;
    }

    
    this.isAccelerationType = true;
    this.dW = getDefaultPlayerProjectile.w; //offStep for a projectile, to make centered position
  }

  fire() {
    for(let i = 0; i < this.barrels.length; i++) {
      this.barrels[i].x = getDoubleGunPosition(this.owner, this.dW)[i].x;
      this.barrels[i].y = getDoubleGunPosition(this.owner, this.dW)[i].y;
  
      if(this.owner.isPlayer) {
        this.barrels[i].destinationX = this.barrels[i].x;
        this.barrels[i].destinationY = 0;
      }
      else {
        this.barrels[i].destinationX = this.game.gameBoard.getCenterOfObject(this.game.player).x;
        this.barrels[i].destinationY = this.game.gameBoard.getCenterOfObject(this.game.player).y;
      }
      this.game.init.addProjectile(this.owner, this.barrels[i]);
    }

  }

}

