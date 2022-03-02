import Animation from "./Animation";

import enemyT2f1 from "../images/animations-images/enemyT2-images/enemyT2f1.png";
import enemyT2f2 from "../images/animations-images/enemyT2-images/enemyT2f2.png";
import enemyT2f3 from "../images/animations-images/enemyT2-images/enemyT2f3.png";
import enemyT2f4 from "../images/animations-images/enemyT2-images/enemyT2f4.png";
import enemyT2f5 from "../images/animations-images/enemyT2-images/enemyT2f5.png";
import enemyT2f6 from "../images/animations-images/enemyT2-images/enemyT2f6.png";
import enemyT2f7 from "../images/animations-images/enemyT2-images/enemyT2f7.png";
import enemyT2f8 from "../images/animations-images/enemyT2-images/enemyT2f8.png";

export class EnemyT2ShipAnimation extends Animation {
  constructor(game) {
    super(game);

    this.img1 = new Image();
    this.img1.src = enemyT2f1;

    this.img2 = new Image();
    this.img2.src = enemyT2f2;

    this.img3 = new Image();
    this.img3.src = enemyT2f3;

    this.img4 = new Image();
    this.img4.src = enemyT2f4;

    this.img5 = new Image();
    this.img5.src = enemyT2f5;

    this.img6 = new Image();
    this.img6.src = enemyT2f6;

    this.img7 = new Image();
    this.img7.src = enemyT2f7;

    this.img8 = new Image();
    this.img8.src = enemyT2f8;

    this.image = this.img1;

    this.images = [];
    this.images.push(this.img1);
    this.images.push(this.img2);
    this.images.push(this.img3);
    this.images.push(this.img4);
    this.images.push(this.img5);
    this.images.push(this.img6);
    this.images.push(this.img7);
    this.images.push(this.img8);
    this.images.push(this.img7);
    this.images.push(this.img6);
    this.images.push(this.img5);
    this.images.push(this.img4);
    this.images.push(this.img3);
    this.images.push(this.img2);
    this.images.push(this.img1);

    this.i = 0;
    this.then = 0;
    this.framesRefresh = 0.15;
  }

  updateAnimation() {
    this.image = this.images[this.i];
    this.then = this.game.now;
    this.i++;
    if (this.i > this.images.length - 1) {
      this.i = 0;
    }
  }

}
