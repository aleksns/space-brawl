import Animation from "./Animation";
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

export class CoinAnimation extends Animation {
  constructor(game) {
    super(game);
    this.img1 = new Image();
    this.img1.src = coin0Deg;
    
    this.img2 = new Image();
    this.img2.src = coin25Deg;
   
    this.img3 = new Image();
    this.img3.src = coin50Deg;
  
    this.img4 = new Image();
    this.img4.src = coin65Deg;
   
    this.img5 = new Image();
    this.img5.src = coin80Deg;
  
    this.img6 = new Image();
    this.img6.src = coin90Deg;
  
    this.img7 = new Image();
    this.img7.src = coin100Deg;
 
    this.img8 = new Image();
    this.img8.src = coin115Deg;

    this.img9 = new Image();
    this.img9.src = coin130Deg;

    this.img10 = new Image();
    this.img10.src = coin155Deg;

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
    this.images.push(this.img9);
    this.images.push(this.img10);

    this.i = 0;
    this.then = 0;
    this.framesRefresh = 0.08;
  }

  updateAnimation() {
    this.image = this.images[this.i];
    this.then = this.game.now;
    this.i++;
    if(this.i > this.images.length-1) {
      this.i = 0;
    }
  }

}
