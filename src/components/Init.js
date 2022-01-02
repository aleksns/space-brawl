import Enemy from "../ships/Enemy";
import {PlayerDefault} from "../projectiles/PlayerDefault";
import { EnemyDefault } from "../projectiles/EnemyDefault";
import { ExplosionDefault } from "../effects/ExplosionDefault";

export default class Init {
  constructor(game) {
    this.game = game;
    this.maxNumOfProjectiles = 100;
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

  addProjectile(ship) {
    if(this.getCurrentNumOfProjectiles() >= this.maxNumOfProjectiles) {
      return;
    }

  if (ship.isPlayerAlly) {
      // add switch case for different projectiles
    let newProjectile = new PlayerDefault(this.game);
    newProjectile.setPlayerOwned(ship);
    newProjectile.setTypeDefault();
    this.game.playerProjectiles.push(newProjectile);
  }
  else {
      let newProjectile = new EnemyDefault(this.game);

      newProjectile.setEnemyOwned(ship);
      newProjectile.setTypeDefault();
      this.game.enemyProjectiles.push(newProjectile);
  }
}

  addEffect(object, effectType) {
     // console.log("adding New Effect")
      let newEffect;
    switch (effectType) {
        case "default":
        newEffect = new ExplosionDefault(this.game, object);
          break;
        default:
        console.log("Error handling `explosion` function in Effects class");
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
