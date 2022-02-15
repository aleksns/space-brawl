import "../App.css";

export default class Controls {
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
    this.player = game.player;
    this.canvas5 = game.canvas5;
    this.btns = this.game.skillsBar.skillsBtns;

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

    this.mousePosition = {
      x: 0,
      y: 0,
    };

    this.pauseThen = 0;
    this.canPause = true;

    this.testThen = 0;
    this.canTest = true;

    this.canvas5.current.addEventListener(
      "click",
      (event) => {
        this.mousePosition = this.getMousePosition(event);
        console.log(`THIS.mousePos = ${JSON.stringify(this.mousePosition)}`);

        // this.btns.forEach((btn) => {
        //   switch (btn.id) {
        //     case "slowTime":
        //       this.game.skills.applySlowTimeStatusEffect();
        //       break;
        //     case "shield":
        //       //tbd
        //       break;
        //     case "laser":
        //       //tbd
        //       break;
        //     default:
        //       console.log("Error handling `btns.forEach` in Controls class");
        //       break;
        //   }
        // });

        // if (this.isInside(this.mousePosition, this.game.startBtn)) {
        //     console.log('clicked inside btn');
        //     this.game.init.addEffect(this.game.startBtn, "explosionDefault");
        // }else{
        //     console.log('clicked outside btn');
        // }
      },
      false
    );

    console.log("CONSTRUCTOR > Controls");
  }

  getMousePosition(event) {
    var rect = this.canvas5.current.getBoundingClientRect();
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

  handlePauseTimeBeforeActivation() {
    let timePassed = (this.game.now - this.pauseThen) / 1000;
    if (timePassed >= 0.4) {
      this.canPause = true;
    }
  }

  handleTest() {
    let timePassed = (this.game.now - this.testThen) / 1000;
    if (timePassed >= 1) {
      this.canTest = true;
    }
  }

  update() {
    this.handlePauseTimeBeforeActivation();
    this.handleTest();
    this.handleInput();
  }

  handleInput() {
    // if(!this.game.isControlsOn) {
    //   return;
    // }

    if (this.keys.space == true) {
      this.handleKeySpace();
    }

    if (this.game.isPauseOn || this.game.isGlobalActionRestricted) {
      return;
    }

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

    if (this.keys.key1 == true) {
      this.handleKey1();
    }

    if (this.keys.key2 == true) {
      this.handleKey2();
    }

    if (this.keys.key3 == true) {
      this.handleKey3();
    }

    //having collision check before applyFrictionAndVelocity adds smooth back off effect when reaching borders
    this.game.collision.handleCollisionWithBorders(this.player);
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

    // if (!this.canTest) {
    //   return;
    // }
    // this.testThen = this.game.now;
    // this.canTest = false;
    // this.game.stopAllAction();
  }

  handleKey3() {
    this.game.skills.turnOnLaserSkill();
  }

  handleKeySpace() {
    if (!this.canPause || this.game.isGlobalActionRestricted) {
      return;
    }
    this.pauseThen = this.game.now;
    this.canPause = false;
    this.game.setPause();
  }
}
