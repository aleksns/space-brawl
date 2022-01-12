export default class Update {
  constructor(game) {
    this.game = game;
  }

  startTimersOnInit() {
    this.game.init.startTimers();
    //this.game.player.initPlayer();
    this.game.player.startTimers();
    this.game.statusEffects.startTimers();
  }

  update() {
    this.updateItems();
    this.updatePlayer();
    this.updateEnemies();
    this.updateProjectiles();
    this.updateEffects();
    this.updateStatusEffects();

    this.updateGameProgression();

    this.updateCollisionPlayerHullWithEnemies();
    this.updateCollisionPlayerWithProjectiles();
    this.updateCollisionEnemyWithProjectiles(); //put items collison with player on pick up here

    this.removeDeadItems();
    this.removeDeadBgElements();
    this.removeDeadEnemies();
    this.removeDeadProjectiles();
    this.removeDeadEffects();
  }

  updateGameProgression() {
    this.game.progression.update();
  }

  updateStatusEffects() {
    this.game.statusEffects.update();
  }

  updateObjects(objects) {
    for (let i = 0; i < objects.length; i++) {
      objects[i].update();
    }
  }

  updateItems() {
    this.game.init.addBgElements();
    this.updateObjects(this.game.bgElements);

    this.game.init.addItems();
    this.updateObjects(this.game.items);
  }

  updatePlayer() {
    this.game.player.update();
  }

  updateEnemies() {
    this.game.init.spawnEnemies();
    this.updateObjects(this.game.enemies);
  }

  updateProjectiles() {
    this.updateObjects(this.game.enemyProjectiles);
    this.updateObjects(this.game.playerProjectiles);
  }

  updateEffects() {
    this.updateObjects(this.game.effects);
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
      if (
        this.game.collision.rectsColliding(
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

  removeDeadObjects(objects) {
    let objectsToRemove = [];
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].isDead) {
        objectsToRemove.push(objects[i]);
      }
    }
    for (let i = 0; i < objectsToRemove.length; i++) {
      let index = objects.indexOf(objectsToRemove[i]);
      objects.splice(index, 1);
    }
  }

  removeDeadItems() {
    this.removeDeadObjects(this.game.items);
  }

  removeDeadBgElements() {
    this.removeDeadObjects(this.game.bgElements);
  }

  removeDeadEffects() {
    this.removeDeadObjects(this.game.effects);
  }

  removeDeadProjectiles() {
    this.removeDeadObjects(this.game.enemyProjectiles);
    this.removeDeadObjects(this.game.playerProjectiles);
  }

  removeDeadEnemies() {
    this.removeDeadObjects(this.game.enemies);
  }
}
