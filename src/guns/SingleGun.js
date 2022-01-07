import Gun from "./Gun";
import { colors, getGunsStats } from "../services/services";
import {
  getObjectCenterPosition,
  getSingleGunPosition,
  getDefaultPlayerProjectile,
} from "../services/services"; 

export class SingleGun extends Gun {
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

    this.dW = getDefaultPlayerProjectile.w; //offStep for a projectile, to make a better center position
  }

  fire() {
    this.barrel1.p1X = getSingleGunPosition(this.owner, this.dW).x;
    this.barrel1.p1Y = getSingleGunPosition(this.owner, this.dW).y;

    if(this.owner.isPlayer) {
      this.barrel1.p2X = this.barrel1.p1X;
      this.barrel1.p2Y = 0;
    }
    else {
      this.barrel1.p2X = getObjectCenterPosition(this.game.player).x;
      this.barrel1.p2Y = getObjectCenterPosition(this.game.player).y;
    }
    //this.game.init.addProjectile(this.owner);
    this.game.init.addProjectile(this.owner, this.barrel1);
  }

}
