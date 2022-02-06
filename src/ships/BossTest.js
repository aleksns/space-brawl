import Ship from "./Ship";
import {
  GAME_WIDTH,
  getRandomDirection,
  getEnemyT0DefaultStats,
  getEnemyT0Dimension,
  getTripleGunPosition,
  GAME_HEIGHT,
  getDefaultEnemyProjectile,
} from "../services/services";
import bossImage from "../images/enemyBoss.png";
import { SingleFront } from "../guns/SingleFront";
import { DoubleFront } from "../guns/DoubleFront";
import { TripleFront } from "../guns/TripleFront";
import { getBossT4TripleBurstGunProps } from "../services/gunsProps";

export class BossTest extends Ship {
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
    // for (let i = 0; i < this.game.bossGuns.length; i++) {
    //   this.game.bossGuns[i].fire();
    // }
  }

  initializeShip() {
    this.x = GAME_WIDTH / 2 - this.w / 2;
    this.y = 50;

    let tripleFront = new TripleFront(this.game, this);
    tripleFront.initialize(getBossT4TripleBurstGunProps, getDefaultEnemyProjectile);

    this.game.bossGuns.push(tripleFront);
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

  getAtkSpeed() {
    return this.atkSpeed;
  }

  setDefaultAtkSpeed() {
    this.atkSpeed = getEnemyT0DefaultStats.atkSpeed;
  }


  playHitEffect(projectile) {
    this.game.init.addEffect(projectile, projectile.type);
  }

  onDeath() {
    this.game.bossGuns = [];
    this.game.init.addEffect(this, "explosionDefault");
    this.game.progression.score += this.scorePoints;
    this.game.progression.advanceLevel();
  }
}
