import { roundDecimalHundreds } from "../services/services";

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

    /* physics related variables: v - velocity, f - friction, s - speed, a - acceleration */
    this.vX = 0;
    this.vY = 0;
    this.f = 0.95;
    
    console.log("CONSTRUCTOR > Ship");
  }

  startTimers() {
    this.now = Date.now();
  }

  update() {
    if (this.health <= 0 || this.game.collision.isOutOfBorders(this)) {
      this.health = 0;
      this.setDead();
      this.onDeath();
    }
    if(!this.isPlayer) {
     this.move();
    }

     this.fireGun();
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
  }

  gotHitByProjectile(projectile) {
    this.health = this.health - projectile.damage;
  }

  gotHitByShipHull() {
    this.health = this.health - 0.1;  //hardcoded temporary variable
  }
}
