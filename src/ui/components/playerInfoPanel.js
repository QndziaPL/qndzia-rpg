import styled from "styled-components";
import React, {useContext} from "react";
import {AppContext} from "../../App";
import {MAP_HEIGHT, PLAYER_INFO_PANEL_WIDTH} from "../../consts/consts";


export const PlayerInfoPanel = () => {

    const context = useContext(AppContext);

    const movementKeysContainerSize = PLAYER_INFO_PANEL_WIDTH * 2 / 3;
    const marginMovementKeysContainer = (PLAYER_INFO_PANEL_WIDTH - movementKeysContainerSize) / 2;

    return (
        <Container>
            <div>
                <div>player level {context.playerLevel.get}</div>
                <div>health points {context.playerCurrentHp.get} / {context.playerMaxHp.get}</div>
                <div>strength {context.playerStrength.get}</div>
                <div>defence {context.playerDefence.get}</div>
                <div>damage tbd</div>
                <div>damage reduction tbd</div>
            </div>
            <div>
                position {context.playerPosition.get.x + 1} : {context.playerPosition.get.y + 1}
            </div>
            <button>save game</button>
            <MovementKeysContainer size={movementKeysContainerSize} margin={marginMovementKeysContainer}>
                <div style={{position: "relative"}}>
                    <MovementKey
                        onClick={() => context.playerPosition.set(prevState => ({x: prevState.x, y: prevState.y - 1}))}
                        left={70} top={6}>U</MovementKey>
                    <MovementKey
                        onClick={() => context.playerPosition.set(prevState => ({x: prevState.x, y: prevState.y + 1}))}
                        left={70} top={134}>D</MovementKey>
                    <MovementKey
                        onClick={() => context.playerPosition.set(prevState => ({x: prevState.x - 1, y: prevState.y}))}
                        left={6} top={70}>L</MovementKey>
                    <MovementKey
                        onClick={() => context.playerPosition.set(prevState => ({x: prevState.x + 1, y: prevState.y}))}
                        left={134} top={70}>R</MovementKey>
                </div>

            </MovementKeysContainer>
        </Container>
    )
}

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
`