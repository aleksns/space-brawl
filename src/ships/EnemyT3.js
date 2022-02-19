import Ship from "./Ship";
import {
  directions,
  getRandomDirection,
  getRandomIntInclusive,
  getEnemyT3Dimension,
  getDefaultEnemyProjectile,
} from "../services/services";

import { DoubleGun } from "../guns/DoubleGun";
import { SingleGun } from "../guns/SingleGun";
import { getT3Barrage, getT3Target } from "../services/gunsProps";

export class EnemyT3 extends Ship {
  constructor(game) {
    super(game);
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.dX = 0;
    this.dY = 0;
    this.w = getEnemyT3Dimension().w;
    this.h = getEnemyT3Dimension().h;

    this.health = this.game.stats.enemyT3.health;
    this.maxHealth = this.game.stats.enemyT3.maxHealth;

    this.isPlayer = false;
    /* physics related variables: v - velocity, f - friction, s - speed, a - acceleration */
    this.s = this.game.stats.enemyT3.s; // default was 2
    this.a = this.s / 40; // default was this.s / 40
    this.direction = getRandomDirection();
    /* offStep = applies additional distance for enemies to stop their movement
    before reaching allowed borders and maintaining smooth bounce effect */
    this.offStepX = this.s * 20;
    this.offStepY = this.s * 20;
    this.scorePoints = this.game.stats.enemyT3.scorePoints;
    this.now = 0;

    this.rammingDmg = this.game.stats.enemyT3.rammingDmg;
    this.guns = [];
    this.target = this.game.player;

    this.image = this.game.animations.enemyT3ShipAnimation.image;

    this.directionChangeIntervalThen = 0;
    this.directionChangeInterval = 4;
    this.isCheckSouthOutOfBorderOnly = false;
    this.isMovingToPosition = true;
    this.isBoss = false;

    this.itemToDrop = {
      id: "coin",
      value: 30,
    };

    this.destination = {
      x: 0,
      y: 0,
    };
    //console.log("CONSTRUCTOR > Enemy3");
  }

  initializeShip() {
    this.game.gameBoard.setEnemyOutBordersPosition(this);
    this.setNewDirection();

    let newDoubleTarget = new DoubleGun(this.game, this);
    newDoubleTarget.initialize(getT3Target, getDefaultEnemyProjectile);
    newDoubleTarget.setGunDamage(this.game.stats.enemyGunsDamage.t3Target);
    newDoubleTarget.setProjectileImage(this.game.media.projectileArcPurpleImg);
    newDoubleTarget.setOnTarget();

    let new180BarrageGun = new SingleGun(this.game, this);
    new180BarrageGun.initialize(getT3Barrage, getDefaultEnemyProjectile);
    new180BarrageGun.setGunDamage(this.game.stats.enemyGunsDamage.t3Barrage);
    new180BarrageGun.setProjectileImage(this.game.media.projectileArcGreenImg);

    this.game.enemyGuns.push(newDoubleTarget);
    this.game.enemyGuns.push(new180BarrageGun);

    this.guns.push(newDoubleTarget);
    this.guns.push(new180BarrageGun);

    this.directionChangeIntervalThen = Date.now();
  }

  fireGun() {
    for(let i = 0; i < this.guns.length; i++) {
      this.guns[i].fire();
    }
  }

  updateShip() {
    this.updateImage();
    if (this.isMovingToPosition) {
      this.moveToThePosition();
      return;
    }

    let timePassed = (this.game.now - this.directionChangeIntervalThen) / 1000;
    if (timePassed <= this.directionChangeInterval) {
      return;
    }
    this.setRandomDirection();
    this.directionChangeIntervalThen = this.game.now;
  }

  updateImage() {
    this.image = this.game.animations.enemyT3ShipAnimation.image;
  }

  moveToThePosition() {
    if(this.game.gameBoard.isOnTheGameBoard(this)) {
      this.isMovingToPosition = false;
      return;
    }
    if(!this.game.stats.isGlobalSlowAll) {
      this.game.movement.applyVelocity(this);
    }
  }

  setNewDirection() {
    this.setDestinationCords();
    this.game.movement.calculateVectorsAndDistance(this);
    this.game.movement.applyConstantSpeed(this);
  }

  setDestinationCords() {
    this.destination.x = getRandomIntInclusive(
      this.game.gameBoard.enemyAllowedX.x0,
      this.game.gameBoard.enemyAllowedX.x1 - this.w
    );
    this.destination.y = getRandomIntInclusive(
      this.game.gameBoard.enemyAllowedY.y0,
      this.game.gameBoard.enemyAllowedY.y1
    );

  }

  move() {
    if(this.isMovingToPosition) {
      return;
    }
    this.game.movement.move(this, this.isCheckSouthOutOfBorderOnly);
  }

  setRandomDirectionFromList(listOfDirections) {
    let index = getRandomIntInclusive(0, listOfDirections.length - 1);
    this.direction = directions[index];
    this.directionChangeIntervalThen = this.game.now;
  }

  playHitEffect(projectileType) {
    //tbd
  }

  onDeath() {
    this.game.init.addEffect(this, "explosionDefault");
    this.game.progression.score += this.scorePoints;
    this.game.progression.increaseThreatLevel();
    this.game.init.addItemOnDrop(this.itemToDrop, this);
  }
}
