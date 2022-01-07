import Gun from "./Gun";
import { colors, getGunsStats } from "../services/services";
import {
  getObjectCenterPosition,
  getTripleGunPosition,
  getDefaultPlayerProjectile,
} from "../services/services"; 

export class TripleGun extends Gun {
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

  fire() {
    for(let i = 0; i < this.barrels.length; i++) {
      this.barrels[i].p1X = getTripleGunPosition(this.owner, this.dW)[i].x;
      this.barrels[i].p1Y = getTripleGunPosition(this.owner, this.dW)[i].y;
  
      if(this.owner.isPlayer) {
        this.barrels[i].p2X = this.barrels[i].p1X;
        this.barrels[i].p2Y = 0;
      }
      else {
        this.barrels[i].p2X = getObjectCenterPosition(this.game.player).x;
        this.barrels[i].p2Y = getObjectCenterPosition(this.game.player).y;
      }
      //this.game.init.addProjectile(this.owner);
      this.game.init.addProjectile(this.owner, this.barrels[i]);
    }

  }

}

