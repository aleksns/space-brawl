import { font, GAME_HEIGHT, GAME_WIDTH } from "../services/services";

export default class Controls {
  constructor(game) {
    this.game = game;
    this.player = game.player;
    this.eventListener = this.game.eventListener;

    this.pauseThen = 0;
    this.canPause = true;

    this.testThen = 0;
    this.canTest = true;
    this.i = 0;

    this.pauseProps = {
      text: "PAUSE",
      textX: GAME_HEIGHT / 2,
      textY: GAME_HEIGHT / 2,
      textOpacity: 1.0,
      textColor: "#ffffff",
      font: `100px ${font}`,
    };

    console.log("CONSTRUCTOR > Controls");
  }

  handlePauseTimeBeforeActivation() {
    let timePassed = (this.game.now - this.pauseThen) / 1000;
    if (timePassed >= 0.4) {
      this.canPause = true;
    }
  }

  update() {
    this.handlePauseTimeBeforeActivation();
    this.handleInput();
  }

  handleInput() {
    if (this.eventListener.keys.space == true) {
      this.handleKeySpace();
    }

    if (this.game.isPauseOn || this.game.isGlobalActionRestricted || this.game.gameOver) {
      return;
    }

    if (this.eventListener.keys.keyW == true) {
      this.handleKeyW();
    }
    if (this.eventListener.keys.keyA == true) {
      this.handleKeyA();
    }
    if (this.eventListener.keys.keyS == true) {
      this.handleKeyS();
    }
    if (this.eventListener.keys.keyD == true) {
      this.handleKeyD();
    }

    if (this.eventListener.keys.key1 == true) {
      this.handleKey1();
    }

    if (this.eventListener.keys.key2 == true) {
      this.handleKey2();
    }

    if (this.eventListener.keys.key3 == true) {
      this.handleKey3();
    }

    //having collision check before applyFrictionAndVelocity adds smooth back off effect when reaching borders
    this.game.gameBoard.collision.handleCollisionWithBorders(this.player);
    this.game.movement.applyFrictionAndVelocity(this.player);
  }

  handleKeyW() {
    this.game.movement.moveNorth(this.player);
  }

  handleKeyA() {
    this.game.movement.moveWest(this.player);
  }

  handleKeyS() {
    this.game.movement.moveSouth(this.player);
  }

  handleKeyD() {
    this.game.movement.moveEast(this.player);
  }

  handleKey1() {
    this.game.skills.turnOnSlowTimeSkill();
  }

  handleKey2() {
    this.game.skills.turnOnShieldSkill();
  }

  handleKey3() {
    this.game.skills.turnOnLaserSkill();
  }

  handleKeySpace() {
    if (!this.canPause || this.game.isGlobalActionRestricted) {
      return;
    }
    this.pauseProps.textX = (GAME_WIDTH / 2) - this.game.ctx.current.measureText(this.pauseProps.text).width;

    this.game.draw.drawPauseText(this.pauseProps);
    this.pauseThen = this.game.now;
    this.canPause = false;
    this.game.setPause();
  }

}
