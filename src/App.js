import { useEffect, useRef, useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import Game from "./components/Game";
import GameOver from "./components/GameOver";
import GithubLinkWithIcon from "./components/GithubLinkWithIcon";
import UI from "./components/UI";
import { GAME_WIDTH, GAME_HEIGHT } from "./services/services";

const keysUpColor = "#ffffff";
const keysDownColor = "#6CAEFF";
const lineWidth = 3;
const width = GAME_WIDTH;
const height = GAME_HEIGHT;
// const width = window.innerWidth;
// const height = window.innerHeight;

//removed variables for canvas
//context.lineJoin = "round";
//context.lineCap = "round";

export default function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const canvas2Ref = useRef(null);
  const context2Ref = useRef(null);

  const canvas3Ref = useRef(null);
  const context3Ref = useRef(null);

  const canvas4Ref = useRef(null);
  const context4Ref = useRef(null);

  const gameRef = useRef(null);

  const clearCanvas1 = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };
  const clearCanvas2 = () => {
    context2Ref.current.clearRect(
      0,
      0,
      canvas2Ref.current.width,
      canvas2Ref.current.height
    );
  };
  const clearCanvas3 = () => {
    context3Ref.current.clearRect(
      0,
      0,
      canvas3Ref.current.width,
      canvas3Ref.current.height
    );
  };
  const clearCanvas4 = () => {
    context4Ref.current.clearRect(
      0,
      0,
      canvas4Ref.current.width,
      canvas4Ref.current.height
    );
  };

  // const clearCanvas = () => {
  //   contextRef.current.clearRect(
  //     0,
  //     0,
  //     canvasRef.current.width,
  //     canvasRef.current.height
  //   );

  //   context2Ref.current.clearRect(
  //     0,
  //     0,
  //     canvas2Ref.current.width,
  //     canvas2Ref.current.height
  //   );

  // context3Ref.current.clearRect(
  //   0,
  //   0,
  //   canvas3Ref.current.width,
  //   canvas3Ref.current.height
  // );

  // context4Ref.current.clearRect(
  //   0,
  //   0,
  //   canvas4Ref.current.width,
  //   canvas4Ref.current.height
  // );
  // };

  useEffect(() => {
    //main game canvas
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    context.lineWidth = lineWidth;
    contextRef.current = context;

    //canvas for animation effects
    const canvas2 = canvas2Ref.current;
    canvas2.width = width;
    canvas2.height = height;
    const context2 = canvas2.getContext("2d");
    context2.lineWidth = lineWidth;
    context2Ref.current = context2;

    //canvas for background elements
    const canvas3 = canvas3Ref.current;
    canvas3.width = width;
    canvas3.height = height;
    const context3 = canvas3.getContext("2d");
    context3.lineWidth = lineWidth;
    context3Ref.current = context3;

    //canvas for UI elements
    const canvas4 = canvas4Ref.current;
    canvas4.width = width;
    canvas4.height = height;
    const context4 = canvas4.getContext("2d");
    context4.lineWidth = lineWidth;
    context4Ref.current = context4;

    const game = new Game(
      contextRef,
      context2Ref,
      context3Ref,
      context4Ref,
      canvas4Ref,
      // clearCanvas1,
      // clearCanvas2,
      // clearCanvas3,
      clearCanvas4
    );
    gameRef.current = game;
  }, []);

  //const game = new Game(contextRef);

  const [isWPressed, setWIsPressed] = useState(false);
  const [isAPressed, setAIsPressed] = useState(false);
  const [isSPressed, setSIsPressed] = useState(false);
  const [isDPressed, setDIsPressed] = useState(false);

  const [playerHP, setPlayerHP] = useState(undefined);
  const [playerDmg, setPlayerDmg] = useState(undefined);
  const [playerAtkSpeed, setPlayerAtkSpeed] = useState(undefined);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isUiOn, setIsUiOn] = useState(true);

  function handleUiKeysPressed() {
    setWIsPressed(gameRef.current.keys.keyW);
    setAIsPressed(gameRef.current.keys.keyA);
    setSIsPressed(gameRef.current.keys.keyS);
    setDIsPressed(gameRef.current.keys.keyD);
  }

  function updateUI() {
    setPlayerHP(gameRef.current.getPlayerHP());
    handleUiKeysPressed();
    setScore(gameRef.current.getScore());
    setPlayerDmg(gameRef.current.getPlayerDmg());
    setPlayerAtkSpeed(gameRef.current.getPlayerAtkSpeed());
  }

  function startIt() {
    setIsGameOver(false);
    setIsUiOn(false);
    gameRef.current.isGameOn = !gameRef.current.isGameOn;
    requestAnimationFrame(runLoop);
  }

  function runLoop(timestamp) {
    if (gameRef.current.isGameOn) {
      // let dT = timestamp - lastTime;
      // lastTime = timestamp;

      clearCanvas1();
      clearCanvas2();
      clearCanvas3();
      updateUI();
      gameRef.current.gameLoop();

      requestAnimationFrame(runLoop);
    }
  }

  return (
    <>
      <Canvas
        canvasRef={canvasRef}
        canvas2Ref={canvas2Ref}
        canvas3Ref={canvas3Ref}
        canvas4Ref={canvas4Ref}
      />
      <div
        className="ui-start-container"
        style={!isUiOn ? { opacity: "0", zIndex: -1 } : {}}
      >
        <h1 className="label-start">COSMIC BRAWL (WIP)</h1>
        <button
          onClick={startIt}
          disabled={!isUiOn}
          className="btn-start"
          style={!isUiOn ? { cursor: "default" } : {}}
        >
          START
        </button>
        <GithubLinkWithIcon />
      </div>

      {/* <input type="range" min="1" max="80" onChange={handleSpeedUp} /> */}

      {/* <div className="test-wasd-container">
        <div className="test-w-container">
          <div
            className="test-wasd"
            style={
              !isWPressed
                ? { backgroundColor: keysUpColor }
                : { backgroundColor: keysDownColor }
            }
          >
            ↑
          </div>
        </div>
        <div className="test-asd-container">
          <div
            className="test-wasd"
            style={
              !isAPressed
                ? { backgroundColor: keysUpColor }
                : { backgroundColor: keysDownColor }
            }
          >
            ←
          </div>
          <div
            className="test-wasd"
            style={
              !isSPressed
                ? { backgroundColor: keysUpColor }
                : { backgroundColor: keysDownColor }
            }
          >
            ↓
          </div>
          <div
            className="test-wasd"
            style={
              !isDPressed
                ? { backgroundColor: keysUpColor }
                : { backgroundColor: keysDownColor }
            }
          >
            →
          </div>
        </div>
      </div> */}
      {/* <h4 style={{color: "#ffffff"}}>Health: {health}</h4> */}

      {/* {isGameOver ? (
        <GameOver />
      ) : (
        <UI
          playerHP={playerHP}
          score={score}
          playerDmg={playerDmg}
          playerAtkSpeed={playerAtkSpeed}
        />
      )} */}
    </>
  );
}
