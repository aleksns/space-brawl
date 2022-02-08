import { colors, getPlayerLaser, getEnemyLaser } from "../services/services";
import Projectile from "./Projectile";

export class Laser extends Projectile {
  constructor(game, gun, barrel) {
    super(game, gun, barrel);
    this.game = game;
    this.w = 0;
    this.h = 0;
    //dW is needed to apply proper width to the laser, depending on the remaining time
    this.dW = 0;
    this.color = undefined;
    this.explosionColor = undefined;
    this.type = "explosionSmall";
    this.damage = 0;
    this.opacity = 1.0;
    this.s = 0;
    this.a = 0;
    this.isFill = undefined;
    this.isLaser = true;
    this.image = undefined;
  }

  setLaserStats(gun) {
    if(gun.isPlayerOwned) {
      this.setPlayerLaserShape();
      this.setPlayerLaserStats();
    }
    else {
      this.setEnemyLaserShape();
      this.setEnemyLaserStats();
    }
  }

  setPlayerLaserShape() {
    this.w = getPlayerLaser.w;
    this.h = getPlayerLaser.h;
    this.dW = this.w;
    this.color = getPlayerLaser.color;
    this.explosionColor = "orange";
    this.isFill = getPlayerLaser.isFill;
    this.image = this.game.gameBoard.projectileLaserImgPlayer;
  }

  setPlayerLaserStats() {
    this.damage = this.gun.damage;
    this.s = this.gun.projectileSpeed;
    this.a = this.gun.projectileAcceleration;
    this.isPlayerOwned = true;
  }

  setEnemyLaserShape() {
    this.w = getEnemyLaser.w;
    this.h = getEnemyLaser.h;
    this.color = getEnemyLaser.color;
    this.explosionColor = "red";
    this.isFill = getEnemyLaser.isFill;
    //this.image = this.game.gameBoard.projectileDefaultImgEnemey;
  }

  setEnemyLaserStats() {
    this.damage = this.gun.damage;
    this.s = this.gun.projectileSpeed;
    this.a = this.gun.projectileAcceleration;
    this.isPlayerOwned = false;
  }

  setLaserWidth(value) {
    this.w = value;
  }
}
