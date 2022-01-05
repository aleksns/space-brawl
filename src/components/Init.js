import Enemy from "../ships/Enemy";
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
    this.maxNumOfProjectiles = 100;
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

  addItemsBasedOnTiming() {
    for (let i = 0; i < this.itemsToSpawn.length; i++) {
      this.itemsToSpawn[i].now = Date.now();
      let timePassed = (this.itemsToSpawn[i].now - this.itemsToSpawn[i].then) / 1000;
      //console.log(`timePassed = ${timePassed}`)
      if (timePassed >= this.itemsToSpawn[i].delay) {
        this.itemsToSpawn[i].then = this.itemsToSpawn[i].now;
        this.addItem(this.itemsToSpawn[i]);
        //console.log(`ADDED ITEM = ${this.itemsToSpawn[i].id} Timepassed = ${timePassed}`)
      }
    }
  }

  // addItemsBasedOnTiming() {
  //   for (let i = 0; i < this.itemsToSpawn.length; i++) {
  //     let timePassed = (this.game.then - this.itemsToSpawn[i].now) / 1000;
  //     if (timePassed >= this.itemsToSpawn[i].delay) {
  //       this.addItem(this.itemsToSpawn[i]);
  //     }
  //   }
  // }

  addItems() {
    let timePassed = (this.game.then - this.testNow) / 1000;
    console.log(`time passed = ${timePassed}`)
    let time = (this.game.then - this.now) / 1000; //testing purpose
  //  console.log(`item.then = ${this.itemsToSpawn[0].then}`)
  //  console.log(`item.now = ${this.itemsToSpawn[0].now}`)
   // console.log(`item.now - item.then = ${(this.itemsToSpawn[0].now - this.itemsToSpawn[0].then) / 1000}`)
    //console.log(`time passed ${time}`)
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
    if (this.game.enemies.length < this.game.maxNumOfEnemies) {
      this.addEnemy();
    }
  }

  addEnemy() {
    let newEnemy = new Enemy(this.game);
    this.game.enemies.push(newEnemy);
  }

  addEnemyProjectile(ship) {
    if (this.getCurrentNumOfProjectiles() >= this.maxNumOfProjectiles) {
      return;
    }
    let newProjectile = new EnemyDefault(this.game);
    newProjectile.setEnemyOwned(ship);
    newProjectile.setTypeDefault();
    this.game.enemyProjectiles.push(newProjectile);
  }

  addPlayerProjectile(ship) {
    ///add switch for handling different types of projectiles
    if (this.getCurrentNumOfProjectiles() >= this.maxNumOfProjectiles) {
      return;
    }
    let newProjectile = new PlayerDefault(this.game);
    newProjectile.setPlayerOwned(ship);
    newProjectile.setTypeDefault();
    this.game.player.damage = newProjectile.damage;
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
