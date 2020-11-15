import React from "react";
import { EnemyTypeEnum } from "../enums/enemyTypeEnum";
import {enemyBaseObject} from "./enemyBaseObject";
import img from "../assets/battleImages/thief_battle.png"

export const ENEMY_THIEF =({x = 0, y = 0})=> enemyBaseObject(
    "thief",
    {
      dmg: {
        lowest: 4,
        highest: 7
      },
      def: 3,
      hp: 16,
    },
    {x: x, y: y},
    {
      lowest: 4,
      highest: 6,
    },
    {
        lowest: 7,
        highest: 10
    },
    [
      {
        name: "dagger",
        quantity: 1,
        type: "weapon"
      }
    ],
    EnemyTypeEnum.humanoid,
    "Dawaj szmal kutafonie",
    img
);

