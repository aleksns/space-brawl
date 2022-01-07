import { getRandomInt, getGunsStats } from "../services/services";

export default class Gun {
  constructor(game, owner) {
    this.game = game;
    this.owner = owner;
    this.atkSpeed = getGunsStats.singleAtkSpeed;
  }



  update() {
  }

}
