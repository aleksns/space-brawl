import "../App.css";

export default class Controls {
  constructor(game) {
    this.keys = {
      keyW: false,
      keyA: false,
      keyS: false,
      keyD: false,
    };

    this.game = game;
    this.player = game.player;
    this.canvas4 = game.canvas4;

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
    }, false);
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
    }, false);

    this.mousePosition = {
      x:0,
      y:0
    };

    this.canvas4.current.addEventListener('click', (event) => {
      this.mousePosition = this.getMousePosition(event);
      console.log(`THIS.mousePos = ${JSON.stringify(this.mousePosition)}`)
  

      this.game.btns.forEach((btn) =>{
        if (this.game.isInside(this.mousePosition, btn)) {
            this.game.init.addEffect(btn, "default");
        }
      });


      // if (this.game.isInside(this.mousePosition, this.game.startBtn)) {
      //     console.log('clicked inside rect');
      //     this.game.init.addEffect(this.game.startBtn, "default");
      // }else{
      //     console.log('clicked outside rect');
      // }   
  }, false);

    console.log("CONSTRUCTOR > Controls");
  }

  getMousePosition(event) {
    var rect = this.canvas4.current.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
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
    //having collision check before applyPhysics adds smooth back off effect when reaching borders
    this.game.collision.handleCollisionWithBorders(this.player);  
    this.game.movement.applyPhysics(this.player);
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
}
