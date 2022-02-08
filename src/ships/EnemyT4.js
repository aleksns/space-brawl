import Ship from "./Ship";
import {
  directions,
  getRandomDirection,
  getRandomInt,
  getEnemyT4DefaultStats,
  getEnemyT4Dimension,
  getDefaultEnemyProjectile,
  getDefaultPlayerProjectile,
} from "../services/services";
import enemyImageT4 from "../images/enemyShipT4.png";
import { SingleGun } from "../guns/SingleGun";
import { DoubleGun } from "../guns/DoubleGun";
import { getEnemyT4GunProps, getPlayerT4Rotating } from "../services/gunsProps";

export class EnemyT4 extends Ship {
  constructor(game) {
    super(game);
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.w = getEnemyT4Dimension().w;
    this.h = getEnemyT4Dimension().h;

    this.health = this.game.stats.enemyT4.health;
    this.maxHealth = this.game.stats.enemyT4.maxHealth;

    this.isPlayer = false;
    /* physics related variables: v - velocity, f - friction, s - speed, a - acceleration */
    this.s = this.game.stats.enemyT4.s; // default was 2
    this.a = this.s / 40; // default was this.s / 40
    this.direction = getRandomDirection();
    /* offStep = applies additional distance for enemies to stop their movement
    before reaching allowed borders and maintaining smooth bounce effect */
    this.offStepX = this.s * 20;
    this.offStepY = this.s * 20;
    this.scorePoints = this.game.stats.enemyT4.scorePoints;
    this.now = 0;

    this.damage = this.game.stats.enemyT4.damage;
    this.gun = undefined;
    this.target = this.game.player;

    this.image = new Image();
    this.image.src = enemyImageT4;

    this.directionChangeIntervalThen = 0;
    this.directionChangeInterval = 4;
    this.isCheckSouthOutOfBorderOnly = false;
    this.isBoss = false;

    this.itemToDrop = {
      id: "coin",
      value: 3,
    }
    //console.log("CONSTRUCTOR > EnemyT4");
  }

  fireGun() {
    this.gun.fire();
  }

  updateShip() {
    let timePassed = (this.game.now - this.directionChangeIntervalThen) / 1000;
    if (timePassed <= this.directionChangeInterval) {
      return;
    }
    this.setRandomDirection();
    this.directionChangeIntervalThen = this.game.now;
  }

  move() {
    this.game.movement.move(this, this.isCheckSouthOutOfBorderOnly);
  }

  initializeShip() {
    this.x = getRandomInt(this.w, this.collision.width - this.w);
    this.y = getRandomInt(
      this.collision.allowedY.y0,
      Math.floor(this.collision.height / 2.5)
    );
    this.getEmptyPositionOnBoard();

    let newSingleGun = new SingleGun(this.game, this);
    newSingleGun.initialize(getPlayerT4Rotating, getDefaultEnemyProjectile);
    newSingleGun.setOnTarget();

    let newDoubleGun = new DoubleGun(this.game, this);
    newDoubleGun.initialize(getPlayerT4Rotating, getDefaultEnemyProjectile);
    newDoubleGun.setOnTarget();

    this.game.enemyGuns.push(newDoubleGun);
    this.game.enemyGuns.push(newSingleGun);
    this.gun = newSingleGun;

    this.directionChangeIntervalThen = Date.now();
  }

  setRandomDirectionFromList(listOfDirections) {
    let index = getRandomInt(0, listOfDirections.length - 1);
    this.direction = directions[index];
    this.directionChangeIntervalThen = this.game.now;
  }

  setRandomDirection() {
    this.direction = getRandomDirection();
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
