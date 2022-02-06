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
  }

  decreaseSpeedOfEverything() {
    this.isGlobalSlowAll = true;

    this.decreaseEnemiesSpeed(this.game.enemies);
    this.decreaseShipSpeed(this.game.player, this.slowModifiers.speedPlayer);

    this.decreaseGunsAtkSpeed(this.game.enemyGuns, this.slowModifiers.atkSpeedGlobal);
    this.decreaseGunsAtkSpeed(this.game.playerGuns, this.slowModifiers.atkSpeedPlayer);

    this.decreaseObjectsSpeed(this.game.playerProjectiles);
    this.decreaseObjectsSpeed(this.game.enemyProjectiles);

    this.decreaseObjectsSpeed(this.game.items);
    this.decreaseObjectsSpeed(this.game.bgElements);
  }

  decreaseEnemiesSpeed(enemies) {
    for (let i = 0; i < enemies.length; i++) {
      this.decreaseShipSpeed(enemies[i], this.slowModifiers.speedGlobal);
    }
  }

  decreaseObjectsSpeed(objects) {
    for (let i = 0; i < objects.length; i++) {
      //if (!objects[i].isSlowSpeedApplied) {
        this.decreaseObjectSpeed(objects[i]);
     // }
    }
  }

  decreaseObjectSpeed(object) {
    if (object.isPlayerOwned) {
      object.dX /= this.slowModifiers.sProjPlayer;
      object.dY /= this.slowModifiers.sProjPlayer;
      object.vX /= this.slowModifiers.sProjPlayer;
      object.vY /= this.slowModifiers.sProjPlayer;
      object.s /= this.slowModifiers.sProjPlayer;
    } else {
      object.dX /= this.slowModifiers.speedGlobal;
      object.dY /= this.slowModifiers.speedGlobal;
      object.vX /= this.slowModifiers.speedGlobal;
      object.vY /= this.slowModifiers.speedGlobal;
      object.s /= this.slowModifiers.speedGlobal;
    }
    //object.isSlowSpeedApplied = true;
  }

  increaseSpeedOfEverything() {
    this.increaseEnemiesSpeed(this.game.enemies);
    this.increaseShipSpeed(this.game.player, this.slowModifiers.speedPlayer);

    this.increaseGunsAtkSpeed(this.game.enemyGuns, this.slowModifiers.atkSpeedGlobal);
    this.increaseGunsAtkSpeed(this.game.playerGuns, this.slowModifiers.atkSpeedPlayer);

    this.increaseObjectsSpeed(this.game.playerProjectiles);
    this.increaseObjectsSpeed(this.game.enemyProjectiles);

    this.increaseObjectsSpeed(this.game.items);
    this.increaseObjectsSpeed(this.game.bgElements);

    this.isGlobalSlowAll = false;
  }

  increaseEnemiesSpeed(enemies) {
    for (let i = 0; i < enemies.length; i++) {
      this.increaseShipSpeed(enemies[i], this.slowModifiers.speedGlobal);
    }
  }

  increaseObjectsSpeed(objects) {
    for (let i = 0; i < objects.length; i++) {
     // if (objects[i].isSlowSpeedApplied) {
        this.increaseObjectSpeed(objects[i]);
     // }
    }
  }

  increaseObjectSpeed(object) {
    if (object.isPlayerOwned) {
      object.dX *= this.slowModifiers.sProjPlayer;
      object.dY *= this.slowModifiers.sProjPlayer;
      object.vX *= this.slowModifiers.sProjPlayer;
      object.vY *= this.slowModifiers.sProjPlayer;
      object.s *= this.slowModifiers.sProjPlayer;
    } else {
      object.dX *= this.slowModifiers.speedGlobal;
      object.dY *= this.slowModifiers.speedGlobal;
      object.vX *= this.slowModifiers.speedGlobal;
      object.vY *= this.slowModifiers.speedGlobal;
      object.s *= this.slowModifiers.speedGlobal;
    }
    //object.isSlowSpeedApplied = false;
  }

  decreaseShipSpeed(ship, speed) {
    if (ship.isSlowSpeedApplied == true) {
     // return;
    }
    ship.s /= speed;
    ship.a /= speed;
    //object.isSlowSpeedApplied = true;
  }

  increaseShipSpeed(ship, speed) {
    if (ship.isSlowSpeedApplied == false) {
     // return;
    }
    ship.s *= speed;
    ship.a *= speed;
    //object.isSlowSpeedApplied = false;
  }

  decreaseGunsAtkSpeed(guns, value) {
    for (let i = 0; i < guns.length; i++) {
      //if (!guns[i].isSlowSpeedApplied) {
        this.decreaseGunAtkSpeed(guns[i], value);
      //}
    }
  }

  decreaseGunAtkSpeed(gun, value) {
    console.log(`DECREASE BEFORE gun.atkSpeed = ${gun.atkSpeed}, rateOfFire = ${gun.rateOfFire}`)
    gun.atkSpeed *= value;
    gun.rateOfFire *= value;
    //gun.isSlowSpeedApplied = true;
    console.log(`DECREASE AFTER gun.atkSpeed = ${gun.atkSpeed}, rateOfFire = ${gun.rateOfFire}`)
    console.log(`------------------`)
  }

  increaseGunsAtkSpeed(guns, value) {
    for (let i = 0; i < guns.length; i++) {
      //if (!guns[i].isSlowSpeedApplied) {
        this.increaseGunAtkSpeed(guns[i], value);
      //}
    }
  }

  increaseGunAtkSpeed(gun, value) {
    console.log(`INCREASE BEFORE gun.atkSpeed = ${gun.atkSpeed}, rateOfFire = ${gun.rateOfFire}`)
    gun.atkSpeed /= value;
    gun.rateOfFire /= value;
    console.log(`INCREASE AFTER gun.atkSpeed = ${gun.atkSpeed}, rateOfFire = ${gun.rateOfFire}`)
    console.log(`===============`)
    //gun.isSlowSpeedApplied = true;
  }
}
