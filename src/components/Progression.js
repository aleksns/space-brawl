export default class Progression {
  constructor(game) {
    this.game = game;
    this.threatLevel = 0;
    this.maxThreatLevel = 5;
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
  }

  update() {
    if (this.threatLevel >= this.maxThreatLevel) {
      this.threatLevel = this.maxThreatLevel;
      this.isMaxThreatLevel = true;
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
