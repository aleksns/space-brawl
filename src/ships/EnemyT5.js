import Ship from "./Ship";
import {
  directions,
  getRandomInt,
  getEnemyT5DefaultStats,
  getEnemyT5Dimension,
} from "../services/services";
import enemyImageT5 from "../images/enemyShipT5.png";
import { SingleGun } from "../guns/SingleGun";
import { DoubleGun } from "../guns/DoubleGun";

export class EnemyT5 extends Ship {
  constructor(game) {
    super(game);
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.w = getEnemyT5Dimension().w;
    this.h = getEnemyT5Dimension().h;

    this.health = this.game.stats.enemyT5.health;
    this.maxHealth = this.game.stats.enemyT5.maxHealth;

    this.isPlayer = false;
    /* physics related variables: v - velocity, f - friction, s - speed, a - acceleration */
    this.s = 2; // default was 2
    this.a = this.s / 40; // default was this.s / 40
    this.direction = "S";
    /* offStep = applies additional distance for enemies to stop their movement
    before reaching allowed borders and maintaining smooth bounce effect */
    // this.offStepX = Math.floor(this.w / 4);
    // this.offStepY = Math.floor(this.h / 2);
    this.offStepX = this.s * 20;
    this.offStepY = this.s * 20;
    this.scorePoints = this.game.stats.enemyT5.scorePoints;
    this.now = 0;

    this.damage = this.game.stats.enemyT5.damage;
    this.atkSpeed = this.game.stats.enemyT5.atkSpeed;
    this.gun = undefined;

    this.image = new Image();
    this.image.src = enemyImageT5;

    this.directionChangeIntervalNow = 0;
    this.directionChangeInterval = 4;
    this.isOutOfBordersAllowed = true;
    console.log("CONSTRUCTOR > EnemyT5");
  }

  fireGun() {
    let timePassed = (this.game.then - this.now) / 1000;
    if (timePassed <= this.getAtkSpeed()) {
      return;
    }
    this.now = Date.now();
    this.gun.fire();
  }

  move() {
    //console.log(`ENEMY >> this.s=${this.s} AND this.a = ${this.a}`);
    this.game.movement.move(this, this.isOutOfBordersAllowed);
    // let timePassed = (this.game.then - this.directionChangeIntervalNow) / 1000;
    // if (timePassed <= this.directionChangeInterval) {
    //   return;
    // }
    // this.directionChangeIntervalNow = Date.now();
    // this.setRandomDirection();
  }

  initialize() {
    this.x = getRandomInt(this.w, this.collision.boardWidth - this.w);
    this.y = 100;
    this.getEmptyPosition();
    var newGun = new DoubleGun(this.game, this);
    this.gun = newGun;
  }

  getEmptyPosition() {
    for (let i = 0; i < this.game.enemies.length; i++) {
      while (this.game.collision.rectsColliding(this, this.game.enemies[i])) {
        this.x = getRandomInt(this.w, this.collision.boardWidth - this.w);
        this.y = 100;
      }
    }
  }

  getAtkSpeed() {
    return this.atkSpeed - this.gun.atkSpeed;
  }

  setDefaultAtkSpeed() {
    this.atkSpeed = getEnemyT5DefaultStats.atkSpeed;
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
