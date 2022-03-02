import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import tutorial1 from "../images/tutorial1.png";

export default function Tutorial1() {
  return (
    <div>
      <img className = "img-tutorial" src = {tutorial1}></img>

      {/* <video className="video-tutorial" src={vid} controls="controls" autoplay="true" /> */}

      <li className="li-btn li-btn-menu">
        <NavLink to="/">MENU</NavLink>
      </li>

      <li className="li-btn li-btn-tutorial-next">
        <NavLink to="/tutorial2">NEXT</NavLink>
      </li>
    </div>
  );
}
