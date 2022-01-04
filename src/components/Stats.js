import {
  getPlayerDefaultStats,
  getEnemyDefaultStats,
  getPlayerProjectileDefaultStats,
  getEnemyProjectileDefaultStats,
} from "../services/services";

export default class Stats {
  constructor(game) {
    this.game = game;

    this.player = {
      rammingDmg: getPlayerDefaultStats.rammingDmg,
      atkSpeed: getPlayerDefaultStats.atkSpeed, //atkSpeed - time between attacks (in seconds)
      atkSpeedCap: getPlayerDefaultStats.atkSpeedCap,
      //tbd
    };

    this.enemy = {
      rammingDmg: getEnemyDefaultStats.rammingDmg,
      atkSpeed: getEnemyDefaultStats.atkSpeed,
      atkSpeedCap: getEnemyDefaultStats.atkSpeedCap,
    };

    this.playerProjectilesDmg = {
      default: getPlayerProjectileDefaultStats.default,
      tier1: getPlayerProjectileDefaultStats.tier1,
      tier2: getPlayerProjectileDefaultStats.tier2,
      tier3: getPlayerProjectileDefaultStats.tier3,
    };
    this.enemyProjectilesDmg = {
      default: getEnemyProjectileDefaultStats.default,
      tier1: getEnemyProjectileDefaultStats.tier1,
      tier2: getEnemyProjectileDefaultStats.tier2,
      tier3: getEnemyProjectileDefaultStats.tier3,
    };

    this.itemsTimeToSpawn = {
      medkit: 7,
    }
    
    this.kills = 0;
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
    return this.kills;
  }
}
