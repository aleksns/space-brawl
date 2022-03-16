import React from "react";
import { Route, Routes } from "react-router-dom";
import "../App.css";
import Home from "./Home";
import Tutorial1 from "./Tutorial1";
import Tutorial2 from "./Tutorial2";

export default function MainScreen(props) {
  const { startGame, isUiOn, gitLogo } = props;

  return (
    <>
      <div
        className="container container-main"
        style={!isUiOn ? { display: "none" } : {}}
      >
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home startGame={startGame} isUiOn={isUiOn} gitLogo={gitLogo} />
            }
          />
          <Route path="/tutorial1" element={<Tutorial1 />} />
          <Route path="/tutorial2" element={<Tutorial2 />} />
        </Routes>
      </div>
      <div
        className="container-git-label"
        style={isUiOn ? { display: "none" } : {}}
      >
        <img src={gitLogo} className="git-logo-label"></img>
        <h4>Github: Aleksns</h4>
      </div>
    </>
  );
}