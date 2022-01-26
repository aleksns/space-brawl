
export default class Level1 {
  constructor(game) {
    this.game = game;
    this.levelTransition = this.game.cutscenes.levelTransition;
    this.bossTransition = this.game.cutscenes.bossTransition;
    this.bossCutscene = this.game.cutscenes.bossCutscene;

    this.isStartLevelCutscenePlayed = false;
  }

  initialize() {
    //this.isInit = true;
  }


  setStartLevelCutscenePlayed() {
    this.isStartLevelCutscenePlayed = true;
  }


}
