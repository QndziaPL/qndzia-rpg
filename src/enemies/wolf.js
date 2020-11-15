import React from "react";
import { EnemyTypeEnum } from "../enums/enemyTypeEnum";
import { enemyBaseObject } from "./enemyBaseObject";
import img from "../assets/battleImages/wolf_battle.png";

export const ENEMY_WOLF = ({ x = 0, y = 0 }) =>
  enemyBaseObject(
    "wolf",
    {
      dmg: {
        lowest: 2,
        highest: 4,
      },
      def: 0,
      hp: 9,
    },
    { x: x, y: y },
    {
      lowest: 2,
      highest: 3,
    },
    {
      lowest: 2,
      highest: 3,
    },
    [
      {
        name: "wolfSkin",
        quantity: 1,
        type: "remains",
      },
    ],
    EnemyTypeEnum.small,
    "Czemu wilk tak wyje w księżycową noc?",
    img
  );
