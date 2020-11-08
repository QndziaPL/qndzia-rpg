import styled from "styled-components";
import React, {useContext, useEffect, useState} from "react";

import {MAP_HEIGHT, PLAYER_INFO_PANEL_WIDTH} from "../../consts/consts";
import {useDispatch, useSelector} from "react-redux";
import {setPlayer} from "../../redux/actions";
import {generateId} from "../../helpers/createIDforEnemies";



export const PlayerInfoPanel = () => {

    const playerData = useSelector(p => p.player);


    const dispatch = useDispatch();
    // const enemies = useSelector(p => p.enemies);




    
    const movementKeysContainerSize = PLAYER_INFO_PANEL_WIDTH * 2 / 3;
    const marginMovementKeysContainer = (PLAYER_INFO_PANEL_WIDTH - movementKeysContainerSize) / 2;

    const updatePositionToDispatch = (direction) =>{
        switch (direction){
            case "up":
                playerData.position.y -= 1;
                return playerData

            case "down":
                playerData.position.y += 1;
                return playerData

            case "left":
                playerData.position.x -= 1;
                return playerData

            case "right":
                playerData.position.x += 1;
                return playerData

            default:
                return playerData

        }
    }

    function saveToLocalStorage(){
        localStorage.setItem('player',JSON.stringify(playerData))
    }

    const currentTileId = generateId(playerData.position.x, playerData.position.y)


    function clearDataAndReloadPage(){
        let clear = window.confirm("You're going to reset WHOLE GAME\nAre you sure about that?");
        if (clear){
            localStorage.clear()
            window.location.reload(false)
        }



    }

    // console.log(playerData)
    return (
        <Container style={{position: "relative"}}>
            <ClearLocalStorage onClick={()=> clearDataAndReloadPage()}>reset ALL!</ClearLocalStorage>
            <div>
                <div>player level {playerData.lvl}</div>
                <div>health points {playerData.curHp} / {playerData.maxHp}</div>
                <div>strength {playerData.str}</div>
                <div>defence {playerData.def}</div>
                <div>damage tbd</div>
                <div>damage reduction tbd</div>
            </div>
            <div>position {playerData.position.x} : {playerData.position.y}</div>
            <div>current tile ID {currentTileId}</div>


            <MovementKeysContainer size={movementKeysContainerSize} margin={marginMovementKeysContainer} onClick={() => saveToLocalStorage() }>
                <div style={{position: "relative"}}>
                    <MovementKey
                        onClick={() => dispatch(setPlayer(updatePositionToDispatch("up")))}
                        left={70} top={6}>U</MovementKey>
                    <MovementKey
                        onClick={() => dispatch(setPlayer(updatePositionToDispatch("down")))}
                        left={70} top={134}>D</MovementKey>
                    <MovementKey
                        onClick={() => dispatch(setPlayer(updatePositionToDispatch("left")))}
                        left={6} top={70}>L</MovementKey>
                    <MovementKey
                        onClick={() => dispatch(setPlayer(updatePositionToDispatch("right")))}
                        left={134} top={70}>R</MovementKey>
                </div>
            </MovementKeysContainer>
        </Container>
    )
}

const ClearLocalStorage = styled.div`
position: absolute;
top:5px;
right:5px;
background-color: red;
padding: 2px 5px;
border-radius: 5px;
`

const Container = styled.div`
position: relative;
background-color: #dedede;
width: ${PLAYER_INFO_PANEL_WIDTH}px;
height: ${MAP_HEIGHT}px;
//left: 640px;
//top: -640px;
padding: 15px;
box-sizing: border-box;
border: 2px solid black;
z-index: 10;
`

const MovementKeysContainer = styled.div`
position: absolute;
bottom: 10px;
left: ${props => props.margin}px;
width: ${props => props.size}px;
height: ${props => props.size}px;
//background-color: red;
`

const MovementKey = styled.div`
color: white;
position: absolute;
display: flex;
align-items: center;
justify-content: center;
width: 60px;
height: 60px;
background: #484848 ;
border-radius: 50%;
box-shadow: 3px 3px 10px #ffffff;
left: ${props => props.left}px;
top: ${props => props.top}px;
cursor: pointer;
`