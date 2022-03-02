import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import tutorial2 from "../images/tutorial2.png";

export default function Tutorial2() {
  return (
    <div>
      <img className = "img-tutorial" src = {tutorial2}></img>

      <li className="li-btn li-btn-menu">
        <NavLink to="/">MENU</NavLink>
      </li>

      <li className="li-btn li-btn-tutorial-next">
        <NavLink to="/tutorial1">PREV</NavLink>
      </li>
    </div>
  );
}
