import React from "react";
import { EnemyTypeEnum } from "../enums/enemyTypeEnum";
import {enemyBaseObject} from "./enemyBaseObject";

export const ENEMY_BEAR = ({ x = 1, y = 1 }) => enemyBaseObject(
  "bear",
  {
      dmg: {
          lowest: 3,
          highest: 5
      },
    def: 2,
    hp: 16,
  },
  {
    x: x,
    y: y,
  },
  {
    lowest: 7,
    highest: 10,
  },
    {
        lowest: 0,
        highest: 0
    },
    [
      {
        name: "bearClaw",
        quantity: 1,
          type:"remains"
      }
    ],
  EnemyTypeEnum.big,
  "Misie są super i wpierdalają miodek",
);
