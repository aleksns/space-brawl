import Ship from "./Ship";
import {
  GAME_WIDTH,
  getEnemyT0Dimension,
  getDefaultEnemyProjectile,
} from "../services/services";
import { getT0Rotating, getT0Burst, getT0BurstCentered, getT0Target } from "../services/gunsProps";
import { DoubleGun } from "../guns/DoubleGun";
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
    this.rammingDmg = this.game.stats.enemyT0.rammingDmg
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
    //this.damage = this.game.stats.enemyT0.damage;
    //this.gun = undefined;
    this.target = this.game.player;

    this.image = this.game.animations.bossShipAnimation.image;
    //this.image.src = bossImage;
    this.isBoss = true;
    this.isCheckSouthOutOfBorderOnly = true;

    this.destination = {
      x: 0,
      y: 0
    }

    console.log("CONSTRUCTOR > BossT0");
  }

  fireGun() {
    for (let i = 0; i < this.game.bossGuns.length; i++) {
      this.game.bossGuns[i].fire();
    }
  }


  initializeShip() {
    this.x = GAME_WIDTH / 2 - this.w / 2;
    this.y = -this.h;

    this.setNewDirection();

    let newTripleTarget = new TripleGun(this.game, this);
    newTripleTarget.initialize(getT0Target, getDefaultEnemyProjectile);
    newTripleTarget.setGunDamage(this.game.stats.enemyGunsDamage.t0Target);
    newTripleTarget.setProjectileImage(this.game.media.projectileArcPurpleImg);
    newTripleTarget.setOnTarget();

    let newTripleBurstGun = new TripleGun(this.game, this);
    newTripleBurstGun.initialize(getT0Burst, getDefaultEnemyProjectile);
    newTripleBurstGun.setGunDamage(this.game.stats.enemyGunsDamage.t0Burst);
    newTripleBurstGun.setProjectileImage(this.game.media.projectileArcRedImg);

    let newDoubleBurstCenteredGun = new DoubleGun(this.game, this);
    newDoubleBurstCenteredGun.initialize(getT0BurstCentered, getDefaultEnemyProjectile);
    newDoubleBurstCenteredGun.setGunDamage(this.game.stats.enemyGunsDamage.t0Burst);
    newDoubleBurstCenteredGun.setProjectileImage(this.game.media.projectileArcRedImg);

    let newDoubleRotatingGun = new DoubleGun(this.game, this);
    newDoubleRotatingGun.initialize(getT0Rotating, getDefaultEnemyProjectile);
    newDoubleRotatingGun.setGunDamage(this.game.stats.enemyGunsDamage.t0Rotating);
    newDoubleRotatingGun.setProjectileImage(this.game.media.projectileArcRedImg);

    this.game.bossGuns.push(newTripleTarget);
    this.game.bossGuns.push(newTripleBurstGun);
    this.game.bossGuns.push(newDoubleBurstCenteredGun);
    this.game.bossGuns.push(newDoubleRotatingGun);
  }

  updateShip() {
    // if (this.health <= 0) {
    //   this.setDead();
    //   this.onDeath();
    // }
    this.updateImage();
  }

  updateImage() {
    this.image = this.game.animations.bossShipAnimation.image;
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
