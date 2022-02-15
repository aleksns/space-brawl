import Ship from "./Ship";
import {
  getPlayerT1Dimension,
  getPlayerT2Dimension,
  getPlayerT3Dimension,
  GAME_WIDTH,
  GAME_HEIGHT,
  getDefaultPlayerProjectile,
  getPlayerLaser,
  getPlayerT3Stats,
  getPlayerT1Stats,
  getPlayerT2Stats,
} from "../services/services";
import { getBossT3DoubleSpray, getPlayerT1LaserGun, getPlayerT2LaserGun, getPlayerT3LaserGun, getPlayerT4DoubleFront, getPlayerT4Rotating, getPlayerT4SingleFront, getPlayerT4TripleFront } from "../services/gunsProps";

import { DoubleGun } from "../guns/DoubleGun";
import { SingleGun } from "../guns/SingleGun";
import  ShieldOrb from "../effects/ShieldOrb";
import { TripleGun } from "../guns/TripleGun";

const defaultPosition = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT - getPlayerT3Dimension().h,
};

export class Player extends Ship {
  constructor(game) {
    super(game);
    this.game = game;
    this.stats = this.game.stats;
    this.x = defaultPosition.x;
    this.y = defaultPosition.y;
    this.w = getPlayerT3Dimension().w;
    this.h = getPlayerT3Dimension().h;
    // this.health = getPlayerT3Stats.health;
    // this.maxHealth = getPlayerT3Stats.maxHealth;
    this.health = 99999999;
    this.maxHealth = 99999999;
    this.isPlayer = true;
    this.offStepX = 0;
    this.offStepX = 0;
    this.rammingDmg = getPlayerT3Stats.rammingDmg;
    /* s - speed, a - acceleration */
    this.s = this.stats.player.s;
    this.a = this.stats.player.a;
    this.now = 0;

    this.image = this.game.media.playerShipT3;
    ;
    this.isLaserOn = false;
    this.laserGunT1 = undefined;
    this.laserGunT2 = undefined;
    this.laserGunT3 = undefined;
    this.laserGun = undefined;

    this.isShieldOn = false;
    this.shieldOrb = undefined;

    this.singleGun = undefined;
    this.doubleGun = undefined;
    this.tripleGun = undefined;
    console.log("CONSTRUCTOR > Player");
  }

  initializeShip() {
    this.game.playerGuns = [];
    this.initializePlayerGuns();
    this.laserGun = this.laserGunT3;
    this.game.playerGuns.push(this.singleGun);
    //this.game.playerGuns.push(this.doubleGun);
    this.shieldOrb = new ShieldOrb(this.game, this);
  }

  updateShip() {
    if(this.isShieldOn) {
      this.shieldOrb.update();
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

  setTier1() {
    this.w = getPlayerT1Dimension().w;
    this.h = getPlayerT1Dimension().h;
    this.health = getPlayerT1Stats.health;
    this.maxHealth = getPlayerT1Stats.maxHealth;
    this.image = this.game.media.playerShipT1;

    this.game.skills.turnOffAllSkills();
    this.game.skills.resetAllSkillsCD();
    this.game.playerGuns = [];
    this.game.playerGuns.push(this.tripleGun);
    this.laserGun = this.laserGunT1;
  }

  setTier2() {
    this.w = getPlayerT2Dimension().w;
    this.h = getPlayerT2Dimension().h;
    this.health = getPlayerT2Stats.health;
    this.maxHealth = getPlayerT2Stats.maxHealth;
    this.image = this.game.media.playerShipT2;

    this.game.skills.turnOffAllSkills();
    this.game.skills.resetAllSkillsCD();
    this.game.playerGuns = [];
    this.game.playerGuns.push(this.doubleGun);
    this.laserGun = this.laserGunT2;
  }

  setTier3() {
    this.w = getPlayerT3Dimension().w;
    this.h = getPlayerT3Dimension().h;
    this.health = getPlayerT3Stats.health;
    this.maxHealth = getPlayerT3Stats.maxHealth;
    this.image = this.game.media.playerShipT3;

    this.game.skills.turnOffAllSkills();
    this.game.skills.resetAllSkillsCD();
    this.game.playerGuns = [];
    this.game.playerGuns.push(this.singleGun);
    this.laserGun = this.laserGunT3;
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
  }

  initializePlayerGuns() {
    this.laserGunT1 = new SingleGun(this.game, this);
    this.laserGunT1.initialize(getPlayerT1LaserGun, getPlayerLaser);

    this.laserGunT2 = new SingleGun(this.game, this);
    this.laserGunT2.initialize(getPlayerT2LaserGun, getPlayerLaser);

    this.laserGunT3 = new SingleGun(this.game, this);
    this.laserGunT3.initialize(getPlayerT3LaserGun, getPlayerLaser);
    
    this.singleGun = new SingleGun(this.game, this);
    this.singleGun.initialize(getPlayerT4SingleFront, getDefaultPlayerProjectile);
    this.singleGun.setProjectileImage(this.game.media.projectilePlayerImg);

    this.doubleGun = new DoubleGun(this.game, this);
    this.doubleGun.initialize(getPlayerT4DoubleFront, getDefaultPlayerProjectile);
    this.doubleGun.setProjectileImage(this.game.media.projectilePlayerImg);

    this.tripleGun = new TripleGun(this.game, this);
    this.tripleGun.initialize(getPlayerT4TripleFront, getDefaultPlayerProjectile);
    this.tripleGun.setProjectileImage(this.game.media.projectilePlayerImg);
  }
  
}
