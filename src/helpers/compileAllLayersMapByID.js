import React from "react";

//compiles enemies and map together
//TODO: treasures and other stuff
export const CompileAll = (enemies, map) => {
  const ENEMY_MAP = enemies.enemyMap;
  let compile = [];
  map.map((value, index) =>
    compile.push({
      mapId: map[index],
      enemyId: 0,
    })
  );

  for (const index in ENEMY_MAP) {
    if (ENEMY_MAP[index].tileId !== null) {
      const id = ENEMY_MAP[index].tileId;
      compile[id] = { ...compile[id], enemyId: 1 };
    }
  }

  return compile;
};
