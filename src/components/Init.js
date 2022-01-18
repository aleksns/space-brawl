import { EnemyT4 } from "../ships/EnemyT4";
import { Boss } from "../ships/Boss";
import { ProjectileDefault } from "../projectiles/ProjectileDefault";
import { ExplosionDefault } from "../effects/ExplosionDefault";
import { BgElement } from "../items/BgElement";
import { Medkit } from "../items/Medkit";
import { BuffDefault } from "../effects/BuffDefault";
import { AtkSpeed } from "../items/AtkSpeed";
import { getBuffsSpawnDelay } from "../services/services";
import { Pulse } from "../effects/Pulse";
import { EnemyT5 } from "../ships/EnemyT5";

export default class Init {
  constructor(game) {
    this.game = game;
    this.progression = this.game.progression;
    this.maxNumOfProjectiles = 150;
    this.maxNumOfElements = 2;
    this.maxNumOfItems = 4;

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

    this.formationLine = {
      delay: 20,
      numOfEnemies: 13
    };

    this.enemiesInFormation = [];
    this.then = 0;
    this.now = 0;
  }

  startTimers() {
    for (let i = 0; i < this.itemsToSpawn.length; i++) {
      this.itemsToSpawn[i].now = Date.now();
      this.itemsToSpawn[i].then = this.itemsToSpawn[i].now;
    }

    this.now = Date.now();
    this.then = this.now;
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
        //newItem.setIsSpawnOnInit(false);
        //newItem.randomize();
        newItem.initialize();
        this.game.items.push(newItem);
        item.timesSpawned++;
        break;
      case "atkSpeed":
        item.now = Date.now();
        var newItem = new AtkSpeed(this.game);
        //newItem.setIsSpawnOnInit(false);
        //newItem.randomize();
        newItem.initialize();
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
    //newBgElement.setBackgroundShapeAndPosition();
    newBgElement.initialize();
    this.game.bgElements.push(newBgElement);
  }

  spawnEnemies() {
   // this.spawnFormationOfEnemies();

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
  }

  // Create formation of enemies > put enemies in the temp list > apply formation function to enemies >
  // > add enemies to the main list > remove temp list
  spawnFormationOfEnemies() {
    this.now = Date.now();
    let timePassed = (this.now - this.then) / 1000;

    if ((timePassed >= this.formationLine.delay) && !this.progression.isMaxThreatLevel) {
      this.then = this.now;
    
      for (let i = 0; i <= this.formationLine.numOfEnemies; i++) {
        var newEnemy = new EnemyT5(this.game);
        newEnemy.initialize();
        newEnemy.startTimers();
        this.enemiesInFormation.push(newEnemy);
      }
      this.game.gameBoard.setShipsInFormationLine(this.enemiesInFormation);

      for(let i = 0; i < this.enemiesInFormation.length; i++) {
        this.game.enemies.push(this.enemiesInFormation[i]);
      }

      this.enemiesInFormation = [];
    }
  }

  addBoss() {
    var newEnemy = new Boss(this.game);
    newEnemy.initialize();
    this.game.enemies.push(newEnemy);
  }

  addEnemy() {
    var newEnemy = new EnemyT4(this.game);
    newEnemy.initialize();
    newEnemy.startTimers();
    this.game.enemies.push(newEnemy);
  }

  addProjectile(gun, barrel) {
    if (this.getCurrentNumOfProjectiles() >= this.maxNumOfProjectiles) {
      return;
    }

    let newProjectile = new ProjectileDefault(this.game, gun, barrel);

    if (gun.isPlayerOwned) {
      newProjectile.setPlayerOwned(gun);
      this.game.playerProjectiles.push(newProjectile);
    } else {
      newProjectile.setEnemyOwned(gun);
      this.game.enemyProjectiles.push(newProjectile);
    }
    //newProjectile.launch(barrel);
    newProjectile.initialize();
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
