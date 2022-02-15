export default class Level1 {
  constructor(game) {
    this.game = game;
    this.levelTransition = this.game.cutscenes.levelTransition;
    this.bossTransition = this.game.cutscenes.bossTransition;
    this.bossCutscene = this.game.cutscenes.bossCutscene;

    this.isStartLevelCutscenePlayed = false;

    this.waves = [];

    this.i = 0;
    this.currentWave = [];
    this.currentWave = 0;

    this.wave1 = {
      wave: [],
      map: ["t5", "t5", "t5", "t5"],
      //map: ["t4", "t4", "t4", "t4", "t4"],
    }

    this.wave2 = {
      wave: [],
      map: ["t5", "t5", "t5", "t5", "t5", "t5", "t5", "t5", "t5", "t5"],
    }

    this.wave3 = {
      wave: [],
      map: ["t4", "t4", "t4", "t4", "t4", "t5", "t5", "t5", "t5", "t5"],
    }

    this.wave4 = {
      wave: [],
      map: ["t4", "t4", "t4", "t4", "t5", "t5", "t5"],
    }

  }

  initialize() {
    this.resetWaves();

    this.initWaves();

    this.i = 0;
    this.currentWave = [];
    this.isLevelInit = false;
    this.currentWave = this.waves[this.i];
  }

  update() {
    if (this.game.enemies.length == 0 && this.currentWave.length == 0) {
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

  initWaves() {
    this.initWave(this.wave1.map, this.wave1.wave);

    this.initWave(this.wave2.map, this.wave2.wave);
    this.game.gameBoard.setShipsInFormationLine(this.wave2.wave, 15);

    this.initWave(this.wave3.map, this.wave3.wave);
    this.initWave(this.wave4.map, this.wave4.wave);

    this.waves = [];
    this.waves.push(this.wave1.wave);
    this.waves.push(this.wave2.wave);
    this.waves.push(this.wave3.wave);
    this.waves.push(this.wave4.wave);
  }

  initWave(waveMap, wave) {
    this.game.init.initWaveOfEnemies(waveMap, wave);
  }

  spawnWave(wave) {
    this.game.init.spawnWaveOfEnemies(wave);
  }

  isWaveCanBeSpawned() {
    return this.game.enemies.length == 0 && this.currentWave.length != 0;
  }

  advanceWave() {
    this.i++;
    if(this.i == this.waves.length) {
      //this.initialize();
      this.isLevelInit = false;
      return;
    }
    this.currentWave = this.waves[this.i];
  }

  resetWaves() {
    for(let i = 0; i < this.waves.length; i++) {
      this.waves[i].length = 0;
    }
  }
}
