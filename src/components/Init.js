import { EnemyT4 } from "../ships/EnemyT4";
import { ProjectileDefault } from "../projectiles/ProjectileDefault";
import { ExplosionDefault } from "../effects/ExplosionDefault";
import { BgElement } from "../items/BgElement";
import { Medkit } from "../items/Medkit";
import { BuffDefault } from "../effects/BuffDefault";
import { AtkSpeed } from "../items/AtkSpeed";
import { getBuffsSpawnDelay } from "../services/services";
import { Pulse } from "../effects/Pulse";
import { EnemyT5 } from "../ships/EnemyT5";
import { Coin } from "../items/Coin";
import { BossTest } from "../ships/BossTest";
import { ExplosionSmall } from "../effects/ExplosionSmall";
import { Laser } from "../projectiles/Laser";

export default class Init {
  constructor(game) {
    this.game = game;
    this.progression = this.game.progression;
    this.maxNumOfProjectiles = 500;
    this.maxNumOfElements = 2;
    this.maxNumOfItems = 8;

    this.itemsToSpawn = [
      (this.medkit = {
        now: 0,
        then: 0, //tbd
        //delay: getBuffsSpawnDelay.medkit,
        delay: 3,
        //timesSpawned: 0, //tbd
        id: "medkit",
      }),
      (this.atkSpeed = {
        now: 0,
        then: 0, //tbd
        //delay: getBuffsSpawnDelay.atkSpeed,
        delay: 3,
        //timesSpawned: 0, //tbd
        id: "atkSpeed",
      }),
    ];

    this.formationLine = {
      delay: 20,
      numOfEnemies: 13,
    };

    this.enemiesInFormation = [];
    this.formationThen = 0;
  }

  initialize() {
    this.initTimers();
  }

  initTimers() {
    for (let i = 0; i < this.itemsToSpawn.length; i++) {
      this.itemsToSpawn[i].then = Date.now();
    }

    this.formationThen = Date.now();
  }

  addItemsBasedOnTiming() {
    if (this.game.isGlobalActionRestricted) {
      return;
    }
    for (let i = 0; i < this.itemsToSpawn.length; i++) {
      let timePassed = (this.game.now - this.itemsToSpawn[i].then) / 1000;
      if (timePassed >= this.itemsToSpawn[i].delay) {
        this.itemsToSpawn[i].then = this.game.now;
        this.addItem(this.itemsToSpawn[i]);
      }
    }
  }

  addItemOnDrop(item, object) {
    this.addItem(item, object);
  }

  addItems() {
    if (this.game.items.length >= this.maxNumOfItems) {
      return;
    }
    this.addItemsBasedOnTiming();

    ///improve code + methods here and in the update
  }

  addItem(item, object) {
    switch (item.id) {
      case "medkit":
        var newItem = new Medkit(this.game);
        newItem.initialize();
        this.game.items.push(newItem);
        //item.timesSpawned++;
        break;
      case "atkSpeed":
        var newItem = new AtkSpeed(this.game);
        newItem.initialize();
        this.game.items.push(newItem);
        //item.timesSpawned++;
        break;
      case "coin":
        var newCoin = new Coin(this.game);
        newCoin.initialize();
        newCoin.initializeCoin(object);
        this.game.coins.push(newCoin);
        //item.timesSpawned++;
        break;
      default:
        //console.log("Error handling `addItem function in Init class");
        break;
    }
  }

  addBgElements() {
    if (this.game.bgElements.length >= this.maxNumOfElements) {
      return;
    }
    if (this.game.bgElements.length != 0) {
      this.addBgElement(false);
    } else {
      for (let i = 0; i < this.maxNumOfElements; i++) {
        this.addBgElement(true);
      }
    }
  }

  addBgElement(isSpawnOnScreen) {
    let newBgElement = new BgElement(this.game);
    newBgElement.setIsSpawnOnScreen(isSpawnOnScreen);
    //newBgElement.setBackgroundShapeAndPosition();
    newBgElement.initialize();
    this.game.bgElements.push(newBgElement);
  }

  // Create formation of enemies > put enemies in the temp list > apply formation function to enemies >
  // > add enemies to the main list > remove temp list
  spawnFormationOfEnemies() {
    let timePassed = (this.game.now - this.formationThen) / 1000;

    if (
      timePassed >= this.formationLine.delay &&
      !this.progression.isMaxThreatLevel
    ) {
      this.formationThen = this.game.now;

      for (let i = 0; i <= this.formationLine.numOfEnemies; i++) {
        var newEnemy = new EnemyT5(this.game);
        newEnemy.initialize();
        //newEnemy.startTimers();
        this.enemiesInFormation.push(newEnemy);
      }
      this.game.gameBoard.setShipsInFormationLine(this.enemiesInFormation);

      for (let i = 0; i < this.enemiesInFormation.length; i++) {
        this.game.enemies.push(this.enemiesInFormation[i]);
      }

      this.enemiesInFormation = [];
    }
  }

  addBoss(boss) {
    this.game.enemies.push(boss);
  }

  addEnemy() {
    //let newEnemy = new EnemyT4(this.game);
    let newEnemy = new BossTest(this.game);
    newEnemy.initialize();
    //newEnemy.startTimers();
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
    newProjectile.initialize();
  }

  addLaser(gun, laserProjectile) {
    laserProjectile.setLaserStats(gun);
    laserProjectile.initialize();

    if(gun.isPlayerOwned) {
      this.game.playerProjectiles.push(laserProjectile);
    }
    else {
      this.game.enemyProjectiles.push(laserProjectile);
    }
  }

  addEffect(object, effectType, projectile) {
    // if(this.game.effects.length > 3) {
    //   return;
    // }
    let newEffect;
    switch (effectType) {
      case "explosionDefault":
        newEffect = new ExplosionDefault(this.game, object);
        break;
      case "explosionSmall":
        newEffect = new ExplosionSmall(this.game, object);
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

  updateTimersAfterPauseOff() {
    for (let i = 0; i < this.itemsToSpawn.length; i++) {
      this.itemsToSpawn[i].then += this.game.timeDifference;
    }
    this.formationThen += this.game.timeDifference;
  }
}
