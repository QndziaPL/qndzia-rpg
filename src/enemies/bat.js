import React from "react";
import {EnemyTypeEnum} from "../enums/enemyTypeEnum";
import {enemyBaseObject} from "./enemyBaseObject";

export const ENEMY_BAT =({x = 0, y = 0})=> enemyBaseObject(
    "bat",
    {
        dmg: {
            lowest: 0,
            highest: 2
        },
        def: 0,
        hp: 7,
    },
    {x: x, y: y},
    {
        lowest: 1,
        highest: 2,
    },
    {
            lowest: 0,
            highest: 2
    },
    [
        {
            name: "batWing",
            quantity: 1,
            type: "remains"
        }
    ],
    EnemyTypeEnum.flying,
    "Jebany COVID...",
);




