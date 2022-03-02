
import { CoinAnimation } from "../animations/CoinAnimation";
import { BossShipAnimation } from "./BossShipAnimation";
import { EnemyT2ShipAnimation } from "./EnemyT2ShipAnimation";

export default class Animations {
  constructor(game) {
    this.game = game;

    this.coinAnimation = new CoinAnimation(this.game);
    this.bossShipAnimation = new BossShipAnimation(this.game);
    this.enemyT2ShipAnimation = new EnemyT2ShipAnimation(this.game);

    this.list = [];
    this.list.push(this.coinAnimation);
    this.list.push(this.bossShipAnimation);
    this.list.push(this.enemyT2ShipAnimation);
  }

}
