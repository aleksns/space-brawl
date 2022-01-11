export default class Progression {
  constructor(game) {
    this.game = game;
    this.threatLevel = 0;
    this.maxThreatLevel = 10;
    this.threatLevelModifier = 1;

    this.maxNumOfEnemies = 5;
    this.level = 1;
    this.isMaxThreatLevel = false;

    this.enemyModifiers = {
      damage: 1.5,
      health: 2,
      maxHealth: 2,
      atkSpeed: 1.1,
      atkSpeedCap: 1,
      scorePoints: 2,
    };
    //this.threatLevelMultiplier = 1.5;
  }

  update() {
    if (this.threatLevel >= this.maxThreatLevel) {
      this.threatLevel = this.maxThreatLevel;
      this.isMaxThreatLevel = true;
    }
    //console.log(`THREAT LVL = ${this.threatLevel}`)
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
  }

  applyModifiers() {
    this.game.stats.applyModifiers(this);
  }
}
