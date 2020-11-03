import {Enemy, EnemyTypeEnum} from "./enemy";
import React from "react";


export const ENEMY_BAT = ({x,y}) => {
   const name= "bat"
    const stats = {
        dmg: 1,
        def: 0,
        hp: 3
    }
   const position = {
        x: x,
        y: y,
    }
    const loot = {
        coins: 2,
        batWing: 1,
    }

    return <Enemy stats={stats} name={name} type={EnemyTypeEnum.small} position={position} />
}