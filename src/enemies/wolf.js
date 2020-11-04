import { EnemyTypeEnum} from "./enemy";
import React from "react";

export const ENEMY_WOLF = ({x=1, y=1}) => ({
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