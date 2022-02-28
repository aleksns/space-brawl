import { useEffect, useRef, useState } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import Canvas from "./components/Canvas";
import Game from "./components/Game";
import Tutorial from "./componentsUI/Tutorial";
import MainMenu from "./componentsUI/MainMenu";
import { GAME_WIDTH, GAME_HEIGHT } from "./services/services";
import gitLogo from "./images/github-icon.png";

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

  const canvas5Ref = useRef(null);
  const context5Ref = useRef(null);

  const gameRef = useRef(null);

  const clearCanvas1To4 = () => {
    clearCanvas1();
    clearCanvas2();
    clearCanvas3();
    clearCanvas4();
  };

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
  const clearCanvas5 = () => {
    context5Ref.current.clearRect(
      0,
      0,
      canvas5Ref.current.width,
      canvas5Ref.current.height
    );
  };

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

    //canvas for UI elements that are being rendered onpy upon a level start
    const canvas5 = canvas5Ref.current;
    canvas5.width = width;
    canvas5.height = height;
    const context5 = canvas5.getContext("2d");
    context5.lineWidth = lineWidth;
    context5Ref.current = context5;

    const game = new Game(
      canvas5Ref,
      contextRef,
      context2Ref,
      context3Ref,
      context4Ref,
      context5Ref,
      clearCanvas1To4,
      clearCanvas5,
      handleGameOver
    );
    gameRef.current = game;

    gameRef.current.isAnimationOn = true;
    requestAnimationFrame(runLoop);
  }, []);

  const [isUiOn, setIsUiOn] = useState(true);

  function startGame() {
    setIsUiOn(false);


    gameRef.current.initialize();
    gameRef.current.isAnimationOn = true;
    gameRef.current.isGameOn = true;
  }

  function runLoop() {
    if (gameRef.current.isAnimationOn) {
      gameRef.current.gameLoop();

      requestAnimationFrame(runLoop);
    }
  }

  function handleGameOver() {
    setIsUiOn(true);
  }

  return (
    <>
      <Canvas
        canvasRef={canvasRef}
        canvas2Ref={canvas2Ref}
        canvas3Ref={canvas3Ref}
        canvas4Ref={canvas4Ref}
        canvas5Ref={canvas5Ref}
      />

      <div
        className="container container-main"
        style={!isUiOn ? { opacity: "0", zIndex: -1 } : {}}
      >
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={<MainMenu startGame={startGame} isUiOn={isUiOn} gitLogo={gitLogo}/>}
            />
            <Route
              exact
              path="/tutorial"
              element={<Tutorial/>}
            />
          </Routes>
        </BrowserRouter>
      </div>
      <div
        className="container-git-label"
        style={isUiOn ? { opacity: "0" } : {}}
      >
        <img src={gitLogo} className="git-logo-label"></img>
        <h4>Github: Aleksns</h4>
      </div>
    </>
  );
}
