import { BossTransition } from "./BossTransition";
import { BossDeath } from "./BossDeath";
import { LevelTransition } from "./LevelTransition";
import { BossCutscene } from "./BossCutscene";

export default class Cutscenes {
  constructor(game) {
    this.game = game;

    this.levelTransition = new LevelTransition(this.game);
    this.bossTransition = new BossTransition(this.game);
    this.bossCutscene = new BossCutscene(this.game);
    this.bossDeath = new BossDeath(this.game);

    this.list = [];
    this.list.push(this.levelTransition);
    this.list.push(this.bossTransition);
    this.list.push(this.bossCutscene);
    this.list.push(this.bossDeath);
  }

  isCutscenesNotFinished() {
    for (let i = 0; i < this.list.length; i++) {
      if (!this.list[i].isAnimationFinished) {
        return true;
      }
    }
  }

  getCutsceneToDraw() {
    var cutsceneToDraw;
    for (let i = 0; i < this.list.length; i++) {
      if (!this.list[i].isAnimationFinished) {
        cutsceneToDraw = this.list[i];
      }
    }
    return cutsceneToDraw;
  }
}
