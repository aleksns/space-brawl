import Enemy from "../ships/Enemy";

export default class Update {
  constructor(game) {
    this.game = game;
  }

  update() {
    this.updatePlayer();
    this.updateEnemies();
    this.updateProjectiles();
    this.updateEffects();

    this.updateCollisionPlayerHullWithEnemies();
    this.updateCollisionPlayerWithProjectiles();
    this.updateCollisionEnemyWithProjectiles();

    this.removeDeadProjectiles();
    this.removeDeadEnemies();

  }

  updatePlayer() {
    this.game.player.update();
  }

  updateEnemies() {
    this.game.init.spawnEnemies();

    for (let i = 0; i < this.game.enemies.length; i++) {
      this.game.enemies[i].update();
    }
  }

  updateProjectiles() {
    for (let i = 0; i < this.game.enemyProjectiles.length; i++) {
      this.game.enemyProjectiles[i].update();
    }

    for (let i = 0; i < this.game.playerProjectiles.length; i++) {
      //this.game.playerProjectiles[i].update();
      this.game.playerProjectiles[i].update();
    }
  }

  updateEffects() {
    let effectsToRemove = []
    for(let i = 0; i < this.game.effects.length; i++) {
      if(!this.game.effects[i].isPlaying) {
        effectsToRemove.push(this.game.effects[i]);
      }
    }

    for (let i = 0; i < effectsToRemove.length; i++) {
      let index = this.game.effects.indexOf(effectsToRemove[i]);
      this.game.effects.splice(index, 1);
    }

  }

  updateCollisionPlayerHullWithEnemies() {
    for (let i = 0; i < this.game.enemies.length; i++) {
      if (
        this.game.collision.rectsColliding(
          this.game.player,
          this.game.enemies[i]
        )
      ) {
        this.game.enemies[i].gotHit(false);
        this.game.player.gotHit(false);
      }
    }
  }

  updateCollisionPlayerWithProjectiles() {
    for (let i = 0; i < this.game.enemyProjectiles.length; i++) {
      if (this.game.collision.rectsColliding(
          this.game.player,
          this.game.enemyProjectiles[i]
        ) &&
        !this.game.enemyProjectiles[i].isPlayerOwned
      ) {
        this.game.player.gotHit(true, this.game.enemyProjectiles[i]);
        this.game.enemyProjectiles[i].setToRemove();
      }
    }
  }

  updateCollisionEnemyWithProjectiles() {
    for (let i = 0; i < this.game.enemies.length; i++) {
      for (let y = 0; y < this.game.playerProjectiles.length; y++) {
        if (
          this.game.collision.rectsColliding(
            this.game.enemies[i],
            this.game.playerProjectiles[y]
          ) &&
          this.game.playerProjectiles[y].isPlayerOwned
        ) {
          this.game.enemies[i].gotHit(true, this.game.playerProjectiles[y]);
          this.game.playerProjectiles[y].setToRemove();
        }
      }
    }
  }

  // removing all on screen projectiles (enemies and player owned)
  removeDeadProjectiles() {
    let projectilesToRemove = [];

    for (let i = 0; i < this.game.enemyProjectiles.length; i++) {
      if (this.game.enemyProjectiles[i].isTimeToRemove) {
        projectilesToRemove.push(this.game.enemyProjectiles[i]);
      }
    }

    for (let i = 0; i < projectilesToRemove.length; i++) {
      let index = this.game.enemyProjectiles.indexOf(projectilesToRemove[i]);
      this.game.enemyProjectiles.splice(index, 1);
    }

      projectilesToRemove = [];

    for (let i = 0; i < this.game.playerProjectiles.length; i++) {
      if (this.game.playerProjectiles[i].isTimeToRemove) {
        projectilesToRemove.push(this.game.playerProjectiles[i]);
      }
    }

    for (let i = 0; i < projectilesToRemove.length; i++) {
      let index = this.game.playerProjectiles.indexOf(projectilesToRemove[i]);
      this.game.playerProjectiles.splice(index, 1);
    }
  }

  removeDeadEnemies() {
    let enemiesToRemove = [];
    for (let i = 0; i < this.game.enemies.length; i++) {
      if (this.game.enemies[i].isDead) {
        enemiesToRemove.push(this.game.enemies[i]);

        // handle it better
        this.game.init.addEffect(this.game.enemies[i], "default");
        ///////
      }
    }

    for (let i = 0; i < enemiesToRemove.length; i++) {
      let index = this.game.enemies.indexOf(enemiesToRemove[i]);
      this.game.enemies.splice(index, 1);
      this.game.stats.score++;
    }
  }
}
