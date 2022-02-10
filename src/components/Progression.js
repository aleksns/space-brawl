import { LevelUP } from "../effects/LevelUP";

export default class Progression {
  constructor(game) {
    this.game = game;
    this.threatLevel = 0;
    this.maxThreatLevel = 54;
    this.threatLevelModifier = 1;

    this.maxNumOfEnemies = 1;
    this.level = 1;
    this.isMaxThreatLevel = false;

    this.score = 0;
    this.coinsPoints = 0;

    this.enemyModifiers = {
      damage: 1.5,
      health: 2,
      maxHealth: 2,
      scorePoints: 3,
    };

    this.isPlayerTier1 = false;
    this.isPlayerTier2 = false;
  }

  update() {
    if (this.threatLevel >= this.maxThreatLevel) {
      this.threatLevel = this.maxThreatLevel;
      this.isMaxThreatLevel = true;
    }

    if(this.score >= 100 && !this.isPlayerTier2) {
      var newEffect = new LevelUP(this.game);
      this.game.effects.push(newEffect);
      this.game.player.setTier2();
      this.isPlayerTier2 = true;
    }

    if(this.score >= 200 && !this.isPlayerTier1) {
      var newEffect = new LevelUP(this.game);
      this.game.effects.push(newEffect);
      this.game.player.setTier1();
      this.isPlayerTier1 = true;
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
    this.level++;
    this.isMaxThreatLevel = false;
    this.applyModifiers();
    this.game.stats.applyModifiers(this);
    this.game.script.reset();
  }

  applyModifiers() {
    this.game.stats.applyModifiers(this);
  }
}
