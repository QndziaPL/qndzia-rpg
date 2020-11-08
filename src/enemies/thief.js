import { EnemyTypeEnum } from "./enemy";
import React from "react";

export const ENEMY_THIEF = ({ x = 1, y = 1 }) => ({
  name: "thief",
  stats: {
    dmg: 5,
    def: 1,
    hp: 12,
  },
  position: {
    x: x,
    y: y,
  },
  loot: {
    coins: 20,
    leatherHat: 1,
  },
  type: EnemyTypeEnum.humanoid,
});
