import React from "react";
import { EnemyTypeEnum } from "../enums/enemyTypeEnum";
import { enemyBaseObject } from "./enemyBaseObject";
import img from "../assets/battleImages/anaconda_battle.png";

export const ENEMY_ANACONDA = ({ x = 0, y = 0 }) =>
  enemyBaseObject(
    "anaconda",
    {
      dmg: {
        lowest: 5,
        highest: 8,
      },
      def: 0,
      hp: 9,
    },
    { x: x, y: y },
    {
      lowest: 5,
      highest: 6,
    },
    {
      lowest: 0,
      highest: 0,
    },
    null,
    EnemyTypeEnum.reptile,
    "Sssssss...",
    img
  );
