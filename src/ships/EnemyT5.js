import Ship from "./Ship";
import {
  directions,
  getObjectCenterPosition,
  getRandomInt,
  getEnemyT5DefaultStats,
  getEnemyT5Dimension,
  GAME_WIDTH,
} from "../services/services";
import enemyImageT5 from "../images/enemyShipT5.png";
import { SingleFront } from "../guns/SingleFront";

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
    this.distance = 0;

    this.health = this.game.stats.enemyT5.health;
    this.maxHealth = this.game.stats.enemyT5.maxHealth;
    this.isPlayer = false;
    /* physics related variables: v - velocity, f - friction, s - speed, a - acceleration */
    this.s = this.game.stats.enemyT5.s; // default was 2
    this.a = this.s / 60; // default was this.s / 40
    //this.direction = "S";
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
    this.target = undefined;
    this.projectileSpeedModifier = this.s * this.game.stats.enemyT5.projectileSpeedModifier;

    this.image = new Image();
    this.image.src = enemyImageT5;

    //width and height help to detect the collision (moment when an object has arrived)
    this.moveToPosition = {
      x: 0,
      y: 0,
      w: 5,
      h: 5
    }

    this.cords = {
      p1X: 0,
      p1Y: 0,
      p2X: 0,
      p2Y: 0
    }
    this.isBoss = false;
    this.directionChangeIntervalNow = 0;
    this.directionChangeInterval = 4;
    this.isCheckSouthOutOfBorderOnly = true;
    console.log("CONSTRUCTOR > EnemyT5");
  }

  fireGun() {
    this.gun.fire();
    this.game.laser.play();
  }
 
  
  initializeShip() {
    this.x = getRandomInt(this.w, this.collision.width - this.w);
    this.y = getRandomInt(-this.h - 50, -this.h - 100);

    this.getEmptyPositionOutsideNorthBoard();
    this.setNewDirection();

    this.setTargetFront();
    var newGun = new SingleFront(this.game, this);
    this.gun = newGun; 
  }

  move() {  
    this.game.movement.applyVelocity(this);
  }

  updateShip() {
    if (this.game.collision.isCollisionBorderDown(this, -this.h)) {
      this.setDead();
    }
  }

  setNewDirection() {
    this.moveToPosition.x = this.x;
    this.moveToPosition.y = GAME_WIDTH + this.h;

    this.setCordsOfTwoPoints();
    this.game.movement.setTrajectory(this);
  }

  setCordsOfTwoPoints() {
    this.cords = {
      p1X: this.x,
      p1Y: this.y,
      p2X: this.moveToPosition.x,
      p2Y: this.moveToPosition.y,
    };
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
