import { EnemyTypeEnum} from "./enemy";
import React from "react";


export const ENEMY_BAT = ({x=1, y=1}) => ({
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