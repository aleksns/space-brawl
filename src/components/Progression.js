import { LevelUP } from "../effects/LevelUP";

export default class Progression {
  constructor(game) {
    this.game = game;
    this.threatLevel = 0;
    this.maxThreatLevel = 2;
    this.threatLevelModifier = 1;

    //this.maxNumOfEnemies = 2;
    this.level = 1;
    this.isMaxThreatLevel = false;
    this.score = 0;
    
    this.expPoints = 0;
    this.maxExpPoints = 100;
    this.playerLevel = 1;

    this.enemyModifiersLevel = {
      damage: 1.5,
      health: 2,
      maxHealth: 2,
      scorePoints: 2,
    };

    this.enemyModifiersWave = {
      damage: 1.08,
      health: 1.08,
      maxHealth: 1.08,
      scorePoints: 1,
    };
  }

  update() {
    if(this.game.isGlobalActionRestricted) {
      return;
    }
    if (this.threatLevel >= this.maxThreatLevel) {
      this.threatLevel = this.maxThreatLevel;
      this.isMaxThreatLevel = true;
    }

    if(this.expPoints >= this.maxExpPoints) {
      this.increasePlayerLevel();
    }
  }

  increaseExp(value) {
    this.expPoints += value;
    if(this.expPoints >= this.maxExpPoints) {
      this.expPoints = this.maxExpPoints;
    }
  }

  increasePlayerLevel() {
    this.playerLevel ++;
    this.expPoints = 0;
    this.maxExpPoints *= 2;

    let newEffect = new LevelUP(this.game);
    this.game.effects.push(newEffect);

    if(this.playerLevel == 5) {
      this.game.player.setTier2();
    }

    if(this.playerLevel == 10) {
      this.game.player.setTier1();
    }
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
    this.game.stats.applyModifiers(this.enemyModifiersLevel);
  }

  applyWaveModifiers() {
    //this.game.stats.applyModifiers(this.enemyModifiersWave);
    //tbd
  }
  
}
