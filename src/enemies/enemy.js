import {AppContext, EnemiesContext} from "../App";
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

    const {x, y} = position;

    const ttp = CalculateTooltipPosition(tooltipHeight,tooltipWidth, {x, y})


    return (<HoverContainer className="hoverContainer">
        <ActiveHoverBorder position={position} className="activeHoverBorder"/>
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
    z-index: 100;
    left: ${props => props.position.x}px;
    top: ${props => props.position.y}px;
    position: absolute;
    
    display: block;
    height: 0;
    width: 0;
    border-radius: 20px;
    background-color: #d7d7d7;
    overflow: hidden;
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
background-color: gold;
border-radius: 5px;
transform: rotate(45deg);
animation: pulse 1s infinite;
@keyframes pulse {
from{ background-color: red; opacity: 0.1}
to{background-color: gold; opacity: 1}
}
`

const HoverContainer = styled.div`
cursor: crosshair;
&:hover ${ActiveHoverBorder}{
display: block;
z-index: 10;
}
&:hover ${TooltipContainer}{
display: block;
height: 200px;
width: 150px;
border: 2px solid black;
padding: 5px;
transition-duration: 0.3s;
}

`


export const Enemies = () => {
    const context = useContext(AppContext);
    return context.enemyMap.get.enemyMap.map(e =>
        <Enemy position={e.position} name={e.name} stats={e.stats} type={e.type}/>);
}

