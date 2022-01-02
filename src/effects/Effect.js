import { colors, getObjectCenterPosition } from "../services/services";

export default class Effect {
    constructor(game, object, type) {
    this.game = game;

    this.object = object;
    this.type = type;
  }

  update() {
    if(this.isPlaying) {
      for(let i = 0; i < this.game.effects.length; i++) {
        this.play(this.game.effects[i]);
      }
    }
  }

  explosion(object, type) {
    switch (type) {
        case "default":
          this.explosionDefault(object);
          break;
        default:
        console.log("Error handling `explosion` function in Effects class");
        break;
    }    
  }

}
