import React from "react";

export const CompileAll = (enemies, map) => {
  const em = enemies.enemyMap;
  let compile = [];
  map.map( (value, index)=> compile.push({
    mapId: map[index],
    enemyId: 0
  }))

  for (const index in em) {
    if (em[index].tileId !== null) {
      const id = em[index].tileId;
      compile[id] = { ...compile[id], enemyId: 1 };
    }
  }

  return compile;
};
