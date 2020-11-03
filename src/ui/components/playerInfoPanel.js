import styled from "styled-components";
import React, {useContext} from "react";
import {AppContext} from "../../App";


export const PlayerInfoPanel = () => {

    const context = useContext(AppContext);

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
        </Container>
    )
}

const Container = styled.div`
position: absolute;
background-color: #dedede;
width: 200px;
height: 640px;
right: -200px;
padding: 10px;
box-sizing: border-box;
`