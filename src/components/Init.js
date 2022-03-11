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
import { ExplosionSmall } from "../effects/ExplosionSmall";
import { EnemyT3 } from "../ships/EnemyT3";
import { FloatingText } from "../effects/FloatingText";
import { EnemyT2 } from "../ships/EnemyT2";

export default class Init {
  constructor(game) {
    this.game = game;
    this.progression = this.game.progression;
    this.maxNumOfProjectiles = 1500;
    this.maxNumOfElements = 2;
    this.maxNumOfItems = 8;

    this.medkit = {
      now: 0,
      then: 0, //tbd
      delay: getBuffsSpawnDelay.medkit,
      id: "medkit",
    };
    this.atkSpeed = {
      now: 0,
      then: 0, //tbd
      delay: getBuffsSpawnDelay.atkSpeed,
      id: "atkSpeed",
    };

    this.itemsToSpawn = [];
    this.itemsToSpawn.push(this.medkit);
    this.itemsToSpawn.push(this.atkSpeed);
  }

  initialize() {
    this.updateTimers();

    for (let i = 0; i < this.game.playerTeam.length; i++) {
      this.game.playerTeam[i].initialize();
    }

    this.game.skills.initialize();
  }

  updateTimers() {
    for (let i = 0; i < this.itemsToSpawn.length; i++) {
      this.itemsToSpawn[i].then = Date.now();
    }
  }

  addItemsBasedOnTiming() {
    if (
      this.game.isGlobalActionRestricted ||
      this.game.stats.isGlobalSlowAll ||
      this.game.gameOver
    ) {
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
  }

  addItem(item, object) {
    switch (item.id) {
      case "medkit":
        var newItem = new Medkit(this.game);
        newItem.initialize();
        this.game.items.push(newItem);
        break;
      case "atkSpeed":
        var newItem = new AtkSpeed(this.game);
        newItem.initialize();
        this.game.items.push(newItem);
        break;
      case "coin":
        var newCoin = new Coin(this.game);
        newCoin.initialize();
        newCoin.initializeCoin(object);
        this.game.coins.push(newCoin);
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

  spawnBoss(boss) {
    this.game.enemies.push(boss);
  }

  initEnemy(tier) {
    let newEnemy;

    switch (tier) {
      case "t5":
        newEnemy = new EnemyT5(this.game);
        break;
      case "t4":
        newEnemy = new EnemyT4(this.game);
        break;
      case "t3":
        newEnemy = new EnemyT3(this.game);
        break;
      case "t2":
        newEnemy = new EnemyT2(this.game);
        break;
      default:
        console.log("Error handling `initEnemy` function in Init class");
        break;
    }

    return newEnemy;
  }

  initWaveOfEnemies(waveMap, wave) {
    for (let i = 0; i < waveMap.length; i++) {
      var newEnemy = this.initEnemy(waveMap[i]);
      //newEnemy.initialize();
      wave.push(newEnemy);
    }
  }

  spawnWaveOfEnemies(wave) {
    for (let i = 0; i < wave.length; i++) {
      wave[i].initialize();
      this.game.enemies.push(wave[i]);
    }
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

    if (gun.isPlayerOwned) {
      this.game.playerProjectiles.push(laserProjectile);
    } else {
      this.game.enemyProjectiles.push(laserProjectile);
    }
  }

  addEffect(object, effectType) {
    if (this.game.effects.length > 5) {
      return;
    }
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

  addFloatingTextEffect(textID, text) {
    let newEffect = new FloatingText(this.game);
    newEffect.setProps(textID, text);
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
