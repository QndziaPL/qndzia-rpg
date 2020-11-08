import React from "react";
import Character from "../characters/character";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Player = () => {
  const playerData = useSelector((p) => p.player);

  const x = playerData.position.x;
  const y = playerData.position.y;

  return (
    <PlayerCharacter>
      <Character
        position={{ x, y }}
        letter={"P"}
        background={"#00f0f3"}
        playerArrows={"#ff9d08"}
        isPlayer
        tile={"player"}
      />
    </PlayerCharacter>
  );
};

export default Player;

const PlayerCharacter = styled.div`
  position: relative;
`;
