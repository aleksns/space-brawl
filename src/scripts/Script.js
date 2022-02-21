import { Boss } from "../ships/Boss";
import Level1 from "./Level1";

export default class Script {
  constructor(game) {
    this.game = game;
    this.progression = this.game.progression;
    this.init = this.game.init;
    this.level1 = new Level1(this.game);
    this.currentLvl = this.level1;

    this.isStartLevelTransitionPlayed = false;
    this.isBossLevelTransitionPlayed = false;
    this.isBossCutscenePlayed = false;
    this.isBossSpawned = false;
    this.boss = undefined;
  }

  initialize() {
    this.currentLvl.initialize();
  }

  update() {
    if (!this.currentLvl.isLevelInit) {
      this.initialize();
      this.currentLvl.isLevelInit = true;
    }

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

    if (!this.game.isGlobalActionRestricted) {
      return;
    }
    this.game.setGameOffHold();
  }

  handleStartLevelTransition() {
    if (!this.game.isGameOnHold && !this.isStartLevelTransitionPlayed) {
      this.prepareGameForCutscene();
    }

    if (!this.isStartLevelTransitionPlayed) {
      this.playLevelTransitionAnimation();
      return;
    }
  }

  handleBossLevelTransition() {
    if (!this.game.isGameOnHold && !this.isBossLevelTransitionPlayed) {
      this.prepareGameForCutscene();
    }

    if (!this.isBossLevelTransitionPlayed) {
      this.playBossLevelTransitionAnimation();
      return;
    }
  }

  handleBossSpawn() {
    if (!this.isBossLevelTransitionPlayed) {
      return;
    }
    if (this.isBossSpawned == false) {
      this.initBoss();
      this.isBossSpawned = true;
    }
  }

  handleBossCutscene() {
    if (!this.boss.isAtThePosition()) {
      this.boss.animateBossAppearance();
      this.game.player.moveToDefaultPosition();
      return;
    }

    if (!this.isBossCutscenePlayed) {
      this.playBossCutscene();
      return;
    }

    this.game.isGlobalActionRestricted = false;
  }

  prepareGameForCutscene() {
    this.game.setGameOnHold();
    this.clearScreenFromObjects();
    this.game.skills.turnOffAllSkills();
    this.game.player.setMoveToDefaultPosition();
  }

  playLevelTransitionAnimation() {
    this.currentLvl.levelTransition.initialize();
    this.game.draw.drawCutscene(this.currentLvl.levelTransition, this.game.ctx);
    this.game.player.moveToDefaultPosition();
  }

  playBossLevelTransitionAnimation() {
    this.currentLvl.bossTransition.initialize();
    this.game.draw.drawCutscene(this.currentLvl.bossTransition, this.game.ctx);
    this.game.player.moveToDefaultPosition();
  }

  playBossCutscene() {
    this.currentLvl.bossCutscene.initialize();
    this.game.draw.drawCutscene(this.currentLvl.bossCutscene, this.game.ctx4);
    this.game.player.moveToDefaultPosition();
  }

  handleEnemiesSpawn() {
    if (this.game.isGlobalActionRestricted) {
      return;
    }
    if (!this.progression.isMaxThreatLevel) {
      this.currentLvl.handleWavesOfEnemies();
    }
  }

  cutsceneFinished(cutsceneID) {
    switch (cutsceneID) {
      case "levelTransition":
        this.isStartLevelTransitionPlayed = true;
        this.game.setGameOffHold();
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
    for (let i = 0; i < this.game.coins.length; i++) {
      this.game.coins[i].setDead();
    }
  }

  initBoss() {
    this.boss = new Boss(this.game);
    this.boss.initialize();
    this.game.init.spawnBoss(this.boss);
  }

  isThreatAtMaxAndEnemiesKilled() {
    return this.progression.isMaxThreatLevel && this.game.enemies.length == 0;
  }

  reset() {
    this.isStartLevelTransitionPlayed = false;
    this.isBossLevelTransitionPlayed = false;
    this.isBossCutscenePlayed = false;
    this.isBossSpawned = false;
    this.game.animations.bossShipAnimation.resetAnimation();
    this.isScriptInit = false;
  }
}
