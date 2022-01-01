import "../App.css";
import App from "../App.js";
import Player from "../ships/Player";
//import Enemy from "../ships/Enemy";
//import GameBoard from "./GameBoard";
import Controls from "./Controls";
import Collision from "./Collision";
import Movement from "./Movement";
import Draw from "./Draw";
import Update from "./Update";
import Stats from "./Stats";

//Remove some variables FROM THE CONSTRUCTOR which are not being used
//e.g. board height, allowed board height, etc
export default class Game {
  constructor(contextRef, context2Ref, clearTheCanvas1, clearTheCanvas2) {
    this.ctx = contextRef;
    this.ctx2 = context2Ref;
    this.clearTheCanvas1 = clearTheCanvas1;
    this.clearTheCanvas2 = clearTheCanvas2;
    this.stats = new Stats(this);
    this.collision = new Collision(this);
    this.player = new Player(this);
    this.controls = new Controls(this);
    this.movement = new Movement(this);
    this.draw = new Draw(this);
    this.update = new Update(this);
    this.projectiles = [];
    this.enemies = [];
    this.maxNumOfEnemies = 5;

    this.keys = this.controls.keys;
    this.isGameOn = false;
    //this.score = 0;

    this.now = 0; // dateNow to remove? Not being used
    this.then = 0;
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

    this.clearTheCanvas1();
    //this.clearTheCanvas2();

    if (this.player.isDead) {
      this.isGameOn = false;
    }

    this.controls.handleInput();
    this.update.update();
    this.draw.drawAll();

    this.now = this.then;
   // console.log("projectiles.length AFTER = " + this.projectiles.length);
  }
}
