import React from "react";
import { EnemyTypeEnum } from "../enums/enemyTypeEnum";
import {enemyBaseObject} from "./enemyBaseObject";
import img from "../assets/battleImages/bear_battle.png"

export const ENEMY_BEAR = ({ x = 1, y = 1 }) => enemyBaseObject(
  "bear",
  {
      dmg: {
          lowest: 6,
          highest: 8
      },
    def: 2,
    hp: 35,
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
    img
);
