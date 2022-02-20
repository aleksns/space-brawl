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

    this.enemyModifiers = {
      damage: 1.5,
      health: 2,
      maxHealth: 2,
      scorePoints: 2,
    };

    this.isPlayerTier1 = false;
    this.isPlayerTier2 = false;
  }

  update() {
    if (this.threatLevel >= this.maxThreatLevel) {
      this.threatLevel = this.maxThreatLevel;
      this.isMaxThreatLevel = true;
    }

  }

  increaseExp(value) {
    this.expPoints += value;

    if(this.expPoints >= this.maxExpPoints && !this.isPlayerTier2) {
      var newEffect = new LevelUP(this.game);
      this.game.effects.push(newEffect);
      this.game.player.setTier2();
      this.isPlayerTier2 = true;
      this.expPoints = 0;
      this.maxExpPoints *= 2;
      
      this.playerLevel++;
    }

    if(this.expPoints >= this.maxExpPoints && (!this.isPlayerTier1 && this.isPlayerTier2)) {
      var newEffect = new LevelUP(this.game);
      this.game.effects.push(newEffect);
      this.game.player.setTier1();
      this.isPlayerTier1 = true;
      this.expPoints = 0;
      this.maxExpPoints *= 2;

      this.playerLevel++;
    }
    if(this.expPoints >= this.maxExpPoints && this.isPlayerTier1) {
      var newEffect = new LevelUP(this.game);
      this.game.effects.push(newEffect);
      // this.game.player.setTier1();
      // this.isPlayerTier1 = true;
      this.expPoints = 0;
      this.maxExpPoints *= 2;

      this.playerLevel++;
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
    this.applyModifiers();
    this.game.script.reset();
  }

  applyModifiers() {
    //this.maxExpPoints *= 2;
    this.game.stats.applyModifiers(this);
  }
  
}
