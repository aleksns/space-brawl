import playerShipT1Image from "../images/playerShipT1.png";
import playerShipT2Image from "../images/playerShipT2.png";
import playerShipT3Image from "../images/playerShipT3.png";

import enemyImageT4 from "../images/enemyShipT4.png";
import enemyImageT5 from "../images/enemyShipT5.png";

import projectileYellowCone from "../images/projectileYellowCone.png";
import projectileArcRed from "../images/projectileArcRed.png";
import projectileArcPurple from "../images/projectileArcPurple.png";
import projectileArcGreen from "../images/projectileArcGreen.png";
import projectileArcBlue from "../images/projectileArcBlue.png";

import projectileLaserPlayer from "../images/projectileLaserPlayer.png";

export default class Media {
  constructor() {
    /* Ships */
    this.playerShipT1 = new Image();
    this.playerShipT1.src = playerShipT1Image;

    this.playerShipT2 = new Image();
    this.playerShipT2.src = playerShipT2Image;

    this.playerShipT3 = new Image();
    this.playerShipT3.src = playerShipT3Image;

    this.enemyShipT4 = new Image();
    this.enemyShipT4.src = enemyImageT4;

    this.enemyShipT5 =  new Image();
    this.enemyShipT5.src = enemyImageT5;

    /* Projectiles */
    this.projectileYellowConeImg = new Image();
    this.projectileYellowConeImg.src = projectileYellowCone;

    this.projectileArcRedImg = new Image();
    this.projectileArcRedImg.src = projectileArcRed;

    this.projectileArcPurpleImg = new Image();
    this.projectileArcPurpleImg.src = projectileArcPurple;
    
    this.projectileArcGreenImg = new Image();
    this.projectileArcGreenImg.src = projectileArcGreen;

    this.projectileArcBlueImg = new Image();
    this.projectileArcBlueImg.src = projectileArcBlue;

    
    this.projectileLaserImgPlayer = new Image();
    this.projectileLaserImgPlayer.src = projectileLaserPlayer;
    
    console.log(`Constructor > Media`);
  }
}
