import Ship from "./Ship";
import {
  directions,
  getRandomDirection,
  getRandomIntInclusive,
  getEnemyT4Dimension,
  getDefaultEnemyProjectile,
} from "../services/services";

import { getT4Target } from "../services/gunsProps";
import { DoubleGun } from "../guns/DoubleGun";
import { SingleGun } from "../guns/SingleGun";

export class EnemyT4 extends Ship {
  constructor(game) {
    super(game);
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.dX = 0;
    this.dY = 0;
    this.w = getEnemyT4Dimension().w;
    this.h = getEnemyT4Dimension().h;

    this.health = this.game.stats.enemyT4.health;
    this.maxHealth = this.game.stats.enemyT4.maxHealth;

    this.isPlayer = false;
    /* physics related variables: v - velocity, f - friction, s - speed, a - acceleration */
    this.s = this.game.stats.enemyT4.s;
    this.a = this.s / 20;
    this.direction = getRandomDirection();
    /* offStep = applies additional distance for enemies to stop their movement
    before reaching allowed borders and maintaining smooth bounce effect */
    this.offStepX = this.s * 20;
    this.offStepY = this.s * 20;
    this.scorePoints = this.game.stats.enemyT4.scorePoints;
    this.expPoints = Math.floor(this.scorePoints / 2);
    this.now = 0;

    this.rammingDmg = this.game.stats.enemyT4.rammingDmg;
    this.gun = undefined;
    this.target = this.game.playerTeam[0];

    this.image = this.game.media.enemyShipT4;

    this.directionChangeIntervalThen = 0;
    this.directionChangeInterval = 4;
    this.isCheckSouthOutOfBorderOnly = false;
    this.isMovingToPosition = true;
    this.isBoss = false;

    this.itemToDrop = {
      id: "coin",
      expPoints: this.expPoints,
    };

    this.destination = {
      x: 0,
      y: 0,
    };
    console.log("CONSTRUCTOR > EnemyT4");
  }

  initializeShip() {
    this.game.gameBoard.setEnemyOutBordersPosition(this);
    this.setNewDirection();

    let newSingleGun = new SingleGun(this.game, this);
    newSingleGun.initialize(getT4Target, getDefaultEnemyProjectile);
    newSingleGun.setGunDamage(this.game.stats.enemyGunsDamage.t4Target);
    newSingleGun.setProjectileImage(this.game.media.projectileArcRedImg);
    newSingleGun.setOnTarget();

    let newDoubleGun = new DoubleGun(this.game, this);
    newDoubleGun.initialize(getT4Target, getDefaultEnemyProjectile);
    newSingleGun.setGunDamage(this.game.stats.enemyGunsDamage.t4Target);
    newDoubleGun.setProjectileImage(this.game.media.projectileArcRedImg);
    newDoubleGun.setOnTarget();

    //this.game.enemyGuns.push(newDoubleGun);
    this.game.enemyGuns.push(newSingleGun);
    this.gun = newSingleGun;

    this.directionChangeIntervalThen = this.game.now;
  }

  fireGun() {
    this.gun.fire();
  }

  updateShip() {
    if (this.isMovingToPosition) {
      return;
    }

    let timePassed = (this.game.now - this.directionChangeIntervalThen) / 1000;
    if (timePassed <= this.directionChangeInterval) {
      return;
    }
    this.setRandomDirection();
    this.directionChangeIntervalThen = this.game.now;
  }

  moveToThePosition() {
    if (this.game.gameBoard.isOnTheGameBoard(this)) {
      this.isMovingToPosition = false;
      this.resetVelocity();
      return;
    }
    this.game.movement.applyVelocity(this);
  }

  setNewDirection() {
    this.game.gameBoard.setDestinationOnBoardCords(this);
    this.game.movement.calculateVectorsAndDistance(this);
    this.game.movement.applyConstantSpeed(this);
  }

  move() {
    if (this.isMovingToPosition) {
      this.moveToThePosition();
    } else {
      this.game.movement.move(this, this.isCheckSouthOutOfBorderOnly);
    }
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
    this.setDead();
    this.game.init.addEffect(this, "explosionDefault");
    this.game.progression.score += this.scorePoints;
    this.game.progression.increaseThreatLevel();
    this.game.init.addItemOnDrop(this.itemToDrop, this);
  }
}
