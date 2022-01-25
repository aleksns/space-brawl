import { GAME_WIDTH, GAME_HEIGHT, colors } from "../services/services";

export default class Cutscene {
  constructor(game) {
    this.game = game;
    //this.progression = this.game.progression;
    this.opacity = 1.0;
    this.shadowColor = "transparent";
    this.shadowBlur = 0;

    this.isInitialized = false;
  }

  initialize() {
    if (!this.isInitialized) {
      this.isInitialized = true;
      this.initializeCutscene();
    }
  }

  setAnimationIsFinished() {
    this.isAnimationFinished = true;
    this.isInitialized = false;
    this.game.script.cutsceneFinished(this.id);
  }

  getCurrentLevel() {
    return this.game.progression.level;
  }

  pauseTheObjects() {}
}
