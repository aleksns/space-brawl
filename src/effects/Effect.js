
export default class Effect {
    constructor(game) {
    this.game = game;
  }

  update() {
    this.updateEffect();
  } 

  draw(ctx) {
    this.drawEffect(ctx);
  }

}
