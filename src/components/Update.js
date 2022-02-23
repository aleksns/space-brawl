export default class Update {
  constructor(game) {
    this.game = game;

  }

  update() {
    this.game.controls.update();
    if (this.game.isPauseOn) {
      return;
    }

    this.updateGuns();
    this.updateItems();
    this.updateCoins();
    this.updatePlayer();
    this.updateEnemies();
    this.updateProjectiles();
    this.updateAnimations();
    this.updateEffects();
    this.updateStatusEffects();
    this.updateUI();

    this.updateGameProgression();

    this.updateCollisionPlayerHullWithEnemies();
    this.updateCollisionPlayerWithProjectiles();
    this.updateCollisionEnemyWithProjectiles();

    this.removeDeadGuns();
    this.removeDeadCoins();
    this.removeDeadItems();
    this.removeDeadBgElements();
    this.removeDeadEnemies();
    this.removeDeadProjectiles();
    this.removeDeadEffects();
  }

  updateAnimations() {
    for (let i = 0; i < this.game.animations.list.length; i++) {
      this.game.animations.list[i].update();
    }
  }

  updateAllTimersAfterPauseOff() {
    this.game.skills.updateTimersAfterPauseOff();
    this.game.init.updateTimersAfterPauseOff();
    for (let i = 0; i < this.game.enemies.length; i++) {
      this.game.enemies[i].updateTimersAfterPauseOff();
    }
  }

  updateUI() {
    this.game.skillsBar.update();
    this.game.levelAndScore.update();
  }

  updateGameProgression() {
    this.game.progression.update();
  }

  updateStatusEffects() {
    this.game.skills.update();
  }

  updateObjects(objects) {
    for (let i = 0; i < objects.length; i++) {
      objects[i].update();
    }
  }

  updateGuns() {
    this.updateObjects(this.game.enemyGuns);
    this.updateObjects(this.game.playerGuns);
    this.game.playerTeam[0].laserGun.update();
  }

  updateCoins() {
    this.updateObjects(this.game.coins);
  }

  updateItems() {
    //this.game.init.addBgElements();
    //this.updateObjects(this.game.bgElements);

    this.game.init.addItems();
    this.updateObjects(this.game.items);
  }

  updatePlayer() {
    for(let i = 0; i < this.game.playerTeam.length; i++) {
      this.game.playerTeam[i].update();
    }
  }

  updateEnemies() {
    this.updateObjects(this.game.enemies);
    if(!this.game.script.currentLvl.isFormation) {
      this.game.gameBoard.setEmptyPositionForT5Enemies();
    }
  }

  updateProjectiles() {
    this.updateObjects(this.game.enemyProjectiles);
    this.updateObjects(this.game.playerProjectiles);
  }

  updateEffects() {
    this.updateObjects(this.game.effects);
  }

  updateCollisionPlayerHullWithEnemies() {
    if(this.game.gameOver) {
      return;
    }
    for (let i = 0; i < this.game.enemies.length; i++) {
      if (
        this.game.gameBoard.collision.rectsColliding(
          this.game.playerTeam[0],
          this.game.enemies[i]
        )
      ) {
        this.game.enemies[i].gotHitByShipHull(this.game.playerTeam[0]);
        this.game.playerTeam[0].gotHitByShipHull(this.game.enemies[i]);
      }
    }
  }

  updateCollisionPlayerWithProjectiles() {
    for (let i = 0; i < this.game.enemyProjectiles.length; i++) {
      if (
        this.game.gameBoard.collision.rectsColliding(
          this.game.playerTeam[0],
          this.game.enemyProjectiles[i]
        ) &&
        !this.game.enemyProjectiles[i].isPlayerOwned
      ) {
        this.game.playerTeam[0].gotHitByProjectile(this.game.enemyProjectiles[i]);
        this.game.enemyProjectiles[i].setDead();
      }
    }
  }

  updateCollisionEnemyWithProjectiles() {
    for (let i = 0; i < this.game.enemies.length; i++) {
      for (let y = 0; y < this.game.playerProjectiles.length; y++) {
        if (
          this.game.gameBoard.collision.rectsColliding(
            this.game.enemies[i],
            this.game.playerProjectiles[y]
          ) &&
          this.game.playerProjectiles[y].isPlayerOwned
        ) {
          this.game.enemies[i].gotHitByProjectile(
            this.game.playerProjectiles[y]
          );
          if (!this.game.playerProjectiles[y].isLaser) {
            this.game.playerProjectiles[y].setDead();
          }
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

  removeDeadGuns() {
    this.removeDeadObjects(this.game.enemyGuns);
  }

  removeDeadCoins() {
    this.removeDeadObjects(this.game.coins);
  }

  removeDeadItems() {
    this.removeDeadObjects(this.game.items);
  }

  removeDeadBgElements() {
    //this.removeDeadObjects(this.game.bgElements);
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
