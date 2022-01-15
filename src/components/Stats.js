import {
  colors,
  getPlayerDefaultStats,
  getEnemyT4DefaultStats,
  getEnemyT5DefaultStats,
  getEnemyT0DefaultStats,
  getDefaultPlayerProjectile,
  getDefaultEnemyProjectile,
} from "../services/services";

export default class Stats {
  constructor(game) {
    this.game = game;

    this.player = {
      damage: getPlayerDefaultStats.damage,
      health: getPlayerDefaultStats.health,
      maxHealth: getPlayerDefaultStats.maxHealth,
      rammingDmg: getPlayerDefaultStats.rammingDmg,
      atkSpeed: getPlayerDefaultStats.atkSpeed,
      atkSpeedCap: getPlayerDefaultStats.atkSpeedCap,
    };

    this.enemyT4 = {
      damage: getEnemyT4DefaultStats.damage,
      health: getEnemyT4DefaultStats.health,
      maxHealth: getEnemyT4DefaultStats.maxHealth,
      rammingDmg: getEnemyT4DefaultStats.rammingDmg,
      atkSpeed: getEnemyT4DefaultStats.atkSpeed,
      atkSpeedCap: getEnemyT4DefaultStats.atkSpeedCap,
      scorePoints: getEnemyT4DefaultStats.scorePoints,
    };

    this.enemyT5 = {
      damage: getEnemyT5DefaultStats.damage,
      health: getEnemyT5DefaultStats.health,
      maxHealth: getEnemyT5DefaultStats.maxHealth,
      rammingDmg: getEnemyT5DefaultStats.rammingDmg,
      atkSpeed: getEnemyT5DefaultStats.atkSpeed,
      atkSpeedCap: getEnemyT5DefaultStats.atkSpeedCap,
      scorePoints: getEnemyT5DefaultStats.scorePoints,
    };

    this.enemyT0 = {
      damage: getEnemyT0DefaultStats.damage,
      health: getEnemyT0DefaultStats.health,
      maxHealth: getEnemyT0DefaultStats.maxHealth,
      rammingDmg: getEnemyT0DefaultStats.rammingDmg,
      atkSpeed: getEnemyT0DefaultStats.atkSpeed,
      atkSpeedCap: getEnemyT0DefaultStats.atkSpeedCap,
      scorePoints: getEnemyT0DefaultStats.scorePoints,
    };

    this.enemiesStats = [];
    this.enemiesStats.push(this.enemyT0);
    this.enemiesStats.push(this.enemyT4);
    this.enemiesStats.push(this.enemyT5);

    //s - speed
    this.projectileDefaultPlayer = {
      s: getDefaultPlayerProjectile.s,
      damage: getDefaultPlayerProjectile.damage,
    };
    //s - speed
    this.projectileDefaultEnemy = {
      s: getDefaultEnemyProjectile.s,
      damage: getDefaultEnemyProjectile.damage,
    };
  }

  applyModifiers(progression) {
    for(let i = 0; i < this.enemiesStats.length; i++) {
      this.appplyModifiersToEnemy(progression, this.enemiesStats[i]);
    }
  }

  appplyModifiersToEnemy(progression, enemy) {
    enemy.damage *= progression.enemyModifiers.damage;
    enemy.health *= progression.enemyModifiers.health;
    enemy.maxHealth *= progression.enemyModifiers.maxHealth;
    enemy.atkSpeed *= progression.enemyModifiers.atkSpeed;
    enemy.atkSpeedCap *= progression.enemyModifiers.atkSpeedCap;
    enemy.scorePoints = Math.floor(enemy.scorePoints * progression.enemyModifiers.scorePoints);
  }

  setAllToDefault() {
    ///
  }
}
