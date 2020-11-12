import React from "react";
import styled from "styled-components";
import player_tile from "../assets/characterTiles/player_tile.png";
import enemy from "../assets/characterTiles/enemy.svg";
import {
  BORDER_MULTIPLIER,
  CENTER_VISION_ON_PLAYER_MULTIPLIER,
  VISION_RADIUS,
} from "../consts/consts";

const Character = ({
  position,
  letter,
  background = "#ffffff",
  tile = "enemy",
  isPlayer,
  fullVision,
  enterBattleAnimation,
  currentVision,
}) => {
  let characterTile;
  switch (tile) {
    case "enemy":
      characterTile = enemy;
      break;
    case "player":
      characterTile = player_tile;
      break;
    default:
      characterTile = enemy;
      break;
  }

  if (enterBattleAnimation) {
    currentVision = 0;
  }

  return (
    <CharacterPosition
      className="characterPosition"
      left={position.x}
      top={position.y}
      isPlayer={isPlayer}
    >
      <CharacterModel background={background} isPlayer={isPlayer}>
        <CharacterImg src={characterTile} />
        {/*{isPlayer && letter}*/}
      </CharacterModel>
      {isPlayer && !fullVision && <VisionCircle visionRadius={currentVision} />}
    </CharacterPosition>
  );
};

export default Character;

const CharacterModel = styled.div`
  z-index: 50;
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  //background-color: ${(props) => props.background};
  text-shadow: 0px 0px 5px #000000;
  color: #ffffff;
  text-align: center;
  font-size: 22px;
  transform: scale(${(props) => props.isPlayer && 1.2});
  text-transform: capitalize;
`;

const CharacterImg = styled.img`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;
`;

const CharacterPosition = styled.div`
  position: absolute;
  left: ${(props) => props.left * 32}px;
  top: ${(props) => props.top * 32}px;
  transition-duration: ${(props) => (props.isPlayer ? "0.2s" : 0)};
`;

const VisionCircle = styled.div`
  box-sizing: content-box;
  position: absolute;
  border-radius: 50%;
  transition-duration: 2s;
  top: ${(props) =>
    -props.visionRadius * CENTER_VISION_ON_PLAYER_MULTIPLIER + 16}px;
  left: ${(props) =>
    -props.visionRadius * CENTER_VISION_ON_PLAYER_MULTIPLIER + 16}px;
  height: ${(props) => props.visionRadius * 2}px;
  width: ${(props) => props.visionRadius * 2}px;
  border: ${(props) => props.visionRadius * BORDER_MULTIPLIER}px solid #000000;
  z-index: 100;
  pointer-events: none;
`;
