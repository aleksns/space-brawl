import Gun from "./Gun";
import { getSingleGunPosition } from "../services/services";

export class SingleGun extends Gun {
  constructor(game, owner) {
    super(game, owner);
    this.projectileType = "default";

    this.barrel1 = {
      x: 0,
      y: 0,
      destinationX: 0,
      destinationY: 0,
    };

    this.barrels = [this.barrel1];
  }

  getGunPosition(i) {
    var gunPosition = {
      x: getSingleGunPosition(this.owner, this.dW)[i].x,
      y: getSingleGunPosition(this.owner, this.dW)[i].y,
    };
    return gunPosition;
  }
}
