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
      s: getPlayerDefaultStats.speed,
      a: getPlayerDefaultStats.speed / getPlayerDefaultStats.accelerationMod,
      rammingDmg: getPlayerDefaultStats.rammingDmg,
      atkSpeed: getPlayerDefaultStats.atkSpeed,
      atkSpeedCap: getPlayerDefaultStats.atkSpeedCap,
      projectileSpeedModifier: getPlayerDefaultStats.projectileSpeedModifier,
    };

    this.enemyT4 = {
      damage: getEnemyT4DefaultStats.damage,
      health: getEnemyT4DefaultStats.health,
      maxHealth: getEnemyT4DefaultStats.maxHealth,
      s: getEnemyT4DefaultStats.speed,
      a: getEnemyT4DefaultStats.speed / getEnemyT4DefaultStats.accelerationMod,
      rammingDmg: getEnemyT4DefaultStats.rammingDmg,
      atkSpeed: getEnemyT4DefaultStats.atkSpeed,
      atkSpeedCap: getEnemyT4DefaultStats.atkSpeedCap,
      projectileSpeedModifier: getEnemyT4DefaultStats.projectileSpeedModifier,
      scorePoints: getEnemyT4DefaultStats.scorePoints,
    };

    this.enemyT5 = {
      damage: getEnemyT5DefaultStats.damage,
      health: getEnemyT5DefaultStats.health,
      maxHealth: getEnemyT5DefaultStats.maxHealth,
      s: getEnemyT5DefaultStats.speed,
      a: getEnemyT5DefaultStats.speed / getEnemyT5DefaultStats.accelerationMod,
      rammingDmg: getEnemyT5DefaultStats.rammingDmg,
      atkSpeed: getEnemyT5DefaultStats.atkSpeed,
      atkSpeedCap: getEnemyT5DefaultStats.atkSpeedCap,
      projectileSpeedModifier: getEnemyT5DefaultStats.projectileSpeedModifier,
      scorePoints: getEnemyT5DefaultStats.scorePoints,
    };

    this.enemyT0 = {
      damage: getEnemyT0DefaultStats.damage,
      health: getEnemyT0DefaultStats.health,
      maxHealth: getEnemyT0DefaultStats.maxHealth,
      s: getEnemyT0DefaultStats.speed,
      a: getEnemyT5DefaultStats.speed / getEnemyT0DefaultStats.accelerationMod,
      rammingDmg: getEnemyT0DefaultStats.rammingDmg,
      atkSpeed: getEnemyT0DefaultStats.atkSpeed,
      atkSpeedCap: getEnemyT0DefaultStats.atkSpeedCap,
      projectileSpeedModifier: getEnemyT0DefaultStats.projectileSpeedModifier,
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

    this.slowModifiers = {
      atkSpeed: 2.0,
      atkSpeedCap: 2.0,
      s: 6,
      a: 20,
      projectileSpeedModifier: 30,
      projectiles: 30,
    };
  }

  applyModifiers(progression) {
    for (let i = 0; i < this.enemiesStats.length; i++) {
      this.appplyModifiersToEnemy(progression, this.enemiesStats[i]);
    }
  }

  appplyModifiersToEnemy(progression, enemy) {
    enemy.damage *= progression.enemyModifiers.damage;
    enemy.health *= progression.enemyModifiers.health;
    enemy.maxHealth *= progression.enemyModifiers.maxHealth;
    enemy.atkSpeed *= progression.enemyModifiers.atkSpeed;
    enemy.atkSpeedCap *= progression.enemyModifiers.atkSpeedCap;
    enemy.scorePoints = Math.floor(
      enemy.scorePoints * progression.enemyModifiers.scorePoints
    );
  }

  setAllToDefault() {
    ///
  }

  slowEverything() {
    this.slowEnemies(this.game.enemies);
    this.slowProjectiles(this.game.playerProjectiles);
    this.slowProjectiles(this.game.enemyProjectiles);

    this.applySpeedStatsReduction(this.game.player);
    //add items and bg elements here
  }

  slowEnemies(enemies) {
    for (let i = 0; i < enemies.length; i++) {
      this.applySpeedStatsReduction(enemies[i]);
    }
  }

  slowProjectiles(projectiles) {
    for (let i = 0; i < projectiles.length; i++) {
      if (!projectiles[i].isSlowSpeedApplied) {
        projectiles[i].vX /= this.slowModifiers.projectiles;
        projectiles[i].vY /= this.slowModifiers.projectiles;
        projectiles[i].isSlowSpeedApplied = true;
        
      }
    }
  }

  restoreSpeedOfEverything() {
    // for (let i = 0; i < this.game.enemies.length; i++) {
    //   this.applySpeedStatsReduction(this.game.enemies[i]);
    // }
    this.restoreSpeedEnemies(this.game.enemies);
    this.restoreSpeedProjectiles(this.game.playerProjectiles);
    this.restoreSpeedProjectiles(this.game.enemyProjectiles);

    this.restoreSpeedStats(this.game.player);
    //add items and bg elements here
  }

  restoreSpeedEnemies(enemies) {
    for (let i = 0; i < enemies.length; i++) {
      this.restoreSpeedStats(enemies[i]);
    }
  }

  restoreSpeedProjectiles(projectiles) {
    for (let i = 0; i < projectiles.length; i++) {
      if (projectiles[i].isSlowSpeedApplied) {
        // projectiles[i].s *= this.slowModifiers.projectiles;
        projectiles[i].vX *= this.slowModifiers.projectiles;
        projectiles[i].vY *= this.slowModifiers.projectiles;
         projectiles[i].isSlowSpeedApplied = false;
      }
    }
  }

  applySpeedStatsReduction(object) {
    if (object.isSlowSpeedApplied == true) {
      return;
    }
    object.isSlowSpeedApplied = true;

    object.atkSpeed += this.slowModifiers.atkSpeed;
    object.atkSpeedCap += this.slowModifiers.atkSpeedCap;
    object.projectileSpeedModifier /= this.slowModifiers.projectileSpeedModifier;
    object.s /= this.slowModifiers.s;
    object.a /= this.slowModifiers.a;

    //testing
    // object.vX /= 20;
    // object.vY /= 20;
    // object.s = object.vX;
    // object.a = object.vX;
  }

  restoreSpeedStats(object) {
    if (object.isSlowSpeedApplied == false) {
      return;
    }
    object.atkSpeed -= this.slowModifiers.atkSpeed;
    object.atkSpeedCap -= this.slowModifiers.atkSpeedCap;
    object.projectileSpeedModifier *= this.slowModifiers.projectileSpeedModifier;
    object.s *= this.slowModifiers.s;
    object.a *= this.slowModifiers.a;

    object.isSlowSpeedApplied = false;
  }
}
