import React, {useContext, useEffect, useState} from "react";
import Character from "../characters/character";
import {AppContext} from "../App";
import styled from "styled-components"
import {useKeyPress} from "../hooks/useKeyPress";


const Player = () => {

    const context = useContext(AppContext);

    const upPressed = useKeyPress("ArrowUp")
    const downPressed = useKeyPress("ArrowDown")
    const leftPressed = useKeyPress("ArrowLeft")
    const rightPressed = useKeyPress("ArrowRight")


    const moveCharacter = () =>{

        if (upPressed) context.playerPosition.set(prevState => ( {x:prevState.x, y:prevState.y - 1}))
        if (downPressed) context.playerPosition.set(prevState => ( {x:prevState.x, y:prevState.y + 1}))
        if (leftPressed) context.playerPosition.set(prevState => ( {x:prevState.x - 1, y:prevState.y}))
        if (rightPressed) context.playerPosition.set(prevState => ( {x:prevState.x + 1, y:prevState.y}))
    }
    useEffect(()=> moveCharacter,[upPressed, downPressed, leftPressed, rightPressed]);


    const x = context.playerPosition.get.x;
    const y = context.playerPosition.get.y;

    return (
        <PlayerCharacter

        >
            <Character position={ {x,y}} letter={"P"}/>


    </PlayerCharacter>
    )
}

export default Player;

const PlayerCharacter = styled.div`


`

