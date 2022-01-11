import { Enemy } from "../ships/Enemy";
import { Boss } from "../ships/Boss";
import { ProjectileDefault } from "../projectiles/ProjectileDefault";
import { ExplosionDefault } from "../effects/ExplosionDefault";
import { BgElement } from "../items/BgElement";
import { Medkit } from "../items/Medkit";
import { BuffDefault } from "../effects/BuffDefault";
import { AtkSpeed } from "../items/AtkSpeed";
import { getBuffsSpawnDelay } from "../services/services";
import { Pulse } from "../effects/Pulse";

export default class Init {
  constructor(game) {
    this.game = game;
    this.progression = this.game.progression;
    this.maxNumOfProjectiles = 150;
    this.maxNumOfElements = 2;
    this.maxNumOfItems = 2;

    this.itemsToSpawn = [
      (this.medkit = {
        now: 0,
        then: 0, //tbd
        delay: getBuffsSpawnDelay.medkit,
        timesSpawned: 0, //tbd
        id: "medkit",
      }),
      (this.atkSpeed = {
        now: 0,
        then: 0, //tbd
        delay: getBuffsSpawnDelay.atkSpeed,
        timesSpawned: 0, //tbd
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
      let timePassed =
        (this.itemsToSpawn[i].now - this.itemsToSpawn[i].then) / 1000;
      if (timePassed >= this.itemsToSpawn[i].delay) {
        this.itemsToSpawn[i].then = this.itemsToSpawn[i].now;
        this.addItem(this.itemsToSpawn[i]);
      }
    }
  }

  addItems() {
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
    newBgElement.setBackgroundShapeAndPosition();
    //newBgElement.setRandomShape();
    //newBgElement.randomize();
    this.game.bgElements.push(newBgElement);
  }

  spawnEnemies() {
    if (this.game.enemies.length >= this.progression.maxNumOfEnemies) {
      return;
    }
    if (!this.progression.isMaxThreatLevel) {
      this.addEnemy();
    } else if (
      this.progression.isMaxThreatLevel &&
      this.game.enemies.length == 0
    ) {
      this.addBoss();
    }
    //this.addBoss();
  }

  addBoss() {
    var newEnemy = new Boss(this.game);
    newEnemy.initialize();
    this.game.enemies.push(newEnemy);
  }

  addEnemy() {
    var newEnemy = new Enemy(this.game);
    newEnemy.initialize();
    newEnemy.startTimers();
    this.game.enemies.push(newEnemy);
  }

  addProjectile(object, barrel) {
    if (this.getCurrentNumOfProjectiles() >= this.maxNumOfProjectiles) {
      return;
    }

    let newProjectile = new ProjectileDefault(this.game);

    if (object.isPlayer) {
      newProjectile.setPlayerOwned(object);
      this.game.playerProjectiles.push(newProjectile);
    } else {
      newProjectile.setEnemyOwned(object);
      this.game.enemyProjectiles.push(newProjectile);
    }
    newProjectile.launch(barrel);
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
      case "pulse":
        newEffect = new Pulse(this.game, object);
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
