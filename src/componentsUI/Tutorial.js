import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import catImg from "../images/catImg.png";


export default function Tutorial() {
  return (
    <div>
    <img className = "img-tutorial" src = {catImg}></img>

      <li className="li-btn li-btn-menu">
        <NavLink to="/">MENU</NavLink>
      </li>
      </div>
  );
}
