import Enemy from "../ships/Enemy";

export default class Update {
  constructor(game) {
    this.game = game;
  }

  update() {
    this.spawnNewEnemies();

    this.updatePlayer();
    this.updateEnemies();
    this.updateProjectiles();
    this.updateCollisionPlayerHullWithEnemies();
    this.updateCollisionPlayerWithProjectiles();
    this.updateCollisionEnemyWithProjectiles();

    this.removeDeadProjectiles();
    this.removeDeadEnemies();
  }

  spawnNewEnemies() {
    if (this.game.enemies.length < this.game.maxNumOfEnemies) {
      let newEnemy = new Enemy(this.game);
      this.game.enemies.push(newEnemy);
    }
  }

  updatePlayer() {
    this.game.player.update();
  }

  updateEnemies() {
    for (let i = 0; i < this.game.enemies.length; i++) {
      this.game.enemies[i].update();
    }
  }

  updateProjectiles() {
    for (let i = 0; i < this.game.projectiles.length; i++) {
      this.game.projectiles[i].update();
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
    for (let i = 0; i < this.game.projectiles.length; i++) {
      if (this.game.collision.rectsColliding(
          this.game.player,
          this.game.projectiles[i]
        ) &&
        !this.game.projectiles[i].isPlayerOwned
      ) {
        this.game.player.gotHit(true, this.game.projectiles[i]);
        this.game.projectiles[i].setToRemove();
      }
    }
  }

  updateCollisionEnemyWithProjectiles() {
    for (let i = 0; i < this.game.enemies.length; i++) {
      for (let y = 0; y < this.game.projectiles.length; y++) {
        if (
          this.game.collision.rectsColliding(
            this.game.enemies[i],
            this.game.projectiles[y]
          ) &&
          this.game.projectiles[y].isPlayerOwned
        ) {
          this.game.enemies[i].gotHit(true, this.game.projectiles[y]);
          this.game.projectiles[y].setToRemove();
        }
      }
    }
  }

  removeDeadProjectiles() {
    let projectilesToRemove = [];

    for (let i = 0; i < this.game.projectiles.length; i++) {
      if (this.game.projectiles[i].isTimeToRemove) {
        projectilesToRemove.push(this.game.projectiles[i]);
      }
    }

    for (let i = 0; i < projectilesToRemove.length; i++) {
      let index = this.game.projectiles.indexOf(projectilesToRemove[i]);
      this.game.projectiles.splice(index, 1);
    }
  }

  removeDeadEnemies() {
    let enemiesToRemove = [];
    for (let i = 0; i < this.game.enemies.length; i++) {
      if (this.game.enemies[i].isDead) {
        enemiesToRemove.push(this.game.enemies[i]);
      }
    }

    for (let i = 0; i < enemiesToRemove.length; i++) {
      let index = this.game.enemies.indexOf(enemiesToRemove[i]);
      this.game.enemies.splice(index, 1);
      this.game.stats.score++;
    }
  }
}
