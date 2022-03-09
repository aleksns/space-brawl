import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import tutorial1 from "../images/tutorial1.png";

export default function Tutorial1() {
  return (
    <div>
      <img className = "img-tutorial" src = {tutorial1}></img>

      {/* <video className="video-tutorial" src={vid} controls="controls" autoplay="true" /> */}

      <button className="button-blue button-blue-menu">
        <NavLink to="/">MENU</NavLink>
      </button>

      <button className="button-blue button-blue-tutorial-next">
        <NavLink to="/tutorial2">NEXT</NavLink>
      </button>
    </div>
  );
}
