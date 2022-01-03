import Enemy from "../ships/Enemy";
import { PlayerDefault } from "../projectiles/PlayerDefault";
import { EnemyDefault } from "../projectiles/EnemyDefault";
import { ExplosionDefault } from "../effects/ExplosionDefault";
import BgElement from "./BgElement";

export default class Init {
  constructor(game) {
    this.game = game;
    this.maxNumOfProjectiles = 100;
    this.maxNumOfElements = 40;
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

    console.log("bgElements.length = " + this.game.bgElements.length);
  }

  addBgElement(isSpawnOnScreen) {
    let newBgElement = new BgElement(this.game);
    newBgElement.setIsSpawnOnScreen(isSpawnOnScreen);
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
