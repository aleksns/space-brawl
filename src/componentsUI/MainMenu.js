import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import GithubLinkWithIcon from "./GithubLinkWithIcon";

export default function MainMenu(props) {
  const { startGame, isUiOn, gitLogo } = props;

  return (
    <>
      <h1>COSMIC BRAWL (WIP)</h1>
      <button
        onClick={startGame}
        disabled={!isUiOn}
        className="btn-start"
        style={!isUiOn ? { cursor: "default" } : {}}
      >
        START
      </button>
      <button className="button-blue">
        <NavLink to="/tutorial1">TUTORIAL</NavLink>
      </button>
      <GithubLinkWithIcon isUiOn={isUiOn} gitLogo={gitLogo} />
    </>
  );
}
