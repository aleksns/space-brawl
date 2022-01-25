
export default class Level1 {
  constructor(game) {
    this.game = game;
    this.levelTransition = this.game.cutscenes.levelTransition;
    this.bossTransition = this.game.cutscenes.bossTransition;

    this.isStartLevelCutscenePlayed = false;
    this.isBossCutscenePlayed = false;
  }

  initialize() {
    //this.isInit = true;
  }

  setBossCutscenePlayed() {
    this.isBossCutscenePlayed = true;
  }

  setStartLevelCutscenePlayed() {
    this.isStartLevelCutscenePlayed = true;
  }


}
