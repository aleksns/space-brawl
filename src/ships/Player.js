import Ship from "./Ship";
import {
  getPlayerT1Dimension,
  getPlayerT2Dimension,
  getPlayerT3Dimension,
  GAME_WIDTH,
  GAME_HEIGHT,
  getDefaultPlayerProjectile,
  getPlayerLaser,
  getBigPlayerProjectile,
} from "../services/services";
import {
  getPlayerBarrage40Angle,
  getPlayerBarrage360Angle,
  getPlayerT1LaserGun,
  getPlayerT2LaserGun,
  getPlayerT3LaserGun,
  getPlayerSingleDefault,
  getPlayerBarrage80Angle,
  getPlayerBarrage120Angle,
  getPlayerDoubleDefault,
  getPlayerTripleDefault,
} from "../services/gunsProps";

import { DoubleGun } from "../guns/DoubleGun";
import { SingleGun } from "../guns/SingleGun";
import ShieldOrb from "../effects/ShieldOrb";
import { TripleGun } from "../guns/TripleGun";

const defaultPosition = {
  x: GAME_WIDTH / 2 - getPlayerT3Dimension().w / 2,
  y: GAME_HEIGHT - getPlayerT3Dimension().h,
};

export class Player extends Ship {
  constructor(game) {
    super(game);
    this.game = game;
    this.stats = this.game.stats;
    this.w = getPlayerT3Dimension().w;
    this.h = getPlayerT3Dimension().h;
    this.x = defaultPosition.x;
    this.y = defaultPosition.y + (this.h * 2);
    this.dX = 0;
    this.dY = 0;
    this.health = this.stats.player.health;
    this.maxHealth = this.stats.player.maxHealth;
    // this.health = 99999999;
    // this.maxHealth = 99999999;
    this.isPlayer = true; 
    this.offStepX = 0;
    this.offStepX = 0;
    this.rammingDmg = this.stats.player.rammingDmg;
    /* s - speed, a - acceleration */
    this.s = this.stats.player.s;
    this.a = this.stats.player.a;
    this.now = 0;

    this.image = this.game.media.playerShipT3;
    this.isLaserOn = false;
    this.laserGunT1 = undefined;
    this.laserGunT2 = undefined;
    this.laserGunT3 = undefined;
    this.laserGun = undefined;

    this.isShieldOn = false;
    this.shieldOrb = undefined;

    this.barrageT1 = undefined;
    this.barrageT2 = undefined;
    this.barrageT3 = undefined;
    this.singleGun = undefined;
    this.doubleGun = undefined;
    this.tripleGun = undefined;

    this.destination = {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT - this.h,
      w: 5,
      h: 5,
    };

    console.log("CONSTRUCTOR > Player");
  }

  initializeShip() {
    this.initializePlayerGuns();
    this.setTier3();
    this.shieldOrb = new ShieldOrb(this.game, this);
  }

  updateShip() {
    if(this.isDead) {
      return;
    }
    if (this.isShieldOn) {
      this.shieldOrb.update();
    }
  }

  fireGun() {
    if (this.isLaserOn) {
      this.laserGun.fire();
    } else {
      for (let i = 0; i < this.game.playerGuns.length; i++) {
        this.game.playerGuns[i].fire();
      }
    }
  }

  setTier1() {
    this.w = getPlayerT1Dimension().w;
    this.h = getPlayerT1Dimension().h;
    this.image = this.game.media.playerShipT1;

    this.game.skills.turnOffAllSkills();
    this.game.skills.resetAllSkillsCD();
    this.game.playerGuns = [];
    this.game.playerGuns.push(this.tripleGun);
    this.game.playerGuns.push(this.barrageT1);
    this.laserGun = this.laserGunT1;
  }

  setTier2() {
    this.w = getPlayerT2Dimension().w;
    this.h = getPlayerT2Dimension().h;
    this.image = this.game.media.playerShipT2;

    this.game.skills.turnOffAllSkills();
    this.game.skills.resetAllSkillsCD();
    this.game.playerGuns = [];
    this.game.playerGuns.push(this.doubleGun);
    this.game.playerGuns.push(this.barrageT2);
    this.laserGun = this.laserGunT2;
  }

  setTier3() {
    this.w = getPlayerT3Dimension().w;
    this.h = getPlayerT3Dimension().h;
    this.image = this.game.media.playerShipT3;

    this.game.skills.turnOffAllSkills();
    this.game.skills.resetAllSkillsCD();
    this.game.playerGuns = [];
    this.game.playerGuns.push(this.singleGun);
    this.game.playerGuns.push(this.barrageT3);
    this.laserGun = this.laserGunT3;
  }

  isPlayerAtThePosition() {
    let playerCenter = {
      x: this.game.gameBoard.getCenterOfObject(this).x,
      y: this.game.gameBoard.getCenterOfObject(this).y,
      w: 5,
      h: 5
    }
    return this.game.gameBoard.collision.rectsColliding(playerCenter, this.destination);
  }

  moveToDefaultPosition() {
    if (this.isPlayerAtThePosition()) {
      return;
    }

    this.game.movement.applyVelocity(this);
  }

  setMoveToDefaultPosition() {
    if (this.isPlayerAtThePosition()) {
      return;
    }
    this.resetVelocity();

    this.game.movement.calculateVectorsAndDistance(this);
    this.vX += this.dX * 5;
    this.vY += this.dY * 5;
  }

  playHitEffect(projectile) {
    //this.game.init.addEffect(projectile, projectile.type);
  }

  onDeath() {
    if(this.isDead) {
      return;
    }
    this.setDead();
    this.game.skills.turnOffAllSkills();
    this.game.handlePlayerIsDead();
    console.log(`Player has died. DON'T BE SAD!`);
  }

  updateStats() {
    this.health = this.stats.player.health;
    this.maxHealth = this.stats.player.maxHealth;

    this.laserGunT1.setGunDamage(this.stats.playerGunsDamage.laserT1);
    this.laserGunT2.setGunDamage(this.stats.playerGunsDamage.laserT2);
    this.laserGunT3.setGunDamage(this.stats.playerGunsDamage.laserT3);

    this.barrageT1.setGunDamage(this.stats.playerGunsDamage.barrage);
    this.barrageT2.setGunDamage(this.stats.playerGunsDamage.barrage);
    this.barrageT3.setGunDamage(this.stats.playerGunsDamage.barrage);

    this.singleGun.setGunDamage(this.stats.playerGunsDamage.default);
    this.doubleGun.setGunDamage(this.stats.playerGunsDamage.default);
    this.tripleGun.setGunDamage(this.stats.playerGunsDamage.default);
  }

  setToDefaultPosition() {
    this.x = defaultPosition.x;
    this.y = defaultPosition.y + (this.h * 2);
  }

  initializePlayerGuns() {
     /* Laser */
    this.laserGunT1 = new SingleGun(this.game, this);
    this.laserGunT1.initialize(getPlayerT1LaserGun, getPlayerLaser);
    this.laserGunT1.setGunDamage(this.stats.playerGunsDamage.laserT1);

    this.laserGunT2 = new SingleGun(this.game, this);
    this.laserGunT2.initialize(getPlayerT2LaserGun, getPlayerLaser);
    this.laserGunT2.setGunDamage(this.stats.playerGunsDamage.laserT2);

    this.laserGunT3 = new SingleGun(this.game, this);
    this.laserGunT3.initialize(getPlayerT3LaserGun, getPlayerLaser);
    this.laserGunT3.setGunDamage(this.stats.playerGunsDamage.laserT3);

    /* Barrage */
    this.barrageT1 = new SingleGun(this.game, this);
    this.barrageT1.initialize(
      getPlayerBarrage120Angle,
      getBigPlayerProjectile
    );
    this.barrageT1.setGunDamage(this.stats.playerGunsDamage.barrage);
    this.barrageT1.setProjectileImage(this.game.media.projectileArcYellowImg);

    this.barrageT2 = new SingleGun(this.game, this);
    this.barrageT2.initialize(
      getPlayerBarrage80Angle,
      getBigPlayerProjectile
    );
    this.barrageT2.setGunDamage(this.stats.playerGunsDamage.barrage);
    this.barrageT2.setProjectileImage(this.game.media.projectileArcYellowImg);

    this.barrageT3 = new SingleGun(this.game, this);
    this.barrageT3.initialize(
      getPlayerBarrage40Angle,
      getBigPlayerProjectile
    );
    this.barrageT3.setGunDamage(this.stats.playerGunsDamage.barrage);
    this.barrageT3.setProjectileImage(this.game.media.projectileArcYellowImg);

    /* Default guns */
    this.singleGun = new SingleGun(this.game, this);
    this.singleGun.initialize(getPlayerSingleDefault, getDefaultPlayerProjectile);
    this.singleGun.setGunDamage(this.stats.playerGunsDamage.default);
    this.singleGun.setProjectileImage(this.game.media.projectileArcBlueImg);

    this.doubleGun = new DoubleGun(this.game, this);
    this.doubleGun.initialize(getPlayerDoubleDefault, getDefaultPlayerProjectile);
    this.doubleGun.setGunDamage(this.stats.playerGunsDamage.default);
    this.doubleGun.setProjectileImage(this.game.media.projectileArcBlueImg);

    this.tripleGun = new TripleGun(this.game, this);
    this.tripleGun.initialize(getPlayerTripleDefault, getDefaultPlayerProjectile);
    this.tripleGun.setGunDamage(this.stats.playerGunsDamage.default);
    this.tripleGun.setProjectileImage(this.game.media.projectileArcBlueImg);
  }
}
