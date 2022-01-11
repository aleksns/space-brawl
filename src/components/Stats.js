import {
  colors,
  getPlayerDefaultStats,
  getEnemyDefaultStats,
  getBossDefaultStats,
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
      scorePoints: getPlayerDefaultStats.scorePoints,
    };

    this.enemy = {
      damage: getEnemyDefaultStats.damage,
      health: getEnemyDefaultStats.health,
      maxHealth: getEnemyDefaultStats.maxHealth,
      rammingDmg: getEnemyDefaultStats.rammingDmg,
      atkSpeed: getEnemyDefaultStats.atkSpeed,
      atkSpeedCap: getEnemyDefaultStats.atkSpeedCap,
      scorePoints: getEnemyDefaultStats.scorePoints,
    };

    this.boss = {
      damage: getBossDefaultStats.damage,
      health: getBossDefaultStats.health,
      maxHealth: getBossDefaultStats.maxHealth,
      rammingDmg: getBossDefaultStats.rammingDmg,
      atkSpeed: getBossDefaultStats.atkSpeed,
      atkSpeedCap: getBossDefaultStats.atkSpeedCap,
      scorePoints: getBossDefaultStats.scorePoints,
    };

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
    // this.enemy.damage *= progression.enemyModifiers.damage;
    // this.enemy.health *= progression.enemyModifiers.health;
    // this.enemy.maxHealth *= progression.enemyModifiers.maxHealth;
    // this.enemy.atkSpeed *= progression.enemyModifiers.atkSpeed;
    // this.enemy.atkSpeedCap *= progression.enemyModifiers.atkSpeedCap;
    // this.enemy.scorePoints *= progression.enemyModifiers.scorePoints;

    this.appplyModifiersToEnemy(progression, this.enemy);
    this.appplyModifiersToEnemy(progression, this.boss);
  }

  appplyModifiersToEnemy(progression, enemy) {
    enemy.damage *= progression.enemyModifiers.damage;
    enemy.health *= progression.enemyModifiers.health;
    enemy.maxHealth *= progression.enemyModifiers.maxHealth;
    enemy.atkSpeed *= progression.enemyModifiers.atkSpeed;
    enemy.atkSpeedCap *= progression.enemyModifiers.atkSpeedCap;
    enemy.scorePoints *= progression.enemyModifiers.scorePoints;
  }

  // applyModifiersToEnemies(progression) {
  //   this.enemy.damage *= progression.enemyModifiers.damage;
  //   this.enemy.health *= progression.enemyModifiers.health;
  //   this.enemy.maxHealth *= progression.enemyModifiers.maxHealth;
  //   this.enemy.atkSpeed *= progression.enemyModifiers.atkSpeed;
  //   this.enemy.atkSpeedCap *= progression.enemyModifiers.atkSpeedCap;
  //   this.enemy.scorePoints *= progression.enemyModifiers.scorePoints;
  // }

  // applyModifiersToBoss(progression) {
  //   this.boss.damage *= progression.enemyModifiers.damage;
  //   this.boss.health *= progression.enemyModifiers.health;
  //   this.boss.maxHealth *= progression.enemyModifiers.maxHealth;
  //   this.boss.atkSpeed *= progression.enemyModifiers.atkSpeed;
  //   this.boss.atkSpeedCap *= progression.enemyModifiers.atkSpeedCap;
  //   this.boss.scorePoints *= progression.enemyModifiers.scorePoints;
  // }

  setAllToDefault() {
    ///
  }
}
