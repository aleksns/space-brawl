import React from "react";
import sealSadImg from "../images/sealSad.png";

export default function MobilePlaceholder(props) {
  const { deviceName } = props;
  const text1 = `Oh no! You are trying to launch "Space Brawl" with ${deviceName} :(`;
  const text2 = `Currently, mobile version is not supported, please use a Desktop (Web) Browser instead`;
  const text3 = `For more info and video examples, please visit ${" "}`;
  const gitUrl = "https://github.com/aleksns/space-brawl";

  // const openInNewTab = () => {
  //   const newWindow = window.open(gitUrl, "_blank", "noopener noreferrer");
  //   if (newWindow) newWindow.opener = null;
  // };

  return (
    <div className="container mobile-placeholder-container">
      <h2>{text1}</h2>
      <h2>{text2}</h2>
      <h2>
        {text3}
        <a
          href={gitUrl}
          className="mobile-placeholder-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github Page
        </a>
      </h2>
      <img className="mobile-placeholder-img" src={sealSadImg} alt="sad seal"></img>
    </div>
  );
}
