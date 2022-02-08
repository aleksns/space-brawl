import Gun from "./Gun";
import {
  getDoubleGunPosition
} from "../services/services";

export class DoubleGun extends Gun {
  constructor(game, owner) {
    super(game, owner);
    this.projectileType = "default";

    this.barrel1 = {
      x: 0,
      y: 0,
      destinationX: 0,
      destinationY: 0,
    };

    this.barrel2 = {
      x: 0,
      y: 0,
      destinationX: 0,
      destinationY: 0,
    };

    this.barrels = [this.barrel1, this.barrel2];
  }

  getGunPosition(i) {
    var gunPosition = {
      x: getDoubleGunPosition(this.owner, this.dW)[i].x,
      y: getDoubleGunPosition(this.owner, this.dW)[i].y,
    };
    return gunPosition;
  }
}
