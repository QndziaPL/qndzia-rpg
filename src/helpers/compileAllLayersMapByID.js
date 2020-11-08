import React from "react";

export const CompileAll = (enemies, map) => {
  const em = enemies.enemyMap;
  // console.log(em)
  let compile = [];
  for (const i in map) {
    compile.push({
      mapId: map[i],
      enemyId: 0,
    });
  }
  for (const j in em) {
    // console.log(em[j])
    if (em[j].tileId !== null) {
      const id = em[j].tileId;
      compile[id] = { ...compile[id], enemyId: 1 };
    }
  }
  // console.log(compile)
  return compile;
};
