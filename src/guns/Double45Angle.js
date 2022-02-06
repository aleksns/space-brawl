import Gun from "./Gun";
import {
  GAME_WIDTH,
  getDoubleGunPosition
} from "../services/services";

export class Double45Angle extends Gun {
  constructor(game, owner) {
    super(game, owner);
    this.projectileType = "default";
    this.radius = GAME_WIDTH * 2;

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

    this.angle = -360;
    this.angleModifier = 3;
    this.projectileSpeed = 0;
    this.atkSpeed = 0;
    this.rateOfFire = 0;
    this.damage = 0;
    this.numOfRounds = 1;

    this.isAccelerationType = true;
  }

  getGunPosition(i) {
    var gunPosition = {
      x: getDoubleGunPosition(this.owner, this.dW)[i].x,
      y: getDoubleGunPosition(this.owner, this.dW)[i].y,
    };
    return gunPosition;
  }

  getGunDestination(i) {
    let x;
    let y;

    this.angle += this.angleModifier;
    //if(this.angle >= 270 || this.angle <= -271) {
    if (this.angle >= 0 || this.angle <= -360) {
      this.angleModifier = -this.angleModifier;
    }
    if (i == 0) {
      x =
        this.barrels[i].x +
        this.radius * Math.sin((Math.PI * this.angle) / 360);

      y =
        this.barrels[i].y +
        this.radius * Math.cos((Math.PI * this.angle) / 360);
    } else {
      x =
        this.barrels[i].x +
        this.radius * Math.sin((Math.PI * -this.angle) / 360);

      y =
        this.barrels[i].y +
        this.radius * Math.cos((Math.PI * -this.angle) / 360);
    }

    var gunPositionP2 = {
      destinationX: x,
      destinationY: y,
    };
    return gunPositionP2;
  }
}
