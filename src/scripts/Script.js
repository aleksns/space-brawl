import Level1 from "./Level1";

export default class Script {
  constructor(game) {
    this.game = game;
    this.progression = this.game.progression;
    this.init = this.game.init;
    this.level1 = new Level1(this.game);
    this.currentLvl = this.level1;
    this.levelInit = false;

    this.isStartLevelTransitionPlayed = false;
    this.isBossLevelTransitionPlayed = false;
    this.isBossCutscenePlayed = false;
    this.isBossSpawned = false;
  }

  update() {
    // if (!this.levelInit) {
    //   this.initialize();
    // }

    this.handleStartLevelTransition();

    this.handleEnemiesSpawn();

    if (this.isThreatAtMaxAndEnemiesKilled()) {
      this.handleBossSpawn();
    }
  }

  handleStartLevelTransition() {
    if (!this.game.isGameOnHold && !this.isStartLevelTransitionPlayed) {
      this.game.setGameOnHold();
      this.game.clearCanvas5();
      this.clearScreenFromObjects();
    }

    if (!this.isStartLevelTransitionPlayed) {
      this.playLevelTransitionAnimation();
      return;
    }
  }

  // initialize() {
  //   this.levelInit = true;
  //   this.game.clearCanvas5();
  // }

  handleBossSpawn() {
    if (!this.game.isGameOnHold && !this.isBossLevelTransitionPlayed) {
      this.game.setGameOnHold();
      this.game.clearCanvas5();
      this.clearScreenFromObjects();
    }

    if (!this.isBossLevelTransitionPlayed) {
      this.playBossLevelTransitionAnimation();
      return;
    }

    if (!this.isBossCutscenePlayed) {
      this.playBossCutscene();
      return;
    }
    
  }

  playLevelTransitionAnimation() {
    this.currentLvl.levelTransition.initialize();
    this.game.draw.drawCutscene(this.currentLvl.levelTransition);
  }

  playBossLevelTransitionAnimation() {
    this.currentLvl.bossTransition.initialize();
    this.game.draw.drawCutscene(this.currentLvl.bossTransition);
  }

  playBossCutscene() {
    this.init.addBoss();
    this.isBossCutscenePlayed = true;

    this.isBossSpawned = true;  //tbd
  }

  handleEnemiesSpawn() {
    //this.spawnFormationOfEnemies();

    if (this.game.enemies.length >= this.progression.maxNumOfEnemies) {
      return;
    }
    if (!this.progression.isMaxThreatLevel) {
      this.init.addEnemy();
    }
  }

  cutsceneFinished(cutsceneID) {
    switch (cutsceneID) {
      case "levelTransition":
        this.isStartLevelTransitionPlayed = true;
        break;
      case "bossTransition":
        this.isBossLevelTransitionPlayed = true;
        break;
      case "bossCutscene":
        this.isBossCutscenePlayed = true;
        break;
      default:
        console.log(`Error handling cutsceneFinished in Script class`);
        break;
    }

    this.game.draw.drawUIOnInit();
    this.game.setGameOffHold();
  }

  clearScreenFromObjects() {
    for(let i = 0; i < this.game.enemyProjectiles.length; i++) {
      this.game.enemyProjectiles[i].setDead();
    }
    for(let i = 0; i < this.game.playerProjectiles.length; i++) {
      this.game.playerProjectiles[i].setDead();
    }
    for(let i = 0; i < this.game.items.length; i++) {
      this.game.items[i].setDead();
    }
  }

  isThreatAtMaxAndEnemiesKilled() {
    return this.progression.isMaxThreatLevel && this.game.enemies.length == 0;
  }

  reset() {
    this.isStartLevelTransitionPlayed = false;
    this.isBossLevelTransitionPlayed = false;
    this.isBossCutscenePlayed = false;
    this.isBossSpawned = false;
  }
}
