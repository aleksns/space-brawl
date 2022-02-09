import Animation from "./Animation";
import { getShieldOrbFrames } from "./ListOfFrames";



export class ShieldOrbAnimation extends Animation {
  constructor(game) {
    super(game);

    this.images = [];
    this.images = getShieldOrbFrames();

    this.image = new Image();
    this.image.src = this.images[0];

    this.i = 0;
    this.then = 0;
  }


}
