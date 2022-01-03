import "../App.css";

export default class Controls {
  constructor(game) {
    this.boardWidth = game.boardWidth;
    this.boardHeight = game.boardHeight;
    this.keys = {
      keyW: false,
      keyA: false,
      keyS: false,
      keyD: false,
    };

    this.game = game;
    this.player = game.player;

    window.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "KeyW":
          this.keys.keyW = true;
          break;
        case "KeyA":
          this.keys.keyA = true;
          break;
        case "KeyS":
          this.keys.keyS = true;
          break;
        case "KeyD":
          this.keys.keyD = true;
          break;
        default:
          console.log("Error handling 'handleKeyDown' function");
          break;
      }
    });
    window.addEventListener("keyup", (event) => {
      switch (event.code) {
        case "KeyW":
          this.keys.keyW = false;
          break;
        case "KeyA":
          this.keys.keyA = false;
          break;
        case "KeyS":
          this.keys.keyS = false;
          break;
        case "KeyD":
          this.keys.keyD = false;
          break;
        default:
          console.log("Error handling 'handleKeyUp' function");
          break;
      }
    });

    console.log("CONSTRUCTOR > Controls");
  }

  handleInput() {
    if (this.keys.keyW == true) {
      this.handleKeyW();
    }
    if (this.keys.keyA == true) {
      this.handleKeyA();
    }
    if (this.keys.keyS == true) {
      this.handleKeyS();
    }
    if (this.keys.keyD == true) {
      this.handleKeyD();
    }
    this.game.movement.applyPhysics(this.player);
  }

  handleKeyW() {
    this.game.movement.moveUp(this.player, this.player.a);
  }

  handleKeyA() {
    this.game.movement.moveLeft(this.player, this.player.a);
  }

  handleKeyS() {
    this.game.movement.moveDown(this.player, this.player.a);
  }

  handleKeyD() {
    this.game.movement.moveRight(this.player, this.player.a);
  }
}
