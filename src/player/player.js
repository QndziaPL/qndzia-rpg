import React, { useEffect } from "react";
import Character from "../characters/character";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Player = ({
  playerPosition,
  refresh,
  enterBattleAnimation,
  currentVision,
}) => {
  // const playerData = useSelector((p) => p.player);
  //
  // const x = playerData.position.x;
  // const y = playerData.position.y;
  console.log(playerPosition);
  const x = playerPosition.x;
  const y = playerPosition.y;
  return (
    <PlayerCharacter>
      <Character
        position={{ x, y }}
        letter={"P"}
        background={"#00f0f3"}
        playerArrows={"#ff9d08"}
        isPlayer
        tile={"player"}
        enterBattleAnimation={enterBattleAnimation}
        currentVision={currentVision}
      />
      <Refresh>{refresh}</Refresh>
    </PlayerCharacter>
  );
};

export default Player;
const Refresh = styled.div`
  position: absolute;
  opacity: 0;
`;
const PlayerCharacter = styled.div`
  position: relative;
`;
