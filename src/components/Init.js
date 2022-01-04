import Enemy from "../ships/Enemy";
import { PlayerDefault } from "../projectiles/PlayerDefault";
import { EnemyDefault } from "../projectiles/EnemyDefault";
import { ExplosionDefault } from "../effects/ExplosionDefault";
import {BgElement} from "../items/BgElement";
import {Medkit} from "../items/Medkit";
import { BuffDefault } from "../effects/BuffDefault";

export default class Init {
  constructor(game) {
    this.game = game;
    this.maxNumOfProjectiles = 100;
    this.maxNumOfElements = 40;
    this.maxNumOfItems = 1;
    this.timeToSpawn = this.game.stats.itemsTimeToSpawn;
    this.now = 0;
  }

  addItems() {
    if (this.game.items.length >= this.maxNumOfItems) {
      return;
    }
    this.addItem(false);
  }

  addItem(isSpawnOnInit) {
    //  this.game. timeWhenItemSpawned = 0; DO SOMETHING With it/
    let timePassed = (this.game.then - this.now) / 1000;
    if (timePassed < this.timeToSpawn.medkit) {
      console.log(`timePassed = ${timePassed}`)
      return;
    }
    else {
      this.now = Date.now();
      let newItem = new Medkit(this.game);
      newItem.setIsSpawnOnInit(isSpawnOnInit);
      newItem.randomize();  
      this.game.items.push(newItem); 
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
    if (this.getCurrentNumOfProjectiles() >= this.maxNumOfProjectiles) {
      return;
    }
    let newProjectile = new PlayerDefault(this.game);
    newProjectile.setPlayerOwned(ship);
    newProjectile.setTypeDefault();
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
