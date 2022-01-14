import Ship from "./Ship";
import { getPlayerT0Dimension, getPlayerDefaultStats } from "../services/services";
import playerImage from "../images/playerShip.png";

import { SingleFront } from "../guns/SingleFront";
import { DoubleFront } from "../guns/DoubleFront";
import { TripleFront } from "../guns/TripleFront";

export class Player extends Ship {
  constructor(game) { 
    super(game);
    this.game = game;
    this.stats = this.game.stats;
    this.x = 300;
    this.y = 600;
    this.w = getPlayerT0Dimension().w;
    this.h = getPlayerT0Dimension().h;
    this.health = this.stats.player.health;
    this.maxHealth = this.stats.player.maxHealth;
    this.isPlayer = true;
    this.offStepX = 0;
    this.offStepX = 0;
    
    //this.gun = "default";
    /* physics related variables: v - velocity, f - friction, s - speed, a - acceleration */
    this.s = 25;
    this.a = this.s / 10;
    this.now = 0;
    this.damage = this.stats.player.damage;
    this.atkSpeed = this.stats.player.atkSpeed;
    this.atkSpeedCap = this.stats.player.atkSpeedCap;
    this.target = {
      y: 0,
    };
    this.SingleFront = new SingleFront(this.game, this);
    this.DoubleFront = new DoubleFront(this.game, this);
    this.TripleFront = new TripleFront(this.game, this);
    this.gun = this.TripleFront;
    this.projectileSpeedModifier = 0;


    this.image = new Image();
    this.image.src = playerImage;

    console.log("CONSTRUCTOR > Player");
  }

  fireGun() {
    let timePassed = (this.game.then - this.now) / 1000;
    if (timePassed <= this.getAtkSpeed()) {
      return;
    }

    this.now = Date.now();
    this.gun.fire();
    
  }


  getAtkSpeed() {
    return this.atkSpeed - this.gun.atkSpeed;
  }

  setDefaultAtkSpeed() {
    this.atkSpeed = getPlayerDefaultStats.atkSpeed;
  }

  playHitEffect(projectileType) {
    this.game.init.addEffect(this, projectileType);
  }

  onDeath() {
    console.log(`Player has died. DON'T BE SAD!`);
  }
}
