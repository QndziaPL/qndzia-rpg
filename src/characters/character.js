import React from "react";
import styled from "styled-components"
import player_tile from "../assets/characterTiles/player_tile.png"
import enemy from "../assets/characterTiles/enemy.svg"


const Character = ({position, letter, background = "#ffffff", tile="enemy", isPlayer}) => {
    let characterTile;
    switch (tile){
        case "enemy":
            characterTile = enemy;
            break
        case "player":
            characterTile = player_tile;
            break
        default:
            characterTile = enemy;
            break
    }

    return (<CharacterPosition className="characterPosition"
    left={position.x}
    top={position.y}
    >
        <CharacterModel
            background={background}
            isPlayer={isPlayer}

        >
            <CharacterImg src={characterTile}/>
                {isPlayer && letter}

        </CharacterModel>
        {/*{playerArrows && <PlayerArrowBackground background={playerArrows}/>}*/}
    </CharacterPosition>)
}

export default Character;

const CharacterModel = styled.div`
z-index: 50;
position: relative;
width: 32px;
height: 32px;
border-radius: 10px;
//background-color: ${props => props.background};
text-shadow: 0px 0px 5px #000000;
color: #ffffff;
text-align: center;
font-size: 22px;
transform: scale(${props => props.isPlayer && 1.2});
text-transform: capitalize;
`

const CharacterImg = styled.img`
position: absolute;
z-index: -1;
top: 0;
left: 0;

width: 32px;
height: 32px;
`



const CharacterPosition = styled.div`
position: absolute;
left: ${props => props.left * 32}px;
top: ${props => props.top * 32}px;
transition-duration: 0.2s;

`

const PlayerArrowBackground = styled.div`
position: absolute;
z-index: 2;
top: 1px;
left: 2px;
width: 28px;
height: 28px;
transform: rotate(45deg);
background: ${props => props.background};
`