import Animation from "./Animation";
import boss1 from "../images/animations-images/bossShip-images/boss1.png";
import boss2 from "../images/animations-images/bossShip-images/boss2.png";
import boss3 from "../images/animations-images/bossShip-images/boss3.png";
import boss4 from "../images/animations-images/bossShip-images/boss4.png";
import boss5 from "../images/animations-images/bossShip-images/boss5.png";
import boss6 from "../images/animations-images/bossShip-images/boss6.png";
import bossDefeated from "../images/animations-images/bossShip-images/bossDefeated.png";

export class BossShipAnimation extends Animation {
  constructor(game) {
    super(game);

    this.img1 = new Image();
    this.img1.src = boss1;

    this.img2 = new Image();
    this.img2.src = boss2;

    this.img3 = new Image();
    this.img3.src = boss3;

    this.img4 = new Image();
    this.img4.src = boss4;

    this.img5 = new Image();
    this.img5.src = boss5;

    this.img6 = new Image();
    this.img6.src = boss6;

    this.img7 = new Image();
    this.img7.src = bossDefeated;

    this.image = this.img1;
    this.imageDefeated = this.img7;

    this.images = [];
    this.images.push(this.img1);
    this.images.push(this.img2);
    this.images.push(this.img3);
    this.images.push(this.img4);
    this.images.push(this.img5);
    this.images.push(this.img6);
    this.images.push(this.img5);
    this.images.push(this.img4);
    this.images.push(this.img3);
    this.images.push(this.img2);
    this.images.push(this.img1);

    this.i = 0;
    this.then = 0;
    this.framesRefresh = 0.2;
  }

  updateAnimation() {
    if (!this.game.script.isBossSpawned) {
      return;
    }
    this.image = this.images[this.i];
    this.then = this.game.now;
    this.i++;
    if (this.i > this.images.length - 1) {
      this.i = 0;
    }
  }

  resetAnimation() {
    this.i = 0;
    this.image = this.img1;
    this.then = 0;
  }
}
