import {
  getTrueBasedOnChance,
  getRandomIntInclusive,
} from "../services/services";

export default class Level1 {
  constructor(game) {
    this.game = game;
    this.levelTransition = this.game.cutscenes.levelTransition;
    this.bossTransition = this.game.cutscenes.bossTransition;
    this.bossCutscene = this.game.cutscenes.bossCutscene;

    this.isStartLevelCutscenePlayed = false;

    this.i = 0;
    this.currentWave = [];

    this.wave = [];
    this.waveMap = [];
    this.listOfEnemyTier = ["t3", "t4", "t5"];
    //this.listOfEnemyTier = ["t2"];

    this.minNumOfEnemies = 5;
    this.maxNumOfEnemies = 8;
    this.maxNumOfEnemiesFormation = 10;

    this.defaultChanceToSpawnFormation = 0.35;
    this.chanceToSpawnFormation = 0.35;
    this.isFormation = false;
  }

  initialize() {
    this.generateWave();
    this.initWave(this.waveMap, this.wave);

    this.i = 0;
    this.isLevelInit = false;
    this.currentWave = [];
    this.currentWave = this.wave;
  }

  update() {
    if (this.game.enemies.length == 0 && this.currentWave.length == 0) {
      this.isFormation = false;
      this.advanceWave();
    }
  }

  handleWavesOfEnemies() {
    this.update();
    if (!this.isWaveCanBeSpawned()) {
      return;
    }
    this.spawnWave(this.currentWave);
    this.currentWave = [];
  }

  generateWave() {
    this.waveMap = [];
    this.wave = [];

    if (this.i % 4 == 0 && this.i != 0) {
      this.generateT2Wave();
    } else {
      if (getTrueBasedOnChance(this.chanceToSpawnFormation)) {
        this.generateFormationWave();
      } else {
        this.generateDefaultWave();
        if(this.chanceToSpawnFormation < this.defaultChanceToSpawnFormation) {
          this.chanceToSpawnFormation = this.defaultChanceToSpawnFormation;
        }
      }
    }
  }

  generateFormationWave() {
    this.isFormation = true;
    this.chanceToSpawnFormation = 0;

    let numOfEnemies = getRandomIntInclusive(
      this.minNumOfEnemies,
      this.maxNumOfEnemiesFormation
    );

    for (let i = 0; i < numOfEnemies; i++) {
      this.waveMap.push("t5");
    }
  }

  generateDefaultWave() {
    let numOfEnemies = getRandomIntInclusive(
      this.minNumOfEnemies,
      this.maxNumOfEnemies
    );

    for (let i = 0; i < numOfEnemies; i++) {
      let index = getRandomIntInclusive(0, this.listOfEnemyTier.length - 1);
      this.waveMap.push(this.listOfEnemyTier[index]);
    }
  }

  generateT2Wave() {
    this.waveMap.push("t2");
  }

  initWave(waveMap, wave) {
    this.game.init.initWaveOfEnemies(waveMap, wave);
  }

  spawnWave(wave) {
    this.game.init.spawnWaveOfEnemies(wave);

    if (this.isFormation) {
      let margin = this.getRandomFormationMargin(this.game.enemies.length);
      this.game.gameBoard.setShipsInFormationLine(this.game.enemies, margin);
    }
  }

  isWaveCanBeSpawned() {
    return this.game.enemies.length == 0 && this.currentWave.length != 0;
  }

  getRandomFormationMargin(numOfEnemies) {
    let marginMax = (5 - (numOfEnemies - 5)) * 22 + 40;
    let margin = getRandomIntInclusive(15, marginMax);
    return margin;
  }

  advanceWave() {
    this.i++;
    this.generateWave();
    this.initWave(this.waveMap, this.wave);
    this.currentWave = this.wave;
    this.game.progression.applyWaveModifiers();
  }
}
