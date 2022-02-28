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
    this.expPoints = Math.floor(this.scorePoints / 2);
    this.now = 0;
    this.target = this.game.playerTeam[0];

    this.image = this.game.animations.bossShipAnimation.image;

    this.isBoss = true;
    this.isCheckSouthOutOfBorderOnly = true;
    this.isDefeated = false;
    this.destination = {
      x: 0,
      y: 0
    }

    this.guns = [];
    console.log("CONSTRUCTOR > BossT0");
  }

  fireGun() {
    for (let i = 0; i < this.guns.length; i++) {
      this.guns[i].fire();
    }
  }


  initializeShip() {
    this.x = GAME_WIDTH / 2 - this.w / 2;
    this.y = -this.h;

    this.setAppearanceDestinationCords();
    this.game.movement.calculateVectorsAndDistance(this);

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

    this.game.enemyGuns.push(newTripleTarget);
    this.game.enemyGuns.push(newTripleBurstGun);
    this.game.enemyGuns.push(newDoubleBurstCenteredGun);
    this.game.enemyGuns.push(newDoubleRotatingGun);

    this.guns.push(newTripleTarget);
    this.guns.push(newTripleBurstGun);
    this.guns.push(newDoubleBurstCenteredGun);
    this.guns.push(newDoubleRotatingGun);
  }

  updateShip() {
    this.updateImage();
  }

  updateImage() {
    this.image = this.game.animations.bossShipAnimation.image;
  }

  move() {
    //tbd
  }

  animateBossAppearance() {
    this.game.movement.moveSouth(this);
    this.game.movement.applyVelocity(this);
  }

  animateBossEscape() {
    this.game.movement.moveNorth(this);
    this.game.movement.applyVelocity(this);
  }

  isAtThePositionOnScreen() {
    return (this.y >= this.destination.y);
  }

  isAtThePositionOutsideScreen() {
    return (this.y < -this.h);
  }

  setAppearanceDestinationCords() {
    this.destination.x = this.x;
    this.destination.y = this.collision.allowedY.y0 / 2;
  }

  setEscapeDestinationCords() {
    this.destination.x = this.x;
    this.destination.y = -this.h;
  }

  playHitEffect(projectile) {
    this.game.init.addEffect(projectile, projectile.type);
  }

  onDeath() {
    this.image = this.game.animations.bossShipAnimation.imageDefeated;
    this.isDefeated = true;
    this.setEscapeDestinationCords();
    this.game.progression.increaseExp(this.scorePoints, true)
  }

  applyScore() {
    this.game.progression.score += this.scorePoints;
  }
}
