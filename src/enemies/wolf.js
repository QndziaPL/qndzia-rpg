import {Enemy, EnemyTypeEnum} from "./enemy";
import React from "react";

export const ENEMY_WOLF = ({x, y}) => ({
    name: "wolf",
    stats: {
        dmg: 2,
        def: 0,
        hp: 5
    },
    position: {
        x: x,
        y: y
    },
    loot: {
        coins: 4,
        wolfSkin: 1
    },
    type: EnemyTypeEnum.small,
})