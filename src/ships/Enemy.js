import Ship from "./Ship";
import {
  getRandomDirection,
  getRandomInt,
  getEnemyDefaultStats,
  getEnemyT4Dimension
} from "../services/services";
import enemyImage from "../images/enemyShip.png";
import playerImage from "../images/playerShip.png";
import { SingleGun } from "../guns/SingleGun";
import { DoubleGun } from "../guns/DoubleGun";
import { TripleGun } from "../guns/TripleGun";


export class Enemy extends Ship {
  constructor(game) {
    super(game);
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.w = getEnemyT4Dimension().w;
    this.h = getEnemyT4Dimension().h;

    this.health = this.game.stats.enemy.health;
    this.maxHealth = this.game.stats.enemy.maxHealth;

    this.isPlayer = false;
    /* physics related variables: v - velocity, f - friction, s - speed, a - acceleration */
    this.s = 2;
    this.a = this.s / 40;
    this.direction = getRandomDirection();
    /* offStep = applies additional distance for enemies to stop their movement
    before reaching allowed borders and maintaining smooth bounce effect */
    this.offStepX = Math.floor(this.w / 2);
    this.offStepY = Math.floor(this.h / 2);
    this.scorePoints = this.game.stats.enemy.scorePoints;
    this.now = 0;

    this.damage = this.game.stats.enemy.damage;
    this.atkSpeed = this.game.stats.enemy.atkSpeed;
    this.gun = undefined;

    this.image = new Image();
    this.image.src = enemyImage;
    
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

  initialize() {
     this.x = getRandomInt(this. w, this.collision.boardWidth - this.w);
     this.y = getRandomInt(this.collision.allowedY.y0, Math.floor(this.collision.boardHeight / 2.5));
    // this.x = 200;
    // this.y = 200;
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

  onDeath() {
    this.game.init.addEffect(this, "default");
    this.game.score += this.scorePoints;
    this.game.progression.increaseThreatLevel();
  }
}

