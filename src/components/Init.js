import {Enemy} from "../ships/Enemy";
import { PlayerDefault } from "../projectiles/PlayerDefault";
import { EnemyDefault } from "../projectiles/EnemyDefault";
import { ExplosionDefault } from "../effects/ExplosionDefault";
import { BgElement } from "../items/BgElement";
import { Medkit } from "../items/Medkit";
import { BuffDefault } from "../effects/BuffDefault";
import { AtkSpeed } from "../items/AtkSpeed";
import { getBuffsSpawnDelay } from "../services/services";

export default class Init {
  constructor(game) {
    this.game = game;
    this.maxNumOfEnemies = 5;
    this.maxNumOfProjectiles = 150;
    this.maxNumOfElements = 40;
    this.maxNumOfItems = 2;

    this.itemsToSpawn = [
      (this.medkit = {
        now: 0,
        then: 0,      //tbd
        delay: getBuffsSpawnDelay.medkit,
        timesSpawned: 0,      //tbd
        id: "medkit",
      }),
      (this.atkSpeed = {
        now: 0,
        then: 0,        //tbd
        delay: getBuffsSpawnDelay.atkSpeed,
        timesSpawned: 0,   //tbd
        id: "atkSpeed",
      }),
    ];
    this.testNow = 0;
    this.now = 0;
  }

  startTimers() {
    for (let i = 0; i < this.itemsToSpawn.length; i++) {
      this.itemsToSpawn[i].now = Date.now();
      this.itemsToSpawn[i].then = this.itemsToSpawn[i].now;
    }
    this.testNow = Date.now();
    this.now = Date.now();
  }

  // onInitGlobal() {

  // }

  addItemsBasedOnTiming() {
    for (let i = 0; i < this.itemsToSpawn.length; i++) {
      this.itemsToSpawn[i].now = Date.now();
      let timePassed = (this.itemsToSpawn[i].now - this.itemsToSpawn[i].then) / 1000;
      if (timePassed >= this.itemsToSpawn[i].delay) {
        this.itemsToSpawn[i].then = this.itemsToSpawn[i].now;
        this.addItem(this.itemsToSpawn[i]);
      }
    }
  }

  addItems() {
   // let timePassed = (this.game.then - this.testNow) / 1000;
    if (this.game.items.length >= this.maxNumOfItems) {
      return;
    }
    this.addItemsBasedOnTiming();
    ///improve code + methods here and in the update
  }

  addItem(item) {
    switch (item.id) {
      case "medkit":
        item.now = Date.now();
        var newItem = new Medkit(this.game);
        newItem.setIsSpawnOnInit(false);
        newItem.randomize();
        this.game.items.push(newItem);
        item.timesSpawned++;
        break;
      case "atkSpeed":
        item.now = Date.now();
        var newItem = new AtkSpeed(this.game);
        newItem.setIsSpawnOnInit(false);
        newItem.randomize();
        this.game.items.push(newItem);
        item.timesSpawned++;
        break;
      default:
        console.log("Error handling `addItem function in Init class");
        break;
    }
  }

  addBgElements() {
    if (this.game.bgElements.length >= this.maxNumOfElements) {
      return;
    }
    if (!this.game.now == 0) {
      this.addBgElement(false);
    } else {
      for (let i = 0; i < this.maxNumOfElements; i++) {
        this.addBgElement(true);
      }
    }
  }

  addBgElement(isSpawnOnInit) {
    let newBgElement = new BgElement(this.game);
    newBgElement.setIsSpawnOnInit(isSpawnOnInit);
    newBgElement.setRandomShape();
    newBgElement.randomize();
    this.game.bgElements.push(newBgElement);
  }

  spawnEnemies() {
    if (this.game.enemies.length < this.maxNumOfEnemies) {
      this.addEnemy();
    }
  }

  addEnemy() {
    let newEnemy = new Enemy(this.game);
    newEnemy.assignGun();
    this.game.enemies.push(newEnemy);
  }

  addProjectile(object, barrel) {
    if (this.getCurrentNumOfProjectiles() >= this.maxNumOfProjectiles) {
      return;
    }

    if(object.isPlayer) {
      this.addPlayerProjectile(barrel);
    }
    else {
     this.addEnemyProjectile(barrel);
    }
  }

  addEnemyProjectile(barrel) {
     let newProjectile = new EnemyDefault(this.game);
     newProjectile.setEnemyOwned();
     newProjectile.launch(barrel);
     this.game.enemyProjectiles.push(newProjectile);
  }

  addPlayerProjectile(barrel) {
    let newProjectile = new PlayerDefault(this.game);
    newProjectile.setPlayerOwned();
    newProjectile.launch(barrel);
    this.game.playerProjectiles.push(newProjectile);
  }

  addEffect(object, effectType) {
    let newEffect;
    switch (effectType) {
      case "default":
        newEffect = new ExplosionDefault(this.game, object);
        break;
      case "defaultBuff":
        newEffect = new BuffDefault(this.game, object);
        break;
      default:
        console.log("Error handling `addEffect` function in Init class");
        break;
    }
    this.game.effects.push(newEffect);
  }

  getCurrentNumOfProjectiles() {
    let a = this.game.enemyProjectiles.length;
    let b = this.game.playerProjectiles.length;
    return a + b;
  }
}
