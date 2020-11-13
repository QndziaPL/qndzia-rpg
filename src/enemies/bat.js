import React from "react";
import { EnemyTypeEnum } from "../enums/enemyTypeEnum";

export const ENEMY_BAT = ({ x = 1, y = 1 }) => ({
  name: "bat",
  stats: {
    dmg: 1,
    def: 0,
    hp: 3,
  },
  position: {
    x: x,
    y: y,
  },
  exp: {
    lowest: 1,
    highest: 2,
  },
  loot: {
    coins: 2,
    batWing: 1,
  },
  type: EnemyTypeEnum.flying,
  lore: "Jebany COVID...",
});
