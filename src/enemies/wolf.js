import {Enemy, EnemyTypeEnum} from "./enemy";
import React from "react";

export const ENEMY_WOLF = ({x,y}) => {
    const name= "wolf"
    const stats = {
        dmg: 2,
        def: 0,
        hp: 5
    }
    const position = {
        x: x,
        y: y,
    }
    const loot = {
        coins: 4,
        wolfSkin: 1,
    }

    return <Enemy stats={stats} name={name} type={EnemyTypeEnum.small} position={position} />
}