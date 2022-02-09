import Ship from "./Ship";
import {
  getPlayerT0Dimension,
  GAME_WIDTH,
  GAME_HEIGHT,
  getDefaultPlayerProjectile,
  getPlayerLaser,
} from "../services/services";
import { getPlayerLaserGun, getPlayerT4DoubleFront, getPlayerT4Rotating } from "../services/gunsProps";

import playerImage from "../images/playerShip.png";
import shieldOrb1 from "../images/animations-images/shieldOrb-images/shieldOrb1.png";

import { DoubleGun } from "../guns/DoubleGun";
import { SingleGun } from "../guns/SingleGun";
import { ShieldOrb } from "../effects/ShieldOrb";

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
    this.health = 99;
    this.maxHealth = 99;
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

    this.isLaserOn = false;
    this.laserGun = undefined;
    this.isShieldOn = false;
    this.shieldOrb = undefined;

    console.log("CONSTRUCTOR > Player");
  }

  initializeShip() {
    this.laserGun = new SingleGun(this.game, this);
    this.laserGun.initialize(getPlayerLaserGun, getPlayerLaser);
    
    let doubleGun = new DoubleGun(this.game, this);
    doubleGun.initialize(getPlayerT4DoubleFront, getDefaultPlayerProjectile);

    this.game.playerGuns.push(doubleGun);

    this.shieldOrb = new ShieldOrb(this.game, this);
  }

  updateShip() {
    if(this.isShieldOn) {
      this.shieldOrb.updateShieldOrb();
    }
    
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
