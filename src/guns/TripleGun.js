import Gun from "./Gun";
import { getTripleGunPosition } from "../services/services";

export class TripleGun extends Gun {
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

    this.barrel3 = {
      x: 0,
      y: 0,
      destinationX: 0,
      destinationY: 0,
    };

    this.barrels = [this.barrel1, this.barrel2, this.barrel3];
  }

  getGunPosition(i) {
    var gunPosition = {
      x: getTripleGunPosition(this.owner, this.dW)[i].x,
      y: getTripleGunPosition(this.owner, this.dW)[i].y,
    };
    return gunPosition;
  }
}
