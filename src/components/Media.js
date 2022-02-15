import playerShipT1Image from "../images/playerShipT1.png";
import playerShipT2Image from "../images/playerShipT2.png";
import playerShipT3Image from "../images/playerShipT3.png";

import enemyImageT4 from "../images/enemyShipT4.png";
import enemyImageT5 from "../images/enemyShipT5.png";

import projectilePlayer from "../images/projectilePlayer.png";
import projectileEnemyRed from "../images/projectileEnemyRed.png";
import projectileEnemyPurple from "../images/projectileEnemyPurple.png";
import projectileEnemyGreen from "../images/projectileEnemyGreen.png";

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
    this.projectilePlayerImg = new Image();
    this.projectilePlayerImg.src = projectilePlayer;

    this.projectileRedImg = new Image();
    this.projectileRedImg.src = projectileEnemyRed;

    this.projectilePurpleImg = new Image();
    this.projectilePurpleImg.src = projectileEnemyPurple;
    
    this.projectileGreenImg = new Image();
    this.projectileGreenImg.src = projectileEnemyGreen;

    
    this.projectileLaserImgPlayer = new Image();
    this.projectileLaserImgPlayer.src = projectileLaserPlayer;
  }
}
