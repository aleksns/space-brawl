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
import { SingleGun } from "../guns/SingleGun";
import { TripleGun } from "../guns/TripleGun";

export class Boss extends Ship {
  constructor(game) {
    super(game);
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.w = getEnemyT0Dimension().w;
    this.h = getEnemyT0Dimension().h;
    this.vX = 0;
    this.vY = 0;
    this.dX = 0;
    this.dY = 0;

    this.health = this.game.stats.enemyT0.health;
    this.maxHealth = this.game.stats.enemyT0.maxHealth;
    this.isPlayer = false;
    /* physics related variables: v - velocity, f - friction, s - speed, a - acceleration */
    this.s = this.game.stats.enemyT0.s;
    this.a = this.s / 60;

    /* offStep = applies additional distance for enemies to stop their movement
    before reaching allowed borders and maintaining smooth bounce effect */
    this.offStepX = Math.floor(this.w / 2);
    this.offStepY = Math.floor(this.h / 2);
    this.scorePoints = this.game.stats.enemyT0.scorePoints;
    this.now = 0;
    this.damage = this.game.stats.enemyT0.damage;
    this.gun = undefined;
    this.target = this.game.player;

    this.image = new Image();
    this.image.src = bossImage;
    this.isBoss = true;
    this.isCheckSouthOutOfBorderOnly = true;

    this.destination = {
      x: 0,
      y: 0
    }

    console.log("CONSTRUCTOR > BossT0");
  }

  fireGun() {
    this.gun.fire();
  }

  initializeShip() {
    this.x = GAME_WIDTH / 2 - this.w / 2;
    this.y = -this.h;
    var newGun = new TripleGun(this.game, this);
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
    this.game.movement.calculateVectorsAndDistance(this);
    this.game.movement.moveSouth(this);
    this.game.movement.applyVelocity(this);
  }

  isAtThePosition() {
    return (this.y >= this.destination.y);
  }

  setNewDirection() {
    this.setDestinationCords();
    this.game.movement.calculateVectorsAndDistance(this);
  }

  setDestinationCords() {
    this.destination.x = this.x;
    this.destination.y = this.collision.allowedY.y0 / 2;
  }

  playHitEffect(projectileType) {
    this.game.init.addEffect(this, projectileType);
  }

  onDeath() {
    this.game.init.addEffect(this, "explosionDefault");
    this.game.progression.score += this.scorePoints;
    this.game.progression.advanceLevel();
  }
}
