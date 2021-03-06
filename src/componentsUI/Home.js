import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import GithubLinkWithIcon from "./GithubLinkWithIcon";

export default function Home(props) {
  const { startGame, isUiOn, gitLogo } = props;

  return (
    <>
      <h1>COSMIC BRAWL (WIP)</h1>
      <button onClick={startGame} disabled={!isUiOn} className="btn-start">
        START
      </button>
      <button className="button-blue">
        <NavLink to="/tutorial1">TUTORIAL</NavLink>
      </button>
      <GithubLinkWithIcon isUiOn={isUiOn} gitLogo={gitLogo} />
    </>
  );
}
