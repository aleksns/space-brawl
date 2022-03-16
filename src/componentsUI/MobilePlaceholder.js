import React, { useEffect, useState } from "react";
import sealSadImg from "../images/sealSad.png"

export default function MobilePlaceholder(props) {
    const { deviceName } = props;
    const userLang = navigator.language || navigator.userLanguage;
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");

    useEffect(() => {
        function generateText() {
            if(userLang == "ru") {
                setText1(`O нет! Вы пытаетесь запустить игру через ${deviceName} :(`);
                setText2(`На данный момент, мобильная версия не поддерживается, пожалуйста, воспользуйтесь Веб-браузером`); 
            }
            else {
                setText1(`Oh no! You are trying to launch The Game with ${deviceName} :(`);
                setText2(`Currently, mobile version is not supported, please use a Desktop (Web) Browser instead`);
            }
        }

        generateText();
    }, [])
    return (
        <div className="container mobile-placeholder">
        <h2>
          {text1}
        </h2>
        <h2>
         {text2}
        </h2>
        <img className="mobile-placeholder-img" src={sealSadImg}></img>
        </div>
    )
}