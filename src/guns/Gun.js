import { Laser } from "../projectiles/Laser";
import {
  centerSingleGunWithProjectile,
  GAME_WIDTH,
} from "../services/services";

export default class Gun {
  constructor(game, owner) {
    this.game = game;
    this.owner = owner;
    this.isPlayerOwned = this.owner.isPlayer;
    this.projectileImage = undefined;

    this.isOnTarget = false;
    this.target = this.owner.target;
    this.radius = GAME_WIDTH * 2;

    this.projectileSpeed = 0;
    this.projectileAcceleration = 0;

    this.atkSpeed = 0;
    this.rateOfFire = 0;

    this.damage = 0;
    this.numOfRoundsBurst = 0;
    this.numOfRoundsBarrage = 0;
    this.isLaserGun = undefined;
    this.laserProjectile = undefined;
    this.dW = 0;

    this.then = 0;
    this.roundThen = 0;
    this.i = 0;

    // gun rotation props
    this.isRotating = undefined;
    this.angle = 0;
    this.angleModifier = 0;
    this.angleMin = 0;
    this.angleMax = 0;
    this.angleDefault = 0;

    this.isAccelerationType = false;
    this.isDead = false;
  }

  initialize(gunProps, projectileProps) {
    this.setGunProps(gunProps);
    this.setProjectileProps(projectileProps);
    if (this.game.stats.isGlobalSlowAll) {
      this.game.stats.decreaseGunAtkSpeed(
        this,
        this.game.stats.slowModifiers.atkSpeedGlobal
      );
    }

    if (this.isLaserGun) {
      this.laserProjectile = new Laser(this.game, this, this.barrels[0]);
    }
  }

  update() {
    if (this.owner.isDead) {
      this.isDead = true;
    }

    if (this.isLaserGun && this.owner.isLaserOn) {
      this.updateLaserdW();
      this.updateGunsPosition(0);
    }
  }

  getNumOfRoundsBarrageBasedOnAngle() {
    if (this.angleModifier == 0 || this.isRotating) {
      return 1;
    } else {
      let multiplier =
        this.angleMax - this.angleMin + Math.abs(this.angleModifier);

      let numOfRoundsBarrage = Math.floor(
        Math.abs(multiplier / this.angleModifier)
      );
      return numOfRoundsBarrage;
    }
  }

  fire() {
    let timePassedGun = (this.game.now - this.then) / 1000;
    if (timePassedGun <= this.atkSpeed) {
      return;
    }

    let timePassedRound = (this.game.now - this.roundThen) / 1000;
    if (timePassedRound <= this.rateOfFire) {
      return;
    }

    if (this.i < this.numOfRoundsBurst) {
      for (let i = 0; i < this.barrels.length; i++) {
        for (let j = 0; j < this.numOfRoundsBarrage; j++) {
          this.updateGunsPosition(i);

          if (this.isLaserGun) {
            this.game.init.addLaser(this, this.laserProjectile);
          } else {
            this.game.init.addProjectile(this, this.barrels[i]);
          }

          this.roundThen = this.game.now;
        }
      }
      this.i++;
    }

    if (this.i == this.numOfRoundsBurst) {
      this.i = 0;
      this.then = this.game.now;
    }
  }

  updateGunsPosition(i) {
    this.barrels[i].x = this.getGunPosition(i).x;
    this.barrels[i].y = this.getGunPosition(i).y;

    this.barrels[i].destinationX = this.getGunDestination(i).destinationX;
    this.barrels[i].destinationY = this.getGunDestination(i).destinationY;

    if (this.isRotating) {
      this.angle += this.angleModifier;
      if (this.angle >= this.angleMax || this.angle < this.angleMin) {
        //this.angleModifier = -this.angleModifier;
        this.angle = this.angleMax + this.angleModifier;
      }
    }

    if (this.isBarrage) {
      this.angle += this.angleModifier;

      if (this.isSouthBarrage()) {
        this.handleSouthBarrage();
      } else {
        if (this.angle > this.angleMax || this.angle < this.angleMin) {
          this.angle = this.angleDefault;
        }
      }
    }
  }

  handleSouthBarrage() {
    if (this.angle >= 360) {
      this.angle = 0;
    }

    if (
      this.angle >= this.angleMin + this.angleModifier &&
      this.angle <= this.angleMin + this.angleModifier
    ) {
      this.angle = this.angleDefault;
    }
  }

  isSouthBarrage() {
    let sign = Math.sign(this.angleModifier);
    return sign == 1;
  }

  getGunDestination(i) {
    if (this.isOnTarget) {
      let gunPositionP2 = {
        destinationX: this.game.gameBoard.getCenterOfObject(this.target).x,
        destinationY: this.game.gameBoard.getCenterOfObject(this.target).y,
      };
      return gunPositionP2;
    }

    let x = this.barrels[i].x;
    let y = this.barrels[i].y;
    let angle = this.angle;

    //mirror the angle of a double gun
    if (this.isRotating) {
      // if (i == 0) {
      //   angle = this.angle;
      // }
      if (i == this.barrels.length - 1) {
        angle = -this.angle;
      }
    }

    x += this.radius * Math.sin((Math.PI * angle) / 180);

    y += this.radius * Math.cos((Math.PI * angle) / 180);

    let gunPositionP2 = {
      destinationX: x,
      destinationY: y,
    };
    return gunPositionP2;
  }

  setGunProps(gunProps) {
    this.projectileSpeed = gunProps.projectileSpeed;
    this.projectileAcceleration = gunProps.projectileAcceleration;

    this.atkSpeed = gunProps.atkSpeed;
    this.rateOfFire = gunProps.rateOfFire;

    this.isRotating = gunProps.isRotating;
    this.isBarrage = gunProps.isBarrage;
    this.angle = gunProps.angle;
    this.angleModifier = gunProps.angleModifier;
    this.angleMin = gunProps.angleMin;
    this.angleMax = gunProps.angleMax;
    this.angleDefault = this.angle;

    this.numOfRoundsBurst = gunProps.numOfRoundsBurst;
    this.numOfRoundsBarrage = this.getNumOfRoundsBarrageBasedOnAngle();
    this.isLaserGun = gunProps.isLaserGun;
  }

  setGunDamage(damage) {
    this.damage = damage;
  }

  setProjectileProps(projectileProps) {
    this.dW = projectileProps.w;
  }

  setProjectileImage(image) {
    this.projectileImage = image;
  }

  updateLaserdW() {
    this.dW = this.laserProjectile.w;
  }

  setToBurst(numOfRoundsBurst) {
    this.numOfRoundsBurst = numOfRoundsBurst;
  }

  setRateOfFire(value) {
    this.rateOfFire = value;
  }

  setOnTarget() {
    this.isOnTarget = true;
    this.isAccelerationType = false;
  }

  resetLaser() {
    if (this.isLaserGun) {
      this.then = 0;
      this.roundThen = 0;
    }
  }
}
