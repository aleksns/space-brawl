import React from "react";
import "../App.css";

export default function Canvas(props) {
  const {
    canvasRef,
    canvas2Ref,
    canvas3Ref,
    canvas4Ref
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
          style={{ zIndex: "2", width: "80%" }}
          className="canvas"
        />
        <canvas
          id="effectsScreen"
          ref={canvas2Ref}
          // height="180px"
          style={{ zIndex: "3", width: "80%" }}
          className="canvas"
        />
        <canvas
          id="backgroundScreen"
          ref={canvas3Ref}
          // height="180px"
         style={{ zIndex: "1", width: "80%" }}
          className="canvas"
        />
                <canvas
          id="uiScreen"
          ref={canvas4Ref}
          // height="180px"
         style={{ zIndex: "4", width: "80%" }}
          className="canvas"
        />
      </div>
    </>
  );
}
