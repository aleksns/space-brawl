import { LevelUP } from "../effects/LevelUP";

export default class Progression {
  constructor(game) {
    this.game = game;
    this.threatLevel = 0;
    this.maxThreatLevel = 25;
    this.threatLevelModifier = 1;

    //this.maxNumOfEnemies = 2;
    this.level = 1;
    this.isMaxThreatLevel = false;
    this.score = 0;

    this.expPoints = 0;
    this.maxExpPoints = 100;
    this.playerLevel = 1;

    this.itemsModifiersLevelUp = {
      medkit: 1.08,
    }

    this.itemsModifiersTierUp = {
      medkit: 2.6,
    }

    this.playerLevelModifiers = {
      damage: 1.06,
      health: 1.06,
      maxHealth: 1.06,
    };

    this.playerTierModifiers = {
      damage: 2,
      health: 2.5,
      maxHealth: 2.5,
    };

    this.enemyModifiersLevel = {
      damage: 1.5,
      health: 2,
      maxHealth: 2,
      scorePoints: 2,
    };

    this.enemyModifiersWave = {
      damage: 1.1,
      health: 1.1,
      maxHealth: 1.1,
      scorePoints: 1,
    };
  }

  update() {
    if (this.game.isGlobalActionRestricted) {
      return;
    }
    if (this.threatLevel >= this.maxThreatLevel) {
      this.threatLevel = this.maxThreatLevel;
      this.isMaxThreatLevel = true;
    }

    if (this.expPoints >= this.maxExpPoints) {
      this.increasePlayerLevel();
    }
  }

  increaseExp(value, isBoss) {
    this.expPoints += value;
    if (this.expPoints >= this.maxExpPoints) {
      this.expPoints = this.maxExpPoints;
    }

    let text = `+${value} EXP`;
    if (!isBoss) {
      this.game.init.addFloatingTextEffect("exp", text);
    } else {
      this.game.init.addFloatingTextEffect("expBoss", text);
    }
  }

  increasePlayerLevel() {
    this.playerLevel++;
    this.expPoints = 0;
    this.maxExpPoints *= 2.5;
    this.applyPlayerModifiers(this.playerLevelModifiers);
    this.applyModifiersToItems(this.itemsModifiersLevelUp);

    let newEffect = new LevelUP(this.game);
    this.game.effects.push(newEffect);

    if (this.playerLevel == 5) {
      this.game.playerTeam[0].setTier2();
      this.applyPlayerModifiers(this.playerTierModifiers);
      this.applyModifiersToItems(this.itemsModifiersTierUp);
    }

    if (this.playerLevel == 10) {
      this.game.playerTeam[0].setTier1();
      this.applyPlayerModifiers(this.playerTierModifiers);
      this.applyModifiersToItems(this.itemsModifiersTierUp);
    }

    this.game.playerTeam[0].updateStats();
  }

  increaseThreatLevel() {
    this.threatLevel += this.threatLevelModifier;
  }

  resetThreatLevel() {
    this.threatLevel = 0;
  }

  advanceLevel() {
    this.resetThreatLevel();
    this.isMaxThreatLevel = false;
    this.level++;
    this.applyLevelModifiers();
    this.game.script.reset();
  }

  applyLevelModifiers() {
    this.game.stats.applyModifiersToEnemies(this.enemyModifiersLevel);
  }

  applyWaveModifiers() {
    this.game.stats.applyModifiersToEnemies(this.enemyModifiersWave);
  }

  applyPlayerModifiers(modifiers) {
    this.game.stats.applyModifiersToPlayer(modifiers);
  }

  applyModifiersToItems(modifiers) {
    this.game.stats.applyModifiersToItems(modifiers);
  }
}
