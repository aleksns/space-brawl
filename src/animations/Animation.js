
export default class Animation {
  constructor(game) {
      this.game = game;

  }

  update() {
    let timePassed = (this.game.now - this.then) / 1000;
    if (timePassed <= this.framesRefresh || this.game.stats.isGlobalSlowAll) {
      return;
    }
    this.updateAnimation();

    // this.image = this.images[this.i];
    // this.then = this.game.now;
    // this.i++;
    // if(this.i > this.images.length-1) {
    //   this.i = 0;
    // }
  }

}
