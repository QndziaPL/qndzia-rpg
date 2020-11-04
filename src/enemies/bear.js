import {Enemy, EnemyTypeEnum} from "./enemy";
import React from "react";

export const ENEMY_BEAR = ({x=1, y=1}) => ({
    name: "bear",
    stats: {
        dmg: 4,
        def: 2,
        hp: 16
    },
    position: {
        x: x,
        y: y
    },
    loot: {
        coins: 2,
        bearClaw: 1
    },
    type: EnemyTypeEnum.big,
})