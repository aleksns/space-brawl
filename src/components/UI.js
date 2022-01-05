import React, { useEffect, useState } from "react";
import { colors, getHPColor } from "../services/services";

export default function UI(props) {
  const { playerHP, playerDmg, playerAtkSpeed, score } = props;
  const [playerHPColor, setPlayerHPColor] = useState(colors.HPColorGreen);
  const [foo, setFoo] = useState("");          ///hardcoded, remove after

  // function updateHPColor() {
  //   if (playerHP >= 70) {
  //     setPlayerHPColor(HPColorGreen);
  //   } else if (playerHP >= 35 && playerHP < 70) {
  //     setPlayerHPColor(HPColorYellow);
  //   } else if (playerHP < 35) {
  //     setPlayerHPColor(HPColorRed);
  //   }
  // }

  useEffect(() => {
    let updatedHPColor = getHPColor(playerHP);
    setPlayerHPColor(updatedHPColor);
  }, [playerHP]);

  useEffect(() => {         /// hardcoded, remove foo after
    if(playerAtkSpeed == 0.05) {
      setFoo("(max)");
    }
    else{
      setFoo("")
    }
  }, [playerAtkSpeed]);

  function isAtkSpeedCapped() {
    return playerAtkSpeed == 0.05;
  }


  return (
    <>
      <h4 style={{ color: playerHPColor }}>Health: {playerHP}%</h4>
      <h5 style={{ color: colors.scoreColor }}>DMG: {playerDmg}</h5>
      <h5 style={{ color: colors.scoreColor }}>AtkSpeed: {playerAtkSpeed} {foo}</h5> 
      <h4 style={{ color: colors.scoreColor }}>Score: {score}</h4>
    </>
  );
}
