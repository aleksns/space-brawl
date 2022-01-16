import Ship from "./Ship";
import {
  GAME_WIDTH,
  getRandomDirection,
  getEnemyT0DefaultStats,
  getEnemyT0Dimension,
  getTripleGunPosition,
  GAME_HEIGHT
} from "../services/services";
import bossImage from "../images/enemyBoss.png";
import { SingleFront } from "../guns/SingleFront";
import { DoubleFront } from "../guns/DoubleFront";
import { TripleFront } from "../guns/TripleFront";


export class Boss extends Ship {
  constructor(game) {
    super(game);
    this.game = game;
    this.x = 0;  
    this.y = 0;
    this.w = getEnemyT0Dimension().w;
    this.h = getEnemyT0Dimension().h;
    this.dX = 0;
    this.dY = 0;

    this.health = this.game.stats.enemyT0.health;
    this.maxHealth = this.game.stats.enemyT0.maxHealth;
    this.isPlayer = false;
    //this.gun = "default";
    /* physics related variables: v - velocity, f - friction, s - speed, a - acceleration */
    this.s = this.game.stats.enemyT0.s;
    this.a = this.s / 60;
    //this.direction = getRandomDirection();
    /* offStep = applies additional distance for enemies to stop their movement
    before reaching allowed borders and maintaining smooth bounce effect */
    this.offStepX = Math.floor(this.w / 2);
    this.offStepY = Math.floor(this.h / 2);
    this.scorePoints = this.game.stats.enemyT0.scorePoints;
    this.now = 0;
    this.damage = this.game.stats.enemyT0.damage;
    this.atkSpeed = this.game.stats.enemyT0.atkSpeed;
    this.gun = undefined;
    this.target = this.game.player;
    this.projectileSpeedModifier = this.game.stats.enemyT0.projectileSpeedModifier;

    this.image = new Image();
    this.image.src = bossImage;
    this.isBoss = true;
    this.isCheckSouthOutOfBorderOnly = false;
    console.log("CONSTRUCTOR > BossT0");
    //console.log(`GAME_WIDTH = ${GAME_WIDTH}`);
  } 

  fireGun() {
    // let timePassed = (this.game.then - this.now) / 1000;
    // if(timePassed <= this.getAtkSpeed()) {
    //   return;
    // }
      this.now = Date.now();
      this.gun.fire();
  }

  initialize() {
    this.x = (GAME_WIDTH / 2) - (this.w / 2);
    this.y = this.collision.allowedY.y0 - 20;
    var newGun = new TripleFront(this.game, this);
    this.gun = newGun;

    this.game.setPauseOn();
    this.game.cutscenes.bossAppearance.initialize();
    //this.game.cutscenes.bossAppearance.initialize();
  }

  updateShip() {
    if (this.health <= 0) {
      this.setDead();
      this.onDeath();
    }
  }

  move() {
    //tbd
  }


  getAtkSpeed() {  
    return this.atkSpeed - this.gun.atkSpeed;
  }

  setDefaultAtkSpeed() {
    this.atkSpeed = getEnemyT0DefaultStats.atkSpeed;
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

