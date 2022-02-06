import { GAME_HEIGHT } from "../services/services";

export default class Gun {
  constructor(game, owner) {
    this.game = game;
    this.owner = owner;
    this.isPlayerOwned = this.owner.isPlayer;
    this.target = this.owner.target;

    this.playerFrontGunTarget = {
      y: -100,
    };
    this.enemyFrontGunTarget = {
      y: GAME_HEIGHT + 100,
    };

    this.projectileSpeed = 0;
    this.projectileAcceleration = 0;

    this.atkSpeed = 0;
    this.atkSpeedCap = 0;
    this.rateOfFire = 0;
    this.rateOfFireCap = 0;

    this.damage = 0;
    this.numOfRounds = 0;
    this.isLaser = undefined;
    this.dW = 0;
    // this.then - atk interval for the gun, this.roundThen - atk interval for a round
    this.then = 0;
    this.roundThen = 0;
    this.i = 0;

    //this.isSlowSpeedApplied = false;
    this.isDead = false;
  }

  initialize(gunProps, projectileProps) {
    this.setGunProps(gunProps);
    this.setProjectileProps(projectileProps);
    if(this.game.stats.isGlobalSlowAll) {
      this.game.stats.decreaseGunAtkSpeed(this, this.game.stats.slowModifiers.atkSpeedGlobal);
    }
  }

  update() {
    if(this.owner.isDead) {
      this.isDead = true;
    }

    if(this.isLaser) {
      this.updateGunsPosition(0);
    }  
  }

  setGunProps(gunProps) {
    this.projectileSpeed = gunProps.projectileSpeed;
    this.projectileAcceleration = gunProps.projectileAcceleration;

    this.atkSpeed = gunProps.atkSpeed;
    this.atkSpeedCap = gunProps.atkSpeedCap;

    if(this.atkSpeed <= this.atkSpeedCap) {
      this.atkSpeed = this.atkSpeedCap;
    }

    this.rateOfFire = gunProps.rateOfFire;
    this.rateOfFireCap = gunProps.rateOfFireCap;

    if(this.rateOfFire <= this.rateOfFireCap) {
      this.rateOfFire = this.rateOfFireCap;
    }
    
    this.damage = gunProps.damage;
    this.numOfRounds = gunProps.numOfRounds
    this.isLaser = gunProps.isLaser;
    
  }

  setProjectileProps(projectileProps) {
    this.dW = projectileProps.w;
  }

  setToBurst(numOfRounds) {
    this.numOfRounds = numOfRounds;
  }

  setRateOfFire(value) {
    this.rateOfFire = value;
    if(this.rateOfFire >= this.rateOfFireCap) {
      this.rateOfFire = this.rateOfFireCap;
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
        // this.barrels[i].x = this.getGunPosition(i).x;
        // this.barrels[i].y = this.getGunPosition(i).y;

        // this.barrels[i].destinationX = this.getGunDestination(i).destinationX;
        // this.barrels[i].destinationY = this.getGunDestination(i).destinationY;

        if(this.isLaser) {
          this.game.init.addLaser(this, this.barrels[i]);
        }
        else {
          this.game.init.addProjectile(this, this.barrels[i]);
        }
        
        this.roundThen = this.game.now;
      }
      this.i ++;
    }
    
    if (this.i == this.numOfRounds) {
      this.i = 0;
      this.then = this.game.now;
    }

  }

  updateGunsPosition(i) {
    this.barrels[i].x = this.getGunPosition(i).x;
    this.barrels[i].y = this.getGunPosition(i).y;

    this.barrels[i].destinationX = this.getGunDestination(i).destinationX;
    this.barrels[i].destinationY = this.getGunDestination(i).destinationY;
  }
}
