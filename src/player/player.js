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



    return (
        <PlayerCharacter
            className={"asdasd"}
        left={context.playerPosition.get.x}
        top={context.playerPosition.get.y}
        >
            <Character letter={"P"}/>


    </PlayerCharacter>
    )
}

export default Player;

const PlayerCharacter = styled.div`

position: absolute;
left: ${props => props.left * 32}px;
top: ${props => props.top * 32}px;
transition-duration: 0.2s;

`

