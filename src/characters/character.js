import React from "react";
import styled from "styled-components"


const Character = ({position, letter}) => {
    return (<div>
        <CharacterModel>{letter}</CharacterModel>
    </div>)
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