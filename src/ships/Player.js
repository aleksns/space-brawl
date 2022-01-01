//import Projectile from "../projectiles/Projectile";

import {PlayerDefault} from "../projectiles/PlayerDefault";

import { colors, getHPColor } from "../services/services";

export default class Player {
  constructor(game) {
    this.game = game;
    this.collision = game.collision;
    this.x = 300;
    this.y = 600;
    this.w = 70;
    this.h = 40;
    this.ctx = game.ctx;
    // this.boardWidth = game.boardWidth;
    // this.boardHeight = game.boardHeight;
    this.health = 100;
    this.damage = this.game.stats.playerProjectilesDmg.default;
    this.currentColor = "#5baac9";
    this.isGotHit = false;
    this.isDead = false;
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
    this.applyPhysics();
    this.collision.adjustPlayerPositionOnBordersCollision(this);
    //this.fireMainGun();
    this.fire();
    this.game.draw.playerGotHitAnimation();
  }

  draw() {
    if (this.isGotHit) {
      this.currentColor = colors.red;
      this.isGotHit = false;
    } else {
      this.currentColor = "#5baac9";
    }
    this.game.draw.drawObject(this, this.currentColor, false);
  }

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
     // console.log(`timePassed = ${timePassed}`)
      if (timePassed >= this.getAtkSpeed()) {
        this.now = Date.now();
        if (this.game.projectiles.length <= 30) {
  
          let newProjectile = new PlayerDefault(this.game);
  
          newProjectile.setPlayerOwned();
          newProjectile.setTypeDefault();
          this.game.projectiles.push(newProjectile);
        }
      }
    // this.fireMainGun();
  }

  // fireMainGun() {
  //   let timePassed = (this.now - this.game.then) / 1000;
  //   if (-timePassed >= 0.6) {
  //     this.now = Date.now();
  //     if (this.game.projectiles.length <= 30) {

  //       let newProjectile = new PlayerDefault(this.game);

  //       newProjectile.setPlayerOwned();
  //       newProjectile.setTypeDefault();
  //       this.game.projectiles.push(newProjectile);
  //     }
  //   }
  // }

  gotHit(isByProjectile, projectile) {
    this.isGotHit = true;
    if(isByProjectile) {
      this.gotHitByProjectile(projectile);
    }
    else {
      this.gotHitByPlayerHull();
    }
    this.checkHealth();
    console.log("enemy ship HEALTH = " + this.health);
  }

  gotHit(isByProjectile, projectile) {
    this.isGotHit = true;
    if(isByProjectile) {
      this.gotHitByProjectile(projectile);
    }
    else {
      this.gotHitByEnemyHull();
    }
    //this.game.draw.playerGotHitAnimation();
    //this.health = Math.floor(this.health - 1);
  }

  gotHitByProjectile(projectile) {
    this.health = Math.floor(this.health - projectile.damage);
  }

  gotHitByEnemyHull() {
    this.health = Math.floor(this.health - this.game.stats.enemy.rammingDmg);
  }

  // playerGotHitAnimation() {
  //   if (this.animationOpacity <= 0) {
  //     this.animationOpacity = 0.1;
  //   }

  //   this.ctx.current.globalAlpha = this.animationOpacity;
  //   this.ctx.current.beginPath();
  //   this.ctx.current.arc(this.x, this.y, this.animationRadius, 0, 2 * Math.PI);
  //   this.ctx.current.fill();
  //   this.ctx.current.closePath();

  //   this.animationRadius += 1.6;
  //   this.animationOpacity += 0.05;
  //   this.animationOpacity = Math.round((this.animationOpacity + Number.EPSILON) * 100) / 100;

  //   if (this.animationOpacity >= 0.4) {
  //     this.animationOpacity = this.animationOpacity * -1;
  //   }
  // }

  applyPhysics() {
    /* apply friction to velocity */
    this.vX *= this.f;
    this.x += this.vX;

    this.vY *= this.f;
    this.y += this.vY;
  }
}
