import React from "react";
import styled from "styled-components"


const Character = ({position, letter, background = "#ffffff", playerArrows}) => {

    return (<CharacterPosition className="characterPosition"
    left={position.x}
    top={position.y}
    >
        <CharacterModel background={background}>
            {letter}
        </CharacterModel>
        {playerArrows && <PlayerArrowBackground background={playerArrows}/>}
    </CharacterPosition>)
}

export default Character;

const CharacterModel = styled.div`
z-index: 50;
position: relative;
width: 32px;
height: 32px;
background-color: ${props => props.background};
color: #000000;
text-align: center;
font-size: 22px;
text-transform: capitalize;
`



const CharacterPosition = styled.div`
position: absolute;
left: ${props => props.left * 32}px;
top: ${props => props.top * 32}px;
transition-duration: 0.2s;

`

const PlayerArrowBackground = styled.div`
position: absolute;
top: 0;
left: 0;
width: 32px;
height: 32px;
transform: rotate(45deg);
background: ${props => props.background};
`