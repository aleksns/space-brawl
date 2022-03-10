import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import ImageLazyLoad from "./ImageLazyLoad";
import tutorial2 from "../images/tutorial2.png";
import tutorial2PlaceHolder from "../images/tutorial2PlaceHolder.png";

export default function Tutorial2() {
  return (
    <div>
      <ImageLazyLoad
        original={tutorial2}
        placeholder={tutorial2PlaceHolder}
      />
      <button className="button-blue button-blue-menu">
        <NavLink to="/">MENU</NavLink>
      </button>

      <button className="button-blue button-blue-tutorial-next">
        <NavLink to="/tutorial1">PREV</NavLink>
      </button>
    </div>
  );
}
