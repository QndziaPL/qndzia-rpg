import React from "react";
import Character from "../characters/character";
import styled from "styled-components";

const Player = ({
  playerPosition,
  refresh,
  enterBattleAnimation,
  currentVision,
  fullVision,
}) => {
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
        fullVision={fullVision}
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
