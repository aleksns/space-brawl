import { getTripleGunPosition, getGunsStats } from "../services/services";

export default class Gun {
  constructor(game, owner) {
    this.game = game;
    this.owner = owner;
    this.isPlayerOwned = this.owner.isPlayer;
    this.atkSpeed = getGunsStats.singleAtkSpeed;
    this.target = this.owner.target;
  }


  update() {}

  fire() {
    for(let i = 0; i < this.barrels.length; i++) {
      
      this.barrels[i].p1X = this.getGunPosition(i).p1X;
      this.barrels[i].p1Y = this.getGunPosition(i).p1Y;
          
      this.barrels[i].p2X = this.barrels[i].p1X;
      this.barrels[i].p2Y = this.target.y;
      this.game.init.addProjectile(this, this.barrels[i]);
    }

  }
}
