import Ship from "./Ship";
import {
  directions,
  getRandomDirection,
  getRandomInt,
  getEnemyT4DefaultStats,
  getEnemyT4Dimension,
} from "../services/services";
import enemyImageT4 from "../images/enemyShipT4.png";
import { SingleTarget } from "../guns/SingleTarget";

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
    //this.s = 0;
    //this.a = 0;
    this.direction = getRandomDirection();
    /* offStep = applies additional distance for enemies to stop their movement
    before reaching allowed borders and maintaining smooth bounce effect */
    this.offStepX = this.s * 20;
    this.offStepY = this.s * 20;
    this.scorePoints = this.game.stats.enemyT4.scorePoints;
    this.now = 0;

    this.damage = this.game.stats.enemyT4.damage;
    this.atkSpeed = this.game.stats.enemyT4.atkSpeed;
    this.gun = undefined;
    this.target = this.game.player;
    this.projectileSpeedModifier = this.game.stats.enemyT4.projectileSpeedModifier;

    this.image = new Image();
    this.image.src = enemyImageT4;

    this.directionChangeIntervalThen = 0;
    this.directionChangeInterval = 4;
    this.isCheckSouthOutOfBorderOnly = false;
    this.isBoss = false;
    console.log("CONSTRUCTOR > EnemyT4");
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
    var newGun = new SingleTarget(this.game, this);
    this.gun = newGun;
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

  getAtkSpeed() {
    return this.atkSpeed - this.gun.atkSpeed;
  }

  setDefaultAtkSpeed() {
    this.atkSpeed = getEnemyT4DefaultStats.atkSpeed;
  }

  playHitEffect(projectileType) {
    //tbd
  }

  onDeath() {
    this.game.init.addEffect(this, "default");
    this.game.score += this.scorePoints;
    this.game.progression.increaseThreatLevel();
  }
}
