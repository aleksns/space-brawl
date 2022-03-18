import React, { useEffect, useState } from "react";
import sealSadImg from "../images/sealSad.png";

export default function MobilePlaceholder(props) {
  const { deviceName } = props;
  const userLang = navigator.language || navigator.userLanguage;
  const [isRu, setIsRu] = useState(undefined);

  const [btnText, setBtnText] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  useEffect(() => {
    setLangOnInit();
  }, []);

  useEffect(() => {
    handleText();
  }, [isRu]);

  function setLangOnInit() {
    if (userLang == "ru") {
      setIsRu(true);
    } else {
      setIsRu(false);
    }
  }

  function handleText() {
    if (isRu) {
      setText1(`O нет! Вы пытаетесь запустить игру через ${deviceName} :(`);
      setText2(
        `На данный момент, мобильная версия не поддерживается, пожалуйста, воспользуйтесь Веб-браузером`
      );
      setBtnText("RU");
    } else {
      setText1(
        `Oh no! You are trying to launch The Game with ${deviceName} :(`
      );
      setText2(
        `Currently, mobile version is not supported, please use a Desktop (Web) Browser instead`
      );
      setBtnText("ENG");
    }
  }

  function handleLangToggle() {
    setIsRu(!isRu);
  }

  return (
    <div className="container mobile-placeholder">
      <h5>Language:</h5>
      <button className="mobile-placeholder-button" onClick={handleLangToggle}>
        {btnText}
      </button>
      <h2>{text1}</h2>
      <h2>{text2}</h2>
      <img className="mobile-placeholder-img" src={sealSadImg}></img>
    </div>
  );
}
