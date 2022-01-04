export default class StatusEffects {
  constructor(game) {
    this.game = game;
  }

  restoreHealth(amount) {
    this.game.player.health += amount;
    if(this.game.player.health > 100) {
      this.game.player.health = 100;
    }
  }

  increaseAtkSpeed(amount) {
    this.game.stats.player.atkSpeed -= amount;
    if(this.game.stats.player.atkSpeed > this.game.stats.player.atkSpeedCap) { 
      this.game.stats.player.atkSpeed = this.game.stats.player.atkSpeedCap;
    }
  }
}
