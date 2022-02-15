import Ship from "./Ship";
import {
  directions,
  getRandomDirection,
  getRandomInt,
  getEnemyT3Dimension,
  getDefaultEnemyProjectile,
} from "../services/services";

import { DoubleGun } from "../guns/DoubleGun";
import { SingleGun } from "../guns/SingleGun";
import { getBossT3DoubleSpray } from "../services/gunsProps";

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
    this.gun = undefined;
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

    let newDoubleSprayGun = new DoubleGun(this.game, this);
    newDoubleSprayGun.initialize(getBossT3DoubleSpray, getDefaultEnemyProjectile);
    newDoubleSprayGun.setProjectileImage(this.game.media.projectilePurpleImg);
    
    this.game.enemyGuns.push(newDoubleSprayGun);
    this.gun = newDoubleSprayGun;

    this.directionChangeIntervalThen = Date.now();
  }

  fireGun() {
    this.gun.fire();
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
    this.destination.x = getRandomInt(
      this.game.gameBoard.enemyAllowedX.x0,
      this.game.gameBoard.enemyAllowedX.x1 - this.w
    );
    this.destination.y = getRandomInt(
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
    let index = getRandomInt(0, listOfDirections.length - 1);
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
