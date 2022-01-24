import {
  getPlayerDefaultStats,
  getEnemyT4DefaultStats,
  getEnemyT5DefaultStats,
  getEnemyT0DefaultStats,
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

    this.slowModifiers = {
      atkSpeedPlayer: 0,
      speedPlayer: 0,
      sProjPlayer: 0,
      atkSpeedGlobal: 0,
      speedGlobal: 0,
      //speedProjectileGlobal: 0,
    };

    this.isGlobalSlowAll = false;
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

  setNewSlowModifiers(slowModifiers) {
    this.slowModifiers.atkSpeedPlayer = slowModifiers.atkSpeedPlayer;
    this.slowModifiers.speedPlayer = slowModifiers.speedPlayer;
    this.slowModifiers.sProjPlayer = slowModifiers.sProjPlayer;

    this.slowModifiers.atkSpeedGlobal = slowModifiers.atkSpeedGlobal;
    this.slowModifiers.speedGlobal = slowModifiers.speedGlobal;
    //this.slowModifiers.speedProjectileGlobal =
    //slowModifiers.speedProjectileGlobal;
  }

  slowEverything() {
    this.slowEnemies(this.game.enemies);
    this.applySpeedStatsReductionPlayer();

    this.slowObjectsWithTrajectoryMove(this.game.playerProjectiles);
    this.slowObjectsWithTrajectoryMove(this.game.enemyProjectiles);

    this.slowObjectsWithTrajectoryMove(this.game.items);
    this.slowObjectsWithTrajectoryMove(this.game.bgElements);

    this.isGlobalSlowAll = true;
  }

  slowEnemies(enemies) {
    for (let i = 0; i < enemies.length; i++) {
      this.applySpeedReductionObject(enemies[i]);
    }
  }

  slowObjectsWithTrajectoryMove(objects) {
    for (let i = 0; i < objects.length; i++) {
      if (!objects[i].isSlowSpeedApplied) {
        if (objects[i].isPlayerOwned) {
          objects[i].vX /= this.slowModifiers.sProjPlayer;
          objects[i].vY /= this.slowModifiers.sProjPlayer;
          objects[i].s /= this.slowModifiers.sProjPlayer;
        } else {
          objects[i].vX /= this.slowModifiers.speedGlobal;
          objects[i].vY /= this.slowModifiers.speedGlobal;
          objects[i].s /= this.slowModifiers.speedGlobal;
        }

        objects[i].isSlowSpeedApplied = true;
      }
    }
  }

  restoreSpeedOfEverything() {
    this.restoreSpeedEnemies(this.game.enemies);
    this.restoreSpeedStatsPlayer();

    this.restoreSpeedObjectsWithTrajectoryMove(this.game.playerProjectiles);
    this.restoreSpeedObjectsWithTrajectoryMove(this.game.enemyProjectiles);

    this.restoreSpeedObjectsWithTrajectoryMove(this.game.items);
    this.restoreSpeedObjectsWithTrajectoryMove(this.game.bgElements);

    this.isGlobalSlowAll = false;
  }

  restoreSpeedEnemies(enemies) {
    for (let i = 0; i < enemies.length; i++) {
      this.restoreSpeedObject(enemies[i]);
    }
  }

  restoreSpeedObjectsWithTrajectoryMove(objects) {
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].isSlowSpeedApplied) {
        if (objects[i].isPlayerOwned) {
          objects[i].vX *= this.slowModifiers.sProjPlayer;
          objects[i].vY *= this.slowModifiers.sProjPlayer;
          objects[i].s *= this.slowModifiers.sProjPlayer;
        } else {
          objects[i].vX *= this.slowModifiers.speedGlobal;
          objects[i].vY *= this.slowModifiers.speedGlobal;
          objects[i].s *= this.slowModifiers.speedGlobal;
        }

        objects[i].isSlowSpeedApplied = false;
      }
    }
  }

  applySpeedStatsReductionPlayer() {
    if (this.game.player.isSlowSpeedApplied == true) {
      return;
    }
    this.player.atkSpeed *= this.slowModifiers.atkSpeedPlayer;
    this.player.atkSpeedCap *= this.slowModifiers.atkSpeedPlayer;
    this.player.projectileSpeedModifier /= this.slowModifiers.speedPlayer;
    this.player.s /= this.slowModifiers.speedPlayer;
    this.player.a /= this.slowModifiers.speedPlayer;

    this.game.player.updateSpeedStats();
    this.game.player.isSlowSpeedApplied = true;
  }

  restoreSpeedStatsPlayer() {
    if (this.game.player.isSlowSpeedApplied == false) {
      return;
    }
    this.player.atkSpeed /= this.slowModifiers.atkSpeedPlayer;
    this.player.atkSpeedCap /= this.slowModifiers.atkSpeedPlayer;
    this.player.projectileSpeedModifier *= this.slowModifiers.speedPlayer;
    this.player.s *= this.slowModifiers.speedPlayer;
    this.player.a *= this.slowModifiers.speedPlayer;

    this.game.player.updateSpeedStats();
    this.game.player.isSlowSpeedApplied = false;
  }

  applySpeedReductionObject(object) {
    if (object.isSlowSpeedApplied == true) {
      return;
    }
    object.atkSpeed *= this.slowModifiers.atkSpeedGlobal;
    object.atkSpeedCap *= this.slowModifiers.atkSpeedGlobal;
    object.projectileSpeedModifier /= this.slowModifiers.speedGlobal;
    object.s /= this.slowModifiers.speedGlobal;
    object.a /= this.slowModifiers.speedGlobal;

    object.isSlowSpeedApplied = true;
  }

  restoreSpeedObject(object) {
    if (object.isSlowSpeedApplied == false) {
      return;
    }
    object.atkSpeed /= this.slowModifiers.atkSpeedGlobal;
    object.atkSpeedCap /= this.slowModifiers.atkSpeedGlobal;
    object.projectileSpeedModifier *= this.slowModifiers.speedGlobal;
    object.s *= this.slowModifiers.speedGlobal;
    object.a *= this.slowModifiers.speedGlobal;

    object.isSlowSpeedApplied = false;
  }
}
