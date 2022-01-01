import React from "react";
import "../App.css";

export default function Canvas(props) {
  const {
    canvasRef,
    canvas2Ref,
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
        style={{ zIndex: "1", width: "80%" }}
        className="canvas canvas-background-main"
      />
            <canvas
        id="animationScreen"
        // onMouseDown={handleMouseDown}
        // onMouseUp={handleMouseUp}
        // onMouseMove={handleMouseMove}
        // onMouseOut={handleMouseOut}
        ref={canvas2Ref}
        // height="180px"
        style={{ zIndex: "2", width: "80%" }}
        className="canvas canvas-background-second"
      />
      </div>
    </>
  );
}
