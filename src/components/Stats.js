export default class Stats {
  constructor(game) {
    this.game = game;

    this.player = {
      rammingDmg: 0.5,
      atkSpeed: 0.15,  //atkSpeed - time between attacks (in seconds)
      //tbd
    };

    this.enemy = {
      rammingDmg: 0.5,
      atkSpeed: 1,
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
