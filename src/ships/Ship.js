import {
  roundDecimalHundreds,
  getRandomIntInclusive,
  GAME_HEIGHT,
  GAME_WIDTH,
  getRandomDirection,
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
    this.shadowColor = "transparent";
    this.shadowBlur = 0;
    this.filter = "none";

    /* physics related variables: v - velocity, f - friction, s - speed, a - acceleration */
    this.vX = 0;
    this.vY = 0;
    this.then = 0;
    this.id = undefined;
    //console.log("CONSTRUCTOR > Ship");
  }

  initialize() {
    this.initializeShip();
    //this.initTimers();

    if (this.game.stats.isGlobalSlowAll && !this.isPlayer) {
      this.game.stats.decreaseShipSpeed(
        this,
        this.game.stats.slowModifiers.speedGlobal
      );
    }
  }

  initTimers() {
    this.then = this.game.now;
  }

  update() {
    if (this.game.isGlobalActionRestricted) {
      return;
    }
    if (this.health <= 0) {
      this.setDead();
      this.onDeath();
      return;
    }

    this.respawnIfOutsideBorders();

    if (!this.isPlayer) {
      this.move();
    }

    this.updateShip();
    this.fireGun();
  }

  setTargetFront() {
    this.target = {
      y: GAME_HEIGHT + this.h,
    };
  }

  setDead() {
    this.isDead = true;
  }

  respawnIfOutsideBorders() {
    if (this.isMovingToPosition) {
      return;
    }

    if (
      this.game.collision.isOutOfBorders(this) &&
      !this.isCheckSouthOutOfBorderOnly
    ) {
      this.respawn();
    }
  }

  respawn() {
    console.log(`Error. Ship's OUTSIDE borders. Last x = ${this.x}, last y = ${this.y}`);
    this.x = GAME_WIDTH / 2;
    this.y = GAME_HEIGHT / 2;
  }

  gotHitByProjectile(projectile) {
    if (this.isShieldOn) {
      return;
    }
    this.isGotHit = true;
    this.health = this.health - projectile.damage;
    this.updateHealth();
    this.playHitEffect(projectile);
  }

  updateHealth() {
    this.health = roundDecimalHundreds(this.health);
    if (this.health < 0) {
      this.health = 0;
    }
  }

  gotHitTest() {
    this.isGotHit = true;
  }

  gotHitByShipHull(ship) {
    this.isGotHit = true;
    if (this.isShieldOn) {
      this.health = this.health - ship.rammingDmg / 10;
    } else {
      this.health = this.health - ship.rammingDmg;
    }
  }

  setRandomDirection() {
    if(this.isMovingToPosition) {
      return;
    }
    this.direction = getRandomDirection();
  }

  updateTimersAfterPauseOff() {
    this.then += this.game.timeDifference;
  }
}
