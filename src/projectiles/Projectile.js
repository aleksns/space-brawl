
export default class Projectile {
  constructor(game, width, height, color, speed) {
    this.game = game;
    this.ctx = game.ctx;

    this.x = 0;
    this.y = 0;
    this.w = width;
    this.h = height;
    this.currentColor = color;

    this.direction = undefined;
    this.isPlayerOwned = undefined;
    this.isTimeToRemove = false;
    this.damage = undefined;

    /* physics related variables: v - velocity, f - friction, s - speed, a - acceleration */
    this.vX = 0;
    this.vY = 0;
    this.f = 0.95;
    this.s = speed;
    this.a = this.s / 10;

    //console.log("Projectile PARENT CONSTRUCTOR| w = " + this.w + " AND h = " + this.h)
  }

  setPlayerOwned() {
    this.isPlayerOwned = true;
    this.direction = "up";
    this.x = Math.floor((this.game.player.x + (this.game.player.w / 2)));
    this.y = Math.floor((this.game.player.y + (this.game.player.h / 2)));
    // this.x = Math.floor((this.game.player.x + (this.game.player.w / 2)));
    // this.y = Math.floor((this.game.player.y + (this.game.player.h / 2)));
  }

  setEnemyOwned(enemy) {
    this.isPlayerOwned = false;
    this.direction = "down";
    this.x = Math.floor((enemy.x + (enemy.w / 2)));
    this.y = Math.floor((enemy.y + (enemy.h / 2)));
  }

  setTypeDefault() {
    if(this.isPlayerOwned == true) {
      this.damage = this.game.stats.playerProjectilesDmg.default;
    }
    else {
        this.damage = this.game.stats.enemyProjectilesDmg.default;;
    }
  }

  applyPhysics() {
    /* apply friction to velocity */
    this.vX *= this.f;
    this.x += this.vX;

    this.vY *= this.f;
    this.y += this.vY;
  }

  checkStatus() {
      // (-50) - possible range of a projectile which has to be considered if firing big rojectiles
      // near the game borders (so that they won't disappear at launch)
      if(this.game.collision.isCollisionWithAnyBorder(this, -50)) {
        this.setToRemove();
      }
  }

  setToRemove() {
    this.isTimeToRemove = true;
  }

  draw() {
      this.game.draw.drawObject(this, this.currentColor, true);
  }

  update() {
    this.game.movement.move(this);
    this.applyPhysics();

    this.checkStatus();
  }
}
