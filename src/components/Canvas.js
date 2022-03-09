import React from "react";
import "../App.css";

export default function Canvas(props) {
  const {
    canvasRef,
    canvas2Ref,
    canvas3Ref,
    canvas4Ref,
    canvas5Ref,
    canvas6Ref
    // handleMouseDown,
    // handleMouseUp,
    // handleMouseMove,
    // handleMouseOut
  } = props;

  return (
    <>
      <div className="container-canvas">
        <canvas
          id="gameScreen"
          // onMouseDown={handleMouseDown}
          // onMouseUp={handleMouseUp}
          // onMouseMove={handleMouseMove}
          // onMouseOut={handleMouseOut}
          ref={canvasRef}
          // height="180px"
          style={{ zIndex: "2" }}
          className="canvas"
        />
        <canvas
          id="effectsScreen"
          ref={canvas2Ref}
          // height="180px"
          style={{ zIndex: "3" }}
          className="canvas"
        />
        <canvas
          id="backgroundScreen"
          ref={canvas3Ref}
          // height="180px"
          style={{ zIndex: "1" }}
          className="canvas"
        />
        <canvas
          id="uiScreen"
          ref={canvas4Ref}
          // height="180px"
          style={{ zIndex: "4" }}
          className="canvas"
        />
          <canvas
          id="projectilesScreen"
          ref={canvas5Ref}
          // height="180px"
          style={{ zIndex: "1" }}
          className="canvas"
        />
           <canvas
          id="uiScreen2"
          ref={canvas6Ref}
          // height="180px"
          style={{ zIndex: "5" }}
          className="canvas"
        />
      </div>
    </>
  );
}
