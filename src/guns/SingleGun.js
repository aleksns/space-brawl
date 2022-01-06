import Gun from "./Gun";
import { colors } from "../services/services";

export class SingleGUn extends Gun {
  constructor(game) {
    super(game);
    this.damage = 10;   ///tbd bettter data getters 
  }


}
