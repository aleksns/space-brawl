import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

export default function Tutorial1(props) {
  const { Tutorial1Img } = props;
  return (
    <div>
      <Tutorial1Img />
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
