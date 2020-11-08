import React from "react";
import styled from "styled-components";
import player_tile from "../assets/characterTiles/player_tile.png";
import enemy from "../assets/characterTiles/enemy.svg";
import {BORDER_MULTIPLIER, CENTER_VISION_ON_PLAYER_MULTIPLIER, VISION_RADIUS} from "../consts/consts";

const Character = ({
  position,
  letter,
  background = "#ffffff",
  tile = "enemy",
  isPlayer,
    enterBattleAnimation
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
  let visionRadius = VISION_RADIUS;
  if (enterBattleAnimation){
    visionRadius = 0
  }

  return (
    <CharacterPosition
      className="characterPosition"
      left={position.x}
      top={position.y}
    >
      <CharacterModel background={background} isPlayer={isPlayer}>
        <CharacterImg src={characterTile} />
        {/*{isPlayer && letter}*/}
      </CharacterModel>
      {isPlayer && <VisionCircle visionRadius={visionRadius}/>}
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
  transition-duration: 0.2s;
`;


const VisionCircle = styled.div`
box-sizing: content-box;
position: absolute;
border-radius: 50%;
transition-duration: 2s;

top: ${props => (-props.visionRadius) * CENTER_VISION_ON_PLAYER_MULTIPLIER + 16}px;
left: ${props => (-props.visionRadius) * CENTER_VISION_ON_PLAYER_MULTIPLIER + 16}px;
height: ${props => (props.visionRadius) * 2}px;
width: ${props => (props.visionRadius) * 2}px;
border: ${props => (props.visionRadius) * BORDER_MULTIPLIER}px solid #000000;

z-index: 100;
pointer-events: none;






  // position: absolute;
  // z-index: 2;
  // top: 1px;
  // left: 2px;
  // width: 28px;
  // height: 28px;
  // transform: rotate(45deg);
  // background: ${(props) => props.background};
`;
