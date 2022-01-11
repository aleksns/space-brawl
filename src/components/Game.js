import { Player } from "../ships/Player";
import Controls from "./Controls";
import Collision from "./Collision";
import Movement from "./Movement";
import Draw from "./Draw";
import Update from "./Update";
import Stats from "./Stats";
import Init from "./Init";
import StatusEffects from "./StatusEffects";
import {GAME_WIDTH, GAME_HEIGHT} from "../services/services";
import Progression from "./Progression";

//Remove some variables FROM THE CONSTRUCTOR which are not being used
//e.g. board height, allowed board height, etc
export default class Game {
  constructor(contextRef, context2Ref, context3Ref, context4Ref, canvas4Ref, clearCanvas4) {
    this.ctx = contextRef;
    this.ctx2 = context2Ref;
    this.ctx3 = context3Ref;
    this.ctx4 = context4Ref;
    this.canvas4 = canvas4Ref;
    this.clearCanvas4 = clearCanvas4;
    this.progression = new Progression(this);
    this.stats = new Stats(this); ///maybe to put into another class?
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
    this.enemyProjectiles = [];
    this.playerProjectiles = [];
    this.effects = [];
    this.score = 0;
    this.keys = this.controls.keys;
    this.isGameOn = false;

    this.now = 0;
    this.then = 0;
    this.pauseNow = 0;
    this.pauseThen = 0;

    this.startBtn = {
      x: 200,
      y: 200,
      w: 100,
      h: 100,
      xPosText: 100,
      yPosText: 100,
      text: "START"
    }
    this.endBtn = {
      x: 400,
      y: 200,
      w: 100,
      h: 100
    }

    this.btns = [];
    this.btns.push(this.startBtn);
    this.btns.push(this.endBtn);

    this.timePassed = 0;
    this.elem = document.getElementById('uiScreen');
    console.log("CONSTRUCTOR > GAME");
  }

 isInside(position, rect){
  return position.x > rect.x && position.x < rect.x+rect.w && position.y < rect.y+rect.h && position.y > rect.y;
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
    return this.score;
  }
  getPlayerDmg() {
    return "tbd..."; /// change to either get stats from Stats class or change atkSpeed method to get info from Player
  }
  getPlayerAtkSpeed() {
    return this.stats.player.atkSpeed; /// look above
  }

  isPlayerDead() {
    return this.player.isDead;
  }

  gameLoop() {
    this.then = Date.now();
    this.pauseNow = this.then;
    //this.clearCanvas();

    if (this.now == 0) {
      this.update.startTimersOnInit();
      this.draw.drawUIOnInit();

      this.pauseNow = this.then;
      this.pauseThen = this.pauseNow;
    }

    if (this.player.isDead) {
      this.isGameOn = false;
    }

    this.controls.handleInput();
    this.update.update();
    this.draw.drawAll();

    this.timePassed = (this.pauseNow - this.pauseThen) / 1000;
    if(this.timePassed >= 3) {
      // this.controls.handleInput();
      // this.update.update();
      // this.draw.drawAll();
    }

    console.log(`timePassed = ${this.timePassed}`)


    //console.log("items.length = " + this.items.length);
    //console.log("bgElements.length = " + this.bgElements.length);
    //console.log("enemies.length = " + this.enemies.length);
    //console.log("effects.length = " + this.effects.length);
    //console.log("enemy projectiles.length = " + this.enemyProjectiles.length);
    //console.log("player projectiles.length = " + this.playerProjectiles.length);
    this.now = this.then;
  }
}
