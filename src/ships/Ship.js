import {
  roundDecimalHundreds,
  getRandomInt,
  GAME_HEIGHT,
} from "../services/services";

export default class Ship {
  constructor(game) {
    this.game = game;
    this.collision = game.collision;
    this.color = "transparent";
    this.opacity = 1.0;
    this.isGotHit = false;
    this.isDead = false;
    this.isFill = false;
    this.isSlowSpeedApplied = false;
    this.shadowColor = "transparent";
    this.shadowBlur = 0;
    this.filter = "none";

    /* physics related variables: v - velocity, f - friction, s - speed, a - acceleration */
    this.vX = 0;
    this.vY = 0;
    this.f = 0.95;

    this.then = 0;
    console.log("CONSTRUCTOR > Ship");
  }

  initialize() {
    this.initializeShip();
    this.initTimers();

    if(this.game.stats.isGlobalSlowAll) {
      this.game.stats.applySpeedReductionObject(this);
    }
  }

  initTimers() {
    this.then = this.game.now;
  }

  update() {
    if (
      (this.health <= 0 && !this.isBoss) ||
      (this.game.collision.isOutOfBorders(this) &&
        this.isCheckSouthOutOfBorderOnly == false)
    ) {
      this.setDead();
      this.onDeath();
    }
    if (!this.isPlayer) {
      this.updateShip();
      this.move();
    }

    let timePassed = (this.game.now - this.then) / 1000;
    if (timePassed <= this.getAtkSpeed()) {
      return;
    }

     this.then = this.game.now;
     this.fireGun();
  }

  setTargetFront() {
    this.target = {
      y: GAME_HEIGHT + this.h,
    };
  }

  getEmptyPositionOnBoard() {
    for (let i = 0; i < this.game.enemies.length; i++) {
      while (this.game.collision.rectsColliding(this, this.game.enemies[i])) {
        this.x = getRandomInt(this.w, this.collision.width - this.w);
        this.y = getRandomInt(
          this.collision.allowedY.y0,
          Math.floor(this.collision.height / 2.5)
        );
      }
    }
  }

  getEmptyPositionOutsideNorthBoard() {
    for (let i = 0; i < this.game.enemies.length; i++) {
      while (this.game.collision.rectsColliding(this, this.game.enemies[i])) {
        this.x = getRandomInt(this.w, this.collision.width - this.w);
        this.y = getRandomInt(this.w - 50, this.w - 100);
      }
    }
  }

  setDead() {
    this.isDead = true;
  }

  gotHit(isByProjectile, projectile) {
    this.isGotHit = true;
    if (isByProjectile) {
      this.gotHitByProjectile(projectile);
      this.playHitEffect(projectile.type);
    } else {
      this.gotHitByShipHull();
    }

    this.health = roundDecimalHundreds(this.health);
    if(this.health < 0) {
      this.health = 0;
    }
  }

  gotHitByProjectile(projectile) {
    this.health = this.health - projectile.damage;
  }

  gotHitByShipHull() {
    this.health = this.health - 0.1; //hardcoded temporary variable
  }

  updateTimersAfterPauseOff() {
      this.then += this.game.timeDifference;
  }
}
