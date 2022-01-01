import React, { useEffect, useState } from "react";
import { colors, getHPColor } from "../services/services";

export default function UI(props) {
  const { playerHP, playerDmg, score } = props;
  const [playerHPColor, setPlayerHPColor] = useState(colors.HPColorGreen);

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

  return (
    <>
      <h4 style={{ color: playerHPColor }}>Health: {playerHP}%</h4>
      <h5 style={{ color: colors.scoreColor }}>Player DMG: {playerDmg}</h5>
      <h4 style={{ color: colors.scoreColor }}>Kills: {score}</h4>
    </>
  );
}
