import React from "react";
import styled from "styled-components"


const Character = ({position, letter}) => {
    console.log(position)
    return (<CharacterPosition className={"chuj"}
    left={position.x}
    top={position.y}
    >
        <CharacterModel>{letter}</CharacterModel>
    </CharacterPosition>)
}

const CharacterModel = styled.div`
width: 32px;
height: 32px;
background-color: #000dff;
color: white;
text-align: center;
font-size: 22px;
`

export default Character;

const CharacterPosition = styled.div`
position: absolute;
left: ${props => props.left * 32}px;
top: ${props => props.top * 32}px;
transition-duration: 0.4s;

`