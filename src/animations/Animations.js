
import { CoinAnimation } from "../animations/CoinAnimation";
import { ShieldOrbAnimation } from "./ShieldOrbAnimation";

export default class Animations {
  constructor(game) {
    this.game = game;

    this.coinAnimation = new CoinAnimation(this.game);
    this.shieldOrbAnimation = new ShieldOrbAnimation(this.game);

    this.list = [];
    this.list.push(this.coinAnimation);
    this.list.push(this.shieldOrbAnimation);
  }

}
