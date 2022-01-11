import Ship from "./Ship";
import {
  GAME_WIDTH,
  getRandomDirection,
  getEnemyDefaultStats,
  getEnemyT0Dimension,
  getTripleGunPosition,
  GAME_HEIGHT
} from "../services/services";
import bossImage from "../images/enemyBoss.png";
import { SingleGun } from "../guns/SingleGun";
import { DoubleGun } from "../guns/DoubleGun";
import { TripleGun } from "../guns/TripleGun";


export class Boss extends Ship {
  constructor(game) {
    super(game);
    this.game = game;
    this.w = getEnemyT0Dimension().w;
    this.h = getEnemyT0Dimension().h;
    this.x = 0;  
    this.y = 0;
    this.health = this.game.stats.boss.health;
    this.maxHealth = this.game.stats.boss.maxHealth;
    this.isPlayer = false;
    //this.gun = "default";
    /* physics related variables: v - velocity, f - friction, s - speed, a - acceleration */
    this.s = 0.5;
    this.a = this.s / 60;
    this.direction = getRandomDirection();
    /* offStep = applies additional distance for enemies to stop their movement
    before reaching allowed borders and maintaining smooth bounce effect */
    this.offStepX = Math.floor(this.w / 2);
    this.offStepY = Math.floor(this.h / 2);
    this.scorePoints = this.game.stats.boss.scorePoints;
    this.now = 0;
    this.damage = this.game.stats.boss.damage;
    this.atkSpeed = this.game.stats.boss.atkSpeed;
    this.gun = undefined;

    this.image = new Image();
    this.image.src = bossImage;
    
    console.log("CONSTRUCTOR > Enemy");
    //console.log(`GAME_WIDTH = ${GAME_WIDTH}`);
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
    this.x = (GAME_WIDTH / 2) - (this.w / 2);
    this.y = this.collision.allowedY.y0 - 20;
    var newGun = new TripleGun(this.game, this);
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
    this.game.progression.advanceLevel();
  }
}

