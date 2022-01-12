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

    this.enemyStats = [];
    this.enemyStats.push(this.enemyT0);
    this.enemyStats.push(this.enemyT4);
    this.enemyStats.push(this.enemyT5);

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
