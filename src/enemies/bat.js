import {Enemy, EnemyTypeEnum} from "./enemy";
import React from "react";


export const ENEMY_BAT = ({x, y}) => ({
    name: "bat",
    stats: {
        dmg: 1,
        def: 0,
        hp: 3
    },
    position: {
        x: x,
        y: y
    },
    loot: {
        coins: 2,
        batWing: 1
    },
    type: EnemyTypeEnum.flying,
})