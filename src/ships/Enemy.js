import React from "react";
import "../App.css";
import { EnemyDefault } from "../projectiles/EnemyDefault";
import {
  getRandomDirection,
  getRandomEnemyPosition,
  colors,
  getHPColor,
} from "../services/services";

export default class Enemy {
  constructor(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.collision = game.collision;
    this.w = 100;
    this.h = 50;
    this.x = getRandomEnemyPosition(this.collision.boardWidth - this.w);
    this.y = getRandomEnemyPosition(Math.floor(this.collision.boardHeight / 4));
    this.health = 100;
    this.currentColor = colors.green;
    this.isGotHit = false;
    this.isDead = false;

    /* physics related variables: v - velocity, f - friction, s - speed, a - acceleration */
    this.vX = 0;
    this.vY = 0;
    this.f = 0.95;
    this.s = 3;
    this.a = this.s / 20;
    this.direction = getRandomDirection();
    /* offStep = applies additional distance for enemies to stop their movement
    before reaching allowed borders and maintaining smooth bounce effect */
    this.offStepX = 115;
    this.offStepY = 85;
    this.now = 0;
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
    if (
      this.collision.isCollisionBorderUp(this, this.offStepY) &&
      this.direction == "up"
    ) {
      this.direction = "down";
    }
    if (
      this.collision.isCollisionBorderDown(this, this.offStepY) &&
      this.direction == "down"
    ) {
      this.direction = "up";
    }
    this.game.movement.move(this);
    this.applyPhysics();
    this.fire();
  }

  getAtkSpeed() {
    return this.game.stats.enemy.atkSpeed;
  }

  fire() {
    let timePassed = (this.game.then - this.now) / 1000;
    //console.log(`ENEMY atk timePassed = ${timePassed}`)
    if (timePassed >= this.getAtkSpeed()) {
      this.now = Date.now();
      if (this.game.projectiles.length <= 30) {

        let newProjectile = new EnemyDefault(this.game);

        newProjectile.setEnemyOwned(this);
        newProjectile.setTypeDefault();
        this.game.projectiles.push(newProjectile);
      }
    }
  // this.fireMainGun();
}

  applyPhysics() {
    /* apply friction to velocity */
    this.vX *= this.f;
    this.x += this.vX;

    this.vY *= this.f;
    this.y += this.vY;
  }

  draw() {
    if (this.isGotHit) {
      this.currentColor = colors.hitRegColor;
      this.isGotHit = false;
    } else {
      this.currentColor = getHPColor(this.health);
    }
    this.game.draw.drawObject(this, this.currentColor, true);
  }

  checkHealth() {
    if (this.health <= 0) {
      this.isDead = true;
    }
  }

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

  gotHitByProjectile(projectile) {
    this.health -= projectile.damage; // add ramming variable here
  }

  gotHitByPlayerHull() {
    this.health -= 2; // add ramming variable here
  }
}

