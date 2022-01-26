import { Boss } from "../ships/Boss";
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
    this.boss = undefined;
  }

  update() {
    this.handleStartLevelTransition();

    this.handleEnemiesSpawn();

    if (this.isThreatAtMaxAndEnemiesKilled() && !this.isBossSpawned) {
      this.handleBossLevelTransition();
      this.handleBossSpawn();
    }

    if (!this.isBossSpawned) {
      return;
    }
    this.handleBossCutscene();

    if (!this.isBossCutscenePlayed) {
      return;
    }
    this.resumeGame();
  }

  handleStartLevelTransition() {
    if (!this.game.isGameOnHold && !this.isStartLevelTransitionPlayed) {
      this.game.setGameOnHold();
      this.clearScreenFromObjects();
    }

    if (!this.isStartLevelTransitionPlayed) {
      this.playLevelTransitionAnimation();
      return;
    }
  }

  handleBossLevelTransition() {
    if (!this.game.isGameOnHold && !this.isBossLevelTransitionPlayed) {
      this.game.setGameOnHold();
      this.clearScreenFromObjects();
      this.game.isGlobalActionRestricted = true;
    }

    if (!this.isBossLevelTransitionPlayed) {
      this.playBossLevelTransitionAnimation();
    }
  }

  handleBossSpawn() {
    if (!this.isBossLevelTransitionPlayed) {
      return;
    }
    if (this.isBossSpawned == false) {
      this.createBoss();
      this.isBossSpawned = true;
    }
  }

  handleBossCutscene() {
    if (!this.boss.isAtThePosition()) {
      this.boss.animateBossAppearance();
      return;
    }

    if (!this.isBossCutscenePlayed) {
      this.playBossCutscene();
      return;
    }
    this.game.isGlobalActionRestricted = false;
  }

  playLevelTransitionAnimation() {
    this.currentLvl.levelTransition.initialize();
    this.game.draw.drawCutscene(this.currentLvl.levelTransition, this.game.ctx);
  }

  playBossLevelTransitionAnimation() {
    this.currentLvl.bossTransition.initialize();
    this.game.draw.drawCutscene(this.currentLvl.bossTransition, this.game.ctx);
  }

  playBossCutscene() {
    this.currentLvl.bossCutscene.initialize();
    this.game.draw.drawCutscene(this.currentLvl.bossCutscene, this.game.ctx4);
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

  resumeGame() {
    this.game.isGlobalActionRestricted = false;
    this.game.draw.drawUIOnInit();
  }

  cutsceneFinished(cutsceneID) {
    switch (cutsceneID) {
      case "levelTransition":
        this.isStartLevelTransitionPlayed = true;
        this.game.setGameOffHold();
        this.game.draw.drawUIOnInit();
        break;
      case "bossTransition":
        this.isBossLevelTransitionPlayed = true;
        this.game.setGameOffHold();
        break;
      case "bossCutscene":
        this.isBossCutscenePlayed = true;
        break;
      default:
        console.log(`Error handling cutsceneFinished in Script class`);
        break;
    }

  }

  clearScreenFromObjects() {
    for (let i = 0; i < this.game.enemyProjectiles.length; i++) {
      this.game.enemyProjectiles[i].setDead();
    }
    for (let i = 0; i < this.game.playerProjectiles.length; i++) {
      this.game.playerProjectiles[i].setDead();
    }
    for (let i = 0; i < this.game.items.length; i++) {
      this.game.items[i].setDead();
    }
  }

  createBoss() {
    this.boss = new Boss(this.game);
    this.boss.initialize();
    this.game.init.addBoss(this.boss);
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
