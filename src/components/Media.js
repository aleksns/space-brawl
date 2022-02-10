import playerShipT1Image from "../images/playerShipT1.png";
import playerShipT2Image from "../images/playerShipT2.png";
import playerShipT3Image from "../images/playerShipT3.png";

import coin0Deg from "../images/animations-images/coin-images/coin0Deg.png";
import coin25Deg from "../images/animations-images/coin-images/coin25Deg.png";
import coin50Deg from "../images/animations-images/coin-images/coin50Deg.png";
import coin65Deg from "../images/animations-images/coin-images/coin65Deg.png";
import coin80Deg from "../images/animations-images/coin-images/coin80Deg.png";
import coin90Deg from "../images/animations-images/coin-images/coin90Deg.png";
import coin100Deg from "../images/animations-images/coin-images/coin100Deg.png";
import coin115Deg from "../images/animations-images/coin-images/coin115Deg.png";
import coin130Deg from "../images/animations-images/coin-images/coin130Deg.png";
import coin155Deg from "../images/animations-images/coin-images/coin155Deg.png";

export default class Media {
  constructor() {
    this.playerShipT1 = new Image();
    this.playerShipT1.src = playerShipT1Image;

    this.playerShipT2 = new Image();
    this.playerShipT2.src = playerShipT2Image;

    this.playerShipT3 = new Image();
    this.playerShipT3.src = playerShipT3Image;
  }
}
