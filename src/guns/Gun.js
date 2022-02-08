import { Laser } from "../projectiles/Laser";
import { centerSingleGunWithProjectile, GAME_WIDTH } from "../services/services";

export default class Gun {
  constructor(game, owner) {
    this.game = game;
    this.owner = owner;
    this.isPlayerOwned = this.owner.isPlayer;

    this.isOnTarget = false;
    this.target = this.owner.target;
    this.radius = GAME_WIDTH * 2;

    this.projectileSpeed = 0;
    this.projectileAcceleration = 0;

    this.atkSpeed = 0;
    this.rateOfFire = 0;

    this.damage = 0;
    this.numOfRounds = 0;
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

    //this.isSlowSpeedApplied = false;
    this.isAccelerationType = true;
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
    
    if(this.isLaserGun) {
      this.laserProjectile = new Laser(this.game, this, this.barrels[0]);
    }
  }

  update() {
    if (this.owner.isDead) {
      this.isDead = true;
    }

    if (this.isLaserGun) {
      this.updateLaserdW();
      this.updateGunsPosition(0);
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

    if (this.i < this.numOfRounds) {
      for (let i = 0; i < this.barrels.length; i++) {
        this.updateGunsPosition(i);

        if (this.isLaserGun) {
          this.game.init.addLaser(this, this.laserProjectile);
        } else {
          this.game.init.addProjectile(this, this.barrels[i]);
        }

        this.roundThen = this.game.now;
      }
      this.i++;
    }

    if (this.i == this.numOfRounds) {
      this.i = 0;
      this.then = this.game.now;
    }
  }

  getGunDestination(i) {
    if(this.isOnTarget) {
      let gunPositionP2 = {
        destinationX: this.game.gameBoard.getCenterOfObject(this.target).x,
        destinationY: this.game.gameBoard.getCenterOfObject(this.target).y,
      }
      return gunPositionP2;
    }

    let x = this.barrels[i].x;
    let y = this.barrels[i].y;
    let angle;

    if (i == 0) {
      angle = this.angle;
    }
    else {
      angle = -this.angle;
    }
    
    x += this.radius * Math.sin((Math.PI * angle) / 360);

    y += this.radius * Math.cos((Math.PI * angle) / 360);

    let gunPositionP2 = {
      destinationX: x,
      destinationY: y,
    };
    return gunPositionP2;
  }

  updateGunsPosition(i) {
    this.barrels[i].x = this.getGunPosition(i).x;
    this.barrels[i].y = this.getGunPosition(i).y;

    if (this.isRotating) {
      this.angle += this.angleModifier;
      if (this.angle >= this.angleMax || this.angle < this.angleMin) {
        this.angleModifier = -this.angleModifier;
      }
    }

    this.barrels[i].destinationX = this.getGunDestination(i).destinationX;
    this.barrels[i].destinationY = this.getGunDestination(i).destinationY;
  }

  setGunProps(gunProps) {
    this.projectileSpeed = gunProps.projectileSpeed;
    this.projectileAcceleration = gunProps.projectileAcceleration;

    this.atkSpeed = gunProps.atkSpeed;
    this.rateOfFire = gunProps.rateOfFire;

    this.isRotating = gunProps.isRotating;
    this.angle = gunProps.angle;
    this.angleModifier = gunProps.angleModifier;
    this.angleMin = gunProps.angleMin;
    this.angleMax = gunProps.angleMax;

    this.damage = gunProps.damage;
    this.numOfRounds = gunProps.numOfRounds;
    this.isLaserGun = gunProps.isLaserGun;
  }

  setProjectileProps(projectileProps) {
    this.dW = projectileProps.w;
  }

  updateLaserdW() {
    this.dW = this.laserProjectile.w;
  }

  setToBurst(numOfRounds) {
    this.numOfRounds = numOfRounds;
  }

  setRateOfFire(value) {
    this.rateOfFire = value;
  }

  setOnTarget() {
    this.isOnTarget = true;
    this.isAccelerationType = false;
  }

  resetLaser() {
    if(this.isLaserGun) {
      this.then = 0;
      this.roundThen = 0;
    }
  }

}
