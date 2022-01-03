import { colors, getObjectCenterPosition } from "../services/services";

export default class Effect {
    constructor(game, object, type) {
    this.game = game;

    this.object = object;
    this.type = type;
  }

  // update() {
  //   this.update();
  // }

  explosion() {
    switch (this.type) {
        case "default":
          this.play();
          break;
        default:
        console.log("Error handling `explosion` function in Effects class");
        break;
    }    
  }

}
