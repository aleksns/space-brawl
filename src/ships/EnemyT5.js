import Ship from "./Ship";
import {
  getRandomIntInclusive,
  getEnemyT5Dimension,
  GAME_WIDTH,
  getDefaultEnemyProjectile,
  GAME_HEIGHT,
  getTrueBasedOnChance,
} from "../services/services";
import { SingleGun } from "../guns/SingleGun";
import { DoubleGun } from "../guns/DoubleGun";
import { getT5Front } from "../services/gunsProps";

export class EnemyT5 extends Ship {
  constructor(game) {
    super(game);
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.w = getEnemyT5Dimension().w;
    this.h = getEnemyT5Dimension().h;
    this.dX = 0;
    this.dY = 0;

    this.health = this.game.stats.enemyT5.health;
    this.maxHealth = this.game.stats.enemyT5.maxHealth;
    this.rammingDmg = this.game.stats.enemyT5.rammingDmg
    this.isPlayer = false;
    /* physics related variables: v - velocity, f - friction, s - speed, a - acceleration */
    this.s = this.game.stats.enemyT5.s; // default was 2
    this.a = this.s / 60; // default was this.s / 40
    /* offStep = applies additional distance for enemies to stop their movement
    before reaching allowed borders and maintaining smooth bounce effect */
    this.offStepX = this.s * 20;
    this.offStepY = this.s * 20;
    this.scorePoints = this.game.stats.enemyT5.scorePoints;
    this.expPoints = Math.floor(this.scorePoints / 2);
    this.now = 0;

    this.damage = this.game.stats.enemyT5.damage;
    this.gun = undefined;

    this.image = undefined;

    this.destination = {
      x: 0,
      y: 0
    }
    this.isBoss = false;
    this.directionChangeIntervalNow = 0;
    this.directionChangeInterval = 4;
    this.isCheckSouthOutOfBorderOnly = true;
    this.isMovingToPosition = false;

    this.itemToDrop = {
      id: "coin",
      expPoints: this.expPoints,
    };
    this.id = "t5";

    this.chanceForDoubleGun = 0.4;
    console.log("CONSTRUCTOR > EnemyT5");
  }

  fireGun() {
    this.gun.fire();
  }
 
  
  initializeShip() {  
    this.setNewPosition();
    this.setNewDirection();   
    this.setTargetFront();

    let newGun = new SingleGun(this.game, this);
    this.image = this.game.media.enemyShipT5V1;
    // let newGun;
    // if(getTrueBasedOnChance(this.chanceForDoubleGun)) {
    //   newGun = new DoubleGun(this.game, this);
    //   this.image = this.game.media.enemyShipT5V1;
    // }
    // else {
    //   newGun = new SingleGun(this.game, this);
    //   this.image = this.game.media.enemyShipT5V2;
    // }
    
    newGun.initialize(getT5Front, getDefaultEnemyProjectile);
    newGun.setGunDamage(this.game.stats.enemyGunsDamage.t5Front);
    newGun.setProjectileImage(this.game.media.projectileArcGreenImg);

    this.game.enemyGuns.push(newGun);
    this.gun = newGun; 
  }

  move() {  
    this.game.movement.applyVelocity(this);
  }

  updateShip() {
    if (this.game.gameBoard.collision.isCollisionBorderDown(this, -this.h)) {
      this.setDead();
    }
  }

  setNewPosition() {
    this.x = this.game.gameBoard.getPositionOutsideNorthBoard(this).x;
    this.y = this.game.gameBoard.getPositionOutsideNorthBoard(this).y;
  }

  setNewDirection() {
    this.setDestinationCords();
    this.game.movement.calculateVectorsAndDistance(this);
    this.game.movement.applyConstantSpeed(this); 
  }

  setDestinationCords() {
    this.destination.x = this.x;
    this.destination.y = GAME_HEIGHT + this.h;
  }

  playHitEffect(projectileType) {
    //tbd
  }

  onDeath() {
    this.setDead();
    this.game.init.addEffect(this, "explosionDefault");
    this.game.progression.score += this.scorePoints;
    this.game.progression.increaseThreatLevel();
    this.game.init.addItemOnDrop(this.itemToDrop, this);
  }
}
