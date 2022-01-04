import Player from "../ships/Player";
import Controls from "./Controls";
import Collision from "./Collision";
import Movement from "./Movement";
import Draw from "./Draw";
import Update from "./Update";
import Stats from "./Stats";
import Init from "./Init";
import StatusEffects from "./StatusEffects";

//Remove some variables FROM THE CONSTRUCTOR which are not being used
//e.g. board height, allowed board height, etc
export default class Game {
  constructor(contextRef, context2Ref, context3Ref, clearCanvas) {
    this.ctx = contextRef;
    this.ctx2 = context2Ref;
    this.ctx3 = context3Ref;
    this.clearCanvas = clearCanvas;
    this.stats = new Stats(this);   ///maybe to put into another class?
    this.init = new Init(this); 
    this.collision = new Collision(this);
    this.player = new Player(this);
    this.controls = new Controls(this);
    this.movement = new Movement(this);
    this.statusEffects = new StatusEffects(this);
    this.draw = new Draw(this);
    this.update = new Update(this);
    this.bgElements = [];
    this.items = [];
    this.enemies = [];
    this.maxNumOfEnemies = 5;
    this.enemyProjectiles = [];
    this.playerProjectiles = [];
    this.effects = [];

    this.keys = this.controls.keys;
    this.isGameOn = false;

    this.now = 0;
    this.then = 0;
    this.timeWhenItemSpawned = 0;
    console.log("CONSTRUCTOR > GAME");
  }

  isGameAlive() {
    return this.isGameOn;
  }

  /* For testing purpose <test> */

  speedBoost(value) {
    console.log("speed value = " + value);
    console.log("this.player.speed = " + this.player.speed);
    this.player.speed = value;
  }
  /* For testing purpose </test> */

  getPlayerHP() {
    return this.player.health;
  }
  getScore() {
    return this.stats.getScore();
  }
  getPlayerDmg() {
    return this.player.getDamage();
  }

  isPlayerDead() {
    return this.player.isDead;
  }

  getTimePassed() {
    return (this.now - this.then) / 1000;
  }

  gameLoop() {
    this.then = Date.now();

    this.clearCanvas();

    if (this.player.isDead) {
      this.isGameOn = false;
    }

    this.controls.handleInput();
    this.update.update();
    this.draw.drawAll();

    // console.log("items.length = " + this.items.length)
    // console.log("bgElements.length = " + this.bgElements.length)
    // console.log("enemies.length = " + this.enemies.length)
    // console.log("effects.length = " + this.effects.length)
    // console.log("enemy projectiles.length = " + this.enemyProjectiles.length)
    // console.log("player projectiles.length = " + this.playerProjectiles.length)
    this.now = this.then;
  }
}
