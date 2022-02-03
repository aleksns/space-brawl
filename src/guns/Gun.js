import { GAME_HEIGHT } from "../services/services";



export default class Gun {
  constructor(game, owner) {
    this.game = game;
    this.owner = owner;
    this.isPlayerOwned = this.owner.isPlayer;
    this.target = this.owner.target;

    this.playerFrontGunTarget = {
      y: - 100
    };
    this.enemyFrontGunTarget = {
      y: GAME_HEIGHT + 100
    };
  }

  initialize() {
  //  this.initializeGun();
  }


  update() {}

  fire() {
    for(let i = 0; i < this.barrels.length; i++) {
      
      this.barrels[i].x = this.getGunPosition(i).x;
      this.barrels[i].y = this.getGunPosition(i).y;
      
      this.barrels[i].destinationX = this.getGunDestination(i).destinationX;
      this.barrels[i].destinationY = this.getGunDestination(i).destinationY;

      this.game.init.addProjectile(this, this.barrels[i]);
    }

  }
}
