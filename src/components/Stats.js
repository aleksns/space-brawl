export default class Stats {
  constructor(game) {
    this.game = game;

    this.player = {
      rammingDmg: 2,
      atkSpeed: 1,  //atkSpeed - time between attacks (in seconds)
      //tbd
    };

    this.enemy = {
      rammingDmg: 2,
      atkSpeed: 3,
    };

    this.playerProjectilesDmg = {
      default: 25,
    }
    this.enemyProjectilesDmg = {
      default: 5,
    }
    this.score = 0;
  }

  setPlayerDmgRamming(value) {
    this.player.rammingDmg = value;
  }

  setPlayerDmgDefault(value) {
    this.player.defaultDmg = value;
  }

  setPlayerAtkSpeed(value) {
    this.player.atkSpeed = value;
  }

  setEnemyDmgRamming(value) {
      this.enemy.rammingDmg = value;
  }

  getScore() {
    return this.score;
  }

}
