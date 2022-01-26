import Ship from "./Ship";
import {
  GAME_WIDTH,
  getRandomDirection,
  getEnemyT0DefaultStats,
  getEnemyT0Dimension,
  getTripleGunPosition,
  GAME_HEIGHT,
} from "../services/services";
import bossImage from "../images/enemyBoss.png";
import { SingleFront } from "../guns/SingleFront";
import { DoubleFront } from "../guns/DoubleFront";
import { TripleFront } from "../guns/TripleFront";

export class Boss extends Ship {
  constructor(game) {
    super(game);
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.w = getEnemyT0Dimension().w;
    this.h = getEnemyT0Dimension().h;
    this.dX = 0;
    this.dY = 0;

    this.health = this.game.stats.enemyT0.health;
    this.maxHealth = this.game.stats.enemyT0.maxHealth;
    this.isPlayer = false;
    //this.gun = "default";
    /* physics related variables: v - velocity, f - friction, s - speed, a - acceleration */
    this.s = this.game.stats.enemyT0.s;
    this.a = this.s / 60;

    //this.direction = getRandomDirection();
    /* offStep = applies additional distance for enemies to stop their movement
    before reaching allowed borders and maintaining smooth bounce effect */
    this.offStepX = Math.floor(this.w / 2);
    this.offStepY = Math.floor(this.h / 2);
    this.scorePoints = this.game.stats.enemyT0.scorePoints;
    this.now = 0;
    this.damage = this.game.stats.enemyT0.damage;
    this.atkSpeed = this.game.stats.enemyT0.atkSpeed;
    this.gun = undefined;
    this.target = this.game.player;
    this.projectileSpeedModifier =
      this.game.stats.enemyT0.projectileSpeedModifier;

    this.image = new Image();
    this.image.src = bossImage;
    this.isBoss = true;
    this.isCheckSouthOutOfBorderOnly = true;

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

    console.log("CONSTRUCTOR > BossT0");
    //console.log(`GAME_WIDTH = ${GAME_WIDTH}`);
  }

  fireGun() {
    this.gun.fire();
  }

  initializeShip() {
    // this.x = 0;
    // this.y = this.collision.allowedY.y0 - 20;
    this.x = GAME_WIDTH / 2 - this.w / 2;
    this.y = -this.h;
    var newGun = new TripleFront(this.game, this);
    this.gun = newGun;

    this.setNewDirection();
  }

  updateShip() {
    if (this.health <= 0) {
      this.setDead();
      this.onDeath();
    }
  }

  move() {
    //tbd
  }

  animateBossAppearance() {
    this.game.movement.applyVelocity(this);
  }

  isAtThePosition() {
    return (this.x == this.moveToPosition.x && this.y >= this.moveToPosition.y);
  }

  setNewDirection() {
    this.moveToPosition.x = this.x;
    this.moveToPosition.y = this.collision.allowedY.y0;

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
    this.atkSpeed = getEnemyT0DefaultStats.atkSpeed;
  }

  playHitEffect(projectileType) {
    //tbd
  }

  onDeath() {
    this.game.init.addEffect(this, "default");
    this.game.score += this.scorePoints;
    this.game.progression.advanceLevel();
  }
}
