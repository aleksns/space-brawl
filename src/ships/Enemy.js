import {
  getRandomDirection,
  getRandomInt,
  colors,
} from "../services/services";
import enemyImage from "../images/enemyShip.png";

export default class Enemy {
  constructor(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.collision = game.collision;
    this.w = 150;
    this.h = 100;
    this.x = getRandomInt(this. w, this.collision.boardWidth - this.w);   ///make it to 0 and then in separate method randomize position
    this.y = getRandomInt(0, Math.floor(this.collision.boardHeight / 2));  ///just like with bgEffects
    this.health = 100;
    this.maxHealth = 100;
    this.color = "transparent";
    this.colorHitReg = colors.red;
    this.colorDefault = "transparent";
    this.opacity = 1.0;
    this.isGotHit = false;
    this.isDead = false;
    this.isFill = false;
    this.shadowColor = "transparent";
    this.shadowBlur = 0;
    this.imageSrc = enemyImage;
    /* physics related variables: v - velocity, f - friction, s - speed, a - acceleration */
    this.vX = 0;
    this.vY = 0;
    this.f = 0.95;
    this.s = 3;
    this.a = this.s / 30;
    this.direction = getRandomDirection();
    /* offStep = applies additional distance for enemies to stop their movement
    before reaching allowed borders and maintaining smooth bounce effect */
    this.offStepX = Math.floor(this.w / 2);;
    this.offStepY = Math.floor(this.h / 2);
    this.scorePoints = 25;
    this.now = Date.now();
    console.log("CONSTRUCTOR > Enemy");
  }

  setDead() {
    this.isDead = true;
  }

  update() {
    if (
      this.collision.isCollisionBorderLeft(this, this.offStepX) &&
      this.direction == "left"
    ) {
      this.direction = "right";
    }
    if (
      this.collision.isCollisionBorderRight(this, this.offStepX) &&
      this.direction == "right"
    ) {
      this.direction = "left";
    }
    // if (
    //   this.collision.isCollisionBorderUp(this, this.offStepY) &&
    //   this.direction == "up"
    // ) {
    //   this.direction = "down";
    // }
    // if (
    //   this.collision.isCollisionBorderDown(this, this.offStepY) &&
    //   this.direction == "down"
    // ) {
    //   this.direction = "up";
    // }
    this.game.movement.move(this);
    //this.applyPhysics();
     this.fire();
  }

  getAtkSpeed() {
    return this.game.stats.enemy.atkSpeed;
  }

  fire() {
    let timePassed = (this.game.then - this.now) / 1000;
    if (timePassed >= this.getAtkSpeed()) {
      this.now = Date.now();
      this.game.init.addEnemyProjectile(this);
    }
}

  checkIsDead() {
    if (this.health <= 0) {
      this.isDead = true;
      this.onDeath();
    }
  }

  onDeath() {
    this.game.init.addEffect(this, "default");
    this.game.score += this.scorePoints;
  }

  gotHit(isByProjectile, projectile) {
    this.isGotHit = true;
    if(isByProjectile) {
      this.gotHitByProjectile(projectile);
      //console.log(`got hit with dmg = ${projectile.damage} | remaining HEALTH = ${this.health}`)
    }
    else {
      this.gotHitByPlayerHull();
    }
    this.checkIsDead();
  }

  gotHitByProjectile(projectile) {
    this.health -= projectile.damage;
  }

  gotHitByPlayerHull() {
    this.health -= this.game.stats.player.rammingDmg;
  }
}

