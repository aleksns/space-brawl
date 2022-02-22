import Ship from "./Ship";
import {
  getPlayerT1Dimension,
  getPlayerT2Dimension,
  getPlayerT3Dimension,
  GAME_WIDTH,
  GAME_HEIGHT,
  getDefaultPlayerProjectile,
  getPlayerLaser,
} from "../services/services";
import {
  getT0Rotating,
  getPlayerBarrage180Angle,
  getPlayerBarrage360Angle,
  getPlayerBarrageLeft90Angle,
  getPlayerT1LaserGun,
  getPlayerT2LaserGun,
  getPlayerT3LaserGun,
  getPlayerDoubleFront,
  getPlayerRotating,
  getPlayerSingleFront,
  getPlayerTripleFront,
  getT5Front,
} from "../services/gunsProps";

import { DoubleGun } from "../guns/DoubleGun";
import { SingleGun } from "../guns/SingleGun";
import ShieldOrb from "../effects/ShieldOrb";
import { TripleGun } from "../guns/TripleGun";
import { DoubleGunTest } from "../guns/DoubleGunTest";

const defaultPosition = {
  x: GAME_WIDTH / 2 - getPlayerT3Dimension().w / 2,
  y: GAME_HEIGHT - getPlayerT3Dimension().h,
};

export class Player extends Ship {
  constructor(game) {
    super(game);
    this.game = game;
    this.stats = this.game.stats;
    this.x = defaultPosition.x;
    this.y = defaultPosition.y + 100;
    this.w = getPlayerT3Dimension().w;
    this.h = getPlayerT3Dimension().h;
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

    this.barrage = undefined;
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
    this.game.playerGuns = [];
    this.initializePlayerGuns();
    this.laserGun = this.laserGunT3;
    //this.game.playerGuns.push(this.barrage);
    //this.game.playerGuns.push(this.doubleTest);
    this.game.playerGuns.push(this.tripleGun);
    this.shieldOrb = new ShieldOrb(this.game, this);
  }

  updateShip() {
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
    this.laserGun = this.laserGunT2;
  }

  setTier3() {
    this.w = getPlayerT3Dimension().w;
    this.h = getPlayerT3Dimension().h;
    this.image = this.game.media.playerShipT3;

    this.game.skills.turnOffAllSkills();
    this.game.skills.resetAllSkillsCD();
    this.game.playerGuns = [];
    this.game.playerGuns.push(this.barrage);
    this.laserGun = this.laserGunT3;
  }

  isPlayerAtThePosition() {
    let playerCenter = {
      x: this.game.gameBoard.getCenterOfObject(this).x,
      y: this.game.gameBoard.getCenterOfObject(this).y,
      w: 5,
      h: 5
    }
    return this.game.collision.rectsColliding(playerCenter, this.destination);
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
    this.setDead();
    console.log(`Player has died. DON'T BE SAD!`);
  }

  updateStats() {
    this.health = this.stats.player.health;
    this.maxHealth = this.stats.player.maxHealth;

    this.laserGunT1.setGunDamage(this.stats.playerGunsDamage.laserT1);
    this.laserGunT2.setGunDamage(this.stats.playerGunsDamage.laserT2);
    this.laserGunT3.setGunDamage(this.stats.playerGunsDamage.laserT3);
    this.barrage.setGunDamage(this.stats.playerGunsDamage.barrage);
    this.doubleGun.setGunDamage(this.stats.playerGunsDamage.default);
    this.tripleGun.setGunDamage(this.stats.playerGunsDamage.default);

    ///test
    this.doubleTest.setGunDamage(this.stats.playerGunsDamage.rotating);
  }

  initializePlayerGuns() {
    this.laserGunT1 = new SingleGun(this.game, this);
    this.laserGunT1.initialize(getPlayerT1LaserGun, getPlayerLaser);
    this.laserGunT1.setGunDamage(this.stats.playerGunsDamage.laserT1);

    this.laserGunT2 = new SingleGun(this.game, this);
    this.laserGunT2.initialize(getPlayerT2LaserGun, getPlayerLaser);
    this.laserGunT2.setGunDamage(this.stats.playerGunsDamage.laserT2);

    this.laserGunT3 = new SingleGun(this.game, this);
    this.laserGunT3.initialize(getPlayerT3LaserGun, getPlayerLaser);
    this.laserGunT3.setGunDamage(this.stats.playerGunsDamage.laserT3);

    ////test/////
    this.doubleTest = new DoubleGun(this.game, this);
    this.doubleTest.initialize(getT5Front, getDefaultPlayerProjectile);
    this.doubleTest.setGunDamage(this.stats.playerGunsDamage.rotating);
    this.doubleTest.setProjectileImage(this.game.media.projectileArcBlueImg);
    ////test/////

    this.barrage = new SingleGun(this.game, this);
    this.barrage.initialize(
      getPlayerBarrage180Angle,
      getDefaultPlayerProjectile
    );
    this.barrage.setGunDamage(this.stats.playerGunsDamage.barrage);
    this.barrage.setProjectileImage(this.game.media.projectileArcBlueImg);

    this.doubleGun = new DoubleGun(this.game, this);
    this.doubleGun.initialize(getPlayerDoubleFront, getDefaultPlayerProjectile);
    this.doubleGun.setGunDamage(this.stats.playerGunsDamage.default);
    this.doubleGun.setProjectileImage(this.game.media.projectileArcBlueImg);

    this.tripleGun = new TripleGun(this.game, this);
    this.tripleGun.initialize(getPlayerTripleFront, getDefaultPlayerProjectile);
    this.tripleGun.setGunDamage(this.stats.playerGunsDamage.default);
    this.tripleGun.setProjectileImage(this.game.media.projectileArcBlueImg);
  }
}
