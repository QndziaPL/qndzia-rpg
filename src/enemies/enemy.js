import {EnemiesContext} from "../App";
import React, {useContext} from "react";
import Character from "../characters/character";
import styled from "styled-components";
import {CalculateTooltipPosition} from "../helpers/calculateTooltipPosition";

export const EnemyTypeEnum = Object.freeze({
    "small": "small", "humanoid": "humanoid", "big": "big", "flying":"flying"
});

export const Enemy = ({name, type, position, stats}) => {
    const tooltipHeight = 200;
    const tooltipWidth = 150;
    const context = useContext(EnemiesContext);
    const {x, y} = position;
    console.log("position in enemy component",position)

    const ttp = CalculateTooltipPosition(tooltipHeight,tooltipWidth, {x, y})


    return (<HoverContainer className="hoverContainer">
        <ActiveHoverBorder position={position}/>
        <Character position={position} letter={"E"} background={"#ff5e5e"}/>
        <TooltipContainer position={ttp} height={tooltipHeight} width={tooltipWidth} className="tooltipContainer">
            <TooltipHeader>{name}</TooltipHeader>
            <TooltipParagraph>hp: {stats.hp}</TooltipParagraph>
            <TooltipParagraph>dmg: {stats.dmg}</TooltipParagraph>
            <TooltipParagraph>def: {stats.def}</TooltipParagraph>
            <TooltipParagraph>type: {type}</TooltipParagraph>
            <TooltipParagraph>position: {position.x}:{position.y}</TooltipParagraph>


        </TooltipContainer>

    </HoverContainer>)

}
const TooltipContainer = styled.div`
box-sizing: border-box;
    padding: 5px;
    z-index: 100;
    left: ${props => props.position.x}px;
    top: ${props => props.position.y}px;
    position: absolute;
    border: 2px solid black;
    display: none;
    height: 200px;
    width: 150px;
    background-color: white;
`
const TooltipHeader = styled.div`
text-align: center;
font-weight: bold;
padding-bottom: 5px;
border-bottom: 2px solid black;
`
const TooltipParagraph = styled.div`

`

const ActiveHoverBorder = styled.div`

display: none;
height: 36px;
width: 36px;
position: absolute;
top: ${props => props.position.y * 32 - 2}px;
left: ${props => props.position.x * 32 - 2}px;
background-color: white;
`

const HoverContainer = styled.div`
cursor: crosshair;
&:hover ${ActiveHoverBorder}{
display: block;
}
&:hover ${TooltipContainer}{
display: block;
}

`


export const Enemies = ({listOfEnemies}) => {

    return listOfEnemies.map(enemy => (<Enemy position={enemy.position} name={enemy.name} stats={enemy.stats} type={enemy.type}/>));
}

