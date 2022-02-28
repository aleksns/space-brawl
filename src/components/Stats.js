import {
  enemyGunsDamageProps,
  playerGunsDamageProps,
} from "../services/gunsProps";
import {
  getPlayerDefaultStats,
  getEnemyT4DefaultStats,
  getEnemyT5DefaultStats,
  getEnemyT0DefaultStats,
  getEnemyT3DefaultStats,
  getItemsStats,
} from "../services/services";

export default class Stats {
  constructor(game) {
    this.game = game;

    this.player = {
      health: getPlayerDefaultStats.health,
      maxHealth: getPlayerDefaultStats.maxHealth,
      s: getPlayerDefaultStats.speed,
      a: getPlayerDefaultStats.speed / getPlayerDefaultStats.accelerationMod,
      rammingDmg: getPlayerDefaultStats.rammingDmg,
    };

    this.enemyT0 = {
      health: getEnemyT0DefaultStats.health,
      maxHealth: getEnemyT0DefaultStats.maxHealth,
      s: getEnemyT0DefaultStats.speed,
      a: getEnemyT5DefaultStats.speed / getEnemyT0DefaultStats.accelerationMod,
      rammingDmg: getEnemyT0DefaultStats.rammingDmg,
      scorePoints: getEnemyT0DefaultStats.scorePoints,
    };

    this.enemyT3 = {
      health: getEnemyT3DefaultStats.health,
      maxHealth: getEnemyT3DefaultStats.maxHealth,
      s: getEnemyT3DefaultStats.speed,
      a: getEnemyT3DefaultStats.speed / getEnemyT3DefaultStats.accelerationMod,
      rammingDmg: getEnemyT3DefaultStats.rammingDmg,
      scorePoints: getEnemyT3DefaultStats.scorePoints,
    };

    this.enemyT4 = {
      health: getEnemyT4DefaultStats.health,
      maxHealth: getEnemyT4DefaultStats.maxHealth,
      s: getEnemyT4DefaultStats.speed,
      a: getEnemyT4DefaultStats.speed / getEnemyT4DefaultStats.accelerationMod,
      rammingDmg: getEnemyT4DefaultStats.rammingDmg,
      scorePoints: getEnemyT4DefaultStats.scorePoints,
    };

    this.enemyT5 = {
      health: getEnemyT5DefaultStats.health,
      maxHealth: getEnemyT5DefaultStats.maxHealth,
      s: getEnemyT5DefaultStats.speed,
      a: getEnemyT5DefaultStats.speed / getEnemyT5DefaultStats.accelerationMod,
      rammingDmg: getEnemyT5DefaultStats.rammingDmg,
      scorePoints: getEnemyT5DefaultStats.scorePoints,
    };

    this.playerGunsDamage = {
      laserT1: playerGunsDamageProps.laserT1,
      laserT2: playerGunsDamageProps.laserT2,
      laserT3: playerGunsDamageProps.laserT3,
      default: playerGunsDamageProps.default,
      barrage: playerGunsDamageProps.barrage,
      rotating: playerGunsDamageProps.rotating,
    };

    this.enemyGunsDamage = {
      t4Target: enemyGunsDamageProps.t4Target,
      t5Front: enemyGunsDamageProps.t5Front,
      t3Target: enemyGunsDamageProps.t3Target,
      t3Barrage: enemyGunsDamageProps.t3Barrage,
      t0Target: enemyGunsDamageProps.t0Target,
      t0Burst: enemyGunsDamageProps.t0Burst,
      t0Rotating: enemyGunsDamageProps.t0Rotating,
      t0Barrage: enemyGunsDamageProps.t0Barrage,
    };

    this.itemsStats = {
      medkit: getItemsStats.medkit,
    }

    this.enemiesStats = [];
    this.enemiesStats.push(this.enemyT0);
    this.enemiesStats.push(this.enemyT3);
    this.enemiesStats.push(this.enemyT4);
    this.enemiesStats.push(this.enemyT5);

    this.slowModifiers = {
      atkSpeedPlayer: 0,
      speedPlayer: 0,
      sProjPlayer: 0,
      atkSpeedGlobal: 0,
      speedGlobal: 0,
    };

    this.isGlobalSlowAll = false;
  }

  applyModifiersToItems(itemsModifiers){
    this.itemsStats.medkit = Math.floor(this.itemsStats.medkit * itemsModifiers.medkit)
  }

  applyModifiersToPlayer(playerModifiers) {
    this.player.health *= playerModifiers.health;
    this.player.maxHealth *= playerModifiers.maxHealth;
    this.applyModifiersToPlayerGunsDamage(playerModifiers.damage);
  }

  applyModifiersToEnemies(enemyModifiers) {
    for (let i = 0; i < this.enemiesStats.length; i++) {
      this.appplyModifiersToEnemy(enemyModifiers, this.enemiesStats[i]);
    }
    this.applyModifiersToEnemyGunsDamage(enemyModifiers.damage);
  }

  applyModifiersToPlayerGunsDamage(playerModifiers) {
    this.playerGunsDamage.laserT1 *= playerModifiers;
    this.playerGunsDamage.laserT2 *= playerModifiers;
    this.playerGunsDamage.laserT3 *= playerModifiers;
    this.playerGunsDamage.default *= playerModifiers;
    this.playerGunsDamage.barrage *= playerModifiers;
    this.playerGunsDamage.rotating *= playerModifiers;
  }

  applyModifiersToEnemyGunsDamage(damageModifier) {
    this.enemyGunsDamage.t4Target *= damageModifier;
    this.enemyGunsDamage.t5Front *= damageModifier;
    this.enemyGunsDamage.t3Target *= damageModifier;
    this.enemyGunsDamage.t3Barrage *= damageModifier;
    this.enemyGunsDamage.t0Target *= damageModifier;
    this.enemyGunsDamage.t0Burst *= damageModifier;
    this.enemyGunsDamage.t0Rotating *= damageModifier;
    this.enemyGunsDamage.t0Barrage *= damageModifier;
  }

  appplyModifiersToEnemy(enemyModifiers, enemyStats) {
    enemyStats.health *= enemyModifiers.health;
    enemyStats.maxHealth *= enemyModifiers.maxHealth;
    enemyStats.scorePoints = Math.floor(
      enemyStats.scorePoints * enemyModifiers.scorePoints
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
    this.decreaseShipSpeed(this.game.playerTeam[0], this.slowModifiers.speedPlayer);

    this.decreaseGunsAtkSpeed(
      this.game.enemyGuns,
      this.slowModifiers.atkSpeedGlobal
    );
    this.decreaseGunsAtkSpeed(
      this.game.playerGuns,
      this.slowModifiers.atkSpeedPlayer
    );

    this.decreaseObjectsSpeed(this.game.playerProjectiles);
    this.decreaseObjectsSpeed(this.game.enemyProjectiles);

    this.decreaseObjectsSpeed(this.game.items);
    this.decreaseObjectsSpeed(this.game.coins);
    this.decreaseObjectsSpeed(this.game.bgElements);
  }

  decreaseEnemiesSpeed(enemies) {
    for (let i = 0; i < enemies.length; i++) {
      this.decreaseShipSpeed(enemies[i], this.slowModifiers.speedGlobal);
    }
  }

  decreaseObjectsSpeed(objects) {
    for (let i = 0; i < objects.length; i++) {
      this.decreaseObjectSpeed(objects[i]);
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
  }

  increaseSpeedOfEverything() {
    this.increaseEnemiesSpeed(this.game.enemies);
    this.increaseShipSpeed(this.game.playerTeam[0], this.slowModifiers.speedPlayer);

    this.increaseGunsAtkSpeed(
      this.game.enemyGuns,
      this.slowModifiers.atkSpeedGlobal
    );
    this.increaseGunsAtkSpeed(
      this.game.playerGuns,
      this.slowModifiers.atkSpeedPlayer
    );

    this.increaseObjectsSpeed(this.game.playerProjectiles);
    this.increaseObjectsSpeed(this.game.enemyProjectiles);

    this.increaseObjectsSpeed(this.game.items);
    this.increaseObjectsSpeed(this.game.coins);
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
      this.increaseObjectSpeed(objects[i]);
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
  }

  decreaseShipSpeed(ship, speed) {
    ship.s /= speed;
    ship.a /= speed;
    ship.vX /= speed;
    ship.vY /= speed;
  }

  increaseShipSpeed(ship, speed) {
    ship.s *= speed;
    ship.a *= speed;
    ship.vX *= speed;
    ship.vY *= speed;
  }

  decreaseGunsAtkSpeed(guns, value) {
    for (let i = 0; i < guns.length; i++) {
      this.decreaseGunAtkSpeed(guns[i], value);
    }
  }

  decreaseGunAtkSpeed(gun, value) {
    //console.log(`DECREASE BEFORE gun.atkSpeed = ${gun.atkSpeed}, rateOfFire = ${gun.rateOfFire}`)
    gun.atkSpeed *= value;
    gun.rateOfFire *= value;
    //console.log(`DECREASE AFTER gun.atkSpeed = ${gun.atkSpeed}, rateOfFire = ${gun.rateOfFire}`)
    //console.log(`------------------`)
  }

  increaseGunsAtkSpeed(guns, value) {
    for (let i = 0; i < guns.length; i++) {
      this.increaseGunAtkSpeed(guns[i], value);
    }
  }

  increaseGunAtkSpeed(gun, value) {
    //console.log(`INCREASE BEFORE gun.atkSpeed = ${gun.atkSpeed}, rateOfFire = ${gun.rateOfFire}`)
    gun.atkSpeed /= value;
    gun.rateOfFire /= value;
    //console.log(`INCREASE AFTER gun.atkSpeed = ${gun.atkSpeed}, rateOfFire = ${gun.rateOfFire}`)
    //console.log(`===============`)
  }
}
