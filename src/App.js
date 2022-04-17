import "./App.css";
import { GAME_WIDTH, GAME_HEIGHT } from "./services/services";
import { useEffect, useRef, useState } from "react";
import Canvas from "./components/Canvas";
import Game from "./components/Game";
import gitLogo from "./images/github-icon.png";
import MainScreen from "./componentsUI/MainScreen";
import MobilePlaceholder from "./componentsUI/MobilePlaceholder";

const lineWidth = 3;
const width = GAME_WIDTH;
const height = GAME_HEIGHT;

// const width = window.innerWidth;
// const height = window.innerHeight;

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

  const canvas6Ref = useRef(null);
  const context6Ref = useRef(null);

  const gameRef = useRef(null);

  const clearCanvas1To5 = () => {
    clearCanvas1();
    clearCanvas2();
    clearCanvas3();
    clearCanvas4();
    clearCanvas5();
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
  const clearCanvas6 = () => {
    context6Ref.current.clearRect(
      0,
      0,
      canvas6Ref.current.width,
      canvas6Ref.current.height
    );
  };

  const [isUiOn, setIsUiOn] = useState(true);
  const [isMobile, setIsMobile] = useState(undefined);
  const [deviceName, setDeviceName] = useState(undefined);

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

    //canvas for projectiles
    const canvas5 = canvas5Ref.current;
    canvas5.width = width;
    canvas5.height = height;
    const context5 = canvas5.getContext("2d");
    context5.lineWidth = lineWidth;
    context5Ref.current = context5;

    //canvas for UI elements that are being rendered only upon level start
    const canvas6 = canvas6Ref.current;
    canvas6.width = width;
    canvas6.height = height;
    const context6 = canvas6.getContext("2d");
    context6.lineWidth = lineWidth;
    context6Ref.current = context6;

    function detectMob() {
      const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
      ];

      function convertString(string) {
        var convertedString = string.replace(/i$/, "");
        convertedString = convertedString.replaceAll("/", "");
        return convertedString;
      }

      return toMatch.some((toMatchItem) => {
        let deviceName = convertString(toMatchItem.toString());
        setDeviceName(deviceName);
        return navigator.userAgent.match(toMatchItem);
      });
    }

    if (detectMob() || !matchMedia("(pointer:fine)").matches || "ontouchstart" in window) {
      setIsMobile(true);
      return;
    }

    const game = new Game(
      canvas6Ref,
      contextRef,
      context2Ref,
      context3Ref,
      context4Ref,
      context5Ref,
      context6Ref,
      clearCanvas1To5,
      clearCanvas6,
      handleGameOver
    );
    gameRef.current = game;

    gameRef.current.isAnimationOn = true;
    requestAnimationFrame(runLoop);
  }, []);

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
        canvas6Ref={canvas6Ref}
      />

      {isMobile ? (
        <MobilePlaceholder deviceName={deviceName} />
      ) : (
        <MainScreen startGame={startGame} isUiOn={isUiOn} gitLogo={gitLogo} />
      )}
    </>
  );
}
