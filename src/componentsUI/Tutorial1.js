import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import ImageLazyLoad from "./ImageLazyLoad";
import tutorial1 from "../images/tutorial1.png";
import tutorial1PlaceHolder from "../images/tutorial1PlaceHolder.png";

export default function Tutorial1() {
  return (
    <div>
      <ImageLazyLoad
        original={tutorial1}
        placeholder={tutorial1PlaceHolder}
      />
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
