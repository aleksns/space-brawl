//import Projectile from "../projectiles/Projectile";

import { PlayerDefault } from "../projectiles/PlayerDefault";

import { colors, getHPColor } from "../services/services";

export default class Player {
  constructor(game) {
    this.game = game;
    this.collision = game.collision;
    this.x = 300;
    this.y = 600;
    this.w = 70;
    this.h = 40;
    this.health = 100;
    this.color = "#5baac9";
    this.opacity = 1.0;
    this.isGotHit = false;
    this.isDead = false;
    this.isFill = false;
    this.shadowColor = "transparent";
    this.shadowBlur = 0;
    this.gun = "default";
    /* physics related variables: v - velocity, f - friction, s - speed, a - acceleration */
    this.vX = 0;
    this.vY = 0;
    this.f = 0.95;
    this.s = 25;
    this.a = this.s / 10;
    this.now = 0;

    // this.animationOpacity = 0.1;
    // this.animationRadius = 50;
    console.log("CONSTRUCTOR > Player");
  }

  update() {
    if (this.health <= 0) {
      //this.health = 0 ----> doesnt work, check UI updates
      this.isDead = true;
    }
    //this.game.movement.applyPhysics(this);
    this.collision.adjustPlayerPositionOnBordersCollision(this);
    this.fire();
  }

  // updateGunStatus() {
  //   switch (this.gun) {
  //     case "default":
  //       this.damage = this.game.stats.playerProjectilesDmg.default;
  //       break;
  //     default:
  //       console.log("Error handling `updateGunStatus` in Player class");
  //       break;
  //   }
  // }

  getAtkSpeed() {
    return this.game.stats.player.atkSpeed;
  }

  setDamage(value) {
    this.damage = value;
  }

  getDamage() {
    return this.damage;
  }

  fire() {
    let timePassed = (this.game.then - this.now) / 1000;
    if (timePassed < this.getAtkSpeed()) {
      return;
    } else {
      this.now = Date.now();
      this.game.init.addPlayerProjectile(this);
    }
    // if (timePassed >= this.getAtkSpeed()) {
    //   this.now = Date.now();
    //   this.game.init.addPlayerProjectile(this);
    // }
  }

  gotHit(isByProjectile, projectile) {
    this.isGotHit = true;
    if (isByProjectile) {
      this.gotHitByProjectile(projectile);
      this.game.init.addEffect(this, projectile.type);
    } else {
      this.gotHitByEnemyHull();
    }

    //this.health = Math.floor(this.health - 1);
  }

  gotHitByProjectile(projectile) {
    this.health = this.health - projectile.damage;
  }

  gotHitByEnemyHull() {
    this.health = this.health - this.game.stats.enemy.rammingDmg;
  }

  applyPhysics() {
    /* apply friction to velocity */
    this.vX *= this.f;
    this.x += this.vX;

    this.vY *= this.f;
    this.y += this.vY;
  }
}
