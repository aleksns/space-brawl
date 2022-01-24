import {
    GAME_WIDTH,
    GAME_HEIGHT,
    colors
  } from "../services/services";
  
  
  export default class Cutscene {
    constructor(game) {
      this.game = game;
      this.progression = this.game.progression;
      this.opacity = 1.0;
      this.shadowColor = "transparent";
      this.shadowBlur = 0;
      }
  
      setAnimationIsFinished() {
        this.game.setPauseOff();
        this.isAnimationFinished = true;
        this.game.draw.drawUIOnInit();
      }

      pauseTheObjects() {

      }

  }


  