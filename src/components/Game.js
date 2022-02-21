import { Player } from "../ships/Player";
import Controls from "./Controls";
import Collision from "./Collision";
import Movement from "./Movement";
import Draw from "./Draw";
import Update from "./Update";
import Stats from "./Stats";
import Init from "./Init";
import Skills from "./Skills";
import Progression from "./Progression";
import { SkillsBar } from "../ui/SkillsBar";
import GameBoard from "./GameBoard";
import SoundChannel from "./SoundChannel";
import SoundList from "./SoundList";
import Cutscenes from "../cutscenes/Cutscenes";
import Animations from "../animations/Animations";
import Script from "../scripts/Script";
import Media from "./Media";
import { LevelAndScore } from "../ui/LevelAndScore";

//Remove some variables FROM THE CONSTRUCTOR which are not being used
//e.g. board height, allowed board height, etc
export default class Game {
  constructor(
    canvas5Ref,
    contextRef,
    context2Ref,
    context3Ref,
    context4Ref,
    context5Ref,
    clearCanvas1To4,
    clearCanvas5
  ) {
    this.ctx = contextRef;
    this.ctx2 = context2Ref;
    this.ctx3 = context3Ref;
    this.ctx4 = context4Ref;
    this.ctx5 = context5Ref;
    this.canvas5 = canvas5Ref;
    this.media = new Media();
    this.animations = new Animations(this);
    this.progression = new Progression(this);
    this.init = new Init(this);
    this.soundList = new SoundList();
    this.gameBoard = new GameBoard(this);
    this.clearCanvas1To4 = clearCanvas1To4;
    this.clearCanvas5 = clearCanvas5;
    this.skills = new Skills(this);
    this.skillsBar = new SkillsBar(this);
    this.levelAndScore = new LevelAndScore(this);
    this.stats = new Stats(this);
    this.collision = new Collision(this);
    this.player = new Player(this);

    this.controls = new Controls(this);
    this.movement = new Movement(this);

    this.cutscenes = new Cutscenes(this);
    this.script = new Script(this);
    this.draw = new Draw(this);
    this.update = new Update(this);
    this.bgElements = [];
    this.items = [];
    this.coins = [];
    this.enemyGuns = [];
    this.playerGuns = [];
    this.enemies = [];

    this.enemyProjectiles = [];
    this.playerProjectiles = [];
    this.effects = [];
    this.keys = this.controls.keys;
    this.isGameOn = false;

    this.now = 0;
    this.then = 0;
    this.timeDifference = 0; //to catch up with timers after pause On / Off cycle

    this.isPauseOn = false;
    this.isGlobalActionRestricted = false;

    this.isControlsOn = true;
    this.isGameOnHold = false;
    this.startBtn = {
      x: 200,
      y: 400,
      w: 50,
      h: 50,
      color: "grey",
      isFill: true,
      effect: "default",
      id: "slow",
      opacity: 0.1,
    };
    this.endBtn = {
      x: 400,
      y: 200,
      w: 100,
      h: 100,
      color: "green",
      effect: "defaultBuff",
      id: "restore",
    };

    this.btns = [];
    this.btns.push(this.startBtn);
    this.btns.push(this.endBtn);
    this.elem = document.getElementById("uiScreen");

    this.timePassed = 0;

    /*  <Sound>  */
    this.laser = new SoundChannel(this.soundList.laser, 1, 0.04);
    this.background = new SoundChannel(this.soundList.bgMusic, 1, 0.08);
    /* <Sound />*/

    console.log("CONSTRUCTOR > GAME");
  }

  stopAllAction() {
    this.isGlobalActionRestricted = !this.isGlobalActionRestricted;
    if (this.isGlobalActionRestricted == true) {
      this.then = this.now;
    } else {
      this.updateTimeDifference();
    }
  }

  setPause() {
    this.isPauseOn = !this.isPauseOn;
    if (this.isPauseOn == true) {
      this.then = this.now;
    } else {
      this.updateTimeDifference();
    }
  }

  updateTimeDifference() {
    this.timeDifference = this.now - this.then;
    this.update.updateAllTimersAfterPauseOff();
  }

  setGameOnHold() {
    this.isGameOnHold = true;
    this.isGlobalActionRestricted = true;
    this.clearCanvas5();
  }

  setGameOffHold() {
    this.isGameOnHold = false;
    this.isGlobalActionRestricted = false;
    this.draw.drawUIOnInit();
    this.player.resetVelocity();
  }

  gameLoop() {
    this.clearCanvas1To4();

    this.script.update();

    if (this.now == 0) {
      this.background.play();
      this.init.initialize();
    }

    this.update.update();
    this.draw.drawAll();

    if (this.player.isDead) {
      this.isGameOn = false;
    }
    this.now = Date.now();

    //console.log(`timePassed = ${this.timePassed}`)
    // console.log(`---------------------------------------`);
    // console.log("items.length = " + this.items.length);
    // console.log("coins.length = " + this.coins.length);
    // console.log("bgElements.length = " + this.bgElements.length);
    // console.log("enemies.length = " + this.enemies.length);
    // console.log("effects.length = " + this.effects.length);
    //console.log("enemy projectiles.length = " + this.enemyProjectiles.length);
    //console.log("player projectiles.length = " + this.playerProjectiles.length);
    // console.log(`---------------------------------------`);
  }
}
