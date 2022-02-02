import Ship from "./Ship";
import {
  getPlayerT0Dimension,
  getPlayerDefaultStats,
  GAME_WIDTH,
  GAME_HEIGHT
} from "../services/services";
import playerImage from "../images/playerShip.png";

import { SingleFront } from "../guns/SingleFront";
import { DoubleFront } from "../guns/DoubleFront";
import { TripleFront } from "../guns/TripleFront";

const defaultPosition = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT - getPlayerT0Dimension().h,
}

export class Player extends Ship {
  constructor(game) {
    super(game);
    this.game = game;
    this.stats = this.game.stats;
    this.x = defaultPosition.x;
    this.y = defaultPosition.y;
    this.w = getPlayerT0Dimension().w;
    this.h = getPlayerT0Dimension().h;
    this.health = this.stats.player.health;
    this.maxHealth = this.stats.player.maxHealth;
    this.isPlayer = true;
    this.offStepX = 0;
    this.offStepX = 0;

    /* s - speed, a - acceleration */
    this.s = this.stats.player.s;
    this.a = this.stats.player.a;
    this.now = 0;
    this.damage = this.stats.player.damage;
    this.atkSpeed = this.stats.player.atkSpeed;
    this.atkSpeedCap = this.stats.player.atkSpeedCap;
    this.target = {
      y: 440,
    };
    this.singleFront = new SingleFront(this.game, this);
    this.doubleFront = new DoubleFront(this.game, this);
    this.tripleFront = new TripleFront(this.game, this);
    this.gun = this.tripleFront;
    this.projectileSpeedModifier = this.stats.player.projectileSpeedModifier;

    this.image = new Image();
    this.image.src = playerImage;

    console.log("CONSTRUCTOR > Player");
  }

  initializeShip() {
    //tbd
  }

  fireGun() {
    this.gun.fire();
  }

  updateSpeedStats() {
    this.atkSpeed = this.stats.player.atkSpeed;
    this.atkSpeedCap = this.stats.player.atkSpeedCap;
    this.s = this.stats.player.s;
    this.a = this.stats.player.a;
    this.projectileSpeedModifier = this.stats.player.projectileSpeedModifier;
  }

  getAtkSpeed() {
    return this.atkSpeed - this.gun.atkSpeed;
  }

  setDefaultAtkSpeed() {
    this.atkSpeed = getPlayerDefaultStats.atkSpeed;
  }
  
  setDefaultPosition() {
    this.x = defaultPosition.x;
    this.y = defaultPosition.y;
  }

  playHitEffect(projectileType) {
    this.game.init.addEffect(this, projectileType);
  }

  onDeath() {
    console.log(`Player has died. DON'T BE SAD!`);
  }
}
