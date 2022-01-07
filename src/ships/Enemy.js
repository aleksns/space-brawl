import Ship from "./Ship";
import {
  getRandomDirection,
  getRandomInt,
  getEnemyDefaultStats,
} from "../services/services";
import enemyImage from "../images/enemyShip.png";
import { SingleGun } from "../guns/SingleGun";
import { DoubleGun } from "../guns/DoubleGun";


export class Enemy extends Ship {
  constructor(game) {
    super(game);
    this.game = game;
    this.w = 150;
    this.h = 100;
    this.x = getRandomInt(this. w, this.collision.boardWidth - this.w);   ///make it to 0 and then in separate method randomize position
    this.y = getRandomInt(0, Math.floor(this.collision.boardHeight / 2));  ///just like with bgEffects
    this.health = 100;
    this.maxHealth = 100;
    this.isPlayer = false;
    //this.gun = "default";
    this.imageSrc = enemyImage;
    /* physics related variables: v - velocity, f - friction, s - speed, a - acceleration */
    this.s = 3;
    this.a = this.s / 30;
    this.direction = getRandomDirection();
    /* offStep = applies additional distance for enemies to stop their movement
    before reaching allowed borders and maintaining smooth bounce effect */
    this.offStepX = Math.floor(this.w / 2);
    this.offStepY = Math.floor(this.h / 2);
    this.scorePoints = 25;
    this.now = 0;

    this.atkSpeed = getEnemyDefaultStats.atkSpeed;
    this.gun = undefined;
    console.log("CONSTRUCTOR > Enemy");
  }

  fireGun() {
    let timePassed = (this.game.then - this.now) / 1000;
    if(timePassed <= this.getAtkSpeed()) {
      return;
    }
      this.now = Date.now();
      this.gun.fire();
  }

  assignGun() {
    var newGun = new SingleGun(this.game, this);
    this.gun = newGun;
  }

  getAtkSpeed() {  
    return this.atkSpeed - this.gun.atkSpeed;
  }

  setDefaultAtkSpeed() {
    this.atkSpeed = getEnemyDefaultStats.atkSpeed;
  }

  playHitEffect(projectileType) {
    //tbd
  }

  getAtkSpeed() {
    return this.game.stats.enemy.atkSpeed;
  }

  onDeath() {
    this.game.init.addEffect(this, "default");
    this.game.score += this.scorePoints;
  }
}

