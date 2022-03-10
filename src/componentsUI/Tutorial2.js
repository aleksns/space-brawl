import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

export default function Tutorial2(props) {
  const { Tutorial2Img } = props;
  return (
    <div>
      <Tutorial2Img />

      <button className="button-blue button-blue-menu">
        <NavLink to="/">MENU</NavLink>
      </button>

      <button className="button-blue button-blue-tutorial-next">
        <NavLink to="/tutorial1">PREV</NavLink>
      </button>
    </div>
  );
}
