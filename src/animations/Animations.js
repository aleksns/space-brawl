
import { CoinAnimation } from "../animations/CoinAnimation";

export default class Animations {
  constructor(game) {
    this.game = game;

    this.coinAnimation = new CoinAnimation(this.game);

    this.list = [];
    this.list.push(this.coinAnimation);
  }

}
