
export default class EventListener {
  constructor(game) {
    this.keys = {
      keyW: false,
      keyA: false,
      keyS: false,
      keyD: false,
      key1: false,
      key2: false,
      key3: false,
      space: false,
    };

    this.game = game;
    this.canvas6 = game.canvas6;

    this.mousePosition = {
        x: 0,
        y: 0,
      };

      
    this.testObject = {
      x: 650,
      y: 550,
      w: 50,
      h: 50
    }

    this.testCoin = {
      id: "coin",
      value: 15,
    };

    window.addEventListener(
      "keydown",
      (event) => {
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

          case "Digit1":
            this.keys.key1 = true;
            break;
          case "Digit2":
            this.keys.key2 = true;
            break;
          case "Digit3":
            this.keys.key3 = true;
            break;

          case "Space":
            this.keys.space = true;
            break;

          default:
            console.log("Error handling 'handleKeyDown' function");
            break;
        }
      },
      false
    );

    window.addEventListener(
      "keyup",
      (event) => {
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

          case "Digit1":
            this.keys.key1 = false;
            break;
          case "Digit2":
            this.keys.key2 = false;
            break;
          case "Digit3":
            this.keys.key3 = false;
            break;

          case "Space":
            this.keys.space = false;
            break;
          default:
            console.log("Error handling 'handleKeyUp' function");
            break;
        }
      },
      false
    );


    // this.canvas6.current.addEventListener(
    //   "click",
    //   (event) => {
    //     this.mousePosition = this.getMousePosition(event);
    //     console.log(`mousePos = ${JSON.stringify(this.mousePosition)}`)
    //     //this.test();
    //   },
    //   false
    // );

    console.log("CONSTRUCTOR > Controls");
  }

  test() {
    //this.game.init.addItemOnDrop(this.testCoin, this.testObject);
    //this.game.progression.playerLevel++;
    //this.game.gameBoard.increaseObjectScale(this.game.player);
   }

  getMousePosition(event) {
    var rect = this.canvas6.current.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  isInside(position, rect) {
    return (
      position.x > rect.x &&
      position.x < rect.x + rect.w &&
      position.y < rect.y + rect.h &&
      position.y > rect.y
    );
  }

  
}
