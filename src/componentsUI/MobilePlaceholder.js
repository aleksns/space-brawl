import React, { useState } from "react";
import sealSadImg from "../images/sealSad.png";

export default function MobilePlaceholder(props) {
  const { deviceName } = props;
  const gitUrl = "https://github.com/aleksns/space-brawl";

  const openInNewTab = () => {
    const newWindow = window.open(gitUrl, "_blank", "noopener noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  // const userLang = navigator.language || navigator.userLanguage;
  // const [isRu, setIsRu] = useState(undefined);
  // const [btnText, setBtnText] = useState("");

  const [text1, setText1] = useState(`Oh no! You are trying to launch "Space Brawl" with ${deviceName} :(`);
  const [text2, setText2] = useState(`Currently, mobile version is not supported, please use a Desktop (Web) Browser instead`);

  // useEffect(() => {
  //   setLangOnInit();
  // }, []);

  // useEffect(() => {
  //   handleText();
  // }, [isRu]);

  // function setLangOnInit() {
  //   if (userLang == "ru") {
  //     setIsRu(true);
  //   } else {
  //     setIsRu(false);
  //   }
  // }

  // function handleText() {
  //   if (isRu) {
  //     setText1(`O нет! Вы пытаетесь запустить игру через ${deviceName} :(`);
  //     setText2(
  //       `На данный момент, мобильная версия не поддерживается, пожалуйста, воспользуйтесь Веб-браузером`
  //     );
  //     setBtnText("RU");
  //   } else {
  //     setText1(
  //       `Oh no! You are trying to launch The Game with ${deviceName} :(`
  //     );
  //     setText2(
  //       `Currently, mobile version is not supported, please use a Desktop (Web) Browser instead`
  //     );
  //     setBtnText("ENG");
  //   }
  // }

  // function handleLangToggle() {
  //   setIsRu(!isRu);
  // }

  return (
    <div className="container mobile-placeholder-container">
      <a className="mobile-placeholder-button" onClick={openInNewTab}>Github</a>
      <h2>{text1}</h2>
      <h2>{text2}</h2>
      <h2>For more info and video examples, please visit Github Page</h2>
      <img className="mobile-placeholder-img" src={sealSadImg}></img>
    </div>
  );
}
