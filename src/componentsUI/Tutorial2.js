import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import tutorial2 from "../images/tutorial2.png";

export default function Tutorial2() {
  return (
    <div>
      <img className = "img-tutorial" src = {tutorial2}></img>

      <button className="button-blue button-blue-menu">
        <NavLink to="/">MENU</NavLink>
      </button>

      <button className="button-blue button-blue-tutorial-next">
        <NavLink to="/tutorial1">PREV</NavLink>
      </button>
    </div>
  );
}
