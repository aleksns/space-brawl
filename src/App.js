import { useEffect, useRef, useState } from "react";
import "./App.css";
import Background from "./components/Background";
import Canvas from "./components/Canvas";
import Game from "./components/Game";
import GameOver from "./components/GameOver";
import UI from "./components/UI";

const keysUpColor = "#ffffff";
const keysDownColor = "#6CAEFF";

export default function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const canvas2Ref = useRef(null);
  const context2Ref = useRef(null);

  const gameRef = useRef(null);

  // const clearTheCanvas = (contextRefValue, canvasRefValue) => {
  //   contextRefValue.current.clearRect(
  //     0,
  //     0,
  //     canvasRefValue.current.width,
  //     canvasRefValue.current.height
  //   );
  // };
  const clearTheCanvas1 = () => {
    // ctx.current.clearRect(
    //   0,
    //   0,
    //   canvas.current.width,
    //   canvas.current.height
    // );
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  const clearTheCanvas2 = () => {
    context2Ref.current.clearRect(
      0,
      0,
      canvas2Ref.current.width,
      canvas2Ref.current.height
    );
  };

  useEffect(() => {
    //main game canvas
    const canvas = canvasRef.current;
    //canvas.width = gameBoard.width;
    //canvas.height = gameBoard.height;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");

    context.lineCap = "round";
    context.strokeStyle = "#000000";
    context.lineWidth = 12;
    context.lineJoin = "round";
    contextRef.current = context;

    //canvas for animation effects
    const canvas2 = canvas2Ref.current;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

    const context2 = canvas2.getContext("2d");

    context2.lineCap = "round";
    context2.strokeStyle = "#000000";
    context2.lineWidth = 12;
    context2.lineJoin = "round";
    context2Ref.current = context2;


    const game = new Game(contextRef, context2Ref, clearTheCanvas1, clearTheCanvas2);
    gameRef.current = game;
  }, []);

  //const game = new Game(contextRef);

  const [isWPressed, setWIsPressed] = useState(false);
  const [isAPressed, setAIsPressed] = useState(false);
  const [isSPressed, setSIsPressed] = useState(false);
  const [isDPressed, setDIsPressed] = useState(false);

  const [playerHP, setPlayerHP] = useState(undefined);
  const [playerDmg, setPlayerDmg] = useState(undefined);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

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
  }

  function startIt() {
    setIsGameOver(false);

    gameRef.current.isGameOn = !gameRef.current.isGameOn;
    //gameRef.current.gameLoop();
    requestAnimationFrame(runLoop);

    // if (gameRef.current.isPlayerDead()) {
    //   setIsGameOver(true);
    // }
  }

  // function handleSpeedUp(e) {
  //   const { value } = e.target;
  //   gameRef.speedBoost(value);
  // }

  function runLoop(timestamp) {
    if (gameRef.current.isGameOn) {
      // let dT = timestamp - lastTime;
      // lastTime = timestamp;

      //clearTheCanvas();
      updateUI();
      gameRef.current.gameLoop();

      requestAnimationFrame(runLoop);
    }
    //setIsGameOver(true);
  }

  return (
    <>
      <button onClick={startIt}>LAUNCH</button>
      {/* <input type="range" min="1" max="80" onChange={handleSpeedUp} /> */}

      <div className="test-wasd-container">
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
      </div>
      {/* <h4 style={{color: "#ffffff"}}>Health: {health}</h4> */}
      <Canvas canvasRef={canvasRef} canvas2Ref={canvas2Ref}/>

      {isGameOver ? (
        <GameOver />
      ) : (
        <UI playerHP={playerHP} score={score} playerDmg={playerDmg} />
      )}
    </>
  );
}
