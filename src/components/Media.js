import playerShipT1Image from "../images/playerShipT1.png";
import playerShipT2Image from "../images/playerShipT2.png";
import playerShipT3Image from "../images/playerShipT3.png";

import enemyImageT2 from "../images/enemyT3f0.png";
import enemyImageT4 from "../images/enemyShipT4.png";
import enemyImageT5V1 from "../images/enemyShipT5V1.png";
import enemyImageT5V2 from "../images/enemyShipT5V2.png";


import projectileYellowCone from "../images/projectileYellowCone.png";
import projectileArcRed from "../images/projectileArcRed.png";
import projectileArcPurple from "../images/projectileArcPurple.png";
import projectileArcGreen from "../images/projectileArcGreen.png";
import projectileArcBlue from "../images/projectileArcBlue.png";
import projectileArcYellow from "../images/projectileArcYellow.png";


import projectileLaserPlayer from "../images/projectileLaserPlayer.png";
import shieldOrb from "../images/shieldOrb.png";

export default class Media {
  constructor() {
    /* Ships */
    this.playerShipT1 = new Image();
    this.playerShipT1.src = playerShipT1Image;

    this.playerShipT2 = new Image();
    this.playerShipT2.src = playerShipT2Image;

    this.playerShipT3 = new Image();
    this.playerShipT3.src = playerShipT3Image;

    this.enemyShipT2 = new Image();
    this.enemyShipT2.src = enemyImageT2;

    this.enemyShipT4 = new Image();
    this.enemyShipT4.src = enemyImageT4;

    this.enemyShipT5V1 =  new Image();
    this.enemyShipT5V1.src = enemyImageT5V1;
    
    this.enemyShipT5V2 =  new Image();
    this.enemyShipT5V2.src = enemyImageT5V2;

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

    this.projectileArcYellowImg = new Image();
    this.projectileArcYellowImg.src = projectileArcYellow;

    
    this.projectileLaserImgPlayer = new Image();
    this.projectileLaserImgPlayer.src = projectileLaserPlayer;

    this.shieldOrbImg = new Image();
    this.shieldOrbImg.src = shieldOrb;
    
    console.log(`Constructor > Media`);
  }
}
