import Ship from "./Ship";
import {
  getPlayerT0Dimension,
  getPlayerDefaultStats,
  GAME_WIDTH,
  GAME_HEIGHT,
  getDefaultPlayerProjectile,
  getPlayerLaser,
} from "../services/services";
import { getPlayerLaserGunProps, getPlayerT445AngleGunProps, getPlayerT4SingleFrontGunProps } from "../services/gunsProps";

import playerImage from "../images/playerShip.png";

import { SingleFront } from "../guns/SingleFront";
import { DoubleFront } from "../guns/DoubleFront";
import { TripleFront } from "../guns/TripleFront";
import { BurstTripleFront } from "../guns/BurstTripleFront";
import { Double45Angle } from "../guns/Double45Angle";

const defaultPosition = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT - getPlayerT0Dimension().h,
};

export class Player extends Ship {
  constructor(game) {
    super(game);
    this.game = game;
    this.stats = this.game.stats;
    this.x = defaultPosition.x;
    this.y = defaultPosition.y;
    this.w = getPlayerT0Dimension().w;
    this.h = getPlayerT0Dimension().h;
    // this.health = this.stats.player.health;
    // this.maxHealth = this.stats.player.maxHealth;
    this.health = 999999;
    this.maxHealth = 999999;
    this.isPlayer = true;
    this.offStepX = 0;
    this.offStepX = 0;

    /* s - speed, a - acceleration */
    this.s = this.stats.player.s;
    this.a = this.stats.player.a;
    this.now = 0;
    this.damage = this.stats.player.damage;

    this.image = new Image();
    this.image.src = playerImage;

    this.visionRange = {
      x: 0,
      y: 0,
      r: 500,
      color: "green",
    };

    this.isLaserOn = true;
    this.laserGun = new SingleFront(this.game, this);
    console.log("CONSTRUCTOR > Player");
  }

  initializeShip() {
    this.laserGun.initialize(getPlayerLaserGunProps, getPlayerLaser);

    let singleFront = new SingleFront(this.game, this);
    singleFront.initialize(getPlayerT4SingleFrontGunProps, getDefaultPlayerProjectile);
    
    let double45Angle = new Double45Angle(this.game, this);
    double45Angle.initialize(getPlayerT445AngleGunProps, getDefaultPlayerProjectile);

    let doubleFront = new DoubleFront(this.game, this);
    let tripleFront = new TripleFront(this.game, this);
    let burstTripleFront = new BurstTripleFront(this.game, this);

    //this.gun = singleFront;
    //this.gun.initialize(getPlayerT4SingleFrontGunProps);

    //this.gun2 = double45Angle;
    //this.gun2.initialize(getPlayerT490AngleGunProps);
    //this.game.playerGuns.push(singleFront);
    //this.game.playerGuns.push(doubleFront);
    //this.game.playerGuns.push(tripleFront);
    //this.game.playerGuns.push(singleFront);
    this.game.playerGuns.push(double45Angle);
    //this.game.playerGuns.push(burstTripleFront);
  }

  fireGun() {
    if(this.isLaserOn) {
      this.laserGun.fire();
    }
    else {
      for (let i = 0; i < this.game.playerGuns.length; i++) {
        this.game.playerGuns[i].fire();
      }
    }
  }

  setDefaultPosition() {
    this.x = defaultPosition.x;
    this.y = defaultPosition.y;
  }

  playHitEffect(projectile) {
    //this.game.init.addEffect(projectile, projectile.type);
  }

  onDeath() {
    console.log(`Player has died. DON'T BE SAD!`);
    this.game.playerGuns = [];
  }
}
